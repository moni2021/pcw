
import type { PmsCharge, CustomLabor, Workshop, ServiceEstimateData } from './types';
import { threeMCareData } from './data/3m';
import { recommendedLaborSchedule } from './data/recommended-labor';
import { vehicles } from './data';
import { masterCustomLabor } from './data/workshops/arena-bijoynagar/custom-labor';

// Import data for all workshops
import pmsChargesArena from './data/workshops/arena-bijoynagar/pms-charges';
import pmsChargesSow from './data/workshops/sow-azara/pms-charges';
import pmsChargesNexa from './data/workshops/nexa-bijoynagar/pms-charges';

interface WorkshopData {
    pmsCharges: PmsCharge[];
    customLabor: CustomLabor[];
}

// Statically import all workshop PMS data
const workshopPmsDataMap: { [key: string]: PmsCharge[] } = {
    'arena-bijoynagar': pmsChargesArena.map(p => ({...p, workshopId: 'arena-bijoynagar'})),
    'sow-azara': pmsChargesSow.map(p => ({...p, workshopId: 'sow-azara'})),
    'nexa-bijoynagar': pmsChargesNexa.map(p => ({...p, workshopId: 'nexa-bijoynagar'})),
};

// Combine all custom labor and pms charges for admin pages
const allPmsCharges = Object.values(workshopPmsDataMap).flatMap(d => d);
// The master custom labor list is now the single source of truth for all workshops
const allCustomLabor = masterCustomLabor.map(cl => ({...cl, workshopId: 'all'}));

export const workshopData = {
    customLabor: allCustomLabor,
    pmsCharges: allPmsCharges,
};


// Helper to get all labor charges for a model, using the master list.
function getAllLaborForModel(model: string, workshopId: string): CustomLabor[] {
    const laborForModel = masterCustomLabor.filter(l => l.model === model);
    
    // Add workshopId to each item
    return laborForModel.map(l => ({ ...l, workshopId }));
}


export function getPmsLabor(model: string, serviceType: string, workshopId: string): { name: string; charge: number }[] {
    const data = workshopPmsDataMap[workshopId];
    if (!data) return [];
    
    let pmsLabor: { name: string; charge: number }[] = [];

    if (serviceType.startsWith('Paid Service') || serviceType.startsWith('3rd Free')) {
        const pmsCharge = data.find(p => 
            p.model === model && p.labourDesc === serviceType
        );

        if (pmsCharge) {
            pmsLabor.push({ name: 'Periodic Maintenance Service', charge: pmsCharge.basicAmt });
        }
    }
    
    return pmsLabor;
}

export function getRecommendedLabor(model: string, workshopId: string, serviceType: string): { name: string; charge: number }[] {
    const serviceKmRaw = serviceType.match(/\(([\d,]+)\s*km\)/)?.[1].replace(/,/g, '');
    if (!serviceKmRaw) return [];
    
    const serviceKm = parseInt(serviceKmRaw, 10) / 1000; // Convert to thousands
    const allLaborForModel = getAllLaborForModel(model, workshopId);

    let recommendedServices: { name: string; charge: number }[] = [];

    for (const [laborName, kmIntervals] of Object.entries(recommendedLaborSchedule)) {
        let shouldRecommend = false;
        if (kmIntervals === 'all_paid' && serviceType.startsWith('Paid Service')) {
            shouldRecommend = true;
        } else if (Array.isArray(kmIntervals) && kmIntervals.includes(serviceKm)) {
            shouldRecommend = true;
        }
        
        if (shouldRecommend) {
             const laborData = allLaborForModel.find(l => l.name === laborName);
             if (laborData) {
                 recommendedServices.push({ name: laborData.name, charge: laborData.charge });
             } else {
                // Fallback for services like wheel balancing that might have multiple names
                if (laborName === 'WHEEL BALANCING - 5 WHEEL') {
                    const fallbackLabor = allLaborForModel.find(l => l.name === 'WHEEL BALANCING - 4 WHEEL');
                    if(fallbackLabor) recommendedServices.push({ name: fallbackLabor.name, charge: fallbackLabor.charge });
                }
             }
        }
    }
    
    return recommendedServices.sort((a,b) => a.name.localeCompare(b.name));
}


export function getOptionalServices(model: string, workshopId: string) {
    return threeMCareData[model] || [];
}


export function getAvailableCustomLabor(model: string, workshopId: string) {
    const allLaborForModel = getAllLaborForModel(model, workshopId);
    
    // Exclude services that are now automatically recommended
    const recommendedNames = Object.keys(recommendedLaborSchedule);

    return allLaborForModel.filter(item => !recommendedNames.includes(item.name));
}
