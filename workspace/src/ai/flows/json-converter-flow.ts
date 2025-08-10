
'use server';
/**
 * @fileOverview An AI flow to convert unstructured text into structured JSON.
 *
 * - convertToJson - Converts raw text data into a specified JSON format.
 * - ConvertToJsonInput - The input type for the convertToJson function.
 * - ConvertToJsonOutput - The return type for the convertToJson function.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { PartSchema, CustomLaborSchema, VehicleSchema } from '@/lib/types';

// Schema for PMS charges, as it's not exported from types.ts
const PmsChargeSchema = z.object({
  model: z.string(),
  labourDesc: z.string(),
  labourCode: z.string(),
  basicAmt: z.number(),
});

const ConvertToJsonInputSchema = z.object({
  rawText: z.string().describe('The raw, unstructured text to be converted. This could be from a CSV, Excel, or just plain text.'),
  jsonFormat: z.enum(['parts', 'customLabor', 'pmsCharges', 'vehicles']).describe('The target JSON format.'),
});
export type ConvertToJsonInput = z.infer<typeof ConvertToJsonInputSchema>;


const ConvertToJsonOutputSchema = z.object({
  jsonString: z.string().describe('The generated JSON string.'),
});
export type ConvertToJsonOutput = z.infer<typeof ConvertToJsonOutputSchema>;

export async function convertToJson(input: ConvertToJsonInput): Promise<ConvertToJsonOutput> {
  return converterFlow(input);
}


const converterFlow = ai.defineFlow(
  {
    name: 'converterFlow',
    inputSchema: ConvertToJsonInputSchema,
    outputSchema: ConvertToJsonOutputSchema,
  },
  async ({ rawText, jsonFormat }) => {
    let formatDescription = '';
    let exampleObject: object = {};

    switch (jsonFormat) {
      case 'parts':
        formatDescription = 'An array of Part objects. Each object must have a `name` (string) and `price` (number).';
        exampleObject = { name: 'Sample Part', price: 100 };
        break;
      case 'customLabor':
        formatDescription = 'An array of CustomLabor objects. Each object must have a `name` (string), `model` (string), and `charge` (number).';
        exampleObject = { name: 'Sample Labor', model: 'Some Model', charge: 500 };
        break;
      case 'pmsCharges':
        formatDescription = 'An array of PmsCharge objects. Each object must have a `model` (string), `labourDesc` (string), `labourCode` (string), and `basicAmt` (number).';
        exampleObject = { model: 'Some Model', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1500 };
        break;
      case 'vehicles':
        formatDescription = 'An array of Vehicle objects. Each object must have a `model` (string), `brand` ("Arena", "Nexa", or "Commercial"), `category` (string), `fuelTypes` (array of strings), and `productionYears` (array of numbers). `variants` can be an empty array.';
        exampleObject = { model: 'Sample Model', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol'], productionYears: [2024] };
        break;
    }

    const { output } = await ai.generate({
        prompt: `You are an expert data formatting assistant. Your task is to convert the following raw text into a valid JSON array based on the specified format. The raw text could be comma-separated, tab-separated, or unstructured. Analyze the text and produce a clean JSON array. Do not include any explanations, only the JSON output.

        Target Format: ${jsonFormat}
        Format Description: ${formatDescription}
        Example of a single object in the array: ${JSON.stringify(exampleObject)}
        
        Raw Text Input:
        ---
        ${rawText}
        ---
        `,
        config: {
            // Setting a higher temperature to allow the model to be more flexible with unstructured data
            temperature: 0.3,
        }
    });

    // Basic validation and cleaning
    const cleanedOutput = output!.text.trim().replace(/```json|```/g, '');

    return { jsonString: cleanedOutput };
  }
);
