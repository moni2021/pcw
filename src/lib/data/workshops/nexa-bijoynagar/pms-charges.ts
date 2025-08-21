import type { PmsCharge } from '../../../types';

const workshopId = 'nexa-bijoynagar';

// --- PMS CHARGES for nexa-bijoynagar ---
const pmsChargesRaw: Omit<PmsCharge, 'workshopId' | 'id'>[] = [];

const pmsCharges: Omit<PmsCharge, 'workshopId'>[] = pmsChargesRaw.map(charge => ({
    ...charge,
    id: `${workshopId}-${charge.model}-${charge.labourDesc}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
}));

export default pmsCharges;
