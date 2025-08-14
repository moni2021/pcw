
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

  **Your Knowledge Base:**
  You have access to the following data. Use it as your single source of truth. Do not invent or use external information.
  - Vehicle Models: A list of all Maruti Suzuki models, their brands (Arena, Nexa, Commercial), categories, fuel types, and production years.
  - Service Schedules & Parts: Detailed information on which parts are replaced at different service intervals (e.g., 20,000 km, 40,000 km) for each model and fuel type.
  - Part Prices: The price list for all spare parts.
  - Labor Charges: Standard labor charges for various jobs, including Periodic Maintenance Service (PMS) for different models and workshops.
  - Custom Labor: Specific labor charges for jobs like wheel alignment, balancing, etc., which can vary by model and workshop.
  - 3M Care Services: A list of optional 3M branded services and their prices for each model.

  **Interaction Rules:**
  1.  **Be Conversational:** Engage the user in a natural, friendly manner.
  2.  **Use Your Data:** Base all your answers on the provided data. If you don't have the information, say so clearly. For example, if a user asks about a model not in your list, state that you don't have data for it.
  3.  **Provide Clear Estimates:** When asked for a service estimate, break it down clearly:
      - List the parts to be replaced and their individual prices.
      - List the applicable labor charges.
      - Mention that GST (18%) will be applied to labor charges.
      - Provide a final estimated total.
  4.  **Handle Ambiguity:** If a user's request is unclear (e.g., "service my car"), ask clarifying questions like "Which model is it?", "What is the fuel type?", or "Which service are you looking for (e.g., 40,000 km service)?".
  5.  **Be Concise:** Keep your answers to the point. Avoid long, rambling explanations.
  6.  **Do Not Hallucinate:** Never make up information, prices, or service details. If the data is not available, explicitly state that.
  
  **Data for Reference:**
  - All Vehicles: ${JSON.stringify(vehicles)}
  - Service Details (Parts per service): ${JSON.stringify(serviceDataLookup)}
  - All Parts & Prices: ${JSON.stringify(allParts)}
  - PMS Labor Charges: ${JSON.stringify(pmsCharges)}
  - Custom Labor Charges: ${JSON.stringify(customLaborData)}
  - 3M Care Services: ${JSON.stringify(threeMCareData)}
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

    return {
      response: output!.text.trim(),
    };
  }
);
