import type { CustomLabor } from '../../../types';
import { vehicles } from '../../../data';

const allModels = vehicles.map(v => v.model);

const createLaborForAllModels = (name: string, charge: number): Omit<CustomLabor, 'workshopId'>[] => {
    return allModels.map(model => ({ name, model, charge }));
};

const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
    // Existing and common services
    ...createLaborForAllModels('A/C SERVICING', 1710),
    ...createLaborForAllModels('WHEEL BALANCING - 4 WHEEL', 320),
    ...createLaborForAllModels('WHEEL BALANCING - 5 WHEEL', 400),
    ...createLaborForAllModels('WHEEL ALIGNMENT (4 HEAD)', 400),
    ...createLaborForAllModels('A/C GAS TOP-UP', 1600),
    ...createLaborForAllModels('HEADLAMP FOCUSSING', 400),
    ...createLaborForAllModels('STONE GUARD COATING', 800),
    ...createLaborForAllModels('SILENCER WELDING', 800),
    ...createLaborForAllModels('EVAPORATOR CLEANING', 300),
    ...createLaborForAllModels('ALL ELECTRICALS CHECK-UP', 450),
    ...createLaborForAllModels('STRUT GREASING', 1650),
    
    // Suspension
    ...createLaborForAllModels('FRONT STRUT (ONE SIDE)', 900),
    ...createLaborForAllModels('FRONT STRUT (BOTH SIDES)', 1700),
    ...createLaborForAllModels('REAR SHOCK ABSORBER (ONE SIDE)', 450),
    ...createLaborForAllModels('REAR SHOCK ABSORBER (BOTH SIDES)', 800),
    ...createLaborForAllModels('FRONT SUSPENSION ARM (ONE SIDE)', 500),
    ...createLaborForAllModels('FRONT SUSPENSION ARM (BOTH SIDES)', 900),
    ...createLaborForAllModels('FRONT STABILIZER BAR AND/OR MOUNT', 700),
    ...createLaborForAllModels('FRONT STABILIZER BAR LINK (ONE SIDE)', 250),
    ...createLaborForAllModels('FRONT STABILIZER BAR LINK (BOTH SIDES)', 450),
    ...createLaborForAllModels('FRONT WHEEL BEARING (ONE SIDE)', 800),
    ...createLaborForAllModels('FRONT WHEEL BEARING (BOTH SIDES)', 1500),
    ...createLaborForAllModels('REAR WHEEL BEARING (ONE SIDE)', 400),
    ...createLaborForAllModels('REAR WHEEL BEARING (BOTH SIDES)', 750),

    // Brakes
    ...createLaborForAllModels('FRONT DISC BRAKE PAD (BOTH SIDES)', 350),
    ...createLaborForAllModels('FRONT BRAKE CALIPER OVERHAUL (ONE SIDE)', 650),
    ...createLaborForAllModels('FRONT BRAKE CALIPER OVERHAUL (BOTH SIDES)', 1200),
    ...createLaborForAllModels('REAR BRAKE SHOE REPLACEMENT (BOTH SIDES)', 450),
    ...createLaborForAllModels('REAR WHEEL CYLINDER REPLACEMENT (ONE SIDE)', 300),
    ...createLaborForAllModels('REAR WHEEL CYLINDER REPLACEMENT (BOTH SIDES)', 550),
    ...createLaborForAllModels('BRAKE MASTER CYLINDER REPLACEMENT', 800),
    ...createLaborForAllModels('BRAKE BOOSTER REPLACEMENT', 1200),

    // Clutch & Transmission
    ...createLaborForAllModels('CLUTCH OVERHAUL (PLATE, COVER, BEARING)', 2500),
    ...createLaborForAllModels('CLUTCH CABLE REPLACEMENT', 400),
    ...createLaborForAllModels('GEAR SHIFTER CABLE REPLACEMENT', 700),
    ...createLaborForAllModels('MANUAL TRANSMISSION OVERHAUL', 6000),

    // Engine & Cooling
    ...createLaborForAllModels('RADIATOR REPLACEMENT', 1200),
    ...createLaborForAllModels('WATER PUMP REPLACEMENT', 1500),
    ...createLaborForAllModels('THERMOSTAT REPLACEMENT', 500),
    ...createLaborForAllModels('DRIVE BELT REPLACEMENT (ALT/AC/WATER PUMP)', 350),
    ...createLaborForAllModels('ENGINE MOUNTING REPLACEMENT (ONE)', 600),
    ...createLaborForAllModels('THROTTLE BODY CLEANING', 450),

    // Steering
    ...createLaborForAllModels('STEERING RACK REPLACEMENT (EPS)', 2200),
    ...createLaborForAllModels('TIE ROD END REPLACEMENT (ONE SIDE)', 350),
    ...createLaborForAllModels('TIE ROD END REPLACEMENT (BOTH SIDES)', 650),

    // Electrical
    ...createLaborForAllModels('ALTERNATOR REPLACEMENT', 900),
    ...createLaborForAllModels('STARTER MOTOR REPLACEMENT', 800),
    ...createLaborForAllModels('BATTERY REPLACEMENT', 200),
    ...createLaborForAllModels('BATTERY GROUND CABLE', 300),

    // Miscellaneous
    ...createLaborForAllModels('DOOR LATCH REPLACEMENT (ONE)', 400),
    ...createLaborForAllModels('WINDOW REGULATOR REPLACEMENT (ONE)', 550),
    ...createLaborForAllModels('FUEL PUMP / FUEL GAUGE REPLACEMENT', 1000),
    ...createLaborForAllModels('EXHAUST MANIFOLD GASKET REPLACEMENT', 750),
    ...createLaborForAllModels('SILENCER ASSEMBLY REPLACEMENT', 600),
];

export default customLabor;
