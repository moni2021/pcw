
export interface ChecklistItem {
  title: string;
  items: string[];
  icon: 'check' | 'warn' | 'sparkle';
}
export type ChecklistCategory = ChecklistItem;

export const pmsChecklists: { [key: string]: ChecklistCategory[] } = {
  '1st Free Service (1,000 km)': [
    {
      title: 'Standard Checks & Adjustments',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect for any fluid leaks from the engine, transmission, and brakes',
        'Check and top-up all fluid levels (engine oil, coolant, brake fluid, washer fluid)',
        'Check tyre pressure and inspect for abnormal wear',
        'Check battery terminals for cleanliness and tightness',
        'Inspect underbody for any damage or loose components',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Advise on running-in period best practices',
        'Explain vehicle features, functions, and warning lights',
      ],
    },
  ],
  '2nd Free Service (5,000 km)': [
    {
      title: 'Standard Checks & Adjustments',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect for any fluid leaks',
        'Check and top-up all fluid levels',
        'Check tyre pressure and condition',
        'Inspect battery and terminals',
        'Check brake pedal travel and handbrake operation',
      ],
    },
     {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Discuss any driving concerns reported by the customer',
      ],
    },
  ],
  '3rd Free Service (10,000 km)': [
    {
      title: 'Mandatory Replacements',
      icon: 'sparkle',
      items: ['Engine oil replacement', 'Oil filter replacement', 'Drain plug gasket replacement'],
    },
    {
      title: 'Inspections & Cleaning',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Inspect brake pads and discs for wear',
        'Clean A/C filter',
        'Check and top-up coolant, brake, and washer fluids',
        'Inspect battery health and terminals',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect tyre condition, check pressure, and rotate tyres',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: ['Wheel alignment and balancing recommended to prevent uneven tyre wear', 'Consider A/C filter replacement if very dirty'],
    },
  ],
  'Paid Service (20,000 km)': [
    {
      title: 'Mandatory Replacements',
      icon: 'sparkle',
      items: [
        'Engine oil replacement',
        'Oil filter replacement',
        'Drain plug gasket replacement',
        'Air filter replacement',
        'A/C (Cabin) filter replacement',
        'Brake fluid replacement/top-up',
        'Diesel Filter replacement (for Diesel models, if applicable)',
      ],
    },
    {
      title: 'Inspections, Cleaning & Lubrication',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Clean front and rear brake calipers, pads, and drums',
        'Inspect drive belts for cracks and tension',
        'Check suspension components for any play or damage',
        'Inspect exhaust system for leaks or damage',
        'Check all lights, horns, and wipers',
        'Tyre rotation, pressure check, and condition inspection',
        'Lubricate all door hinges and locks',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Wheel alignment and balancing strongly recommended',
        'Throttle body cleaning if facing idling issues',
        'Consider 3M interior/exterior treatments for vehicle protection',
      ],
    },
  ],
  'Paid Service (30,000 km)': [
    {
      title: 'Mandatory Replacements',
      icon: 'sparkle',
      items: [
        'Engine oil replacement',
        'Oil filter replacement',
        'Drain plug gasket replacement',
        'Coolant replacement or top-up as required',
      ],
    },
    {
      title: 'Inspections & Checks',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Inspect brake pads and discs for wear',
        'Check and top-up all other fluid levels',
        'Inspect battery health and terminals',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect tyre condition and rotate tyres',
        'Check suspension and steering components',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: ['Wheel alignment and balancing recommended', 'A/C performance check and vent cleaning'],
    },
  ],
  'Paid Service (40,000 km)': [
    {
      title: 'Mandatory Replacements',
      icon: 'sparkle',
      items: [
        'Engine oil replacement',
        'Oil filter replacement',
        'Drain plug gasket replacement',
        'Air filter replacement',
        'A/C (Cabin) filter replacement',
        'Fuel filter replacement (Petrol models)',
        'Diesel Filter replacement (Diesel models)',
        'Spark plugs replacement (Petrol models)',
        'Brake fluid replacement',
      ],
    },
    {
      title: 'Inspections, Cleaning & Lubrication',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Clean front and rear brake calipers, pads, and drums',
        'Inspect drive belts for cracks and tension',
        'Check suspension for wear and tear',
        'Inspect exhaust system and heat shields',
        'Check all lights, horns, and wipers',
        'Tyre rotation, pressure check, and condition inspection',
        'Lubricate all door hinges and locks',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Wheel alignment and balancing is critical at this stage',
        'Throttle body cleaning is highly recommended',
        'Full A/C system servicing should be considered',
        'Consider 3M treatments (Antirust, Silencer coating)',
      ],
    },
  ],
};

// Add fallbacks for higher mileage services
const servicesToCopy = [
  { from: 'Paid Service (20,000 km)', to: 'Paid Service (100,000 km)' },
  { from: 'Paid Service (20,000 km)', to: 'Paid Service (140,000 km)' },
  { from: 'Paid Service (20,000 km)', to: 'Paid Service (180,000 km)' },
  { from: 'Paid Service (20,000 km)', to: 'Paid Service (220,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (50,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (70,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (90,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (110,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (130,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (150,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (170,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (190,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (210,000 km)' },
  { from: 'Paid Service (40,000 km)', to: 'Paid Service (80,000 km)' },
  { from: 'Paid Service (40,000 km)', to: 'Paid Service (160,000 km)' },
  { from: 'Paid Service (40,000 km)', to: 'Paid Service (200,000 km)' },
];

servicesToCopy.forEach(({ from, to }) => {
  if (pmsChecklists[from] && !pmsChecklists[to]) {
    pmsChecklists[to] = pmsChecklists[from];
  }
});

// Specific override for 60k and 120k km services
pmsChecklists['Paid Service (60,000 km)'] = [
  ...pmsChecklists['Paid Service (20,000 km)'],
  {
    title: 'Additional Replacements (60,000 km)',
    icon: 'sparkle',
    items: ['Transmission fluid replacement (if applicable)'],
  },
];

pmsChecklists['Paid Service (120,000 km)'] = [
  ...pmsChecklists['Paid Service (40,000 km)'],
  {
    title: 'Additional Replacements (120,000 km)',
    icon: 'sparkle',
    items: ['Transmission fluid replacement (if applicable)'],
  },
];
