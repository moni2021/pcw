
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
    accBelt: { name: "ACC BELT", price: 310 },
    differentialOil: { name: 'DIFFERENTIAL OIL', price: 600 },
    transferCaseOil: { name: 'TRANSFER CASE OIL', price: 750 },
    hybridTransaxleFluid: { name: 'HYBRID TRANSAXLE FLUID', price: 2500 }
};

const getPartsString = (partKeys: (keyof typeof parts)[]) => partKeys.map(k => parts[k].name).join('\n');
const getAmountString = (partKeys: (keyof typeof parts)[]) => partKeys.map(k => parts[k].price).join('\n');

const generateServiceData = (model: string, fuel: string, options: { hasCNG?: boolean } = {}) => {
    const isDiesel = fuel === 'DIESEL';
    const isPetrol = fuel === 'PETROL' || fuel === 'HYBRID';
    const isHybrid = fuel === 'HYBRID';
    const isJimny = model === 'Jimny';

    const oil = isDiesel ? parts.engineOilDiesel : (model === 'Eeco' ? parts.engineOilEeco : parts.engineOilPetrol);
    const oilFilter = isDiesel ? parts.oilFilterDiesel : parts.oilFilter;
    const airFilter = isDiesel ? parts.airFilterDiesel : parts.airFilter;
    const fuelFilter = isDiesel ? parts.fuelFilterDiesel : parts.fuelFilterPetrol;

    const data: any[] = [];

    // 10,000 km / 1 year (3rd Free Service)
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "3rd Free Service (10,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${commonConsumablesAmount}`});

    // 20,000 km / 2 years
    let parts20k = [oil.name, oilFilter.name, parts.cabinAcFilter.name, parts.brakeFluid.name, parts.coolant.name];
    let amount20k = [oil.price, oilFilter.price, parts.cabinAcFilter.price, parts.brakeFluid.price, parts.coolant.price];
    if (isDiesel) {
        parts20k.push(airFilter.name);
        amount20k.push(airFilter.price);
    }
    if (isJimny) {
        parts20k.push(parts.transferCaseOil.name, parts.differentialOil.name);
        amount20k.push(parts.transferCaseOil.price, parts.differentialOil.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (20,000 km)", "PARTS": `${parts20k.join('\n')}\n${commonConsumables}`, "AMOUNT": `${amount20k.join('\n')}\n${commonConsumablesAmountLarge}`});
    
    // 30,000 km / 3 years
    let parts30k = [oil.name, oilFilter.name];
    let amount30k = [oil.price, oilFilter.price];
    if (isDiesel) {
        parts30k.push(fuelFilter.name);
        amount30k.push(fuelFilter.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (30,000 km)", "PARTS": `${parts30k.join('\n')}\n${commonConsumables}`, "AMOUNT": `${amount30k.join('\n')}\n${commonConsumablesAmount}`});

    // 40,000 km / 4 years
    let parts40k = [oil.name, oilFilter.name, airFilter.name, parts.cabinAcFilter.name, parts.brakeFluid.name, parts.coolant.name, parts.sparkPlugs.name];
    let amount40k = [oil.price, oilFilter.price, airFilter.price, parts.cabinAcFilter.price, parts.brakeFluid.price, parts.coolant.price, parts.sparkPlugs.price];
     if (isPetrol) {
        parts40k.push(fuelFilter.name);
        amount40k.push(fuelFilter.price);
    }
    if (model !== 'Eeco' && isPetrol) {
        parts40k.push(parts.gearOil.name);
        amount40k.push(parts.gearOil.price);
    }
    if (isJimny) {
        parts40k.push(parts.transferCaseOil.name, parts.differentialOil.name);
        amount40k.push(parts.transferCaseOil.price, parts.differentialOil.price);
    }
     data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (40,000 km)", "PARTS": `${parts40k.join('\n')}\n${commonConsumables}`, "AMOUNT": `${amount40k.join('\n')}\n${commonConsumablesAmountLarge}`});
    
    // 50,000 km / 5 years
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (50,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${commonConsumablesAmount}`});

    // 60,000 km / 6 years
    let parts60k = [oil.name, oilFilter.name, parts.cabinAcFilter.name, parts.brakeFluid.name, parts.coolant.name];
    let amount60k = [oil.price, oilFilter.price, parts.cabinAcFilter.price, parts.brakeFluid.price, parts.coolant.price];
    if (isDiesel) {
        parts60k.push(airFilter.name, fuelFilter.name);
        amount60k.push(airFilter.price, fuelFilter.price);
    }
    if (isJimny) {
        parts60k.push(parts.transferCaseOil.name, parts.differentialOil.name);
        amount60k.push(parts.transferCaseOil.price, parts.differentialOil.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (60,000 km)", "PARTS": `${parts60k.join('\n')}\n${commonConsumables}`, "AMOUNT": `${amount60k.join('\n')}\n${commonConsumablesAmountLarge}`});
    
    // 80,000 km / 8 years
    let parts80k = [...parts40k]; // Starts with 40k parts
    let amount80k = [...amount40k];
    if (model === 'Eeco') {
        parts80k.push(parts.accBelt.name);
        amount80k.push(parts.accBelt.price);
    }
    if (isHybrid) {
        parts80k.push(parts.hybridTransaxleFluid.name);
        amount80k.push(parts.hybridTransaxleFluid.price);
    }
    data.push({ "MODEL": model, "FUEL": fuel, "SERVICE TYPE": "Paid Service (80,000 km)", "PARTS": `${parts80k.join('\n')}\n${commonConsumables}`, "AMOUNT": `${amount80k.join('\n')}\n${commonConsumablesAmountLarge}`});
    
    if (options.hasCNG) {
        const cngFuel = "CNG";
        data.push({ "MODEL": model, "FUEL": cngFuel, "SERVICE TYPE": "3rd Free Service (10,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${commonConsumablesAmount}`});
        data.push({ "MODEL": model, "FUEL": cngFuel, "SERVICE TYPE": "Paid Service (20,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${parts.cabinAcFilter.name}\n${parts.brakeFluid.name}\n${parts.coolant.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${parts.cabinAcFilter.price}\n${parts.brakeFluid.price}\n${parts.coolant.price}\n${commonConsumablesAmountLarge}`});
        data.push({ "MODEL": model, "FUEL": cngFuel, "SERVICE TYPE": "Paid Service (30,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${commonConsumablesAmount}`});
        data.push({ "MODEL": model, "FUEL": cngFuel, "SERVICE TYPE": "Paid Service (40,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${airFilter.name}\n${parts.cabinAcFilter.name}\n${parts.brakeFluid.name}\n${parts.coolant.name}\n${parts.sparkPlugs.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${airFilter.price}\n${parts.cabinAcFilter.price}\n${parts.brakeFluid.price}\n${parts.coolant.price}\n${parts.sparkPlugs.price}\n${commonConsumablesAmountLarge}`});
        data.push({ "MODEL": model, "FUEL": cngFuel, "SERVICE TYPE": "Paid Service (60,000 km)", "PARTS": `${oil.name}\n${oilFilter.name}\n${parts.cabinAcFilter.name}\n${parts.brakeFluid.name}\n${parts.coolant.name}\n${commonConsumables}`, "AMOUNT": `${oil.price}\n${oilFilter.price}\n${parts.cabinAcFilter.price}\n${parts.brakeFluid.price}\n${parts.coolant.price}\n${commonConsumablesAmountLarge}`});
    }

    return data;
}

let rawServiceData: any[] = [];

// Generate data for each model based on the provided service manual info
vehicles.forEach(v => {
    if (v.fuelTypes.includes('Petrol')) {
        rawServiceData.push(...generateServiceData(v.model, 'PETROL', { hasCNG: v.fuelTypes.includes('CNG') }));
    }
    if (v.fuelTypes.includes('Diesel')) {
        rawServiceData.push(...generateServiceData(v.model, 'DIESEL'));
    }
    if (v.fuelTypes.includes('Hybrid')) {
        rawServiceData.push(...generateServiceData(v.model, 'HYBRID'));
    }
});
  
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
    
    // Standardize service type string to include comma
    let serviceType = item['SERVICE TYPE'];
    const kmMatch = serviceType.match(/\((\d+)\s?km\)/);
    if (kmMatch) {
        const km = parseInt(kmMatch[1], 10);
        if (km >= 1000) {
            serviceType = serviceType.replace(km.toString(), km.toLocaleString('en-IN'));
        }
    }

    const standardServiceType = serviceTypeMapping[serviceType];
  
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
