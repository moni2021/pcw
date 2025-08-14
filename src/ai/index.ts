/**
 * @fileoverview This is the main export point for the AI module.
 * It ensures that Genkit is configured before other modules are loaded,
 * preventing circular dependency issues.
 */
import { ai } from './genkit';

export { ai };
