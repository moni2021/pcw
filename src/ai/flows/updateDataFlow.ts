
'use server';
/**
 * @fileOverview A Genkit flow for updating the service data file.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ServiceDataSchema, ServiceData } from '@/lib/types';
import fs from 'fs/promises';
import path from 'path';

// Define the output schema for the flow
const UpdateDataOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

// The exported wrapper function that the client will call
export async function updateServiceData(data: ServiceData): Promise<z.infer<typeof UpdateDataOutputSchema>> {
  return updateServiceDataFlow(data);
}

// Define the Genkit flow
const updateServiceDataFlow = ai.defineFlow(
  {
    name: 'updateServiceDataFlow',
    inputSchema: ServiceDataSchema,
    outputSchema: UpdateDataOutputSchema,
  },
  async (data) => {
    try {
      // Create the string content for the data file
      const fileContent = `import { ServiceData } from './types';

export const serviceData: ServiceData = ${JSON.stringify(data, null, 2)};
`;
      // Define the path to the data file
      const dataPath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
      
      // Write the updated content to the file
      await fs.writeFile(dataPath, fileContent, 'utf-8');
      
      return { success: true };
    } catch (error: any) {
      console.error('Failed to write service data file:', error);
      return { success: false, error: error.message || 'An unknown error occurred while saving the data.' };
    }
  }
);
