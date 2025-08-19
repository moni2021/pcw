
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
// Note: STRUT GREASING, HEADLAMP FOCUSSING, WHEEL ALIGNMENT are removed as requested.

const acGasTopUpLabor: Omit<CustomLabor, 'workshopId'>[] = vehicles.map(vehicle => ({
  name: 'AC GAS TOP-UP',
  model: vehicle.model,
  charge: 1600.00,
}));

const defaultCustomLabor: Omit<CustomLabor, 'workshopId'>[] = [
  // A/C Servicing
  { name: 'A/C SERVICING', model: 'Alto 800', charge: 1320 },
  { name: 'A/C SERVICING', model: 'Swift', charge: 1710 },
  { name: 'A/C SERVICING', model: 'Dzire', charge: 1710 },
  { name: 'A/C SERVICING', model: 'Alto K10', charge: 1320 },
  { name: 'A/C SERVICING', model: 'Ritz', charge: 1710 },
  { name: 'A/C SERVICING', model: 'Wagon R', charge: 1320 },
  { name: 'A/C SERVICING', model: 'Celerio', charge: 1320 },
    
  // Wheel Balancing - 4 Wheel
  { name: 'WHEEL BALANCING - 4 WHEEL', model: 'Wagon R', charge: 320 },
  { name: 'WHEEL BALANCING - 4 WHEEL', model: 'Ertiga', charge: 320 },
  { name: 'WHEEL BALANCING - 4 WHEEL', model: 'Ciaz', charge: 340 },
  { name: 'WHEEL BALANCING - 4 WHEEL', model: 'Swift', charge: 320 },
  { name: 'WHEEL BALANCING - 4 WHEEL', model: 'Dzire', charge: 320 },

  // Wheel Balancing - 5 Wheel
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Alto K10', charge: 350 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Baleno', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Swift', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'S-Presso', charge: 350 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Alto 800', charge: 350 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Ertiga', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Brezza', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Celerio', charge: 350 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Wagon R', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Ignis', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Super Carry', charge: 175 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Eeco', charge: 325 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Fronx', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Ritz', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Dzire', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'S-Cross', charge: 425 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'Grand Vitara', charge: 400 },
  { name: 'WHEEL BALANCING - 5 WHEEL', model: 'XL6', charge: 400 },
  
  // Other custom labors
  { name: 'BATTERY GROUND CABLE', model: 'Ertiga', charge: 312.7 },
  { name: 'BATTERY GROUND CABLE', model: 'Celerio', charge: 274.03 },
  { name: 'BATTERY GROUND CABLE', model: 'Wagon R', charge: 278.88 },
  { name: 'BATTERY GROUND CABLE', model: 'S-Presso', charge: 274.03 },
  { name: 'BATTERY GROUND CABLE', model: 'Swift', charge: 290.38 },
  { name: 'BATTERY GROUND CABLE', model: 'Dzire', charge: 348.45 },
  { name: 'BATTERY GROUND CABLE', model: 'Alto 800', charge: 109.61 },
  { name: 'BATTERY GROUND CABLE', model: 'Brezza', charge: 236 },
  { name: 'BATTERY GROUND CABLE', model: 'Eeco', charge: 103.96 },
  { name: 'BATTERY GROUND CABLE', model: 'Alto K10', charge: 274.03 },
  { name: 'BATTERY GROUND CABLE', model: 'Baleno', charge: 345 },
  { name: 'BATTERY GROUND CABLE', model: 'Fronx', charge: 300 },
  { name: 'FRONT STRUT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto K10', charge: 876.88 },
  { name: 'FRONT STRUT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ignis', charge: 929.2 },
  { name: 'FRONT STRUT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ertiga', charge: 1000.64 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Alto K10', charge: 438.44 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Swift', charge: 464.6 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Celerio', charge: 438.44 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Wagon R', charge: 383.64 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Dzire', charge: 464.6 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Alto 800', charge: 548.05 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Ciaz', charge: 500.32 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Ertiga', charge: 500.32 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE)', model: 'Baleno', charge: 460 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Wagon R', charge: 493.25 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ertiga', charge: 625.4 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto 800', charge: 164.42 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'S-Cross', charge: 625.4 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto K10', charge: 657.66 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Brezza', charge: 595.9 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Eeco', charge: 259.9 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Dzire', charge: 580.75 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Swift', charge: 580.75 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Baleno', charge: 575 },
  { name: 'FRONT SUSPENSION ARM (ONE SIDE) WITH OPPOSITE SIDE', model: 'Celerio', charge: 548.05 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Alto 800', charge: 274.03 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Swift', charge: 696.9 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Dzire', charge: 696.9 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Eeco', charge: 207.92 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Wagon R', charge: 274.03 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Baleno', charge: 805 },
  { name: 'FRONT STABILIZER BAR AND/OR FRONT STABILIZER BAR MOUNT', model: 'Alto K10', charge: 274.03 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Brezza', charge: 238.36 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ertiga', charge: 250.16 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Swift', charge: 232.3 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'S-Cross', charge: 250.16 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Dzire', charge: 232.3 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ignis', charge: 232.3 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ciaz', charge: 250.16 },
  { name: 'FRONT STABILIZER BAR JOINT (ONE SIDE) WITH OPPOSITE SIDE', model: 'Celerio', charge: 219.22 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Wagon R', charge: 657.66 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Alto 800', charge: 767.27 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Dzire', charge: 813.05 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Swift', charge: 813.05 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Celerio', charge: 767.27 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE)', model: 'Alto K10', charge: 767.27 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ertiga', charge: 1375.88 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE) WITH OPPOSITE SIDE', model: 'Wagon R', charge: 986.49 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto K10', charge: 1260.52 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto 800', charge: 1260.52 },
  { name: 'FRONT WHEEL BEARING (ONE SIDE) WITH OPPOSITE SIDE', model: 'Celerio', charge: 1205.71 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE)', model: 'Swift', charge: 406.53 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE)', model: 'Wagon R', charge: 328.83 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE)', model: 'Dzire', charge: 406.53 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE)', model: 'Ertiga', charge: 437.78 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE) WITH OPPOSITE SIDE', model: 'Wagon R', charge: 727.5 },
  { name: 'REAR SHOCK ABSORBER (ONE SIDE) WITH OPPOSITE SIDE', model: 'Dzire', charge: 696.9 },
  { name: 'REAR WHEEL BEARING (2WD  DRUM BRAKE  ONE SIDE)', model: 'Wagon R', charge: 383.64 },
  { name: 'REAR WHEEL BEARING (2WD  DRUM BRAKE  ONE SIDE)', model: 'Alto K10', charge: 328.83 },
  { name: 'REAR WHEEL BEARING (2WD  DRUM BRAKE  ONE SIDE)', model: 'Alto 800', charge: 328.83 },
  { name: 'REAR WHEEL BEARING (2WD  DRUM BRAKE  ONE SIDE)', model: 'Swift', charge: 987.28 },
  { name: 'REAR WHEEL BEARING (2WD  DRUM BRAKE  ONE SIDE) WITH OPPOSITE SIDE', model: 'Eeco', charge: 1299.5 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Brezza', charge: 649 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Wagon R', charge: 602.86 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Swift', charge: 638.83 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ertiga', charge: 687.94 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto 800', charge: 602.86 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Baleno', charge: 575 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Alto K10', charge: 602.86 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Dzire', charge: 638.83 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Super Carry', charge: 596.64 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'S-Presso', charge: 602.86 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'XL6', charge: 687.94 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Celerio', charge: 602.86 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Fronx', charge: 500 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Ignis', charge: 638.83 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Grand Vitara', charge: 531 },
  { name: 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE', model: 'Eeco', charge: 467.82 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Brezza', charge: 354 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Wagon R', charge: 328.83 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Alto 800', charge: 493.25 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Fronx', charge: 250 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Dzire', charge: 348.45 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Swift', charge: 348.45 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Ertiga', charge: 375.24 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'S-Presso', charge: 493.25 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Baleno', charge: 345 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Super Carry', charge: 325.44 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Celerio', charge: 328.83 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Alto K10', charge: 328.83 },
  { name: 'FRONT DISC BRAKE PAD (BOTH SIDES)', model: 'Eeco', charge: 415.84 },
  { name: 'STONE GUARD COATING', model: 'Ertiga', charge: 850 },
  { name: 'STONE GUARD COATING', model: 'Baleno', charge: 750 },
  { name: 'STONE GUARD COATING', model: 'Swift', charge: 750 },
  { name: 'STONE GUARD COATING', model: 'Brezza', charge: 850 },
  { name: 'STONE GUARD COATING', model: 'Wagon R', charge: 700 },
  { name: 'STONE GUARD COATING', model: 'S-Presso', charge: 650 },
  { name: 'STONE GUARD COATING', model: 'Alto 800', charge: 650 },
  { name: 'STONE GUARD COATING', model: 'Fronx', charge: 900 },
  { name: 'STONE GUARD COATING', model: 'Celerio', charge: 700 },
  { name: 'STONE GUARD COATING', model: 'Eeco', charge: 800 },
  { name: 'STONE GUARD COATING', model: 'Grand Vitara', charge: 900 },
  { name: 'STONE GUARD COATING', model: 'Ignis', charge: 700 },
  { name: 'STONE GUARD COATING', model: 'XL6', charge: 900 },
  { name: 'STONE GUARD COATING', model: 'Dzire', charge: 800 },
  { name: 'STONE GUARD COATING', model: 'Alto K10', charge: 700 },
  { name: 'SILENCER WELDING', model: 'Dzire', charge: 800 },
  { name: 'SILENCER WELDING', model: 'Fronx', charge: 900 },
  { name: 'SILENCER WELDING', model: 'Alto K10', charge: 700 },
  { name: 'SILENCER WELDING', model: 'Wagon R', charge: 700 },
  { name: 'EVAPORATOR CLEANING', model: 'Celerio', charge: 274.03 },
  { name: 'EVAPORATOR CLEANING', model: 'Dzire', charge: 290.38 },
  { name: 'EVAPORATOR CLEANING', model: 'Baleno', charge: 287.5 },
  { name: 'EVAPORATOR CLEANING', model: 'Alto 800', charge: 274.03 },
  { name: 'EVAPORATOR CLEANING', model: 'Brezza', charge: 295 },
  { name: 'EVAPORATOR CLEANING', model: 'Swift', charge: 290.38 },
  { name: 'EVAPORATOR CLEANING', model: 'Ertiga', charge: 312.7 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Ertiga', charge: 1000 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Fronx', charge: 450 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Eeco', charge: 416 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Super Carry', charge: 158.2 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Dzire', charge: 339 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Wagon R', charge: 254 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Swift', charge: 338 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'S-Presso', charge: 500 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Alto 800', charge: 450 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Brezza', charge: 380 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Ciaz', charge: 450 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Celerio', charge: 338 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Grand Vitara', charge: 315 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Alto K10', charge: 273 },
  { name: 'ALL ELECTRICALS CHECK-UP', model: 'Baleno', charge: 560 },
  ...acGasTopUpLabor
];

const customLaborData: CustomLabor[] = defaultCustomLabor.map(labor => ({ ...labor, workshopId: 'sow-bijoynagar' }));

export const workshopData = {
    pmsCharges,
    customLabor: customLaborData,
};
