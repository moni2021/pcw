
// This file defines the extended warranty coverage for various parts.

export interface WarrantyPlan {
    key: 'platinum' | 'royal_platinum' | 'solitaire';
    name: string;
    years: number;
    kms: number;
}

export type WarrantyCoverage = {
    plan?: WarrantyPlan;
    coveredParts: string[];
    conditions: {
        text: string;
    };
};

export const warrantyPlans: WarrantyPlan[] = [
    { key: 'platinum', name: 'Platinum Plan', years: 4, kms: 120000 },
    { key: 'royal_platinum', name: 'Royal Platinum Plan', years: 5, kms: 140000 },
    { key: 'solitaire', name: 'Solitaire Plan', years: 6, kms: 160000 },
];

// Define default warranty coverage (parts list)
const defaultCoveredParts: string[] = [
    // Engine Components
    'Engine Control Module (ECM)',
    'Fuel Injectors',
    'Turbocharger Assembly',
    'Alternator Assembly',
    'Starter Motor Assembly',
    'Water Pump Assembly',
    'Ignition Coils',
    'Crankshaft Position Sensor',
    'Camshaft Position Sensor',
    'Oxygen Sensor',
    
    // Transmission Components
    'Transmission Control Module (TCM)',
    'Clutch Master Cylinder',
    'Clutch Slave Cylinder',
    'Automatic Transmission Solenoids',

    // Steering & Suspension
    'Power Steering Module',
    'Steering Rack and Pinion Assembly',
    'Front Strut Assembly',
    'Rear Shock Absorber',

    // Braking System
    'ABS Actuator and Control Unit',
    'Brake Master Cylinder',

    // Electricals
    'Body Control Module (BCM)',
    'Power Window Motors',
    'Wiper Motor Assembly',
    
    // Fluids related to covered repairs
    'Transmission Fluid',
    'Transfer Case Oil',
    'Differential Oil',
    'Hybrid Transaxle Fluid',
];

// Define model-specific overrides if any
const warrantyByModel: { [model: string]: { coveredParts: string[] } } = {
    "Grand Vitara": {
        coveredParts: [
            ...defaultCoveredParts,
            'Hybrid Transaxle Fluid',
            'Hybrid Battery Assembly',
            'Inverter with Converter Assembly'
        ],
    },
    "Jimny": {
        coveredParts: [
            ...defaultCoveredParts,
            'Transfer Case Oil',
            'Differential Oil',
            '4WD Controller'
        ]
    }
};

/**
 * Gets the warranty coverage details for a specific vehicle model.
 * @param model The model of the vehicle.
 * @returns The applicable warranty coverage.
 */
export function getWarrantyCoverage(model: string, planKey?: WarrantyPlan['key']): WarrantyCoverage {
    const modelSpecificParts = warrantyByModel[model]?.coveredParts;
    const parts = modelSpecificParts 
        ? Array.from(new Set([...defaultCoveredParts, ...modelSpecificParts])).sort()
        : defaultCoveredParts;

    const selectedPlan = planKey ? warrantyPlans.find(p => p.key === planKey) : undefined;

    return {
        plan: selectedPlan,
        coveredParts: parts,
        conditions: {
            text: 'Extended Warranty covers the cost of specified parts and associated labor for mechanical and electrical failures up to the selected plan\'s duration and mileage, whichever comes first.'
        },
    };
}
