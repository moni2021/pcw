export interface VehicleModel {
  name: string;
  fuels: string[];
}

export const vehicleModels: VehicleModel[] = [
  { name: 'Alto 800', fuels: ['Petrol', 'CNG'] },
  { name: 'Alto K10', fuels: ['Petrol', 'CNG'] },
  { name: 'Baleno', fuels: ['Petrol', 'CNG'] },
  { name: 'Brezza', fuels: ['Petrol', 'CNG'] },
  { name: 'Celerio', fuels: ['Petrol', 'CNG'] },
  { name: 'Ciaz', fuels: ['Petrol'] },
  { name: 'Dzire', fuels: ['Petrol', 'CNG'] },
  { name: 'Eeco', fuels: ['Petrol', 'CNG'] },
  { name: 'Ertiga', fuels: ['Petrol', 'CNG'] },
  { name: 'Fronx', fuels: ['Petrol'] },
  { name: 'Grand Vitara', fuels: ['Petrol'] },
  { name: 'Ignis', fuels: ['Petrol'] },
  { name: 'Invicto', fuels: ['Petrol'] },
  { name: 'Jimny', fuels: ['Petrol'] },
  { name: 'S-Presso', fuels: ['Petrol', 'CNG'] },
  { name: 'Swift', fuels: ['Petrol', 'CNG'] },
  { name: 'Wagon R', fuels: ['Petrol', 'CNG'] },
  { name: 'XL6', fuels: ['Petrol', 'CNG'] },
];

export const serviceTypes: string[] = [
  '1st Free Service (1,000 KM / 1 Month)',
  '2nd Free Service (5,000 KM / 6 Months)',
  '3rd Free Service (10,000 KM / 12 Months)',
  'Paid Service (20,000 KM / 24 Months)',
  'Paid Service (30,000 KM / 36 Months)',
  'Paid Service (40,000 KM / 48 Months)',
  'Paid Service (50,000 KM / 60 Months)',
];
