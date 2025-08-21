import type { CustomLabor } from '../../../types';
import { vehicles } from '../../../data';

const brakeCaliperLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.map(vehicle => ({
  name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE',
  model: vehicle.model,
  charge: 550,
}));


// --- Custom Labor Charges for sow-azara ---
// This file is ready for you to add custom labor charges specific to the SOW Azara workshop.
const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
  ...brakeCaliperLabor,
  // Example: { name: 'A/C SERVICING', model: 'Swift', charge: 1800 },
];

export default customLabor;
