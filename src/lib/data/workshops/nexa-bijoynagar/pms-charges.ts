
import type { PmsCharge } from '../../../types';
import { vehicles } from '@/lib/data';

const workshopId = 'nexa-bijoynagar';

const baseCharges: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
    // --- PMS-1P 30K/50K/70K/90K/100K/110K ---
    ...["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].flatMap(service => [
        { model: "Wagon R", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1615 },
        { model: "XL6", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1940 },
        { model: "Baleno", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1695 },
        { model: "Alto 800", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1615 },
        { model: "Swift", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1705 },
        { model: "Dzire", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1705 },
        { model: "Celerio", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1615 },
        { model: "Ciaz", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1870 },
        { model: "Fronx", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1690 },
        { model: "Ritz", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1215 }, // A-STAR mapped to Ritz
        { model: "Ignis", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1705 },
        { model: "Alto K10", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1610 },
        { model: "Brezza", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1880 },
        { model: "S-Cross", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 1985 },
        { model: "Ertiga", labourCode: "PMS-1P-MULTI", labourDesc: service, basicAmt: 2005 },
    ]),
    // --- PMS-2P 20K/40K/60K/80K ---
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (120,000 km)", "Paid Service (140,000 km)", "Paid Service (160,000 km)", "Paid Service (180,000 km)", "Paid Service (200,000 km)", "Paid Service (220,000 km)"].flatMap(service => [
        { model: "Jimny", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1970 },
        { model: "Celerio", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1735 },
        { model: "Dzire", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1800 },
        { model: "Alto 800", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1735 },
        { model: "Alto K10", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1735 },
        { model: "Wagon R", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1735 },
        { model: "Swift", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1800 },
        { model: "Brezza", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1970 },
        { model: "Baleno", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1780 },
        { model: "Ignis", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1800 },
        { model: "XL6", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 2025 },
        { model: "Grand Vitara", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1970 },
        { model: "Ciaz", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 1870 },
        { model: "Ertiga", labourCode: "PMS-2P-MULTI", labourDesc: service, basicAmt: 2025 },
    ]),
    // --- PMS-1D 20K/40K/50K/70K/80K/100K/110K ---
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (80,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].flatMap(service => [
        { model: "Brezza", labourCode: "PMS-1D-MULTI", labourDesc: service, basicAmt: 1880 },
        { model: "S-Cross", labourCode: "PMS-1D-MULTI", labourDesc: service, basicAmt: 1985 },
    ]),
    // --- PMS 20/30/40/60/80/90 ---
    ...["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
        { model: "Eeco", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1595 },
        { model: "Eeco Cargo", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1595 },
        { model: "Fronx", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1810 },
        { model: "Wagon R", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1765 },
        { model: "Baleno", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1810 },
    ]),
    // --- PMS 50/70/100 ---
    ...["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].flatMap(service => [
        { model: "Alto 800", labourCode: "PMS-MIXED-B", labourDesc: service, basicAmt: 1785 },
    ]),
    // --- Individual Services ---
    { model: "Baleno", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1725 },
    { model: "Wagon R", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1675 },
    { model: "Grand Vitara", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1725 },
    { model: "Jimny", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1725 },
    { model: "Ignis", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1740 },
    { model: "Ertiga", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1985 },
    { model: "Alto K10", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1705 },
    { model: "Ertiga", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 2005 },
    { model: "Eeco", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1540 }, // OMNI mapped to EECO
    { model: "Eeco Cargo", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1540 },
    { model: "Fronx", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1755 },
    { model: "Baleno", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1755 },
    { model: "Alto 800", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1705 },
    { model: "S-Cross", labourCode: "PMS-1D-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1945 },
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
