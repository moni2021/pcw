import type { CustomLabor } from '../../../types';

// --- Custom Labor Charges for nexa-bijoynagar ---
// This file is ready for you to add custom labor charges specific to this workshop.
const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
  // Example: { name: 'A/C SERVICING', model: 'Baleno', charge: 1900 },
];

export default customLabor;
