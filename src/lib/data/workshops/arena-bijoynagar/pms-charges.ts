
import type { PmsCharge } from '../../../types';

const workshopId = 'arena-bijoynagar';

// --- PMS CHARGES for arena-bijoynagar ---
const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
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
        { model: "Baleno", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1520 },
        { model: "Celerio", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ignis", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
        { model: "XL6", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1720 },
        { model: "Super Carry", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 600 },
        { model: "S-Presso", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ritz", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
    ]),
    // --- Paid Service Group (20k, 30k, 40k, 60k, 80k, 90k) ---
    ...["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
        { model: "Dzire", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "Swift", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1515 },
        { model: "Eeco", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 1320 },
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
        { model: "Super Carry", labourCode: "PMS-GROUP-2", labourDesc: service, basicAmt: 600 },
    ]),
];

const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

// Remove duplicates, giving preference to the last entry for a given id
const uniquePmsCharges = Array.from(new Map(pmsCharges.map(item => [item.id, item])).values());

export default uniquePmsCharges;
