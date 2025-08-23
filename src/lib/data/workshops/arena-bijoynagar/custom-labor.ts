import type { CustomLabor } from '../../../types';
import { vehicles } from '@/lib/data';

// This file now contains custom labor charges for the ARENA - BIJOYNAGAR workshop.
// It includes model-specific pricing for wheel services and a function for common services.

const modelSpecificCharges: { [model: string]: { name: string; charge: number }[] } = {
    // Wheel Alignment from the provided image
    'S-Cross': [
        { name: 'WHEEL ALIGNMENT', charge: 505 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 380 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 425 },
    ],
    'Super Carry': [
        { name: 'WHEEL ALIGNMENT', charge: 130 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 175 },
    ],
    'Wagon R': [
        { name: 'WHEEL ALIGNMENT', charge: 375 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 },
    ],
    'S-Presso': [
        { name: 'WHEEL ALIGNMENT', charge: 330 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 },
    ],
    'Alto 800': [
        { name: 'WHEEL ALIGNMENT', charge: 330 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 },
    ],
    'Dzire': [
        { name: 'WHEEL ALIGNMENT', charge: 375 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Swift': [
        { name: 'WHEEL ALIGNMENT', charge: 375 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Ertiga': [
        { name: 'WHEEL ALIGNMENT', charge: 375 },
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 320 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Alto K10': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 },
    ],
    'Brezza': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 340 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Celerio': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 350 },
    ],
    'Baleno': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Ignis': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Fronx': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Eeco': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 325 },
    ],
    'Grand Vitara': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'XL6': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
    'Jimny': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 }
    ],
    'Ciaz': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 4 WHEEL', charge: 340 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 425 },
    ],
    'Ritz': [
        { name: 'WHEEL ALIGNMENT (4 HEAD)', charge: 400 },
        { name: 'WHEEL BALANCING - 5 WHEEL', charge: 400 },
    ],
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

// Remove duplicates, giving model-specific charges higher priority
const uniqueLabor = Array.from(new Map(customLabor.map(item => [`${item.model}-${item.name}`, item])).values());


export default uniqueLabor;
