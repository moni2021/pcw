
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
        'Transmission Fluid',
        'Transfer Case Oil',
        'Differential Oil',
        'Hybrid Transaxle Fluid',
        // Add other major non-consumable parts that might be replaced during a high-mileage service
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
        ],
    },
    "Jimny": {
        coveredParts: [
            ...defaultCoverage.coveredParts,
            'Transfer Case Oil',
            'Differential Oil',
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
            coveredParts: Array.from(new Set([...defaultCoverage.coveredParts, ...(modelSpecific.coveredParts || [])])),
        };
    }
    return defaultCoverage;
}
