
import type { PmsCharge } from '../../../types';
import { vehicles } from '@/lib/data';

const workshopId = 'sow-azara';

const baseCharges: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
  // --- 1st Paid Service Group (30k, 50k, 70k, 90k, 100k, 110k) ---
  ...["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].flatMap(service => [
    { model: "Wagon R", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 },
    { model: "Swift", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1410 },
    { model: "Dzire", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1410 },
    { model: "Alto 800", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1080 }, // M 800 mapped to Alto 800
    { model: "Ignis", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1410 },
    { model: "Jimny", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1530 },
    { model: "Alto K10", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 }, // ALTO mapped to Alto K10
    { model: "Alto 800", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 },
    { model: "Ritz", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1215 }, // ZEN ESTILO mapped to Ritz
    { model: "Alto K10", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 },
    { model: "Baleno", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1400 },
    { model: "Eeco", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1180 }, // OMNI mapped to EECO
    { model: "Eeco Cargo", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1180 }, // OMNI mapped to EECO
    { model: "Baleno", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1400 }, // Baleno RS mapped to Baleno
    { model: "Alto K10", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 }, // ALTO K10C mapped to Alto K10
    { model: "Ertiga", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1605 },
    { model: "Celerio", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 },
    { model: "S-Presso", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1335 },
    { model: "Brezza", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1530 },
    { model: "Eeco", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1180 },
    { model: "Eeco Cargo", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1180 },
  ]),
  // --- 2nd Paid Service Group (20k, 40k, 60k, 80k) ---
  ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (120,000 km)", "Paid Service (140,000 km)", "Paid Service (160,000 km)", "Paid Service (180,000 km)", "Paid Service (200,000 km)", "Paid Service (220,000 km)"].flatMap(service => [
    { model: "Wagon R", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 },
    { model: "Celerio", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 },
    { model: "Brezza", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1630 },
    { model: "Baleno", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1475 },
    { model: "Swift", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1490 },
    { model: "Dzire", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1490 },
    { model: "Alto 800", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 },
    { model: "Alto K10", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 },
    { model: "Ertiga", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1675 },
    { model: "Eeco", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1295 }, // OMNI mapped to EECO
    { model: "Eeco Cargo", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1295 }, // OMNI mapped to EECO
    { model: "Alto K10", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 }, // ALTO K10C mapped to Alto K10
    { model: "Alto K10", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 }, // ALTO mapped to Alto K10
    { model: "Alto 800", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1160 }, // M 800 mapped to Alto 800
    { model: "Ciaz", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1590 },
    { model: "S-Presso", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1435 },
    { model: "Ignis", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1490 },
    { model: "Fronx", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1475 },
    { model: "Jimny", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1630 },
    { model: "XL6", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1675 },
    { model: "Grand Vitara", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1630 },
    { model: "Ritz", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1490 },
    { model: "S-Cross", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1590 },
  ]),
  // --- Diesel Paid Service Group (30k, 60k, 90k) ---
  ...["Paid Service (30,000 km)", "Paid Service (60,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
    { model: "Dzire", labourCode: "PMS-2D-MULTI", labourDesc: service, basicAmt: 1850 },
    { model: "Swift", labourCode: "PMS-2D-MULTI", labourDesc: service, basicAmt: 1850 },
    { model: "Ciaz", labourCode: "PMS-2D-MULTI", labourDesc: service, basicAmt: 1850 },
    { model: "Brezza", labourCode: "PMS-2D-MULTI", labourDesc: service, basicAmt: 1850 },
    { model: "S-Cross", labourCode: "PMS-2D-MULTI", labourDesc: service, basicAmt: 1850 },
  ]),
  // --- Mixed Service Group (20,30,40,60,80,90) ---
  ...["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
    { model: "Baleno", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1500 },
    { model: "Eeco", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1320 },
    { model: "Eeco Cargo", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1320 },
    { model: "Brezza", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1655 },
    { model: "Celerio", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1460 },
    { model: "Ignis", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1515 },
    { model: "Alto K10", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1460 },
    { model: "Wagon R", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1460 },
    { model: "Dzire", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1515 },
    { model: "Fronx", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1500 },
    { model: "Ertiga", labourCode: "PMS-MIXED-1", labourDesc: service, basicAmt: 1700 },
  ]),
  // --- Mixed Service Group (50, 70, 100) ---
  ...["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].flatMap(service => [
    { model: "Wagon R", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1480 },
    { model: "Swift", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1535 },
    { model: "Brezza", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1675 },
    { model: "Baleno", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1520 },
    { model: "Eeco", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1340 },
    { model: "Eeco Cargo", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1340 },
    { model: "Alto K10", labourCode: "PMS-MIXED-2", labourDesc: service, basicAmt: 1480 },
  ]),
  // --- Individual Services ---
  { model: "Swift", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1440 },
  { model: "Alto K10", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1385 },
  { model: "Ertiga", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1645 },
  { model: "Wagon R", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1385 },
  { model: "Ignis", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1440 },
  { model: "Fronx", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1430 },
  { model: "Eeco", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1255 },
  { model: "Eeco Cargo", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1255 },
  { model: "Jimny", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1455 },
  { model: "Swift", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1465 },
  { model: "Alto K10", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1410 },
  { model: "Alto 800", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1410 },
  { model: "Ertiga", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1660 },
  { model: "Eeco", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1275 },
  { model: "Eeco Cargo", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1275 },
  { model: "Fronx", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1455 },
  { model: "Swift", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1465 }, // EPIC NEW SWIFT
  { model: "Swift", labourCode: "PMS-3FS-10K", labourDesc: "3rd Free Service (10,000 km)", basicAmt: 0 },
  { model: "Brezza", labourCode: "PMS-120K", labourDesc: "Paid Service (120,000 km)", basicAmt: 1655 },
];

// --- LOGIC TO BACKFILL MISSING PRICES ---

const allModels = vehicles.map(v => v.model);
const pmsChargesMap = new Map<string, Omit<PmsCharge, 'workshopId' | 'id'>>();

// Prefill map, last one wins
baseCharges.forEach(charge => {
    const key = `${charge.model}-${charge.labourDesc}`;
    pmsChargesMap.set(key, charge);
});

allModels.forEach(model => {
    // Handle 20k pattern
    const price20k = pmsChargesMap.get(`${model}-Paid Service (20,000 km)`)?.basicAmt;
    if (price20k !== undefined) {
        const services20k = ["Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (120,000 km)", "Paid Service (140,000 km)", "Paid Service (160,000 km)", "Paid Service (180,000 km)", "Paid Service (200,000 km)", "Paid Service (220,000 km)"];
        services20k.forEach(service => {
            const key = `${model}-${service}`;
            if (!pmsChargesMap.has(key)) {
                pmsChargesMap.set(key, { model, labourDesc: service, labourCode: `PMS-AUTO-20K`, basicAmt: price20k });
            }
        });
    }

    // Handle 30k pattern
    const price30k = pmsChargesMap.get(`${model}-Paid Service (30,000 km)`)?.basicAmt;
    if (price30k !== undefined) {
        const services30k = ["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)", "Paid Service (130,000 km)", "Paid Service (150,000 km)", "Paid Service (170,000 km)", "Paid Service (190,000 km)", "Paid Service (210,000 km)"];
        services30k.forEach(service => {
            const key = `${model}-${service}`;
            if (!pmsChargesMap.has(key)) {
                pmsChargesMap.set(key, { model, labourDesc: service, labourCode: `PMS-AUTO-30K`, basicAmt: price30k });
            }
        });
    }
});


const pmsChargesRaw = Array.from(pmsChargesMap.values());


const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

const uniquePmsCharges = Array.from(new Map(pmsCharges.map(item => [item.id, item])).values());

export default uniquePmsCharges;
