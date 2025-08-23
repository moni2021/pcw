
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
        { model: "Eeco", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1340 }, // Mapping OMNI and MARUTI EECO PETROL
        { model: "Baleno", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1520 },
        { model: "Celerio", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 },
        { model: "Ignis", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 },
        { model: "XL6", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1720 },
        { model: "Super Carry", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 600 },
        { model: "S-Presso", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1480 }, // Assuming S-Presso is similar to Alto
        { model: "Ritz", labourCode: "PMS-GROUP-1", labourDesc: service, basicAmt: 1535 }, // Assuming Ritz is similar to Swift
    ]),
];

const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

export default pmsCharges;
