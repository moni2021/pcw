
'use server';
/**
 * @fileOverview An AI flow to convert unstructured text into structured JSON.
 *
 * - convertToJson - Converts raw text data into a specified JSON format.
 * - ConvertToJsonInput - The input type for the convertToJson function.
 * - ConvertToJsonOutput - The return type for the convertToJson function.
 */

// IMPORTANT: This forces the genkit configuration to be loaded and initialized
// before any other code in this file, which is critical for Next.js environments.
import '@/ai/genkit';
import { ai } from '@genkit-ai/core';
import { z } from 'zod';

// Define schemas based on lib/types for validation and prompting
const PartSchema = z.object({
  name: z.string(),
  price: z.number(),
});

const CustomLaborSchema = z.object({
    name: z.string(),
    model: z.string(),
    charge: z.number(),
});

const VehicleSchema = z.object({
  model: z.string(),
  brand: z.enum(['Arena', 'Nexa', 'Commercial']),
  category: z.string(),
  variants: z.array(z.string()),
  fuelTypes: z.array(z.string()),
  productionYears: z.array(z.number()),
});

const PmsChargeSchema = z.object({
  model: z.string(),
  labourDesc: z.string(),
  labourCode: z.string(),
  basicAmt: z.number(),
});

export const ConvertToJsonInputSchema = z.object({
  rawText: z.string().describe('The raw, unstructured text to be converted. This could be from a CSV, Excel, or just plain text.'),
  jsonFormat: z.enum(['parts', 'labour', 'pms', 'models']).describe('The target JSON format.'),
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
      case 'labour':
        formatDescription = 'An array of CustomLabor objects. Each object must have a `name` (string), `model` (string), and `charge` (number). The model name should be one of the existing vehicle models.';
        exampleObject = { name: 'Sample Labor', model: 'Swift', charge: 500 };
        break;
      case 'pms':
        formatDescription = 'An array of PmsCharge objects. Each object must have a `model` (string), `labourDesc` (string, e.g., "Paid Service (20,000 km)"), `labourCode` (string), and `basicAmt` (number).';
        exampleObject = { model: 'Dzire', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1500 };
        break;
      case 'models':
        formatDescription = 'An array of Vehicle objects. Each object must have a `model` (string), `brand` ("Arena", "Nexa", or "Commercial"), `category` (string), `fuelTypes` (array of strings), and `productionYears` (array of numbers). `variants` can be an empty array.';
        exampleObject = { model: 'Sample Model', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol'], productionYears: [2024] };
        break;
    }

    const { output } = await ai.generate({
        prompt: `You are an expert data formatting assistant. Your task is to convert the following raw text into a valid JSON array based on the specified format. The raw text could be comma-separated, tab-separated, or unstructured. Analyze the text and produce a clean JSON array. Do not include any explanations, markdown formatting, or anything other than the raw JSON output.

        Target Format: ${jsonFormat}
        Format Description: ${formatDescription}
        Example of a single object in the array: ${JSON.stringify(exampleObject)}
        
        Raw Text Input:
        ---
        ${rawText}
        ---
        `,
        config: {
            temperature: 0.2, // Lower temperature for more deterministic, structured output
        }
    });

    if (!output) {
      throw new Error("The AI model did not return any output.");
    }

    // Clean the output to remove potential markdown backticks
    const cleanedOutput = output.text.trim().replace(/```json|```/g, '');

    // Add a final validation step to ensure the output is valid JSON
    try {
        JSON.parse(cleanedOutput);
    } catch(e) {
        throw new Error("The AI model returned invalid JSON. Please check the raw text or try again.");
    }
    
    return { jsonString: cleanedOutput };
  }
);
