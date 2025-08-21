import type { CustomLabor } from '../../../types';
import { vehicles } from '../../../data';

const nexaRecommendedLabor: { name: string; charge: number }[] = [
    { name: 'AC GAS TOP-UP', charge: 1600 },
    { name: 'BATTERY GROUND CABLE', charge: 350 },
    { name: 'COOLANT CHECK / REPLACE', charge: 350 },
    { name: 'DOOR GLASS/ ADJUST/ LUBRICATE', charge: 320 },
    { name: 'ENGINE OIL & FILTER ASSY REPLACE', charge: 350 },
    { name: 'EVAPORATOR CLEANING', charge: 350 },
];

const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
  ...vehicles.flatMap(vehicle => 
    nexaRecommendedLabor.map(labor => ({
      ...labor,
      model: vehicle.model,
    }))
  )
];

export default customLabor;
