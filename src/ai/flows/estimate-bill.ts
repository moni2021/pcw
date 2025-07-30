// estimate-bill.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for estimating the bill for a Maruti Suzuki vehicle service.
 *
 * - estimateBill - A function that takes vehicle model, service type, and fuel type as input and returns an estimated bill.
 * - EstimateBillInput - The input type for the estimateBill function.
 * - EstimateBillOutput - The return type for the estimateBill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateBillInputSchema = z.object({
  vehicleModel: z.string().describe('The model of the Maruti Suzuki vehicle.'),
  serviceType: z.string().describe('The type of service to be performed (e.g., 3rd free service, 20PMS, 30PMS).'),
  fuelType: z.string().describe('The fuel type of the vehicle (e.g., petrol, diesel, CNG).'),
});
export type EstimateBillInput = z.infer<typeof EstimateBillInputSchema>;

const EstimateBillOutputSchema = z.object({
  parts: z.array(z.object({
    name: z.string().describe('The name of the part.'),
    cost: z.number().describe('The cost of the part.'),
  })).describe('List of parts required for the service with their costs.'),
  laborItems: z.array(z.object({
    name: z.string().describe('The name of the labor item.'),
    cost: z.number().describe('The cost of the labor item.'),
  })).describe('List of labor items with their costs.'),
  totalCost: z.number().describe('The estimated total cost of the service (parts + labor).'),
});
export type EstimateBillOutput = z.infer<typeof EstimateBillOutputSchema>;

export async function estimateBill(input: EstimateBillInput): Promise<EstimateBillOutput> {
  return estimateBillFlow(input);
}

const estimateBillPrompt = ai.definePrompt({
  name: 'estimateBillPrompt',
  input: {schema: EstimateBillInputSchema},
  output: {schema: EstimateBillOutputSchema},
  prompt: `You are an expert Maruti Suzuki service estimator. Given the vehicle model, service type, and fuel type, you will estimate the bill amount.

  Vehicle Model: {{{vehicleModel}}}
  Service Type: {{{serviceType}}}
  Fuel Type: {{{fuelType}}}

  Consider the standard repair and maintenance procedures for Maruti Suzuki vehicles. Provide a detailed breakdown of the estimated bill, including:
  - parts: A list of objects, each with 'name' and 'cost' of the part.
  - laborItems: A list of objects, each with 'name' and 'cost' for each labor task.
  - totalCost: The estimated total cost of the service (sum of all parts and labor costs).

  Ensure the estimation is accurate and reflects the current market prices for parts and labor.

  Please provide the response in JSON format.
  `,
});

const estimateBillFlow = ai.defineFlow(
  {
    name: 'estimateBillFlow',
    inputSchema: EstimateBillInputSchema,
    outputSchema: EstimateBillOutputSchema,
  },
  async input => {
    const {output} = await estimateBillPrompt(input);
    return output!;
  }
);
