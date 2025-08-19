
import type { CustomLabor, PmsCharge } from './types';
import { vehicles } from './data';

// --- PMS CHARGES for sow-bijoynagar ---
const defaultPmsCharges: Omit<PmsCharge, 'workshopId' | 'labourCode'>[] = [
  // PMS-1P 30K/50K/70K/90K/100K/110K
  ...["SWIFT NEW / DZIRE NEW PETROL", "NEW SWIFT PETROL", "New Dzire Petrol", "IGNIS-PETROL"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1410 }))
  ),
  ...["M 800"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1080 }))
  ),
   ...["Jimny 5 Door Domestic P74", "NEW BREZZA"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1530 }))
  ),
  ...["ALTO 800", "NEW WAGON R 1L PETROL", "ALTO K10C", "WAGON R", "CELERIO", "S-PRESSO", "ALTO", "ALTO K10", "WAGON-R NEW", "NEW WAGON R 1.2L PETROL"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1335 }))
  ),
  ...["ZEN ESTILO"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1215 }))
  ),
  ...["MARUTI BALENO PETROL", "Baleno RS"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1400 }))
  ),
  ...["NEW ERTIGA PETROL", "ERTIGA PETROL"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1605 }))
  ),
  ...["OMNI", "MARUTI EECO PETROL"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1180 }))
  ),

  // PMS-2P 20K/40K/60K/80K
  ...["NEW WAGON R 1.2L PETROL", "NEW CELERIO 2021", "ALTO K10", "ALTO K10C", "NEW WAGON R 1L PETROL", "ALTO", "ALTO 800", "WAGON-R NEW", "S-PRESSO"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1435 }))
  ),
  ...["NEW BREZZA"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1630 }))
  ),
  ...["NEW ERTIGA PETROL", "ERTIGA PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1675 }))
  ),
  ...["OMNI"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1295 }))
  ),
  ...["M 800"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1160 }))
  ),
  ...["NEW CIAZ PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1590 }))
  ),
  ...["SWIFT NEW / DZIRE NEW PETROL", "New Dzire Petrol", "NEW SWIFT PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1490 }))
  ),
  ...["MARUTI BALENO PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1475 }))
  ),

  // PMS-2D 30K/60K/90K
  ...["DZIRE TOUR DIESEL"].flatMap(model =>
    ["Paid Service (30,000 km)", "Paid Service (60,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1850 }))
  ),

  // PMS 20/30/40/60/80/90
  ...["NEW BALENO", "MARUTI BALENO PETROL", "Fronx Domestic P74"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1500 }))
  ),
  ...["EECO K12N 2022"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1320 }))
  ),
  ...["NEW BREZZA"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1655 }))
  ),
  ...["NEW CELERIO 2021", "ALTO K10C", "NEW WAGON R 1.2L PETROL", "NEW WAGON R 1L PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1460 }))
  ),
  ...["IGNIS-PETROL", "New Dzire Petrol"].flatMap(model =>
    ["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1515 }))
  ),
  
  // PMS 50/70/100
  ...["NEW WAGON R 1.2L PETROL", "NEW WAGON R 1L PETROL", "ALTO K10C"].flatMap(model =>
    ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1480 }))
  ),
  ...["NEW SWIFT PETROL"].flatMap(model =>
    ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1535 }))
  ),
  ...["VITARA BREZZA K15B BS-VI", "NEW BREZZA"].flatMap(model =>
    ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1675 }))
  ),
  ...["MARUTI BALENO PETROL"].flatMap(model =>
    ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1520 }))
  ),
  ...["MARUTI EECO PETROL"].flatMap(model =>
    ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1340 }))
  ),
  
  // PMS - 1P 20K
  ...["NEW SWIFT PETROL", "IGNIS-PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1440 }))
  ),
  ...["ALTO K10C", "NEW WAGON R 1L PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1385 }))
  ),
  ...["NEW ERTIGA PETROL"].flatMap(model =>
    ["Paid Service (20,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1645 }))
  ),
  ...["Fronx Domestic P74"].flatMap(model =>
    ["Paid Service (20,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1430 }))
  ),
  ...["EECO K12N 2022"].flatMap(model =>
    ["Paid Service (20,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1255 }))
  ),
  
  // PMS - 2P 30K
  ...["Jimny 5 Door Domestic P74", "Fronx Turbo Smart Hybrid Domestic P74"].flatMap(model =>
    ["Paid Service (30,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1455 }))
  ),
  ...["NEW SWIFT PETROL", "EPIC NEW SWIFT"].flatMap(model =>
    ["Paid Service (30,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1465 }))
  ),
  ...["ALTO K10C", "ALTO 800"].flatMap(model =>
    ["Paid Service (30,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1410 }))
  ),
  ...["NEW ERTIGA PETROL"].flatMap(model =>
    ["Paid Service (30,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1660 }))
  ),
  ...["EECO K12N 2022"].flatMap(model =>
    ["Paid Service (30,000 km)"].map(desc => ({ model, labourDesc: desc, basicAmt: 1275 }))
  ),
];


const pmsCharges: PmsCharge[] = defaultPmsCharges.map((charge, index) => ({
    ...charge,
    workshopId: 'sow-bijoynagar',
    labourCode: `SOW-PMS-${index + 1}`
}));


// --- CUSTOM LABOR for sow-bijoynagar ---

const acGasTopUpLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.map(vehicle => ({
  name: 'AC GAS TOP-UP',
  model: vehicle.model,
  charge: 1600.00,
}));

const batteryCheckLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.map(vehicle => ({
  name: 'BATTERY CHECK',
  model: vehicle.model,
  charge: 250.00,
}));

const acDisinfectantLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.map(vehicle => ({
  name: 'AC DISINFECTANT',
  model: vehicle.model,
  charge: 650.00,
}));


const defaultCustomLabor: Omit<CustomLabor, 'workshopId'>[] = [
  ...acGasTopUpLabor,
  ...batteryCheckLabor,
  ...acDisinfectantLabor,
];

const customLaborData: CustomLabor[] = defaultCustomLabor.map(labor => ({ ...labor, workshopId: 'sow-bijoynagar' }));

export const workshopData = {
    pmsCharges,
    customLabor: customLaborData,
};
