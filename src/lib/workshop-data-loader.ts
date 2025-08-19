
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
    
    let pmsLabor: { name: string; charge: number }[] = [];

    if (serviceType.startsWith('Paid Service')) {
        // Normalize model name from data file to match lookup
        const normalizedModelName = (name: string) => {
            if (name.includes('SWIFT NEW / DZIRE NEW')) return ['Swift', 'Dzire'];
            if (name === 'New Dzire Petrol') return ['Dzire'];
            if (name.startsWith('NEW WAGON R 1')) return ['Wagon R'];
            if (name.startsWith('NEW CELERIO')) return ['Celerio'];
            if (name.startsWith('MARUTI BALENO')) return ['Baleno'];
            if (name.startsWith('VITARA BREZZA')) return ['Brezza'];
            if (name.startsWith('ERTIGA')) return ['Ertiga'];
            if (name.startsWith('MARUTI EECO')) return ['Eeco'];
            if (name.startsWith('Jimny')) return ['Jimny'];
            if (name.startsWith('Fronx')) return ['Fronx'];
            if (name.startsWith('EPIC NEW SWIFT')) return ['Swift'];
            return [name];
        };

        const matchingCharges = data.pmsCharges.filter(p => {
             const chargeModels = normalizedModelName(p.model);
             return chargeModels.includes(model) && p.labourDesc === serviceType && p.workshopId === workshopId;
        });

        // Find the best match, sometimes there are multiple due to naming conventions
        const pmsCharge = matchingCharges[0];

        if (pmsCharge) {
            pmsLabor.push({ name: 'Periodic Maintenance Service', charge: pmsCharge.basicAmt });
        }
    }
    
    // Add convenience charges only for SOW workshop and if there's a PMS charge
    if (workshopId === 'sow-bijoynagar' && pmsLabor.length > 0) {
        pmsLabor.push({ name: 'SOW Convenience Charges', charge: 150 });
    }
    
    // Return empty array if it's a free service or if no matching paid service charge is found
    return pmsLabor;
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
