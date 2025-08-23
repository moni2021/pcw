
import type { PmsCharge } from '../../../types';

const workshopId = 'arena-bijoynagar';

// --- PMS CHARGES for arena-bijoynagar ---
const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [
  // This data has been cleared to make way for a new price list.
];

const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

export default pmsCharges;

    