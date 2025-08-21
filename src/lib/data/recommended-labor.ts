
// This file defines which custom labor tasks should be recommended at specific service intervals.

interface LaborRecommendation {
    [laborName: string]: number[]; // Maps a labor name to an array of kilometers at which it's recommended
}

// All kilometer values are in thousands (e.g., 20 represents 20,000 km)
export const recommendedLaborSchedule: LaborRecommendation = {
    // Wheel services are recommended at every paid service interval.
    // We use a special key 'all' to represent this.
    'WHEEL ALIGNMENT (4 HEAD)': 'all_paid',
    'WHEEL BALANCING - 5 WHEEL': 'all_paid',
    'WHEEL BALANCING - 4 WHEEL': 'all_paid',
    
    // Specific interval recommendations
    'THROTTLE BODY CLEANING': [40, 80, 120, 160, 200],
    'A/C SERVICING': [40, 80, 120, 160, 200],
    'FRONT BRAKE CALIPER OVERHAUL (BOTH SIDES)': [40, 80, 120, 160, 200],
    'REAR BRAKE SHOE REPLACEMENT (BOTH SIDES)': [40, 80, 120, 160, 200],
    'STRUT GREASING': [60, 120, 180],
    'EVAPORATOR CLEANING': [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
};
