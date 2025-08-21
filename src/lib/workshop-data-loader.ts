
import type { PmsCharge, CustomLabor, Workshop, ServiceEstimateData } from './types';
import { threeMCareData } from './data/3m';
import pmsChargesArena from './data/workshops/arena-bijoynagar/pms-charges';
import customLaborArena from './data/workshops/arena-bijoynagar/custom-labor';
import { recommendedLaborSchedule } from './data/recommended-labor';

interface WorkshopData {
    pmsCharges: PmsCharge[];
    customLabor: CustomLabor[];
}

// Statically import all workshop data
const workshopDataMap: { [key: string]: WorkshopData } = {
    'arena-bijoynagar': {
        pmsCharges: pmsChargesArena.map(p => ({...p, workshopId: 'arena-bijoynagar'})),
        customLabor: customLaborArena.map(c => ({...c, workshopId: 'arena-bijoynagar'})),
    },
};

// Combine all custom labor and pms charges for admin pages
const allCustomLabor = Object.values(workshopDataMap).flatMap(d => d.customLabor);
const allPmsCharges = Object.values(workshopDataMap).flatMap(d => d.pmsCharges);
export const workshopData = {
    customLabor: allCustomLabor,
    pmsCharges: allPmsCharges,
};

const commonServices = [
    { name: 'NITROGEN GAS FILLING', charge: 200 },
    { name: 'ENGINE ROOM PAINTING', charge: 400 },
];

export function getPmsLabor(model: string, serviceType: string, workshopId: string): { name: string; charge: number }[] {
    const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    let pmsLabor: { name: string; charge: number }[] = [];

    if (serviceType.startsWith('Paid Service') || serviceType.startsWith('3rd Free')) {
        const pmsCharge = data.pmsCharges.find(p => 
            p.model === model && p.labourDesc === serviceType
        );

        if (pmsCharge) {
            pmsLabor.push({ name: 'Periodic Maintenance Service', charge: pmsCharge.basicAmt });
        }
    }
    
    return pmsLabor;
}

export function getRecommendedLabor(model: string, workshopId: string, serviceType: string): { name: string; charge: number }[] {
    const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    const serviceKmRaw = serviceType.match(/\(([\d,]+)\s*km\)/)?.[1].replace(/,/g, '');
    if (!serviceKmRaw) return [];
    
    const serviceKm = parseInt(serviceKmRaw, 10) / 1000; // Convert to thousands

    let recommendedServices: { name: string; charge: number }[] = [];

    for (const [laborName, kmIntervals] of Object.entries(recommendedLaborSchedule)) {
        let shouldRecommend = false;
        if (kmIntervals === 'all_paid' && serviceType.startsWith('Paid Service')) {
            shouldRecommend = true;
        } else if (Array.isArray(kmIntervals) && kmIntervals.includes(serviceKm)) {
            shouldRecommend = true;
        }
        
        if (shouldRecommend) {
             const laborData = data.customLabor.find(l => l.model === model && l.name === laborName);
             if (laborData) {
                 recommendedServices.push({ name: laborData.name, charge: laborData.charge });
             } else {
                // Fallback for services like wheel balancing that have two names
                if (laborName === 'WHEEL BALANCING - 5 WHEEL') {
                    const fallbackLabor = data.customLabor.find(l => l.model === model && l.name === 'WHEEL BALANCING - 4 WHEEL');
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
    const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    // Exclude services that are now automatically recommended
    const recommendedNames = Object.keys(recommendedLaborSchedule);

    return data.customLabor.filter(item => 
        item.model === model && !recommendedNames.includes(item.name)
    );
}
