
// This file defines the extended warranty coverage for various parts.

type WarrantyCoverage = {
    coveredParts: string[];
    conditions: {
        years: number;
        kms: number;
        text: string;
    };
};

// Define default warranty coverage
const defaultCoverage: WarrantyCoverage = {
    coveredParts: [
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
    ],
    conditions: {
        years: 5,
        kms: 100000,
        text: 'Extended Warranty covers the cost of specified parts and associated labor for mechanical and electrical failures up to 5 years or 1,00,000 km, whichever comes first.'
    },
};

// Define model-specific overrides if any
const warrantyByModel: { [model: string]: Partial<WarrantyCoverage> } = {
    "Grand Vitara": {
        // Grand Vitara might have special coverage for its hybrid system
        coveredParts: [
            ...defaultCoverage.coveredParts,
            'Hybrid Transaxle Fluid', // Example of a specific part
            'Hybrid Battery Assembly',
            'Inverter with Converter Assembly'
        ],
    },
    "Jimny": {
        coveredParts: [
            ...defaultCoverage.coveredParts,
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
export function getWarrantyCoverage(model: string): WarrantyCoverage {
    const modelSpecific = warrantyByModel[model];
    if (modelSpecific) {
        return {
            ...defaultCoverage,
            ...modelSpecific,
            // Deep merge covered parts if necessary, preventing duplicates
            coveredParts: Array.from(new Set([...defaultCoverage.coveredParts, ...(modelSpecific.coveredParts || [])])).sort(),
        };
    }
    return defaultCoverage;
}

    