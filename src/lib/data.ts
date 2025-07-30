import { Vehicle, ServiceData } from './types';

export const vehicles: Vehicle[] = [
  { model: 'Swift', fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Baleno', fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Dzire', fuelTypes: ['Petrol', 'CNG'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Brezza', fuelTypes: ['Petrol'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'Ertiga', fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Wagon R', fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Alto K10', fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024] },
  { model: 'Alto 800', fuelTypes: ['Petrol', 'CNG'], productionYears: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
  { model: 'Celerio', fuelTypes: ['Petrol'], productionYears: [2021, 2022, 2023, 2024] },
  { model: 'S-Presso', fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Ignis', fuelTypes: ['Petrol'], productionYears: [2020, 2021, 2022, 2023, 2024] },
  { model: 'XL6', fuelTypes: ['Petrol'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Grand Vitara', fuelTypes: ['Petrol', 'Hybrid'], productionYears: [2022, 2023, 2024] },
  { model: 'Ciaz', fuelTypes: ['Petrol'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'S-Cross', fuelTypes: ['Petrol'], productionYears: [2017, 2018, 2019, 2020, 2021] },
  { model: 'Jimny', fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
  { model: 'Fronx', fuelTypes: ['Petrol'], productionYears: [2023, 2024] },
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
