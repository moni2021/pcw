
'use server';
/**
 * @fileOverview A Genkit flow for the Maruti Service Advisor chatbot.
 *
 * This file defines the AI logic for a chatbot that assists users with
 * vehicle service-related questions. It can provide information on service
 * costs, parts, and maintenance schedules.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { vehicles, serviceDataLookup } from '@/lib/data';
import { pmsCharges } from '@/lib/pms-charges';
import { allParts } from '@/lib/parts-data';
import { customLaborData } from '@/lib/custom-labor-data';
import { threeMCareData } from '@/lib/3m-care-data';


// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the input schema for the main flow
const AdvisorFlowInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The chat history between the user and the model.'),
  message: z.string().describe('The latest message from the user.'),
});
export type AdvisorFlowInput = z.infer<typeof AdvisorFlowInputSchema>;


// Define the output schema for the main flow
const AdvisorFlowOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type AdvisorFlowOutput = z.infer<typeof AdvisorFlowOutputSchema>;


/**
 * The main exported function that the frontend will call.
 * It takes the chat history and a new message, and returns the AI's response.
 */
export async function serviceAdvisor(input: AdvisorFlowInput): Promise<AdvisorFlowOutput> {
  return serviceAdvisorFlow(input);
}


// The powerful system prompt that defines the chatbot's persona, knowledge, and rules.
const advisorPrompt = ai.definePrompt({
  name: 'serviceAdvisorPrompt',
  input: { schema: AdvisorFlowInputSchema },
  // NOTE: We don't use an output schema here because we want a natural, conversational response, not structured JSON.
  
  // The system prompt sets the context and rules for the AI.
  system: `You are a friendly and professional Maruti Suzuki service advisor. Your goal is to assist users with their vehicle service questions accurately and concisely.

  **Interaction Rules:**
  1.  **Be Conversational:** Engage the user in a natural, friendly manner.
  2.  **Ask for Details:** You do not have access to a live database of prices or service schedules. Your primary role is to understand the user's needs.
  3.  **Handle Ambiguity:** If a user's request is unclear (e.g., "service my car"), you MUST ask clarifying questions to determine the vehicle and service needed. Ask for:
      - The vehicle model (e.g., Swift, Baleno, Ertiga).
      - The fuel type (e.g., Petrol, Diesel, CNG).
      - The specific service required (e.g., "40,000 km paid service", "a general check-up", "brake noise issue").
  4.  **Acknowledge and Summarize:** Once you have the necessary details, summarize the user's request clearly. For example: "Okay, so you need the 40,000 km paid service for your Petrol Swift. I can help with that."
  5.  **Do Not Invent Information:** Do not make up prices, part numbers, or service details. If a user asks for a specific cost, state that you can provide an estimate once all details are gathered and that the final cost will be confirmed by the workshop.
  6.  **Be Concise:** Keep your answers to the point.
  `,
  
  // The prompt body combines the history and the new message.
  prompt: `
    {{#each history}}
      {{#if (eq role 'user')}}
        User: {{{content}}}
      {{else}}
        Model: {{{content}}}
      {{/if}}
    {{/each}}
    User: {{{message}}}
  `,
});


// The main Genkit flow that orchestrates the AI call.
const serviceAdvisorFlow = ai.defineFlow(
  {
    name: 'serviceAdvisorFlow',
    inputSchema: AdvisorFlowInputSchema,
    outputSchema: AdvisorFlowOutputSchema,
  },
  async (input) => {
    // Generate a response using the prompt and the provided input.
    const { output } = await advisorPrompt(input);

    if (!output) {
      return { response: "Sorry, I'm having trouble connecting right now. Please try again in a moment." };
    }

    return {
      response: output.text.trim(),
    };
  }
);
