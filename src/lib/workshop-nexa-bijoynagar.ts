
import type { CustomLabor, PmsCharge } from './types';
import { vehicles } from './data';

// --- PMS CHARGES for nexa-bijoynagar ---
// This is intentionally left empty. PMS charges for this workshop will be added
// when the data is provided.
const defaultPmsCharges: Omit<PmsCharge, 'workshopId'>[] = [];

const pmsCharges: PmsCharge[] = defaultPmsCharges.map(charge => ({ ...charge, workshopId: 'nexa-bijoynagar' }));


// --- CUSTOM LABOR for nexa-bijoynagar ---
// This is intentionally left empty. Custom labor for this workshop will be added
// when the data is provided.
const defaultCustomLabor: Omit<CustomLabor, 'workshopId'>[] = [];

const customLaborData: CustomLabor[] = defaultCustomLabor.map(labor => ({ ...labor, workshopId: 'nexa-bijoynagar' }));

export const workshopData = {
    pmsCharges,
    customLabor: customLaborData,
};
