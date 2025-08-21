import type { CustomLabor } from '../../../types';

// This file is ready for you to add custom labor charges specific to the NEXA Bijoynagar workshop.
const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
  // Example: { name: 'A/C SERVICING', model: 'Baleno', charge: 2000 },
];

export default customLabor;
