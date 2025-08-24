
// This file defines the extended warranty coverage for various parts.

export interface WarrantyPlan {
    key: 'platinum' | 'royal_platinum' | 'solitaire' | 'standard';
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
    { key: 'standard', name: 'Standard Warranty', years: 2, kms: 40000 },
    { key: 'platinum', name: 'Platinum Plan', years: 4, kms: 120000 },
    { key: 'royal_platinum', name: 'Royal Platinum Plan', years: 5, kms: 140000 },
    { key: 'solitaire', name: 'Solitaire Plan', years: 6, kms: 160000 },
];

// Define default warranty coverage (parts list)
const defaultCoveredParts: string[] = [
    // --- Engine ---
    'Engine Cylinder Head',
    'Cylinder Block/Liner',
    'Crankshaft & Bearings',
    'Camshaft & Valve Train',
    'Pistons, Piston Rings & Pins',
    'Connecting Rods & Bearings',
    'Engine Oil Pump Assembly',
    'Timing Belt/Chain & Tensioner',
    'Flywheel/Flexplate',
    'Engine Mounts',
    'Water Pump Assembly',
    'Thermostat & Housing',
    'Turbocharger/Supercharger Assembly',
    'Engine Control Module (ECM)',
    'Crankshaft Position Sensor',
    'Camshaft Position Sensor',
    'Knock Sensor',
    'Oxygen (O2) Sensor',
    'Mass Airflow (MAF) Sensor',
    
    // --- Fuel System ---
    'Fuel Pump (In-tank)',
    'Fuel Injectors',
    'Fuel Rail & Pressure Regulator',
    
    // --- Transmission ---
    'Transmission Case & All Internal Parts',
    'Torque Converter',
    'Transmission Control Module (TCM)',
    'Automatic Transmission Solenoids',
    'Clutch Master Cylinder',
    'Clutch Slave Cylinder',
    'Driveshafts & CV Joints',
    'Propeller Shaft & U-Joints',

    // --- Steering System ---
    'Steering Rack and Pinion Assembly',
    'Power Steering Pump',
    'Power Steering Module',
    'Steering Column & Shaft',

    // --- Suspension System ---
    'Front Strut Assembly (MacPherson)',
    'Rear Shock Absorber',
    'Control Arms & Bushings',
    'Ball Joints',
    'Stabilizer Bar, Links & Bushings',

    // --- Braking System ---
    'ABS Actuator and Control Unit',
    'Brake Master Cylinder',
    'Brake Booster',
    'Wheel Speed Sensors',

    // --- Electrical System ---
    'Alternator Assembly',
    'Starter Motor Assembly',
    'Ignition Coils',
    'Body Control Module (BCM)',
    'Power Window Motors & Regulators',
    'Wiper Motor Assembly (Front & Rear)',
    'Instrument Cluster',
    'Airbag Module & Crash Sensors (excluding deployment)',

    // --- Air Conditioning ---
    'A/C Compressor & Clutch',
    'Evaporator Core',
    'Condenser',
    'Heater Core',

    // --- Fluids ---
    // Fluids are covered only when required as part of a covered repair
    'Transmission Fluid',
    'Transfer Case Oil',
    'Differential Oil',
    'Hybrid Transaxle Fluid',
    'Engine Coolant',
    'Power Steering Fluid',
];

// Define model-specific additions or overrides
const warrantyByModel: { [model: string]: { coveredParts: string[] } } = {
    "Grand Vitara": {
        coveredParts: [
            'Hybrid Battery Assembly',
            'Inverter with Converter Assembly',
            'Electric Water Pump (for Hybrid system)',
        ],
    },
    "Invicto": {
        coveredParts: [
            'Hybrid Battery Assembly',
            'Inverter with Converter Assembly',
            'Electric Water Pump (for Hybrid system)',
        ],
    },
    "Jimny": {
        coveredParts: [
            'Transfer Case Assembly & All Internal Parts',
            'Differential Assembly (Front & Rear)',
            '4WD Controller/Module',
        ]
    }
};

/**
 * Gets the warranty coverage details for a specific vehicle model.
 * @param model The model of the vehicle.
 * @returns The applicable warranty coverage.
 */
export function getWarrantyCoverage(model: string, planKey?: WarrantyPlan['key']): WarrantyCoverage {
    const modelSpecificParts = warrantyByModel[model]?.coveredParts || [];
    const parts = Array.from(new Set([...defaultCoveredParts, ...modelSpecificParts])).sort();

    const selectedPlan = planKey ? warrantyPlans.find(p => p.key === planKey) : undefined;
    
    let conditionsText = 'Extended Warranty covers the cost of specified parts and associated labor for mechanical and electrical failures up to the selected plan\'s duration and mileage, whichever comes first.';
    if (selectedPlan?.key === 'standard') {
        conditionsText = 'Standard Manufacturer Warranty covers the repair or replacement of parts found to be defective due to manufacturing faults. It does not cover parts replaced during scheduled maintenance.';
    }


    return {
        plan: selectedPlan,
        coveredParts: parts,
        conditions: {
            text: conditionsText,
        },
    };
}
