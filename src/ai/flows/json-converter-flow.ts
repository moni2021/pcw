
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
import { PartSchema, CustomLaborSchema, VehicleSchema, WorkshopSchema } from '@/lib/types';

// Schema for PMS charges, as it's not exported from types.ts
const PmsChargeSchema = z.object({
  workshopId: z.string(),
  model: z.string(),
  labourDesc: z.string(),
  labourCode: z.string(),
  basicAmt: z.number(),
});

const ThreeMCareServiceSchema = z.object({
    name: z.string(),
    charge: z.number(),
});
const ThreeMCareSchema = z.record(z.array(ThreeMCareServiceSchema));

const ConvertToJsonInputSchema = z.object({
  rawText: z.string().describe('The raw, unstructured text to be converted. This could be from a CSV, Excel, or just plain text.'),
  jsonFormat: z.enum(['parts', 'customLabor', 'pmsCharges', 'vehicles', 'threeMCare', 'workshops']).describe('The target JSON format.'),
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
    let targetSchema;

    switch (jsonFormat) {
      case 'parts':
        targetSchema = z.array(PartSchema);
        formatDescription = 'An array of Part objects. Each object must have a `name` (string) and `price` (number).';
        exampleObject = { name: 'Sample Part', price: 100 };
        break;
      case 'customLabor':
        targetSchema = z.array(CustomLaborSchema);
        formatDescription = 'An array of CustomLabor objects. Each object must have `workshopId` (string), `name` (string), `model` (string), and `charge` (number).';
        exampleObject = { workshopId: "default", name: 'Sample Labor', model: 'Some Model', charge: 500 };
        break;
      case 'pmsCharges':
        targetSchema = z.array(PmsChargeSchema);
        formatDescription = 'An array of PmsCharge objects. Each object must have a `workshopId` (string), `model` (string), `labourDesc` (string), `labourCode` (string), and `basicAmt` (number).';
        exampleObject = { workshopId: "default", model: 'Some Model', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1500 };
        break;
      case 'vehicles':
        targetSchema = z.array(VehicleSchema);
        formatDescription = 'An array of Vehicle objects. Each object must have a `model` (string), `brand` ("Arena", "Nexa", or "Commercial"), `category` (string), `fuelTypes` (array of strings), and `productionYears` (array of numbers). `variants` can be an empty array.';
        exampleObject = { model: 'Sample Model', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol'], productionYears: [2024] };
        break;
       case 'threeMCare':
        targetSchema = ThreeMCareSchema;
        formatDescription = 'A dictionary where keys are model names (string) and values are arrays of objects, each with `name` (string) and `charge` (number).';
        exampleObject = { "Some Model": [{ "name": "INTERIOR CLEANING", "charge": 1500 }]};
        break;
      case 'workshops':
        targetSchema = z.array(WorkshopSchema);
        formatDescription = 'An array of Workshop objects. Each object must have an `id` (string) and `name` (string).';
        exampleObject = { id: 'workshop-1', name: 'Main Workshop' };
        break;
    }

    const prompt = ai.definePrompt({
      name: 'jsonConverterPrompt',
      input: { schema: z.object({ rawText: z.string() }) },
      output: { schema: targetSchema },
      prompt: `You are an expert data formatting assistant. Your task is to convert the following raw text into a valid JSON based on the specified format. The raw text could be comma-separated, tab-separated, or unstructured. Analyze the text and produce a clean JSON output. Do not include any explanations, only the JSON output.

Format Description: ${formatDescription}
Example of the expected output structure: ${JSON.stringify(exampleObject)}

Raw Text Input:
---
{{{rawText}}}
---
`,
    });

    const { output } = await prompt({ rawText });
    
    if (!output) {
      throw new Error("Failed to get a structured response from the model.");
    }

    return { jsonString: JSON.stringify(output, null, 2) };
  }
);
