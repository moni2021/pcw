/**
 * @fileoverview This is the main export point for the AI module.
 * It initializes and configures the Genkit AI toolkit for the application.
 */
import * as genkitCore from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
export const ai = genkitCore.genkit({
  plugins: [
    googleAI({
      // The Google AI API key is read from the GOOGLE_GENAI_API_KEY
      // environment variable. You can find or create an API key
      // in Google AI Studio: https://aistudio.google.com/app/keys
    }),
  ],
});
