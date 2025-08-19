// This file defines the parts required for each service interval for different vehicle types.

type ServiceSchedule = {
    [serviceType: string]: string[]; // Array of part names
};

type VehicleSchedules = {
    [model: string]: {
        [fuelType: string]: string; // Maps to a schedule name in `schedules`
    };
};

// Define part lists once to avoid repetition
const freeService1 = [];
const freeService2 = [];
const freeService3 = ['ENGINE_OIL', 'Oil Filter', 'Drain Plug Gasket'];

const base_10k = ['ENGINE_OIL', 'Oil Filter', 'Drain Plug Gasket'];
const p_parts_20k = [...base_10k, 'Air Filter', 'A/C Filter', 'Brake Fluid'];
const p_parts_30k = [...base_10k, 'COOLANT PREMIX GOLDEN YELLOW', 'Brake Fluid'];
const p_parts_40k = [...p_parts_20k, 'Fuel Filter', 'Spark Plugs'];
const p_parts_60k = [...p_parts_20k, 'Transmission Fluid'];

const d_parts_20k = ['ECSTAR DIESEL 5W30-IOCL', 'Oil Filter', 'Drain Plug Gasket', 'Air Filter', 'A/C Filter', 'Brake Fluid', 'Diesel Filter'];
const d_parts_30k = ['ECSTAR DIESEL 5W30-IOCL', 'Oil Filter', 'Drain Plug Gasket', 'COOLANT PREMIX GOLDEN YELLOW', 'Brake Fluid'];
const d_parts_40k = [...d_parts_20k];
const d_parts_60k = [...d_parts_20k, 'Transmission Fluid'];


export const serviceSchedules: { schedules: Record<string, ServiceSchedule>, [model: string]: VehicleSchedules[string] } = {
    schedules: {
        // --- Standard Petrol Schedule ---
        default: {
            '1st Free Service (1,000 km)': freeService1,
            '2nd Free Service (5,000 km)': freeService2,
            '3rd Free Service (10,000 km)': freeService3,
            'Paid Service (20,000 km)': p_parts_20k,
            'Paid Service (30,000 km)': p_parts_30k,
            'Paid Service (40,000 km)': p_parts_40k,
            'Paid Service (50,000 km)': p_parts_30k,
            'Paid Service (60,000 km)': p_parts_60k,
            'Paid Service (70,000 km)': p_parts_30k,
            'Paid Service (80,000 km)': p_parts_40k,
            'Paid Service (90,000 km)': p_parts_30k,
            'Paid Service (100,000 km)': p_parts_20k,
            'Paid Service (110,000 km)': p_parts_30k,
            'Paid Service (120,000 km)': [...p_parts_40k, 'Transmission Fluid'],
        },
        // --- Standard Diesel Schedule ---
        diesel: {
            '1st Free Service (1,000 km)': freeService1,
            '2nd Free Service (5,000 km)': freeService2,
            '3rd Free Service (10,000 km)': ['ECSTAR DIESEL 5W30-IOCL', 'Oil Filter', 'Drain Plug Gasket'],
            'Paid Service (20,000 km)': d_parts_20k,
            'Paid Service (30,000 km)': d_parts_30k,
            'Paid Service (40,000 km)': d_parts_40k,
            'Paid Service (50,000 km)': d_parts_30k,
            'Paid Service (60,000 km)': d_parts_60k,
            'Paid Service (70,000 km)': d_parts_30k,
            'Paid Service (80,000 km)': d_parts_40k,
            'Paid Service (90,000 km)': d_parts_30k,
            'Paid Service (100,000 km)': d_parts_20k,
            'Paid Service (110,000 km)': d_parts_30k,
            'Paid Service (120,000 km)': [...d_parts_40k, 'Transmission Fluid'],
        },
        // --- S-LLC Petrol Schedule (Brezza, Ertiga, Ciaz, S-Cross, XL6, Fronx) ---
        s_llc_petrol: {
            '1st Free Service (1,000 km)': freeService1,
            '2nd Free Service (5,000 km)': freeService2,
            '3rd Free Service (10,000 km)': freeService3,
            'Paid Service (20,000 km)': p_parts_20k,
            'Paid Service (30,000 km)': [...base_10k, 'Brake Fluid'], // No coolant
            'Paid Service (40,000 km)': p_parts_40k,
            'Paid Service (50,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (60,000 km)': p_parts_60k,
            'Paid Service (70,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (80,000 km)': p_parts_40k,
            'Paid Service (90,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (100,000 km)': [...p_parts_20k, 'Super Long Life Coolant'],
            'Paid Service (110,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (120,000 km)': [...p_parts_40k, 'Transmission Fluid'],
        },
        // --- Jimny Schedule ---
        jimny: {
            '1st Free Service (1,000 km)': freeService1,
            '2nd Free Service (5,000 km)': freeService2,
            '3rd Free Service (10,000 km)': freeService3,
            'Paid Service (20,000 km)': p_parts_20k,
            'Paid Service (30,000 km)': [...p_parts_30k, 'Transfer Case Oil', 'Differential Oil'],
            'Paid Service (40,000 km)': p_parts_40k,
            'Paid Service (50,000 km)': p_parts_30k,
            'Paid Service (60,000 km)': [...p_parts_60k, 'Transfer Case Oil', 'Differential Oil'],
            'Paid Service (70,000 km)': p_parts_30k,
            'Paid Service (80,000 km)': p_parts_40k,
            'Paid Service (90,000 km)': [...p_parts_30k, 'Transfer Case Oil', 'Differential Oil'],
            'Paid Service (100,000 km)': p_parts_20k,
            'Paid Service (110,000 km)': p_parts_30k,
            'Paid Service (120,000 km)': [...p_parts_60k, 'Transfer Case Oil', 'Differential Oil', 'Spark Plugs'],
        },
        // --- Strong Hybrid Schedule (Grand Vitara) ---
        strong_hybrid: {
            '1st Free Service (1,000 km)': freeService1,
            '2nd Free Service (5,000 km)': freeService2,
            '3rd Free Service (10,000 km)': freeService3,
            'Paid Service (20,000 km)': [...base_10k, 'Air Filter', 'A/C Filter', 'Brake Fluid'],
            'Paid Service (30,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (40,000 km)': [...base_10k, 'Air Filter', 'A/C Filter', 'Spark Plugs', 'Brake Fluid'], // No fuel filter
            'Paid Service (50,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (60,000 km)': [...base_10k, 'Air Filter', 'A/C Filter', 'Brake Fluid'], // No transmission fluid
            'Paid Service (70,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (80,000 km)': [...base_10k, 'Air Filter', 'A/C Filter', 'Spark Plugs', 'Brake Fluid', 'Hybrid Transaxle Fluid'],
            'Paid Service (90,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (100,000 km)':[...base_10k, 'Air Filter', 'A/C Filter', 'Super Long Life Coolant', 'Brake Fluid'],
            'Paid Service (110,000 km)': [...base_10k, 'Brake Fluid'],
            'Paid Service (120,000 km)':[...base_10k, 'Air Filter', 'A/C Filter', 'Spark Plugs', 'Brake Fluid'],
        }
    },
    // --- Model-to-Schedule Mapping ---
    "default": { default: "default", "Diesel": "diesel" },
    "Brezza": { default: "s_llc_petrol", "Diesel": "diesel" },
    "Ertiga": { default: "s_llc_petrol", "Diesel": "diesel" },
    "Ciaz": { default: "s_llc_petrol", "Diesel": "diesel" },
    "S-Cross": { default: "s_llc_petrol", "Diesel": "diesel" },
    "XL6": { default: "s_llc_petrol" },
    "Fronx": { default: "s_llc_petrol" },
    "Jimny": { default: "jimny" },
    "Grand Vitara": { default: "s_llc_petrol", "Hybrid": "strong_hybrid" },
    "Invicto": { default: "strong_hybrid" }
};
