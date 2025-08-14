import { Vehicle, ServiceData, Service } from './types';
import { allParts } from './parts-data';

export const vehicles: Vehicle[] = [
  // Arena
  { model: 'Alto K10', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'S-Presso', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Celerio', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol'], productionYears: [2021, 2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Wagon R', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "2.8 - 3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Swift', brand: 'Arena', category: 'Hatchback', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Dzire', brand: 'Arena', category: 'Sedan', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'CNG', 'Diesel'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Ertiga', brand: 'Arena', category: 'MUV', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG', 'Diesel'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.5 Liters (for K15C)", engineOilLiters: 3.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Brezza', brand: 'Arena', category: 'SUV', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.3 Liters", engineOilLiters: 3.3, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Eeco', brand: 'Arena', category: 'Van', variants: ['5-seater', '7-seater', 'Cargo'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "4.2 Liters", engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },

  // Nexa
  { model: 'Baleno', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Ignis', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Fronx', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Delta Plus', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024], engineOilQuantity: "3.1 - 3.3 Liters", engineOilLiters: 3.3, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Ciaz', brand: 'Nexa', category: 'Sedan', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Grand Vitara', brand: 'Nexa', category: 'SUV', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Hybrid'], productionYears: [2022, 2023, 2024], engineOilQuantity: "3.4 Liters (Mild-hybrid) / 4.2 Liters (Strong-hybrid)", engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Jimny', brand: 'Nexa', category: 'SUV', variants: ['Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024], engineOilQuantity: "4.2 - 4.5 Liters", engineOilLiters: 4.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'XL6', brand: 'Nexa', category: 'MPV', variants: ['Zeta', 'Alpha', 'Alpha+'], fuelTypes: ['Petrol'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.5 Liters", engineOilLiters: 3.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Invicto', brand: 'Nexa', category: 'MPV', variants: ['Zeta+', 'Alpha+'], fuelTypes: ['Hybrid'], productionYears: [2023, 2024], engineOilQuantity: "4.2 Liters", engineOilLiters: 4.2, defaultEngineOil: 'SYNTHETIC OIL (0W40)-IOCL' },
  
  // Commercial
  { model: 'Super Carry', brand: 'Commercial', category: 'Light Commercial Vehicle', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilLiters: 3.0, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Eeco Cargo', brand: 'Commercial', category: 'Van', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  
  // Discontinued but still serviced
  { model: 'Alto 800', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'S-Cross', brand: 'Nexa', category: 'SUV', variants: [], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2017, 2018, 2019, 2020, 2021], engineOilLiters: 4.0, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Ritz', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
];

const getPart = (name: string) => allParts.find(p => p.name === name)!;

const oilFilter = getPart("Oil Filter");
const drainPlugGasket = getPart("Drain Plug Gasket");
const coolant = getPart("COOLANT PREMIX GOLDEN YELLOW");
const brakeFluid = getPart("Brake Fluid");
const airFilter = getPart("Air Filter");
const fuelFilter = getPart("Fuel Filter");
const sparkPlugs = getPart("Spark Plugs");
const acFilter = getPart("A/C Filter");
const transmissionFluid = getPart("Transmission Fluid");
const superLongLifeCoolant = getPart("Super Long Life Coolant");
const hybridTransaxleFluid = getPart("Hybrid Transaxle Fluid");
const transferCaseOil = getPart("Transfer Case Oil");
const differentialOil = getPart("Differential Oil");
const dieselFilter = getPart("Diesel Filter");

// We no longer need the generic engineOil constant here as it's determined by the vehicle.
// const engineOil = getPart("DEFAULT ENGINE OIL");

const freeService = { parts: [], labor: [] };

function generateServiceData() {
    const serviceData: ServiceData = {};

    vehicles.forEach(vehicle => {
        const { model, fuelTypes, defaultEngineOil } = vehicle;
        const engineOil = getPart(defaultEngineOil || 'DEFAULT ENGINE OIL');
        
        // Define parts lists using the vehicle-specific engine oil
        const parts_10k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_20k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid];
        const parts_30k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_40k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid];
        const parts_50k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_60k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid];
        const parts_70k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_80k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid];
        const parts_90k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_100k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid];
        const parts_110k_std = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_120k_std = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid, transmissionFluid];

        const dieselEngineOil = getPart('ECSTAR DIESEL 5W30-IOCL');
        const parts_10k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_20k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
        const parts_30k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
        const parts_40k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
        const parts_60k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid, dieselFilter];
        const parts_80k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
        const parts_100k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
        const parts_120k_diesel = [dieselEngineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid, dieselFilter];

        fuelTypes.forEach(fuelType => {
            const keyPrefix = `${model} ${fuelType}`;

            serviceData[`${keyPrefix} 1st Free Service (1,000 km)`] = freeService;
            serviceData[`${keyPrefix} 2nd Free Service (5,000 km)`] = freeService;
            serviceData[`${keyPrefix} 3rd Free Service (10,000 km)`] = { parts: [engineOil, oilFilter, drainPlugGasket], labor: [] };

            let services: { [key: string]: Service } = {};

            if (fuelType === "Diesel") {
                 services = {
                    "20,000": { parts: parts_20k_diesel },
                    "30,000": { parts: parts_30k_diesel },
                    "40,000": { parts: parts_40k_diesel },
                    "50,000": { parts: parts_30k_diesel },
                    "60,000": { parts: parts_60k_diesel },
                    "70,000": { parts: parts_30k_diesel },
                    "80,000": { parts: parts_80k_diesel },
                    "90,000": { parts: parts_30k_diesel },
                    "100,000":{ parts: parts_100k_diesel },
                    "110,000":{ parts: parts_30k_diesel },
                    "120,000":{ parts: parts_120k_diesel },
                };
            } else if (model === "Grand Vitara" && fuelType === "Hybrid") {
                 services = {
                    "20,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "30,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "40,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid] }, // No fuel filter
                    "50,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "60,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] }, // No transmission fluid
                    "70,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "80,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid, hybridTransaxleFluid] },
                    "90,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "100,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, superLongLifeCoolant, brakeFluid] },
                    "110,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "120,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid] },
                };
            } else if (model === "Invicto") {
                 services = {
                    "20,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "30,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] }, // Uses SLLC
                    "40,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid] },
                    "50,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "60,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "70,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "80,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid] },
                    "90,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "100,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, superLongLifeCoolant, brakeFluid] },
                    "110,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "120,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, sparkPlugs, brakeFluid] },
                };
            } else if (["Brezza", "Ertiga", "Ciaz", "S-Cross", "XL6", "Fronx"].includes(model)) { // long_life_coolant
                 services = {
                    "20,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "30,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] }, // No coolant
                    "40,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid] },
                    "50,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "60,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid] },
                    "70,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "80,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid] },
                    "90,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "100,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, superLongLifeCoolant, brakeFluid] }, // SLLC replace
                    "110,000": { parts: [engineOil, oilFilter, drainPlugGasket, brakeFluid] },
                    "120,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid, transmissionFluid] },
                };
            } else if (model === "Jimny") {
                services = {
                    "20,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "30,000": { parts: [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid, transferCaseOil, differentialOil] },
                    "40,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid] },
                    "50,000": { parts: [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid] },
                    "60,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid, transferCaseOil, differentialOil] },
                    "70,000": { parts: [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid] },
                    "80,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid] },
                    "90,000": { parts: [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid, transferCaseOil, differentialOil] },
                    "100,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid] },
                    "110,000": { parts: [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid] },
                    "120,000": { parts: [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, fuelFilter, sparkPlugs, brakeFluid, transmissionFluid, transferCaseOil, differentialOil] },
                };
            } else { // Standard Petrol / CNG
                 services = {
                    "20,000": { parts: parts_20k_std },
                    "30,000": { parts: parts_30k_std },
                    "40,000": { parts: parts_40k_std },
                    "50,000": { parts: parts_50k_std },
                    "60,000": { parts: parts_60k_std },
                    "70,000": { parts: parts_70k_std },
                    "80,000": { parts: parts_80k_std },
                    "90,000": { parts: parts_90k_std },
                    "100,000": { parts: parts_100k_std },
                    "110,000": { parts: parts_110k_std },
                    "120,000": { parts: parts_120k_std },
                };
            }

            for (const [km, service] of Object.entries(services)) {
                // Ensure oil filter is always present if engine oil is
                if (service.parts?.some(p => p.name.toLowerCase().includes('oil')) && !service.parts.includes(oilFilter)) {
                    // Find index of first oil and insert filter after it
                    const oilIndex = service.parts.findIndex(p => p.name.toLowerCase().includes('oil'));
                    service.parts.splice(oilIndex + 1, 0, oilFilter);
                }
                serviceData[`${keyPrefix} Paid Service (${km} km)`] = service;
            }
        });
    });

    return serviceData;
}

export const serviceDataLookup: { [key: string]: Service } = generateServiceData();

export const serviceData: ServiceData = {};
