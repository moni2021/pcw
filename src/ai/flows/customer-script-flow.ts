
'use server';
/**
 * @fileOverview An AI flow to generate a formal script for service advisors to read to customers.
 *
 * - generateCustomerScript - Generates a script based on service details.
 * - CustomerScriptInput - The input type for the flow.
 * - CustomerScriptOutput - The return type for the flow.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { PartSchema, LaborSchema } from '@/lib/types';

const CustomerScriptInputSchema = z.object({
  vehicleModel: z.string().describe('The model of the customer\'s vehicle (e.g., "Swift Dzire").'),
  serviceType: z.string().describe('The type of service being performed (e.g., "Paid Service (40,000 km)").'),
  totalCost: z.number().describe('The final estimated total cost of the service.'),
  parts: z.array(PartSchema).describe('A list of all parts to be replaced, including their names and prices.'),
  labor: z.array(LaborSchema).describe('A list of all labor charges, including scheduled, recommended, and custom tasks.'),
});
export type CustomerScriptInput = z.infer<typeof CustomerScriptInputSchema>;


const CustomerScriptOutputSchema = z.object({
  script: z.string().describe('The generated formal script for the service advisor.'),
});
export type CustomerScriptOutput = z.infer<typeof CustomerScriptOutputSchema>;


export async function generateCustomerScript(input: CustomerScriptInput): Promise<CustomerScriptOutput> {
  return customerScriptFlow(input);
}

const customerScriptPrompt = ai.definePrompt({
    name: 'customerScriptPrompt',
    input: { schema: CustomerScriptInputSchema },
    output: { schema: CustomerScriptOutputSchema },
    prompt: `You are a professional and courteous Maruti Suzuki service advisor. Your task is to generate a formal script to explain the details of a service to a customer.

The script should be structured, clear, and reassuring. It must cover the following points:
1.  Start with a polite greeting and confirm the vehicle details.
2.  State the service being performed.
3.  Clearly break down the major work involved, mentioning the key parts being replaced and the primary labor tasks. Do not list every single item, but summarize the main activities.
4.  Mention any important recommendations for additional services that the customer should consider for the vehicle's health and safety (e.g., wheel alignment, brake cleaning).
5.  State the total estimated cost clearly.
6.  End with a reassuring closing, asking the customer for their approval to proceed.

Here is the information for the service:
- Vehicle Model: {{{vehicleModel}}}
- Service Type: {{{serviceType}}}
- Total Estimated Cost: ₹{{{totalCost}}}
- Parts:
{{#each parts}}
- {{this.name}}: ₹{{this.price}}
{{/each}}
- Labor:
{{#each labor}}
- {{this.name}}: ₹{{this.charge}}
{{/each}}

Now, generate the script based on this information. Be formal, polite, and professional. Address the customer directly.
`,
});


const customerScriptFlow = ai.defineFlow(
  {
    name: 'customerScriptFlow',
    inputSchema: CustomerScriptInputSchema,
    outputSchema: CustomerScriptOutputSchema,
  },
  async (input) => {
    const llmResponse = await customerScriptPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      // Fallback in case the model does not return a structured object.
      // We take the raw text and wrap it in the expected output format.
      return { script: llmResponse.text };
    }
    
    return output;
  }
);
