import type { Vehicle, ServiceData, Service } from './types';
import { allParts } from './data/parts';
import { serviceSchedules } from './data/service-schedules';


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

function generateServiceData() {
    const serviceData: ServiceData = {};
    const getPart = (name: string) => allParts.find(p => p.name === name)!;

    vehicles.forEach(vehicle => {
        const { model, fuelTypes } = vehicle;
        
        fuelTypes.forEach(fuelType => {
            const keyPrefix = `${model} ${fuelType}`;

            // Get the specific schedule for the model and fuel type
            const scheduleName = serviceSchedules[model]?.[fuelType] || serviceSchedules[model]?.['default'] || 'default';
            const schedule = serviceSchedules['schedules'][scheduleName];
            
            if (!schedule) {
                console.warn(`No service schedule found for ${model} (${fuelType})`);
                return;
            }

            // Generate data for each service interval in the schedule
            Object.entries(schedule).forEach(([serviceType, partNames]) => {
                const parts = partNames.map(partName => {
                    // Handle dynamic engine oil part selection
                    if (partName === 'ENGINE_OIL') {
                        return getPart(vehicle.defaultEngineOil || 'DEFAULT ENGINE OIL');
                    }
                    return getPart(partName);
                }).filter(Boolean); // Filter out any undefined parts

                serviceData[`${keyPrefix} ${serviceType}`] = { parts, labor: [] };
            });
        });
    });

    return serviceData;
}

export const serviceDataLookup: { [key: string]: Service } = generateServiceData();
