import { Vehicle, ServiceData } from './types';

export const vehicles: Vehicle[] = [
  { model: 'Swift', fuelTypes: ['Petrol', 'Diesel', 'CNG'] },
  { model: 'Baleno', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Dzire', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Brezza', fuelTypes: ['Petrol'] },
  { model: 'Ertiga', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Wagon R', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Alto K10', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Celerio', fuelTypes: ['Petrol'] },
  { model: 'S-Presso', fuelTypes: ['Petrol', 'CNG'] },
  { model: 'Ignis', fuelTypes: ['Petrol'] },
  { model: 'XL6', fuelTypes: ['Petrol'] },
  { model: 'Grand Vitara', fuelTypes: ['Petrol', 'Hybrid'] },
];

export const serviceData: ServiceData = {
  '1st Free Service (1,000 km)': {
    parts: [{ name: 'Washer, drain plug', price: 50 }],
    labor: [{ name: 'General Inspection & Wash', charge: 0 }],
  },
  '2nd Free Service (5,000 km)': {
    parts: [
      { name: 'Engine Oil', price: 1200 },
      { name: 'Oil Filter', price: 250 },
      { name: 'Washer, drain plug', price: 50 },
    ],
    labor: [{ name: 'General Inspection & Wash', charge: 0 }],
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
      { name: 'Wheel Alignment & Balancing', charge: 800 },
    ],
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
      { name: 'Wheel Alignment & Balancing', charge: 800 },
      { name: 'Throttle Body Cleaning', charge: 500 },
    ],
  },
};
