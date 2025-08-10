
import { Vehicle, ServiceData, Service } from './types';
import { allParts } from './parts-data';

export const vehicles: Vehicle[] = [
  // Arena
  { model: 'Alto K10', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024] },
  { model: 'S-Presso', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Celerio', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol'], productionYears: [2021, 2022, 2023, 2024] },
  { model: 'Wagon R', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Swift', brand: 'Arena', category: 'Hatchback', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Dzire', brand: 'Arena', category: 'Sedan', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'CNG', 'Diesel'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Ertiga', brand: 'Arena', category: 'MUV', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG', 'Diesel'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Brezza', brand: 'Arena', category: 'SUV', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'Eeco', brand: 'Arena', category: 'Van', variants: ['5-seater', '7-seater', 'Cargo'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },

  // Nexa
  { model: 'Baleno', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Ignis', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'Fronx', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Delta Plus', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
  { model: 'Ciaz', brand: 'Nexa', category: 'Sedan', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Grand Vitara', brand: 'Nexa', category: 'SUV', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Hybrid'], productionYears: [2022, 2023, 2024] },
  { model: 'Jimny', brand: 'Nexa', category: 'SUV', variants: ['Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
  { model: 'XL6', brand: 'Nexa', category: 'MPV', variants: ['Zeta', 'Alpha', 'Alpha+'], fuelTypes: ['Petrol'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Invicto', brand: 'Nexa', category: 'MPV', variants: ['Zeta+', 'Alpha+'], fuelTypes: ['Hybrid'], productionYears: [2023, 2024] },
  
  // Commercial
  { model: 'Super Carry', brand: 'Commercial', category: 'Light Commercial Vehicle', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Eeco Cargo', brand: 'Commercial', category: 'Van', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  
  // Discontinued but still serviced
  { model: 'Alto 800', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
  { model: 'S-Cross', brand: 'Nexa', category: 'SUV', variants: [], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2017, 2018, 2019, 2020, 2021] },
  { model: 'Ritz', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017] },
];

const getPart = (name: string) => allParts.find(p => p.name === name)!;

const engineOil = getPart("DEFAULT ENGINE OIL");
const oilFilter = getPart("Oil Filter");
const drainPlugGasket = getPart("Drain Plug Gasket");
const coolant = getPart("Coolant");
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

// Diesel Specific
const parts_10k_diesel = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
const parts_20k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
const parts_30k_diesel = [engineOil, oilFilter, drainPlugGasket, coolant, brakeFluid];
const parts_40k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
const parts_60k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid, dieselFilter];
const parts_80k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
const parts_100k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, dieselFilter];
const parts_120k_diesel = [engineOil, oilFilter, drainPlugGasket, airFilter, acFilter, brakeFluid, transmissionFluid, dieselFilter];


const freeService = { parts: [], labor: [] };

function generateServiceData() {
    const serviceData: ServiceData = {};
    const modelGroups: { [key: string]: string[] } = {
        "standard": ["Alto 800", "Alto K10", "S-Presso", "Celerio", "Wagon R", "Swift", "Dzire", "Ignis", "Baleno", "Ritz", "Eeco", "Eeco Cargo", "Super Carry"],
        "long_life_coolant": ["Brezza", "Ertiga", "Ciaz", "S-Cross", "XL6", "Fronx"],
        "grand_vitara_hybrid": ["Grand Vitara"], // Petrol (Smart Hybrid) is different from Strong Hybrid
        "jimny": ["Jimny"],
        "invicto": ["Invicto"],
    };

    const allModels = vehicles.map(v => v.model);

    allModels.forEach(model => {
        const fuelTypes = vehicles.find(v => v.model === model)?.fuelTypes || [];
        fuelTypes.forEach(fuelType => {
            let group = "standard";
            if (modelGroups.long_life_coolant.includes(model)) group = "long_life_coolant";
            if (model === "Grand Vitara" && fuelType === "Hybrid") group = "grand_vitara_hybrid";
            if (model === "Jimny") group = "jimny";
            if (model === "Invicto") group = "invicto";
            if (fuelType === "Diesel") group = "diesel";
            if (fuelType === "CNG") group = "cng"; // Can have specific CNG logic later

            const keyPrefix = `${model} ${fuelType}`;

            serviceData[`${keyPrefix} 1st Free Service (1,000 km)`] = freeService;
            serviceData[`${keyPrefix} 2nd Free Service (5,000 km)`] = freeService;
            serviceData[`${keyPrefix} 3rd Free Service (10,000 km)`] = { parts: [engineOil, oilFilter, drainPlugGasket], labor: [] };

            let services: { [key: string]: Service } = {};

            switch (group) {
                case "diesel":
                     services = {
                        "20,000": { parts: parts_20k_diesel },
                        "30,000": { parts: parts_30k_diesel },
                        "40,000": { parts: parts_40k_diesel },
                        "50,000": { parts: parts_50k_std }, // same as std
                        "60,000": { parts: parts_60k_diesel },
                        "70,000": { parts: parts_70k_std },
                        "80,000": { parts: parts_80k_diesel },
                        "90,000": { parts: parts_90k_std },
                        "100,000":{ parts: parts_100k_diesel },
                        "110,000":{ parts: parts_110k_std },
                        "120,000":{ parts: parts_120k_diesel },
                    };
                    break;
                case "long_life_coolant":
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
                    break;
                case "grand_vitara_hybrid": // Strong Hybrid
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
                    break;
                case "jimny":
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
                    break;
                case "invicto":
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
                    break;
                default: // standard
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
                    break;
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

    

    