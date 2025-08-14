
'use server';
/**
 * @fileOverview An AI flow for a multilingual Maruti service advisor chatbot.
 *
 * - chatWithAdvisor - Handles the chat conversation.
 * - sendChatHistoryByEmail - A placeholder to send chat history via email.
 */

import { ai } from '@/ai/genkit';
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

const EmailInputSchema = z.object({
    chatHistory: z.string(),
});
export type EmailInput = z.infer<typeof EmailInputSchema>;


export async function chatWithAdvisor(input: ChatInput): Promise<ChatOutput> {
  return serviceAdvisorFlow(input);
}

export async function sendChatHistoryByEmail(input: EmailInput): Promise<{ success: boolean; message: string }> {
    console.log("------- CHAT HISTORY FOR daloihiru0@gmail.com -------");
    console.log(input.chatHistory);
    console.log("----------------------------------------------------");
    
    // In a real application, you would integrate an email sending service here.
    // For example, using a library like `nodemailer` or an API like SendGrid.
    //
    // Example with a fictional email service:
    //
    // try {
    //   await emailService.send({
    //     to: 'daloihiru0@gmail.com',
    //     subject: 'Chat History from Service Advisor',
    //     body: input.chatHistory,
    //   });
    //   return { success: true, message: "Chat history sent successfully." };
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   return { success: false, message: "Failed to send chat history." };
    // }

    return { success: true, message: "Chat history ready. Configure an email provider to send to daloihiru0@gmail.com." };
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
