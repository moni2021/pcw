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

const segmentCharges = [
    // All Models
    { name: "NITROGEN GAS FILLING", segment: 'ALL', charge: 200 },
    { name: "DOOR GLASS/ ADJUST/ L", segment: 'ALL', charge: 320 },
    { name: "STRUT GREASING", segment: 'ALL', charge: 1650 },
    { name: "HEADLAMP FOCUSSING", segment: 'ALL', charge: 400 },
    { name: "ENGINE ROOM PAINTING", segment: 'ALL', charge: 400 },

    // Small Segment
    { name: "AC GAS TOP-UP", segment: 'SMALL', charge: 850 },
    { name: "AC GAS CHARGING", segment: 'SMALL', charge: 1000 },
    { name: "A/C SERVICING", segment: 'SMALL', charge: 1000 },

    // Medium Segment
    { name: "AC GAS TOP-UP", segment: 'MEDIUM', charge: 1200 },
    { name: "AC GAS CHARGING", segment: 'MEDIUM', charge: 1250 },
    { name: "A/C SERVICING", segment: 'MEDIUM', charge: 1250 },

    // Large Segment
    { name: "AC GAS TOP-UP", segment: 'LARGE', charge: 1450 },
    { name: "AC GAS CHARGING", segment: 'LARGE', charge: 1600 },
    { name: "A/C SERVICING", segment: 'LARGE', charge: 1600 },
];

const allModels = vehicles.map(v => v.model);

// A helper function to find which segment a model belongs to
const getModelSegment = (modelName: string): string => {
    // This is a simplified lookup. A real implementation might be more complex.
    const upperCaseModel = modelName.toUpperCase();
    if (["Alto 800", "Alto K10", "S-Presso", "Celerio", "Wagon R", "Ignis", "Ritz"].some(m => m.toUpperCase() === upperCaseModel)) return 'SMALL';
    if (["Swift", "Dzire", "Baleno", "Eeco"].some(m => m.toUpperCase() === upperCaseModel)) return 'MEDIUM';
    if (["Ertiga", "XL6", "Brezza", "S-Cross", "Ciaz", "Grand Vitara", "Jimny"].some(m => m.toUpperCase() === upperCaseModel)) return 'LARGE';
    return 'MEDIUM'; // Default fallback
}


// Generate charges based on segments
const generatedCharges: Omit<CustomLabor, 'workshopId'>[] = allModels.flatMap(model => {
    const segment = getModelSegment(model);
    const chargesForModel: Omit<CustomLabor, 'workshopId'>[] = [];

    segmentCharges.forEach(sc => {
        if (sc.segment === 'ALL' || sc.segment === segment) {
            chargesForModel.push({
                name: sc.name,
                model: model,
                charge: sc.charge
            });
        }
    });
    
    return chargesForModel;
});


// Flatten the model-specific charges from the existing object
const flattenedModelSpecificCharges: Omit<CustomLabor, 'workshopId'>[] = Object.entries(modelSpecificCharges).flatMap(([model, charges]) => {
    return charges.map(charge => ({
        name: charge.name,
        model: model,
        charge: charge.charge
    }));
});


// Combine all charges
const customLabor = [...flattenedModelSpecificCharges, ...generatedCharges];


// Remove duplicates, giving model-specific charges higher priority
const uniqueLabor = Array.from(new Map(customLabor.map(item => [`${item.model}-${item.name}`, item])).values());


export const masterCustomLabor: Omit<CustomLabor, 'workshopId'>[] = uniqueLabor;
