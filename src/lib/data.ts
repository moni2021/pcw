import { Vehicle, ServiceData } from './types';

export const vehicles: Vehicle[] = [
  { model: 'Swift', fuelTypes: ['Petrol', 'Diesel', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Baleno', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Dzire', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Brezza', fuelTypes: ['Petrol'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Ertiga', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Wagon R', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Alto K10', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Celerio', fuelTypes: ['Petrol'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'S-Presso', fuelTypes: ['Petrol', 'CNG'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Ignis', fuelTypes: ['Petrol'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'XL6', fuelTypes: ['Petrol'], imageUrl: 'https://placehold.co/400x300.png' },
  { model: 'Grand Vitara', fuelTypes: ['Petrol', 'Hybrid'], imageUrl: 'https://placehold.co/400x300.png' },
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
