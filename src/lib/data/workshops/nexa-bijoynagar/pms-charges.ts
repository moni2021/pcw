import type { PmsCharge } from '../../../types';

const workshopId = 'nexa-bijoynagar';

const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
    // PMS-1P 30K/50K/70K/90K/100K/1
    ...["Paid Service (30,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (90,000 km)", "Paid Service (100,000 km)"].flatMap(service => [
        { model: "Wagon R", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1615 },
        { model: "Ignis", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1705 },
        { model: "XL6", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1940 },
        { model: "Baleno", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1695 },
        { model: "Alto 800", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1615 },
        { model: "Swift", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1705 },
        { model: "Dzire", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1705 },
        { model: "Celerio", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1615 },
        { model: "Ciaz", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1870 },
        { model: "Fronx", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1690 },
        { model: "Alto K10", labourDesc: service, labourCode: "PMS-1P-MULTI", basicAmt: 1610 },
    ]),
    // PMS-2P 20K/40K/60K/80K
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)"].flatMap(service => [
        { model: "Baleno", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1785 },
        { model: "Grand Vitara", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1970 },
        { model: "Swift", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1800 },
        { model: "Dzire", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1800 },
        { model: "Wagon R", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1735 },
        { model: "Jimny", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1970 },
        { model: "Celerio", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1735 },
        { model: "Alto 800", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1735 },
        { model: "Alto K10", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1735 },
        { model: "Brezza", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1970 },
        { model: "Ignis", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 1800 },
        { model: "XL6", labourDesc: service, labourCode: "PMS-2P-MULTI", basicAmt: 2025 },
    ]),
    // PMS-1D 20K/40K/50K/70K/80K/100K
    ...["Paid Service (20,000 km)", "Paid Service (40,000 km)", "Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (80,000 km)", "Paid Service (100,000 km)"].flatMap(service => [
        { model: "Brezza", fuelType: "Diesel", labourDesc: service, labourCode: "PMS-1D-MULTI", basicAmt: 1880 },
        { model: "S-Cross", fuelType: "Diesel", labourDesc: service, labourCode: "PMS-1D-MULTI", basicAmt: 1985 },
    ]),
    // PMS 20/30/40/60/80/90
    ...["Paid Service (20,000 km)", "Paid Service (30,000 km)", "Paid Service (40,000 km)", "Paid Service (60,000 km)", "Paid Service (80,000 km)", "Paid Service (90,000 km)"].flatMap(service => [
        { model: "Eeco", labourDesc: service, labourCode: "PMS-MIXED", basicAmt: 1595 },
        { model: "Fronx", labourDesc: service, labourCode: "PMS-MIXED", basicAmt: 1810 },
        { model: "Wagon R", labourDesc: service, labourCode: "PMS-MIXED", basicAmt: 1765 },
        { model: "Baleno", labourDesc: service, labourCode: "PMS-MIXED", basicAmt: 1810 },
    ]),
    // PMS 50/70/100
    ...["Paid Service (50,000 km)", "Paid Service (70,000 km)", "Paid Service (100,000 km)"].flatMap(service => [
        { model: "Alto 800", labourDesc: service, labourCode: "PMS-MIXED-2", basicAmt: 1785 },
    ]),
    // Individual Services
    { model: "Baleno", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1725 },
    { model: "Wagon R", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1675 },
    { model: "Grand Vitara", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1725 },
    { model: "Jimny", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1725 },
    { model: "Ignis", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1740 },
    { model: "Ertiga", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1P-20K", basicAmt: 1985 },
    { model: "Baleno", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K", basicAmt: 1755 },
    { model: "Alto K10", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K", basicAmt: 1705 },
    { model: "Ertiga", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K", basicAmt: 2005 },
    // OMNI is deprecated, mapping to EECO instead for compatibility.
    { model: "Eeco", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K-OMNI", basicAmt: 1540 },
    { model: "Fronx", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K", basicAmt: 1755 }, // Fronx Turbo
    { model: "Alto 800", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K", basicAmt: 1705 },
    { model: "Eeco", labourDesc: "Paid Service (30,000 km)", labourCode: "PMS-2P-30K-EECO", basicAmt: 1540 },
    { model: "S-Cross", fuelType: "Diesel", labourDesc: "Paid Service (20,000 km)", labourCode: "PMS-1D-20K", basicAmt: 1945 },
];


const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => {
    // Generate a unique ID for each charge
    const idSuffix = charge.fuelType ? `${charge.model}-${charge.fuelType}-${charge.labourDesc}` : `${charge.model}-${charge.labourDesc}`;
    return {
        ...charge,
        id: `${workshopId}-${idSuffix}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
    }
});

export default pmsCharges;
