
'use server';
/**
 * @fileOverview An AI flow to convert unstructured text into structured JSON, with model name normalization.
 *
 * - convertToJson - Converts raw text data into a specified JSON format and normalizes vehicle model names.
 * - ConvertToJsonInput - The input type for the convertToJson function.
 * - ConvertToJsonOutput - The return type for the convertToJson function.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { PartSchema, CustomLaborSchema, VehicleSchema, WorkshopSchema, PmsChargeSchema } from '@/lib/types';
import { vehicles as masterVehicles } from '@/lib/data';


const ThreeMCareServiceSchema = z.object({
    name: z.string(),
    charge: z.number(),
});
const ThreeMCareSchema = z.record(z.array(ThreeMCareServiceSchema));

const ConvertToJsonInputSchema = z.object({
  rawText: z.string().describe('The raw, unstructured text to be converted. This could be from a CSV, Excel, or just plain text.'),
  jsonFormat: z.enum(['parts', 'customLabor', 'pmsCharges', 'vehicles', 'threeMCare', 'workshops']).describe('The target JSON format.'),
  workshopId: z.string().optional().describe('The ID of the workshop to associate the data with, if applicable.'),
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
  customLabor: z.array(CustomLaborSchema.omit({ workshopId: true })),
  pmsCharges: z.array(PmsChargeSchema.omit({ workshopId: true })),
  vehicles: z.array(VehicleSchema),
  threeMCare: ThreeMCareSchema,
  workshops: z.array(WorkshopSchema),
};

const jsonExamples = {
    parts: [{ name: 'Sample Part', price: 100 }],
    customLabor: [{ name: 'Sample Labor', model: 'Some Model', charge: 500 }],
    pmsCharges: [{ model: 'Some Model', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1500, id: 'sample-pms-id' }],
    vehicles: [{ model: 'Sample Model', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol'], productionYears: [2024] }],
    threeMCare: { "Some Model": [{ "name": "INTERIOR CLEANING", "charge": 1500 }]},
    workshops: [{ id: 'workshop-1', name: 'Main Workshop', city: 'Anytown' }],
};

const jsonDescriptions = {
    parts: 'An array of Part objects. Each object must have a `name` (string) and `price` (number).',
    customLabor: 'An array of CustomLabor objects. Each object must have `name` (string), `model` (string), and `charge` (number). The `workshopId` will be added automatically.',
    pmsCharges: 'An array of PmsCharge objects. Each object must have `id` (string), `model` (string), `labourDesc` (string), `labourCode` (string), and `basicAmt` (number). The `workshopId` will be added automatically.',
    vehicles: 'An array of Vehicle objects. Each object must have a `model` (string), `brand` ("Arena", "Nexa", or "Commercial"), `category` (string), `fuelTypes` (array of strings), and `productionYears` (array of numbers). `variants` can be an empty array.',
    threeMCare: 'A dictionary where keys are model names (string) and values are arrays of objects, each with `name` (string) and `charge` (number).',
    workshops: 'An array of Workshop objects. Each object must have an `id` (string), `name` (string), and optionally a `city` (string).',
};

const converterFlow = ai.defineFlow(
  {
    name: 'converterFlow',
    inputSchema: ConvertToJsonInputSchema,
    outputSchema: ConvertToJsonOutputSchema,
  },
  async ({ rawText, jsonFormat, workshopId }) => {
    const targetSchema = jsonSchemas[jsonFormat];
    const formatDescription = jsonDescriptions[jsonFormat];
    const exampleObject = JSON.stringify(jsonExamples[jsonFormat]);
    
    const needsModelNormalization = ['customLabor', 'pmsCharges', 'vehicles', 'threeMCare'].includes(jsonFormat);
    const validModels = needsModelNormalization ? masterVehicles.map(v => v.model).join(', ') : undefined;

    const { output } = await ai.generate({
        prompt: `You are an expert data formatting assistant. Your task is to convert the following raw text into a valid JSON based on the specified format. The raw text could be comma-separated, tab-separated, or unstructured. Analyze the text and produce a clean JSON output. Do not include any explanations, only the JSON output.

        Format: ${jsonFormat}
        Format Description: ${formatDescription}
        Example of the expected output structure: ${exampleObject}
        
        ${validModels ? `
        IMPORTANT: When a 'model' field is present, you MUST normalize the model name from the raw text to match one of the official names from this list. For example, if the text says "alto k10" or "alt k10", you must use the official name "Alto K10".
        Official Vehicle Models:
        ---
        ${validModels}
        ---
        ` : ''}
        
        Raw Text Input:
        ---
        ${rawText}
        ---
        `,
        output: { schema: targetSchema },
    });
    
    if (!output) {
      throw new Error("Failed to get a structured response from the model.");
    }
    
    let finalData = output;

    if ((jsonFormat === 'customLabor' || jsonFormat === 'pmsCharges') && workshopId) {
        finalData = (finalData as any[]).map((item: any) => ({ ...item, workshopId }));
    }

    return { jsonString: JSON.stringify(finalData, null, 2) };
  }
);
