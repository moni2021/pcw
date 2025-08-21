import type { CustomLabor } from '../../../types';
import { vehicles } from '../../../data';

const allModels = vehicles.map(v => v.model);

const createLaborForAllModels = (name: string, charge: number): Omit<CustomLabor, 'workshopId'>[] => {
    return allModels.map(model => ({ name, model, charge }));
};

const customLabor: Omit<CustomLabor, 'workshopId'>[] = [];

export default customLabor;
