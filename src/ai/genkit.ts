
/**
 * @fileoverview This file initializes and configures the Genkit AI toolkit.
 * It sets up the Google AI plugin for use throughout the application.
 *
 * It is not necessary to edit this file to use Genkit.
 * To add a flow, see `src/ai/flows/example-flow.ts`.
 */
import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
// You can specify your project and location, or have it default
// to the project containing your service account.
//
// See: https://firebase.google.com/docs/genkit/plugins#google-ai
configureGenkit({
  plugins: [
    googleAI({
      // The Google AI API key is read from the GOOGLE_GENAI_API_KEY
      // environment variable. You can find or create an API key
      // in Google AI Studio: https://aistudio.google.com/app/keys
      //
      // For more information, see:
      // https://firebase.google.com/docs/genkit/plugins#google-ai-api-key
    }),
  ],
  // Log developer-friendly error messages to the console.
  logLevel: 'debug',
  // Perform OpenTelemetry instrumentation and enable traces.
  enableTracingAndMetrics: true,
});
