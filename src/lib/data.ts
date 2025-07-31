
import { Vehicle, ServiceData, Service } from './types';

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

export const serviceDataLookup: { [key: string]: Service } = {};

export const serviceData: ServiceData = {};
