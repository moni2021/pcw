import type { PmsCharge, CustomLabor, Workshop, ServiceEstimateData } from './types';
import { threeMCareData } from './data/3m';
import pmsChargesArena from './data/workshops/arena-bijoynagar/pms-charges';
import customLaborArena from './data/workshops/arena-bijoynagar/custom-labor';
import pmsChargesSow from './data/workshops/sow-azara/pms-charges';
import customLaborSow from './data/workshops/sow-azara/custom-labor';


interface WorkshopData {
    pmsCharges: PmsCharge[];
    customLabor: CustomLabor[];
}

// Statically import all workshop data
// In a real-world scenario with many workshops, this could be done dynamically
const workshopDataMap: { [key: string]: WorkshopData } = {
    'arena-bijoynagar': {
        pmsCharges: pmsChargesArena.map(p => ({...p, workshopId: 'arena-bijoynagar'})),
        customLabor: customLaborArena.map(c => ({...c, workshopId: 'arena-bijoynagar'})),
    },
    'sow-azara': {
        pmsCharges: pmsChargesSow.map(p => ({...p, workshopId: 'sow-azara'})),
        customLabor: customLaborSow.map(c => ({...c, workshopId: 'sow-azara'})),
    },
    // 'nexa-bijoynagar': { pmsCharges: nexaPms, customLabor: nexaCustom },
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
            // Add convenience charge for SOW workshop if there is a main PMS charge
            if (workshopId === 'sow-azara' && pmsCharge.basicAmt > 0) {
                 pmsLabor.push({ name: 'SOW CONVENIENCE CHARGES', charge: 150 });
            }
        }
    }
    
    return pmsLabor;
}

export function getRecommendedLabor(model: string, workshopId: string, serviceType: string): { name: string; charge: number }[] {
    const data = workshopDataMap[workshopId];
    if (!data) return [];

    const recommendedServices = [...commonServices];
    
    recommendedServices.push({ name: 'STRUT GREASING', charge: 1650 });

    let wheelBalancing = data.customLabor.find(l => l.model === model && l.name === 'WHEEL BALANCING - 5 WHEEL');
    if (!wheelBalancing) {
        wheelBalancing = data.customLabor.find(l => l.model === model && l.name === 'WHEEL BALANCING - 4 WHEEL');
    }
    if (wheelBalancing) {
        recommendedServices.push({ name: wheelBalancing.name, charge: wheelBalancing.charge });
    }

    const wheelAlignment = data.customLabor.find(l => l.model === model && l.name === 'WHEEL ALIGNMENT (4 HEAD)');
    if (wheelAlignment) {
        recommendedServices.push({ name: wheelAlignment.name, charge: wheelAlignment.charge });
    }
    
    // Conditionally add brake caliper service for paid services
    if (serviceType.startsWith('Paid Service')) {
        const brakeCaliperService = data.customLabor.find(l => l.model === model && l.name === 'FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE');
        if (brakeCaliperService) {
            recommendedServices.push({ name: brakeCaliperService.name, charge: brakeCaliperService.charge });
        }
    }
    
    return recommendedServices;
}


export function getOptionalServices(model: string, workshopId: string) {
    return threeMCareData[model] || [];
}


export function getAvailableCustomLabor(model: string, workshopId: string) {
     const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    const specialRecommendedServices = [
        "WHEEL ALIGNMENT (4 HEAD)", 
        "WHEEL BALANCING - 4 WHEEL", 
        "WHEEL BALANCING - 5 WHEEL", 
        "STRUT GREASING",
        "HEADLAMP FOCUSSING",
        "FRONT BRAKE CALIPER ASSY (ONE SIDE) WITH OPPOSITE SIDE"
    ];

    return data.customLabor.filter(item => 
        item.model === model && !specialRecommendedServices.includes(item.name)
    );
}
