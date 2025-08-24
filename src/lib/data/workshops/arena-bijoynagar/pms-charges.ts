
import type { PmsCharge } from '../../../types';
import { vehicles } from '@/lib/data';

const workshopId = 'arena-bijoynagar';

const baseCharges: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
    // --- Paid Service Group (30k, 50k, 70k, 90k, 100k, 110k, etc.) ---
    ...["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)", "Paid Service (130,000 km)", "Paid Service (150,000 km)", "Paid Service (170,000 km)", "Paid Service (190,000 km)", "Paid Service (210,000 km)"].flatMap(service => [
        { model: "Wagon R", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ciaz", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1635 },
        { model: "Dzire", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
        { model: "Swift", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
        { model: "Alto K10", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Alto 800", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ertiga", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1720 },
        { model: "Brezza", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1675 },
        { model: "Eeco", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1340 },
        { model: "Eeco Cargo", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1340 },
        { model: "Baleno", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1520 },
        { model: "Celerio", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ignis", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
        { model: "XL6", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1720 },
        { model: "Super Carry", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 370 },
        { model: "S-Presso", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ritz", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
    ]),
    // --- Paid Service Group (20k, 40k, 60k, 80k) ---
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (120,000 km)", "Paid Service (140,000 km)", "Paid Service (160,000 km)", "Paid Service (180,000 km)", "Paid Service (200,000 km)", "Paid Service (220,000 km)"].flatMap(service => [
        { model: "Dzire", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "Swift", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "Eeco", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1320 },
        { model: "Eeco Cargo", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1320 },
        { model: "Alto K10", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1460 },
        { model: "Alto 800", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1460 },
        { model: "Wagon R", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1460 },
        { model: "Baleno", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1500 },
        { model: "Celerio", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1460 },
        { model: "S-Presso", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1460 },
        { model: "Brezza", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1655 },
        { model: "Ignis", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "Ertiga", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1700 },
        { model: "Fronx", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1500 },
        { model: "Ciaz", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1615 },
        { model: "XL6", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1700 },
        { model: "Super Carry", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 370 },
        { model: "Ritz", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "S-Cross", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1615 },
        { model: "Grand Vitara", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1500 },
        { model: "Jimny", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
    ]),
     // --- PMS-1P 30K/50K/70K/90K/100K/110K from image ---
    ...["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].flatMap(service => [
        { model: "Alto 800", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1080 }, // M 800
        { model: "Swift", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1410 },
        { model: "Alto K10", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 },
        { model: "Grand Vitara", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1530 }, // MARUTI GR
        { model: "Alto 800", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 }, // ALTO
        { model: "Eeco", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // OMNI
        { model: "Eeco Cargo", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // OMNI
        { model: "Dzire", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1410 }, // SWIFT DZIR
        { model: "Ritz", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1215 }, // A-STAR
        { model: "S-Cross", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1605 }, // MARUTI S-C
        { model: "Ertiga", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1605 }, // ERTIGA PET
        { model: "Ciaz", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1545 }, // CIAZ PETRC
        { model: "Wagon R", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 },
        { model: "Ritz", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1320 },
        { model: "Eeco", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 },
        { model: "Eeco Cargo", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 },
        { model: "Alto K10", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 }, // ALTO K10C
        { model: "Celerio", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 }, // CELERIO CN
        { model: "Celerio", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 }, // NEW CELER
        { model: "Eeco", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // EECO K12N
        { model: "Eeco Cargo", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // EECO K12N
        { model: "Baleno", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1400 }, // NEW BALEN
        { model: "Brezza", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1530 }, // NEW BREZZ
        { model: "Wagon R", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 }, // NEW WAGO
        { model: "Ritz", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1215 }, // ZEN ESTILO
        { model: "Dzire", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1410 }, // New Dzire
        { model: "S-Presso", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 },
        { model: "Ignis", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1410 }, // IGNIS-PETR
        { model: "Eeco", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // MARUTI EE(CO)
        { model: "Eeco Cargo", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1180 }, // MARUTI EE(CO)
        { model: "Baleno", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1400 }, // MARUTI BA
        { model: "Ertiga", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1605 }, // NEW ERTIG
        { model: "Super Carry", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 370 }, // SUPER CARI
        { model: "Brezza", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1530 }, // VITARA BRE
        { model: "Swift", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1410 }, // SWIFT NEW
        { model: "Alto 800", labourCode: "PMS-IMG-1P", labourDesc: service, basicAmt: 1335 },
    ]),
    // --- PMS-2P 30K from image ---
    ...["Paid Service (30,000 km)"].flatMap(service => [
        { model: "Baleno", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1455 }, // MARUTI BA
        { model: "Alto 800", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1410 },
        { model: "Swift", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1465 }, // NEW SWIFT
        { model: "Brezza", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1455 }, // NEW BREZZ
        { model: "Swift", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1275 }, // SWIFT NEW
        { model: "Dzire", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1465 }, // New Dzire
        { model: "Alto K10", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1410 }, // ALTO K10C
        { model: "Wagon R", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1410 }, // NEW WAGO
        { model: "Celerio", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1410 }, // NEW CELER
        { model: "Baleno", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1455 }, // NEW BALEN
        { model: "Brezza", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1455 }, // VITARA BRE
        { model: "Ignis", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1465 }, // IGNIS-PETR
        { model: "Ertiga", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1660 }, // NEW ERTIG
        { model: "Fronx", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1455 }, // Fronx Dom
        { model: "S-Presso", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1410 },
        { model: "Eeco", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1275 }, // MARUTI EE(CO)
        { model: "Eeco Cargo", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1275 }, // MARUTI EE(CO)
        { model: "Eeco", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1275 }, // EECO K12N
        { model: "Eeco Cargo", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1275 }, // EECO K12N
        { model: "XL6", labourCode: "PMS-IMG-2P", labourDesc: service, basicAmt: 1660 },
    ]),
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
