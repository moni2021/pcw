import type { CustomLabor } from '../../../types';

// --- Custom Labor Charges for sow-azara ---
// This file is ready for you to add custom labor charges specific to the SOW Azara workshop.
const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
  // Example: { name: 'A/C SERVICING', model: 'Swift', charge: 1800 },
];

export default customLabor;
