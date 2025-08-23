
import type { PmsCharge, CustomLabor, Workshop, ServiceEstimateData } from './types';
import { threeMCareData } from './data/3m';
import { recommendedLaborSchedule } from './data/recommended-labor';
import { vehicles } from './data';

// Import data for all workshops
import pmsChargesArena from './data/workshops/arena-bijoynagar/pms-charges';
import customLaborArena from './data/workshops/arena-bijoynagar/custom-labor';
import pmsChargesSow from './data/workshops/sow-azara/pms-charges';
import customLaborSow from './data/workshops/sow-azara/custom-labor';
import pmsChargesNexa from './data/workshops/nexa-bijoynagar/pms-charges';
import customLaborNexa from './data/workshops/nexa-bijoynagar/custom-labor';

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
     'sow-azara': {
        pmsCharges: pmsChargesSow.map(p => ({...p, workshopId: 'sow-azara'})),
        customLabor: customLaborSow.map(c => ({...c, workshopId: 'sow-azara'})),
    },
    'nexa-bijoynagar': {
        pmsCharges: pmsChargesNexa.map(p => ({...p, workshopId: 'nexa-bijoynagar'})),
        customLabor: customLaborNexa.map(c => ({...c, workshopId: 'nexa-bijoynagar'})),
    },
};

// Combine all custom labor and pms charges for admin pages
const allCustomLabor = Object.values(workshopDataMap).flatMap(d => d.customLabor);
const allPmsCharges = Object.values(workshopDataMap).flatMap(d => d.pmsCharges);
export const workshopData = {
    customLabor: allCustomLabor,
    pmsCharges: allPmsCharges,
};

// Define common services that should be available for ALL models and workshops.
const commonServices = [
    { name: 'AC GAS TOP-UP', charge: 1600 },
    { name: 'NITROGEN GAS FILLING', charge: 200 },
    { name: 'ENGINE ROOM PAINTING', charge: 400 },
    { name: 'STRUT GREASING', charge: 1650 },
    { name: 'HEADLAMP FOCUSSING', charge: 400 },
];

// Helper to get all labor charges for a model, combining workshop-specific and common ones.
function getAllLaborForModel(model: string, workshopId: string): CustomLabor[] {
    const workshopSpecificLabor = workshopDataMap[workshopId]?.customLabor.filter(l => l.model === model) || [];
    
    const commonLaborForModel: CustomLabor[] = vehicles
        .filter(v => v.model === model)
        .flatMap(v => 
            commonServices.map(cs => ({
                workshopId,
                model: v.model,
                name: cs.name,
                charge: cs.charge,
            }))
        );

    // Combine and remove duplicates, giving workshop-specific prices precedence.
    const combined = [...workshopSpecificLabor, ...commonLaborForModel];
    const uniqueLabor = combined.reduce((acc, current) => {
        if (!acc.find(item => item.name === current.name)) {
            acc.push(current);
        }
        return acc;
    }, [] as CustomLabor[]);

    return uniqueLabor;
}


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
