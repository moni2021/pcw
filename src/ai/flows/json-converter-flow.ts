
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
import { PartSchema, CustomLaborSchema, VehicleSchema, WorkshopSchema, PmsChargeSchema } from '@/lib/types';

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


const jsonSchemas = {
  parts: z.array(PartSchema),
  customLabor: z.array(CustomLaborSchema),
  pmsCharges: z.array(PmsChargeSchema),
  vehicles: z.array(VehicleSchema),
  threeMCare: ThreeMCareSchema,
  workshops: z.array(WorkshopSchema),
};

const jsonExamples = {
    parts: [{ name: 'Sample Part', price: 100 }],
    customLabor: [{ workshopId: "default", name: 'Sample Labor', model: 'Some Model', charge: 500 }],
    pmsCharges: [{ workshopId: "default", model: 'Some Model', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1500 }],
    vehicles: [{ model: 'Sample Model', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol'], productionYears: [2024] }],
    threeMCare: { "Some Model": [{ "name": "INTERIOR CLEANING", "charge": 1500 }]},
    workshops: [{ id: 'workshop-1', name: 'Main Workshop' }],
};

const jsonDescriptions = {
    parts: 'An array of Part objects. Each object must have a `name` (string) and `price` (number).',
    customLabor: 'An array of CustomLabor objects. Each object must have `workshopId` (string), `name` (string), `model` (string), and `charge` (number).',
    pmsCharges: 'An array of PmsCharge objects. Each object must have a `workshopId` (string), `model` (string), `labourDesc` (string), `labourCode` (string), and `basicAmt` (number).',
    vehicles: 'An array of Vehicle objects. Each object must have a `model` (string), `brand` ("Arena", "Nexa", or "Commercial"), `category` (string), `fuelTypes` (array of strings), and `productionYears` (array of numbers). `variants` can be an empty array.',
    threeMCare: 'A dictionary where keys are model names (string) and values are arrays of objects, each with `name` (string) and `charge` (number).',
    workshops: 'An array of Workshop objects. Each object must have an `id` (string) and `name` (string).',
};

// Define the prompt with a dynamic output schema
const jsonConverterPrompt = ai.definePrompt({
    name: "jsonConverterPrompt",
    input: {
        schema: z.object({
            rawText: z.string(),
            formatDescription: z.string(),
            exampleObject: z.string(),
        }),
    },
    prompt: `You are an expert data formatting assistant. Your task is to convert the following raw text into a valid JSON based on the specified format. The raw text could be comma-separated, tab-separated, or unstructured. Analyze the text and produce a clean JSON output. Do not include any explanations, only the JSON output.

Format Description: {{{formatDescription}}}
Example of the expected output structure: {{{exampleObject}}}

Raw Text Input:
---
{{{rawText}}}
---
`,
});


const converterFlow = ai.defineFlow(
  {
    name: 'converterFlow',
    inputSchema: ConvertToJsonInputSchema,
    outputSchema: ConvertToJsonOutputSchema,
  },
  async ({ rawText, jsonFormat }) => {

    const targetSchema = jsonSchemas[jsonFormat];
    const formatDescription = jsonDescriptions[jsonFormat];
    const exampleObject = jsonExamples[jsonFormat];

    const { output } = await jsonConverterPrompt(
        {
            rawText,
            formatDescription,
            exampleObject: JSON.stringify(exampleObject),
        },
        {
            output: { schema: targetSchema }
        }
    );
    
    if (!output) {
      throw new Error("Failed to get a structured response from the model.");
    }

    return { jsonString: JSON.stringify(output, null, 2) };
  }
);

    