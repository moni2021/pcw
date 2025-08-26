
'use server';
/**
 * @fileOverview A secure flow for uploading and setting the Firebase Service Account Key.
 *
 * - uploadServiceAccountKey - A flow that takes the JSON content of a service account key
 *   and is intended to set it as a new secret.
 */

import { ai } from '@/ai';
import { z } from 'zod';

// In a real environment, this would be managed by a secrets manager.
// For this context, we simulate the action, but the actual environment variable
// would need to be set on the hosting platform (e.g., App Hosting for Firebase).

const UploadKeyInputSchema = z.object({
  jsonContent: z.string().describe('The full JSON content of the service account key file.'),
});
export type UploadKeyInput = z.infer<typeof UploadKeyInputSchema>;

const UploadKeyOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  message: z.string(),
});
export type UploadKeyOutput = z.infer<typeof UploadKeyOutputSchema>;

export async function uploadServiceAccountKey(input: UploadKeyInput): Promise<UploadKeyOutput> {
  return serviceAccountUploaderFlow(input);
}

const serviceAccountUploaderFlow = ai.defineFlow(
  {
    name: 'serviceAccountUploaderFlow',
    inputSchema: UploadKeyInputSchema,
    outputSchema: UploadKeyOutputSchema,
  },
  async ({ jsonContent }) => {
    try {
      // 1. Validate the JSON content
      const parsedJson = JSON.parse(jsonContent);
      if (!parsedJson.project_id || !parsedJson.private_key || !parsedJson.client_email) {
        throw new Error('Invalid service account JSON format. Missing required fields.');
      }

      // 2. In a real-world scenario, you would use a secure method to set this
      //    environment variable on your hosting provider. For this tool, we will
      //    log a success message and instruct the user on the manual step if needed.
      
      console.log('Successfully received and validated service account key.');
      console.log('In a real deployment, this key would be stored as a secret/environment variable.');
      
      // We set the process environment variable for the current session.
      // This allows the user to use the app immediately without restarting the server.
      // This will NOT persist after a server restart or redeployment.
      process.env.SERVICE_ACCOUNT_KEY = jsonContent;


      return {
        success: true,
        message: 'Service account key validated. The environment is now configured for this session. You must redeploy with the key set as an environment variable for the change to persist.',
      };
    } catch (error: any) {
      console.error('Failed to process service account key:', error);
      return {
        success: false,
        error: error.message || 'An unknown error occurred while processing the key.',
        message: 'Failed to upload and configure the service account key.',
      };
    }
  }
);
