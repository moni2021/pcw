
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

const commonConsumables = "DISTILLED WATER\nSHAMPOO\nDRAIN NUT\nWASHER";
const commonConsumablesAmount = "20\n54\n80\n7";
const commonConsumablesAmountLarge = "80\n54\n80\n7";

const parts = {
    engineOilPetrol: { name: "ENGINE OIL", price: 1350 },
    engineOilDiesel: { name: "ENGINE OIL", price: 2100 },
    engineOilEeco: { name: "ENGINE OIL", price: 1807 },
    oilFilter: { name: "OIL FILTER", price: 95 },
    oilFilterDiesel: { name: "OIL FILTER", price: 450 },
    airFilter: { name: "AIR FILTER", price: 280 },
    airFilterDiesel: { name: "AIR FILTER", price: 480 },
    cabinAcFilter: { name: "CABIN AC FILTER", price: 350 },
    brakeFluid: { name: "BRAKE FLUID", price: 380 },
    coolant: { name: "COOLANT", price: 280 },
    sparkPlugs: { name: "SPARK-PLUGS", price: 820 },
    fuelFilterPetrol: { name: "FUEL-FILTER", price: 325 },
    fuelFilterDiesel: { name: "FUEL-FILTER", price: 1650 },
    gearOil: { name: "GEAR OIL", price: 1000 },
    accBelt: { name: "ACC BELT", price: 310 }
};

const getPartsString = (partKeys: (keyof typeof parts)[]) => partKeys.map(k => parts[k].name).join('\n');
const getAmountString = (partKeys: (keyof typeof parts)[]) => partKeys.map(k => parts[k].price).join('\n');

const generateServiceData = (model: string, fuel: string) => {
    const isDiesel = fuel === 'DIESEL';
    const isPetrol = fuel === 'PETROL';

    const oil = isDiesel ? parts.engineOilDiesel : (model === 'Eeco' ? parts.engineOilEeco : parts.engineOilPetrol);
    const oilFilter = isDiesel ? parts.oilFilterDiesel : parts.oilFilter;
    const airFilter = isDiesel ? parts.airFilterDiesel : parts.airFilter;
    const fuelFilter = isDiesel ? parts.fuelFilterDiesel : parts.fuelFilterPetrol;

    const data: any[] = [];

    // 10,000 km
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "3rd Free Service (10,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${commonConsumablesAmount}`});

    // 20,000 km
    let parts20k = [oil.name, oilFilter.name, parts.cabinAcFilter.name, parts.brakeFluid.name, parts.coolant.name, commonConsumables];
    let amount20k = [oil.price, oilFilter.price, parts.cabinAcFilter.price, parts.brakeFluid.price, parts.coolant.price, commonConsumablesAmountLarge];
    if (isDiesel) {
        parts20k.push(airFilter.name);
        amount20k.push(airFilter.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (20,000 km)", "PARTS": parts20k.join('\n'), "AMOUNT": amount20k.join('\n')});

    // 30,000 km
    let parts30k = [oil.name, oilFilter.name, commonConsumables];
    let amount30k = [oil.price, oilFilter.price, commonConsumablesAmount];
     if (isDiesel) {
        parts30k.push(fuelFilter.name);
        amount30k.push(fuelFilter.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (30,000 km)", "PARTS": parts30k.join('\n'), "AMOUNT": amount30k.join('\n')});

    // 40,000 km
    let parts40k = [oil.name, oilFilter.name, airFilter.name, parts.cabinAcFilter.name, parts.brakeFluid.name, parts.coolant.name, commonConsumables];
    let amount40k = [oil.price, oilFilter.price, airFilter.price, parts.cabinAcFilter.price, parts.brakeFluid.price, parts.coolant.price, commonConsumablesAmountLarge];
    if (isPetrol) {
        parts40k.push(parts.sparkPlugs.name, fuelFilter.name, parts.gearOil.name);
        amount40k.push(parts.sparkPlugs.price, fuelFilter.price, parts.gearOil.price);
    }
     data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (40,000 km)", "PARTS": parts40k.join('\n'), "AMOUNT": amount40k.join('\n')});

    return data;
}

const petrolModels = ["Alto K10", "S-Presso", "Wagon R", "Celerio", "Swift", "Dzire", "Baleno", "Ignis", "Fronx", "Brezza", "Ertiga", "XL6", "Ciaz", "Grand Vitara", "Jimny", "Ritz", "Alto 800"];
const dieselModels = ["Swift", "Dzire", "Baleno", "Brezza", "Ertiga", "S-Cross", "Ciaz", "Ritz"];

let rawServiceData: any[] = [];
petrolModels.forEach(model => rawServiceData.push(...generateServiceData(model, 'PETROL')));
dieselModels.forEach(model => rawServiceData.push(...generateServiceData(model, 'DIESEL')));

// Eeco specific
rawServiceData.push(...generateServiceData('Eeco', 'PETROL'));
rawServiceData.push({ "MODEL": "Eeco", "FUEL": "PETROL", "SERVICE TYPE": "Paid Service (80,000 km)", "PARTS": `${parts.engineOilEeco.name}\n${parts.oilFilter.name}\n${parts.coolant.name}\n${parts.brakeFluid.name}\n${parts.sparkPlugs.name}\n${parts.airFilter.name}\n${parts.fuelFilterPetrol.name}\n${parts.accBelt.name}\n${commonConsumables}`, "AMOUNT": `${parts.engineOilEeco.price}\n${parts.oilFilter.price}\n${parts.coolant.price}\n${parts.brakeFluid.price}\n${parts.sparkPlugs.price}\n${parts.airFilter.price}\n${parts.fuelFilterPetrol.price}\n${parts.accBelt.price}\n${commonConsumablesAmountLarge}` });


// Grand Vitara Hybrid
rawServiceData.push({ "MODEL": "Grand Vitara", "FUEL": "HYBRID", "SERVICE TYPE": "3rd Free Service (10,000 km)", "PARTS": `${parts.engineOilPetrol.name}\n${parts.oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${parts.engineOilPetrol.price}\n${parts.oilFilter.price}\n${commonConsumablesAmount}`});
rawServiceData.push({ "MODEL": "Grand Vitara", "FUEL": "HYBRID", "SERVICE TYPE": "Paid Service (20,000 km)", "PARTS": `${parts.engineOilPetrol.name}\n${parts.oilFilter.name}\n${parts.cabinAcFilter.name}\n${parts.brakeFluid.name}\n${parts.coolant.name}\n${commonConsumables}`, "AMOUNT": `${parts.engineOilPetrol.price}\n${parts.oilFilter.price}\n${parts.cabinAcFilter.price}\n${parts.brakeFluid.price}\n${parts.coolant.price}\n${commonConsumablesAmountLarge}`});
rawServiceData.push({ "MODEL": "Grand Vitara", "FUEL": "HYBRID", "SERVICE TYPE": "Paid Service (40,000 km)", "PARTS": `${parts.engineOilPetrol.name}\n${parts.oilFilter.name}\n${parts.airFilter.name}\n${parts.cabinAcFilter.name}\n${parts.brakeFluid.name}\n${parts.coolant.name}\n${parts.sparkPlugs.name}\n${parts.fuelFilterPetrol.name}\n${commonConsumables}`, "AMOUNT": `${parts.engineOilPetrol.price}\n${parts.oilFilter.price}\n${parts.airFilter.price}\n${parts.cabinAcFilter.price}\n${parts.brakeFluid.price}\n${parts.coolant.price}\n${parts.sparkPlugs.price}\n${parts.fuelFilterPetrol.price}\n${commonConsumablesAmountLarge}`});
  
  const serviceTypeMapping: { [key: string]: string } = {
    "3rd Free Service (10,000 km)": "3rd Free Service (10,000 km)",
    "Paid Service (20,000 km)": "Paid Service (20,000 km)",
    "Paid Service (30,000 km)": "Paid Service (30,000 km)",
    "Paid Service (40,000 km)": "Paid Service (40,000 km)",
    "Paid Service (50,000 km)": "Paid Service (50,000 km)",
    "Paid Service (60,000 km)": "Paid Service (60,000 km)",
    "Paid Service (70,000 km)": "Paid Service (70,000 km)",
    "Paid Service (80,000 km)": "Paid Service (80,000 km)",
    "Paid Service (90,000 km)": "Paid Service (90,000 km)",
    "Paid Service (100,000 km)": "Paid Service (100,000 km)",
  };

  const modelNameMapping: { [key: string]: string } = {
    'Eeco': 'Eeco',
    'Eeco Cargo': 'Eeco Cargo',
    'Wagon R': 'Wagon R',
    'Celerio': 'Celerio',
    'Swift': 'Swift',
    'Baleno': 'Baleno',
    'Brezza': 'Brezza',
    'Alto K10': 'Alto K10',
    'Alto 800': 'Alto 800',
    'Dzire': 'Dzire',
    'Ertiga': 'Ertiga',
    'S-Presso': 'S-Presso',
    'Ignis': 'Ignis',
    'Ciaz': 'Ciaz',
    'Fronx': 'Fronx',
    'Grand Vitara': 'Grand Vitara',
    'S-Cross': 'S-Cross',
    'Jimny': 'Jimny',
    'XL6': 'XL6',
    'Ritz': 'Ritz',
  };
  
  const getStandardModelName = (name: string): string => {
    return modelNameMapping[name] || name;
  };
    
  const processedServiceData = rawServiceData.flatMap(item => {
    const modelName = getStandardModelName(item.MODEL);
    const standardServiceType = serviceTypeMapping[item['SERVICE TYPE']];
  
    if (!standardServiceType) return null;
  
    const partsNames = item.PARTS.split('\n').filter((p: string) => p.trim() !== '');
    const partsAmounts = item.AMOUNT.toString().split('\n').filter((p: string) => p.trim() !== '').map(Number);
    
    if (partsNames.length !== partsAmounts.length) {
      while (partsNames.length > partsAmounts.length) {
        partsAmounts.push(0);
      }
    }
  
    const parts = partsNames.map((name: string, index: number) => ({
        name: name.trim(),
        price: partsAmounts[index] || 0,
    }));
  
    const key = `${standardServiceType}-${modelName.toUpperCase()}-${item.FUEL.toUpperCase()}`;
    
    if (modelName === 'Eeco') {
        const keyCargo = `${standardServiceType}-EECO CARGO-${item.FUEL.toUpperCase()}`;
        return [
            { key: key, data: { parts: parts, labor: [] } as Service },
            { key: keyCargo, data: { parts: parts, labor: [] } as Service }
        ];
    }

    return {
      key: key,
      data: {
        parts: parts,
        labor: [],
      } as Service
    };
  }).flat().filter((item): item is NonNullable<typeof item> => item !== null);
  
  
  export const serviceDataLookup = processedServiceData.reduce((acc, item) => {
      if (item) {
          if (!acc[item.key]) {
             acc[item.key] = { parts: [], labor: [] };
          }
          acc[item.key].parts.push(...item.data.parts);
      }
      return acc;
  }, {} as { [key: string]: Service });
  
  
  export const serviceData: ServiceData = {
    '1st Free Service (1,000 km)': {
      parts: [],
      labor: [{ name: 'General Inspection & Wash', charge: 0 }],
    },
    '2nd Free Service (5,000 km)': {
      parts: [],
      labor: [{ name: 'General Inspection & Wash', charge: 0 }],
    },
  };
  
  const allServiceTypes = new Set(Object.values(serviceTypeMapping));
  allServiceTypes.forEach(type => {
      if (!serviceData[type]) {
          serviceData[type] = { parts: [], labor: [] };
      }
  });

    

    