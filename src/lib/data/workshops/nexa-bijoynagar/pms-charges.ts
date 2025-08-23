
import type { PmsCharge } from '../../../types';

const workshopId = 'nexa-bijoynagar';

// --- PMS CHARGES for nexa-bijoynagar ---
const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
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
    ]),
    // --- PMS-2P 20K/40K/60K/80K ---
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].flatMap(service => [
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
    ]),
    // --- PMS-1D 20K/40K/50K/70K/80K/100K/110K ---
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (80,000 km)", "Paid Service (100,000 km)", "Paid Service (110,000 km)"].flatMap(service => [
        { model: "Brezza", labourCode: "PMS-1D-MULTI", labourDesc: service, basicAmt: 1880 },
        { model: "S-Cross", labourCode: "PMS-1D-MULTI", labourDesc: service, basicAmt: 1985 },
    ]),
    // --- PMS 20/30/40/60/80/90 ---
    ...["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
        { model: "Eeco", labourCode: "PMS-MIXED-A", labourDesc: service, basicAmt: 1595 },
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
    { model: "Fronx", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1755 },
    { model: "Baleno", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1755 },
    { model: "Alto 800", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1705 },
    { model: "S-Cross", labourCode: "PMS-1D-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1945 },
];


const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

// Remove duplicates, giving preference to the last entry for a given id
const uniquePmsCharges = Array.from(new Map(pmsCharges.map(item => [item.id, item])).values());

export default uniquePmsCharges;
