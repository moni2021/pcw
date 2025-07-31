import { Vehicle, ServiceData, Service } from './types';

export const vehicles: Vehicle[] = [
  // Arena
  { model: 'Alto K10', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2022, 2023, 2024] },
  { model: 'S-Presso', brand: 'Arena', category: 'Hatchback', variants: ['STD (O)', 'LXI (O)', 'VXI (O)', 'VXI+ (O)'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Celerio', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol'], productionYears: [2021, 2022, 2023, 2024] },
  { model: 'Wagon R', brand: 'Arena', category: 'Hatchback', variants: ['LXi', 'VXi', 'ZXi', 'ZXi+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Swift', brand: 'Arena', category: 'Hatchback', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'Diesel', 'CNG'], productionYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { model: 'Dzire', brand: 'Arena', category: 'Sedan', variants: ['LXI', 'VXI', 'ZXI', 'ZXI+'], fuelTypes: ['Petrol', 'CNG'], productionYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
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

const rawServiceData = [
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 0, "TOTAL": 2536, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "FR3 OR 10 K KMS SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nFUEL FILTER\nAIR FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n1665\n295", "LABOUR": 2270, "TOTAL": 7756, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "20 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nAC FILTER\nGUSKET EGR", "AMOUNT": "1980\n385\n20\n51\n93\n7\n378\n45", "LABOUR": 3625, "TOTAL": 6584, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "30 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nAIR FILTER\nFUEL FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n310\n1665", "LABOUR": 2210, "TOTAL": 7711, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "40 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "50 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nACC BELT\nAC FILTER\nFUEL FILTER\nAIR FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n895\n378\n1665\n310", "LABOUR": 3625, "TOTAL": 10339, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "60 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "70 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nAIR FILTER\nFUEL FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n310\n1665", "LABOUR": 2270, "TOTAL": 7711, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "80 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nAC FILTER\n", "AMOUNT": "1980\n385\n20\n51\n93\n7\n378", "LABOUR": 3625, "TOTAL": 6539, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "90 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nAIR FILTER\nFUEL FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n378\n550\n310\n1665", "LABOUR": 2270, "TOTAL": 7769, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "100 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "110 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nACC BELT\nAC FILTER\nFUEL FILTER\nAIR FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n895\n378\n1665\n310", "LABOUR": 3625, "TOTAL": 10339, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "120 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "130 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "140 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "150 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nAIR FILTER\nFUEL FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n310\n1665", "LABOUR": 2270, "TOTAL": 7711, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "160 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "170 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nAC FILTER", "AMOUNT": "1980\n385\n20\n51\n93\n7\n378", "LABOUR": 3625, "TOTAL": 6539, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "180 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "190 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nAIR FILTER\nFUEL FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n378\n550\n310\n1665", "LABOUR": 2270, "TOTAL": 7769, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "200 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "210 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "220 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER", "AMOUNT": "1980\n385\n20\n51\n93\n7", "LABOUR": 2270, "TOTAL": 4806, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "230 K SERVICE" },
    { "PARTS": "ENGINE OIL\nOIL FILTER\nDISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER\nBRAKE OIL\nCOOLANT\nACC BELT\nAC FILTER\nFUEL FILTER\nAIR FILTER", "AMOUNT": "1980\n385\n80\n51\n93\n7\n380\n550\n895\n378\n1665\n310", "LABOUR": 3625, "TOTAL": 10339, "MODEL": "BALENO", "FUEL": "DIESEL", "SERVICE TYPE": "240 K SERVICE" },
];

const serviceTypeMapping: { [key: string]: string } = {
  "FR3 OR 10 K KMS SERVICE": "3rd Free Service (10,000 km)",
  "20 K SERVICE": "Paid Service (20,000 km)",
  "30 K SERVICE": "Paid Service (30,000 km)",
  "40 K SERVICE": "Paid Service (40,000 km)",
  "50 K SERVICE": "Paid Service (50,000 km)",
  "60 K SERVICE": "Paid Service (60,000 km)",
  "70 K SERVICE": "Paid Service (70,000 km)",
  "80 K SERVICE": "Paid Service (80,000 km)",
  "90 K SERVICE": "Paid Service (90,000 km)",
  "100 K SERVICE": "Paid Service (100,000 km)",
  "110 K SERVICE": "Paid Service (110,000 km)",
  "120 K SERVICE": "Paid Service (120,000 km)",
  "130 K SERVICE": "Paid Service (130,000 km)",
  "140 K SERVICE": "Paid Service (140,000 km)",
  "150 K SERVICE": "Paid Service (150,000 km)",
  "160 K SERVICE": "Paid Service (160,000 km)",
  "170 K SERVICE": "Paid Service (170,000 km)",
  "180 K SERVICE": "Paid Service (180,000 km)",
  "190 K SERVICE": "Paid Service (190,000 km)",
  "200 K SERVICE": "Paid Service (200,000 km)",
  "210 K SERVICE": "Paid Service (210,000 km)",
  "220 K SERVICE": "Paid Service (220,000 km)",
  "230 K SERVICE": "Paid Service (230,000 km)",
  "240 K SERVICE": "Paid Service (240,000 km)",
};

const processedServiceData = rawServiceData.flatMap(item => {
    const modelName = item.MODEL.replace(/\(OLD\)/i, '').trim().toUpperCase();

    const standardServiceType = serviceTypeMapping[item['SERVICE TYPE']];
    if (!standardServiceType) return null;

    const partsNames = item.PARTS.split('\n').filter(p => p.trim() !== '');
    const partsAmounts = item.AMOUNT.split('\n').filter(p => p.trim() !== '').map(Number);
    
    const minLength = Math.min(partsNames.length, partsAmounts.length);

    const parts = partsNames.slice(0, minLength).map((name, index) => ({
        name: name.trim(),
        price: partsAmounts[index] || 0,
    }));
    
    return {
        key: `${standardServiceType}-${modelName}-${item.FUEL.toUpperCase()}`,
        data: {
            parts: parts,
            labor: [],
        } as Service
    };
}).filter((item): item is NonNullable<typeof item> => item !== null);


export const serviceDataLookup = processedServiceData.reduce((acc, item) => {
    if (item) {
        acc[item.key] = item.data;
    }
    return acc;
}, {} as { [key: string]: Service });


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
};

const allServiceTypes = new Set(Object.values(serviceTypeMapping));
allServiceTypes.forEach(type => {
    if (!serviceData[type]) {
        serviceData[type] = { parts: [], labor: [] };
    }
});
