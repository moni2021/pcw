'use server';
/**
 * @fileOverview A flow for updating the service data file.
 *
 * - updateServiceData - A function that handles writing updated service data to `src/lib/data.ts`.
 * - UpdateServiceDataInput - The input type for the updateServiceData function.
 * - UpdateServiceDataOutput - The return type for the updateServiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';
import {ServiceDataSchema} from '@/lib/types';
import * as fs from 'fs/promises';
import * as path from 'path';

export const UpdateServiceDataInputSchema = ServiceDataSchema;
export type UpdateServiceDataInput = z.infer<typeof UpdateServiceDataInputSchema>;

export const UpdateServiceDataOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
export type UpdateServiceDataOutput = z.infer<typeof UpdateServiceDataOutputSchema>;


export async function updateServiceData(input: UpdateServiceDataInput): Promise<UpdateServiceDataOutput> {
    return updateServiceDataFlow(input);
}

const updateServiceDataFlow = ai.defineFlow(
  {
    name: 'updateServiceDataFlow',
    inputSchema: UpdateServiceDataInputSchema,
    outputSchema: UpdateServiceDataOutputSchema,
  },
  async (data) => {
    try {
        const dataPath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
        
        // IMPORTANT: This is a simplified approach for demonstration.
        // In a real-world application, you would use a proper database (e.g., Firestore)
        // instead of writing to a source file. Modifying source code at runtime
        // can lead to issues with builds, version control, and scalability.

        const fileContent = `import { Vehicle, ServiceData } from './types';

export const vehicles: Vehicle[] = [
  { model: 'Swift', fuelTypes: ['Petrol', 'Diesel', 'CNG'] },
  { model: 'Baleno', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Dzire', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Brezza', fuelTypes: ['Petrol'] },
  { model: 'Ertiga', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Wagon R', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Alto K10', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Celerio', fuelTypes: ['Petrol'] },
  { model: 'S-Presso', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Ignis', fuelTypes: ['Petrol'] },
  { model: 'XL6', fuelTypes: ['Petrol'] },
  { model: 'Grand Vitara', fuelTypes: ['Petrol', 'Hybrid'] },
];

export const serviceData: ServiceData = ${JSON.stringify(data, null, 2)};
`;
        
        await fs.writeFile(dataPath, fileContent, 'utf-8');
        
        return { success: true };

    } catch (err: any) {
        console.error("Error writing to data file:", err);
        return { success: false, error: err.message || "Failed to write to file." };
    }
  }
);
