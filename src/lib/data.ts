
import type { Vehicle, ServiceData, Service } from './types';
import { allParts } from './data/parts';
import { schedules, modelToScheduleMap } from './data/service-schedules';


export const vehicles: Vehicle[] = [
  // =================================================================================
  // ARENA
  // =================================================================================
  { model: 'Alto K10', brand: 'Arena', category: 'Hatchback', variants: ['Std', 'LXi', 'VXi', 'VXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Brezza', brand: 'Arena', category: 'SUV', variants: ['Lxi', 'Vxi', 'Zxi', 'Zxi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024], engineOilQuantity: "3.3 Liters", engineOilLiters: 3.3, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Celerio', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2021, 2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Dzire', brand: 'Arena', category: 'Sedan', variants: ['Lxi', 'Vxi', 'Zxi', 'Zxi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Eeco', brand: 'Arena', category: 'Van', variants: ['5 Seater STD', '7 Seater STD', '5 Seater AC', '5 Seater AC CNG'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "4.2 Liters", engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Ertiga', brand: 'Arena', category: 'MUV', variants: ['Lxi', 'Vxi', 'Zxi', 'Zxi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.5 Liters (for K15C)", engineOilLiters: 3.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'S-Presso', brand: 'Arena', category: 'Hatchback', variants: ['Std', 'LXi', 'VXi', 'VXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Swift', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Wagon R', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "2.8 - 3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  
  // =================================================================================
  // NEXA
  // =================================================================================
  { model: 'Baleno', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Ciaz', brand: 'Nexa', category: 'Sedan', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Fronx', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Delta+', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2023, 2024], engineOilQuantity: "3.1 - 3.3 Liters", engineOilLiters: 3.3, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Grand Vitara', brand: 'Nexa', category: 'SUV', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Zeta+', 'Alpha+'], fuelTypes: ['Petrol', 'Hybrid', 'CNG'], productionYears: [2022, 2023, 2024], engineOilQuantity: "3.4 Liters (Mild-hybrid) / 4.2 Liters (Strong-hybrid)", engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'Ignis', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Invicto', brand: 'Nexa', category: 'MPV', variants: ['Zeta+', 'Alpha+'], fuelTypes: ['Hybrid'], productionYears: [2023, 2024], engineOilQuantity: "4.2 Liters", engineOilLiters: 4.2, defaultEngineOil: 'SYNTHETIC OIL (0W40)-IOCL' },
  { model: 'Jimny', brand: 'Nexa', category: 'SUV', variants: ['Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024], engineOilQuantity: "4.2 - 4.5 Liters", engineOilLiters: 4.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  { model: 'XL6', brand: 'Nexa', category: 'MPV', variants: ['Zeta', 'Alpha', 'Alpha+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.5 Liters", engineOilLiters: 3.5, defaultEngineOil: 'ECSTAR PETROL 0W16 - SHELL' },
  
  // =================================================================================
  // COMMERCIAL
  // =================================================================================
  { model: 'Eeco Cargo', brand: 'Commercial', category: 'Van', variants: ['Petrol', 'CNG'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "4.2 Liters", engineOilLiters: 4.2, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Super Carry', brand: 'Commercial', category: 'Light Commercial Vehicle', variants: ['Petrol Deck', 'Petrol Chassis', 'CNG Deck', 'CNG Chassis'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engineOilQuantity: "3.0 Liters", engineOilLiters: 3.0, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  
  // =================================================================================
  // DISCONTINUED (but still serviced)
  // =================================================================================
  { model: 'Alto 800', brand: 'Arena', category: 'Hatchback', variants: ['Std', 'LXi', 'VXi', 'VXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], engineOilQuantity: "2.8 Liters", engineOilLiters: 2.8, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'Ritz', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'LDi', 'VDi', 'ZDi'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], engineOilQuantity: "3.1 Liters", engineOilLiters: 3.1, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
  { model: 'S-Cross', brand: 'Nexa', category: 'SUV', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Diesel'], productionYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022], engineOilQuantity: "4.0 Liters", engineOilLiters: 4.0, defaultEngineOil: 'ECSTAR PETROL 0W20 - IOCL' },
];

function generateServiceData() {
    const serviceData: ServiceData = {};
    const getPart = (name: string) => allParts.find(p => p.name === name)!;

    vehicles.forEach(vehicle => {
        const { model, fuelTypes } = vehicle;
        
        fuelTypes.forEach(fuelType => {
            const keyPrefix = `${model} ${fuelType}`;

            // Get the specific schedule for the model and fuel type
            const scheduleMap = modelToScheduleMap[model];
            const scheduleName = (scheduleMap && scheduleMap[fuelType as keyof typeof scheduleMap]) || (scheduleMap && scheduleMap['default']) || 'default';
            const schedule = schedules[scheduleName];
            
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

    