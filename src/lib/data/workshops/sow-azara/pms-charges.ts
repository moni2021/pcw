
import type { PmsCharge } from '../../../types';

// --- PMS CHARGES for sow-azara ---
const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
  // Paid Service (10,000 km) - This is the 3rd Free Service
  { model: "NEW SWIFT PETROL", labourCode: "PMS-3FS-10K", labourDesc: "3rd Free Service (10,000 km)", basicAmt: 0 },
  { model: "EPIC NEW SWIFT", labourCode: "PMS-3FS-10K", labourDesc: "3rd Free Service (10,000 km)", basicAmt: 0 },
  
  // Paid Service (20,000 km)
  { model: "NEW SWIFT PETROL", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1440 },
  { model: "ALTO K10C", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1385 },
  { model: "NEW ERTIGA PETROL", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1645 },
  { model: "NEW WAGON R 1L PETROL", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1385 },
  { model: "NEW WAGON R 1.2L PET", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1385 },
  { model: "IGNIS-PETROL", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1440 },
  { model: "Fronx Domestic P74", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1430 },
  { model: "EECO K12N 2022", labourCode: "PMS-1P-20K", labourDesc: "Paid Service (20,000 km)", basicAmt: 1255 },

  // Paid Service (30,000 km)
  { model: "Jimny 5 Door Domestic F", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1455 },
  { model: "NEW SWIFT PETROL", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1465 },
  { model: "ALTO K10C", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1410 },
  { model: "ALTO 800", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1410 },
  { model: "NEW ERTIGA PETROL", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1660 },
  { model: "EECO K12N 2022", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1275 },
  { model: "Fronx Turbo Smart Hybri", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1455 },
  { model: "EPIC NEW SWIFT", labourCode: "PMS-2P-30K", labourDesc: "Paid Service (30,000 km)", basicAmt: 1465 },

  // Paid Service (40,000 km)
  { model: "NEW WAGON R 1.2L PET", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "NEW WAGON R 1L PETRO", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "NEW CELERIO 2021", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "NEW BREZZA", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1630 },
  { model: "MARUTI BALENO PETRO", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1475 },
  { model: "SWIFT NEW / DZIRE NEW", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1490 },
  { model: "NEW SWIFT PETROL", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1490 },
  { model: "New Dzire Petrol", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1490 },
  { model: "ALTO 800", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "ALTO K10", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "NEW ERTIGA PETROL", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1675 },
  { model: "OMNI", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1295 },
  { model: "ALTO K10C", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "ALTO", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "ERTIGA PETROL", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1675 },
  { model: "M 800", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1160 },
  { model: "NEW CIAZ PETROL", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1590 },
  { model: "WAGON-R NEW", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },
  { model: "S-PRESSO", labourCode: "PMS-2P-40K", labourDesc: "Paid Service (40,000 km)", basicAmt: 1435 },

  // Paid Service (50,000 km)
  { model: "NEW WAGON R 1.2L PET", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1480 },
  { model: "NEW SWIFT PETROL", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1535 },
  { model: "NEW WAGON R 1L PETRO", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1480 },
  { model: "VITARA BREZZA K15B BS", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1675 },
  { model: "MARUTI BALENO PETROI", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1520 },
  { model: "MARUTI EECO PETROL", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1340 },
  { model: "NEW BREZZA", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1675 },
  { model: "ALTO K10C", labourCode: "PMS-50K", labourDesc: "Paid Service (50,000 km)", basicAmt: 1480 },

  // Paid Service (60,000 km)
  { model: "DZIRE TOUR DIESEL", labourCode: "PMS-2D-60K", labourDesc: "Paid Service (60,000 km)", basicAmt: 1850 },
  
  // Paid Service (80,000 km) is same as 40k
  // Paid Service (100,000 km)
  // These seem to be combined with 30/50/70/90/110k
  { model: "WAGON-R NEW", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "SWIFT NEW / DZIRE NEW", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1410 },
  { model: "NEW SWIFT PETROL", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1410 },
  { model: "M 800", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1080 },
  { model: "IGNIS-PETROL", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1410 },
  { model: "Jimny 5 Door Domestic F", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1530 },
  { model: "ALTO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "ALTO 800", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "NEW WAGON R 1L PETRO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "New Dzire Petrol", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1410 },
  { model: "ZEN ESTILO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1215 },
  { model: "ALTO K10", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "MARUTI BALENO PETRO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1400 },
  { model: "OMNI", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1180 },
  { model: "NEW WAGON R 1.2L PET", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "Baleno RS", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1400 },
  { model: "ALTO K10C", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "WAGON R", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "NEW ERTIGA PETROL", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1605 },
  { model: "CELERIO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "S-PRESSO", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1335 },
  { model: "NEW BREZZA", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1530 },
  { model: "ERTIGA PETROL", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1605 },
  { model: "MARUTI EECO PETROL", labourCode: "PMS-1P-100K", labourDesc: "Paid Service (100,000 km)", basicAmt: 1180 },

  // Generic charges from image - mapped to multiple service intervals
  // PMS 20/30/40/60/80/90
  { model: "NEW BALENO", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1500 },
  { model: "EECO K12N 2022", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1320 },
  { model: "NEW BREZZA", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1655 },
  { model: "NEW CELERIO 2021", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1460 },
  { model: "IGNIS-PETROL", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1515 },
  { model: "ALTO K10C", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1460 },
  { model: "NEW WAGON R 1.2L PET", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1460 },
  { model: "New Dzire Petrol", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1515 },
  { model: "MARUTI BALENO PETROI", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1500 },
  { model: "NEW WAGON R 1L PETRO", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1460 },
  { model: "Fronx Domestic P74", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1500 },
  { model: "NEW ERTIGA PETROL", labourCode: "PMS-MULTI-1", labourDesc: "Paid Service (20,000 km)", basicAmt: 1700 },
];

const workshopId = 'sow-azara';
const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));


export default pmsCharges;
