import { Vehicle, ServiceData } from './types';

export const vehicles: Vehicle[] = [
  // Arena
  { model: 'Alto K10', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024] },
  { model: 'S-Presso', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Celerio', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol'], productionYears: [2021, 2022, 2023, 2024] },
  { model: 'Wagon R', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Swift', brand: 'Arena', category: 'Hatchback', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Dzire', brand: 'Arena', category: 'Sedan', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Ertiga', brand: 'Arena', category: 'MUV', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Brezza', brand: 'Arena', category: 'SUV', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'Eeco', brand: 'Arena', category: 'Van', variants: ['5-seater', '7-seater', 'Cargo'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },

  // Nexa
  { model: 'Baleno', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Ignis', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'Fronx', brand: 'Nexa', category: 'Premium Hatchback', variants: ['Sigma', 'Delta', 'Delta Plus', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
  { model: 'Ciaz', brand: 'Nexa', category: 'Sedan', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Grand Vitara', brand: 'Nexa', category: 'SUV', variants: ['Sigma', 'Delta', 'Zeta', 'Alpha'], fuelTypes: ['Petrol', 'Hybrid'], productionYears: [2022, 2023, 2024] },
  { model: 'Jimny', brand: 'Nexa', category: 'SUV', variants: ['Zeta', 'Alpha'], fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
  { model: 'XL6', brand: 'Nexa', category: 'MPV', variants: ['Zeta', 'Alpha', 'Alpha+'], fuelTypes: ['Petrol'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Invicto', brand: 'Nexa', category: 'MPV', variants: ['Zeta+', 'Alpha+'], fuelTypes: ['Hybrid'], productionYears: [2023, 2024] },
  
  // Commercial
  { model: 'Super Carry', brand: 'Commercial', category: 'Light Commercial Vehicle', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Eeco Cargo', brand: 'Commercial', category: 'Van', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  
  // Discontinued but still serviced
  { model: 'Alto 800', brand: 'Arena', category: 'Hatchback', variants: [], fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
  { model: 'S-Cross', brand: 'Nexa', category: 'SUV', variants: [], fuelTypes: ['Petrol'], productionYears: [2017, 2018, 2019, 2020, 2021] },
];


export const serviceData: ServiceData = {
  '1st Free Service (1,000 km)': {
    parts: [{ name: 'Washer, drain plug', price: 50 }],
    labor: [{ name: 'General Inspection & Wash', charge: 0 }],
    recommendedLabor: [],
  },
  '2nd Free Service (5,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [{ name: 'General Inspection & Wash', charge: 0 }],
    recommendedLabor: [],
  },
  '3rd Free Service (10,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Coolant', price: 400 },
      { name: 'Air Filter', price: 300 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
        { name: 'General Inspection & Wash', charge: 0 },
        { name: 'Tire Rotation', charge: 0 }
    ],
    recommendedLabor: [],
  },
  'Paid Service (20,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 1500 },
    ],
    recommendedLabor: [
        { name: 'Wheel Alignment & Balancing', charge: 800 },
        { name: 'Interior Germ Kleen', charge: 700 }
    ]
  },
  'Paid Service (30,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
        { name: 'Standard Labor Charge', charge: 1600 },
    ],
    recommendedLabor: [
        { name: 'Tire Rotation', charge: 350 }
    ]
  },
  'Paid Service (40,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 1800 },
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
      { name: 'Injector Cleaning', charge: 900 }
    ],
  },
    'Paid Service (50,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [{ name: 'Standard Labor Charge', charge: 1700 }],
    recommendedLabor: [{ name: 'Tire Rotation', charge: 350 }],
  },
  'Paid Service (60,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Transmission Fluid', price: 1100 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [{ name: 'Standard Labor Charge', charge: 2000 }],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'AC Service', charge: 2500 }
    ],
  },
  'Paid Service (70,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [{ name: 'Standard Labor Charge', charge: 1800 }],
    recommendedLabor: [{ name: 'Tire Rotation', charge: 350 }],
  },
  'Paid Service (80,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Timing Belt', price: 2500 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 2200 },
      { name: 'Timing Belt Replacement Labor', charge: 1500 }
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
      { name: 'Suspension Check', charge: 750 }
    ],
  },
  'Paid Service (90,000 km)': {
    parts: [
        { "name": "Engine Oil", "price": 1200 },
        { "name": "Oil Filter", "price": 250 },
        { "name": "Air Filter", "price": 300 },
        { "name": "Washer, drain plug", "price": 50 }
    ],
    labor: [
        { "name": "Standard Labor Charge", "charge": 1900 }
    ],
    recommendedLabor: [
        { "name": "Tire Rotation", "charge": 350 }
    ]
  },
  'Paid Service (100,000 km)': {
    parts: [
        { "name": "Engine Oil", "price": 1200 },
        { "name": "Oil Filter", "price": 250 },
        { "name": "Air Filter", "price": 300 },
        { "name": "Cabin AC Filter", "price": 350 },
        { "name": "Brake Fluid", "price": 300 },
        { "name": "Coolant", "price": 400 },
        { "name": "Fuel Filter", "price": 600 },
        { "name": "Washer, drain plug", "price": 50 }
    ],
    labor: [
        { "name": "Standard Labor Charge", "charge": 2500 }
    ],
    recommendedLabor: [
        { "name": "Wheel Alignment & Balancing", "charge": 800 },
        { "name": "Injector Cleaning", "charge": 900 }
    ]
  },
  'Paid Service (120,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Transmission Fluid', price: 1100 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 2800 },
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
      { name: 'AC Service', charge: 2500 }
    ],
  },
  'Paid Service (140,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 2600 },
    ],
    recommendedLabor: [
        { name: 'Wheel Alignment & Balancing', charge: 800 }
    ]
  },
  'Paid Service (160,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Timing Belt', price: 2500 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 3000 },
      { name: 'Timing Belt Replacement Labor', charge: 1500 }
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
      { name: 'Suspension Overhaul', charge: 4500 }
    ],
  },
  'Paid Service (180,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Transmission Fluid', price: 1100 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 2900 },
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'AC Service', charge: 2500 }
    ],
  },
  'Paid Service (200,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Clutch Set', price: 4500 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 3500 },
      { name: 'Clutch Replacement Labor', charge: 2500 }
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
      { name: 'Injector Cleaning', charge: 900 }
    ],
  },
  'Paid Service (240,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Air Filter', price: 300 },
      { name: 'Cabin AC Filter', price: 350 },
      { name: 'Brake Fluid', price: 300 },
      { name: 'Coolant', price: 400 },
      { name: 'Spark Plugs', price: 800 },
      { name: 'Fuel Filter', price: 600 },
      { name: 'Timing Belt', price: 2500 },
      { name: 'Transmission Fluid', price: 1100 },
      { name: 'Water Pump', price: 1800 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [
      { name: 'Standard Labor Charge', charge: 4000 },
      { name: 'Timing Belt & Water Pump Replacement Labor', charge: 2000 }
    ],
    recommendedLabor: [
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Suspension Overhaul', charge: 4500 },
      { name: 'AC Service', charge: 2500 }
    ],
  }
};
