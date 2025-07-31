
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

const getPartsForService = (model: string, fuel: string, km: number) => {
    const isDiesel = fuel === 'DIESEL';
    const isPetrol = fuel === 'PETROL' || fuel === 'HYBRID';
    const isHybrid = fuel === 'HYBRID';

    const oil = isDiesel ? parts.engineOilDiesel : (model === 'Eeco' ? parts.engineOilEeco : parts.engineOilPetrol);
    const oilFilter = isDiesel ? parts.oilFilterDiesel : parts.oilFilter;
    const airFilter = isDiesel ? parts.airFilterDiesel : parts.airFilter;
    const fuelFilter = isDiesel ? parts.fuelFilterDiesel : parts.fuelFilterPetrol;
    
    let serviceParts = [];

    // Every 10,000 km
    if (km % 10000 === 0) {
        serviceParts.push(oil, oilFilter);
    }

    // Every 20,000 km
    if (km % 20000 === 0) {
        serviceParts.push(parts.cabinAcFilter, parts.brakeFluid);
        // Coolant logic based on model
        if (['Alto K10', 'Swift', 'Dzire', 'Baleno', 'Fronx', 'Ignis', 'Celerio', 'Wagon R', 'Eeco', 'S-Presso', 'Alto 800'].includes(model)) {
            serviceParts.push(parts.coolant);
        }
        // Jimny specific 20k services
        if (model === 'Jimny') {
             serviceParts.push(parts.transferCaseOil, parts.differentialOil);
        }
    }

    // Every 40,000 km
    if (km % 40000 === 0) {
        serviceParts.push(airFilter, parts.sparkPlugs, fuelFilter);
         if (isPetrol && !['Eeco', 'Jimny'].includes(model)) { // Manual Trans oil
             serviceParts.push(parts.gearOil);
         }
    }
    
    // Grand Vitara Strong Hybrid Specific
    if (isHybrid && model === 'Grand Vitara' && km % 80000 === 0) {
        serviceParts.push(parts.hybridTransaxleFluid);
    }
    
    // Eeco ACC Belt
    if (model === 'Eeco' && km % 80000 === 0) {
        serviceParts.push(parts.accBelt);
    }

    // Deduplicate parts
    const uniqueParts = Array.from(new Set(serviceParts));
    const partsNames = uniqueParts.map(p => p.name).join('\n');
    const partsAmounts = uniqueParts.map(p => p.price).join('\n');

    const consumables = km === 20000 || km === 40000 || km === 60000 || km === 80000 ? commonConsumablesAmountLarge : commonConsumablesAmount;

    return {
        parts: `${partsNames}\n${commonConsumables}`,
        amount: `${partsAmounts}\n${consumables}`
    };
};


let rawServiceData: any[] = [];
const servicesKm = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

vehicles.forEach(v => {
    v.fuelTypes.forEach(fuel => {
        if (fuel === 'Diesel') return; // Skip diesel for now as manual is for petrol

        servicesKm.forEach(km => {
            const serviceType = km === 10000 ? `3rd Free Service (${km.toLocaleString('en-IN')} km)` : `Paid Service (${km.toLocaleString('en-IN')} km)`;
            const { parts, amount } = getPartsForService(v.model, fuel.toUpperCase(), km);

            rawServiceData.push({
                "MODEL": v.model,
                "FUEL": fuel.toUpperCase(),
                "SERVICE TYPE": serviceType,
                "PARTS": parts,
                "AMOUNT": amount
            });
        });
    });
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
    const kmMatch = serviceType.match(/\((\d{1,3}(,\d{3})*|\d+)\s?km\)/);
    if (kmMatch) {
        const kmString = kmMatch[1].replace(/,/g, '');
        const km = parseInt(kmString, 10);
        if (km >= 1000) {
            const formattedKm = km.toLocaleString('en-IN');
            if (!serviceType.includes(formattedKm)) {
                 serviceType = serviceType.replace(kmMatch[1], formattedKm);
            }
        }
    }

    const standardServiceType = serviceTypeMapping[serviceType];
  
    if (!standardServiceType) return null;
  
    const partsNames = item.PARTS.split('\n').filter((p: string) => p.trim() !== '');
    const partsAmounts = item.AMOUNT.toString().split('\n').filter((p: string) => p.trim() !== '').map(Number);
    
    if (partsNames.length !== partsAmounts.length) {
      // Pad amounts with 0 if they are missing (e.g. for consumables)
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

    