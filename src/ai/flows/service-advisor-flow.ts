
'use server';
/**
 * @fileOverview An AI flow for a multilingual Maruti service advisor chatbot.
 *
 * - chatWithAdvisor - Handles the chat conversation.
 */

import { ai } from '@/ai';
import { z } from 'zod';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation.'),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function chatWithAdvisor(input: ChatInput): Promise<ChatOutput> {
  return serviceAdvisorFlow(input);
}


const serviceAdvisorFlow = ai.defineFlow(
  {
    name: 'serviceAdvisorFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const chatHistory = history.map(turn => ({
      role: turn.role,
      content: [{ text: turn.content }],
    }));

    const { output } = await ai.generate({
      prompt: `You are a friendly and expert Maruti Suzuki service advisor. Your goal is to provide helpful and accurate information to users about their car service needs.
      You must be able to understand and respond in multiple languages. Always maintain a polite and professional tone.
      
      User's latest message: ${message}`,
      history: chatHistory,
      config: {
        temperature: 0.7,
      },
    });

    return { response: output!.text };
  }
);
