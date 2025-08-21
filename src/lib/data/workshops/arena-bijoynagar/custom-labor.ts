import type { CustomLabor } from '../../../types';
import { vehicles } from '@/lib/data';

// This file now contains custom labor charges for the ARENA - BIJOYNAGAR workshop.
// It includes model-specific pricing for wheel services and a function for common services.

const modelSpecificCharges: { [model: string]: { name: string; charge: number }[] } = {
    // Wheel Alignment
    'S-Cross': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 505 }],
    'Super Carry': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 130 }],
    'Wagon R': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 375 }],
    'S-Presso': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 330 }],
    'Alto 800': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 330 }],
    'Dzire': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 375 }],
    'Swift': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 375 }],
    'Ertiga': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }, { name: 'WHEEL ALIGNMENT', charge: 375 }],
    'Alto K10': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Brezza': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Celerio': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Baleno': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Ignis': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Fronx': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Eeco': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Grand Vitara': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'XL6': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Jimny': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Ciaz': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],
    'Ritz': [{ name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }],

    // Wheel Balancing
    'S-Cross': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 380 }],
    'Swift': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 }, { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Brezza': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 340 }, { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Wagon R': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 }, { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 }],
    'Ertiga': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 }, { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Ciaz': [{ name: 'WHEEL BALANCING - 4 WHEEL', charge: 340 }, { name: 'WHEEL BALANCING - 5 WHEEL', charge: 425 }],
    'Celerio': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 }],
    'Baleno': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'S-Presso': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 }],
    'Dzire': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Alto 800': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 }],
    'Eeco': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 325 }],
    'Ignis': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Alto K10': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 }],
    'Fronx': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Grand Vitara': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'Super Carry': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 175 }],
    'Ritz': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
    'XL6': [{ name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 }],
};

const customLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.flatMap(vehicle => {
    const model = vehicle.model;
    const charges = modelSpecificCharges[model] || [];
    // Map the found charges to the CustomLabor format
    return charges.map(charge => ({
        name: charge.name,
        model: model,
        charge: charge.charge
    }));
});

export default customLabor;
