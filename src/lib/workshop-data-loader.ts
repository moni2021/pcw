
import type { PmsCharge, CustomLabor, Workshop, ServiceEstimateData } from './types';
import { workshopData as arenaData } from './workshop-arena-bijoynagar';
import { workshopData as sowData } from './workshop-sow-bijoynagar';
import { threeMCareData } from './3m-care-data';

interface WorkshopData {
    pmsCharges: PmsCharge[];
    customLabor: CustomLabor[];
}

const workshopDataMap: { [key: string]: WorkshopData } = {
    'arena-bijoynagar': arenaData,
    'sow-bijoynagar': sowData,
};

const commonServices = [
    { name: 'NITROGEN GAS FILLING', charge: 200 },
    { name: 'ENGINE ROOM PAINTING', charge: 400 },
];

export function getPmsLabor(model: string, serviceType: string, workshopId: string): { name: string; charge: number }[] {
    const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    if (serviceType.startsWith('Paid Service')) {
        const pmsCharge = data.pmsCharges.find(p => p.model === model && p.labourDesc === serviceType && p.workshopId === workshopId);
        if (pmsCharge) {
            return [{ name: 'Periodic Maintenance Service', charge: pmsCharge.basicAmt }];
        }
    }
    // Return empty array if it's a free service or if no matching paid service charge is found
    return [];
}

export function getRecommendedLabor(model: string, workshopId: string): { name: string; charge: number }[] {
    const data = workshopDataMap[workshopId];
    if (!data) return [];

    const recommendedServices = [...commonServices];
    
    // STRUT GREASING is not available in SOW
    if(workshopId !== 'sow-bijoynagar') {
        recommendedServices.push({ name: 'STRUT GREASING', charge: 1650 });
    }

    // Prefer 5-wheel balancing if available, otherwise check for 4-wheel.
    let wheelBalancing = data.customLabor.find(l => l.model === model && l.name === 'WHEEL BALANCING - 5 WHEEL');
    if (!wheelBalancing) {
        wheelBalancing = data.customLabor.find(l => l.model === model && l.name === 'WHEEL BALANCING - 4 WHEEL');
    }
    if (wheelBalancing) {
        recommendedServices.push({ name: wheelBalancing.name, charge: wheelBalancing.charge });
    }

    // WHEEL ALIGNMENT is not available in SOW
    if(workshopId !== 'sow-bijoynagar') {
        const wheelAlignment = data.customLabor.find(l => l.model === model && l.name === 'WHEEL ALIGNMENT (4 HEAD)');
        if (wheelAlignment) {
            recommendedServices.push({ name: wheelAlignment.name, charge: wheelAlignment.charge });
        }
    }
    
    return recommendedServices;
}


export function getOptionalServices(model: string, workshopId: string) {
    // SOW workshop does not have 3M services
    if (workshopId === 'sow-bijoynagar') {
        return [];
    }
    return threeMCareData[model] || [];
}


export function getAvailableCustomLabor(model: string, workshopId: string) {
     const data = workshopDataMap[workshopId];
    if (!data) return [];
    
    // These services are handled in the "Recommended" section or explicitly excluded for SOW, so filter them out.
    const specialRecommendedServices = [
        "WHEEL ALIGNMENT (4 HEAD)", 
        "WHEEL BALANCING - 4 WHEEL", 
        "WHEEL BALANCING - 5 WHEEL", 
        "STRUT GREASING",
        "HEADLAMP FOCUSSING" // This was also requested to be removed from SOW
    ];

    return data.customLabor.filter(item => 
        item.model === model && !specialRecommendedServices.includes(item.name)
    );
}
