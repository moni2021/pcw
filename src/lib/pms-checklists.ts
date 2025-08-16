
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
        'Inspect for any fluid leaks',
        'Check and top-up all fluid levels (engine oil, coolant, brake fluid, washer fluid)',
        'Check tyre pressure and condition',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Advise on running-in period best practices',
        'Explain features and functions of the vehicle',
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
        'Check and top-up all fluid levels (engine oil, coolant, brake fluid, washer fluid)',
        'Check tyre pressure and condition',
        'Inspect battery and terminals',
        'Check brake pedal travel',
      ],
    },
  ],
  '3rd Free Service (10,000 km)': [
    {
      title: 'Replacements',
      icon: 'sparkle',
      items: ['Engine oil replacement', 'Oil filter replacement', 'Drain plug gasket replacement'],
    },
    {
      title: 'Inspections & Checks',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Inspect brake pads and discs',
        'Check and top-up all fluid levels',
        'Inspect battery and terminals',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect tyre condition and rotate tyres',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: ['Wheel alignment and balancing recommended', 'A/C filter cleaning/replacement recommended'],
    },
  ],
  'Paid Service (20,000 km)': [
    {
      title: 'Replacements',
      icon: 'sparkle',
      items: [
        'Engine oil replacement',
        'Oil filter replacement',
        'Drain plug gasket replacement',
        'Air filter replacement',
        'A/C (Cabin) filter replacement',
        'Brake fluid top-up/replacement as needed',
        'Diesel Filter replacement (for Diesel models)',
      ],
    },
    {
      title: 'Inspections, Cleaning & Checks',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Clean brake calipers and pads',
        'Inspect drive belts',
        'Check suspension components',
        'Inspect exhaust system',
        'Check all lights, horns, and wipers',
        'Tyre rotation, pressure check, and condition inspection',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Wheel alignment and balancing strongly recommended',
        'Throttle body cleaning if required',
        'Consider 3M interior/exterior treatments',
      ],
    },
  ],
  'Paid Service (30,000 km)': [
    {
      title: 'Replacements',
      icon: 'sparkle',
      items: [
        'Engine oil replacement',
        'Oil filter replacement',
        'Drain plug gasket replacement',
        'Coolant replacement/top-up',
      ],
    },
    {
      title: 'Inspections & Checks',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Inspect brake pads and discs',
        'Check and top-up all other fluid levels',
        'Inspect battery and terminals',
        'Check all lights, horns, and wipers for proper operation',
        'Inspect tyre condition and rotate tyres',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: ['Wheel alignment and balancing recommended', 'A/C performance check'],
    },
  ],
  'Paid Service (40,000 km)': [
    {
      title: 'Replacements',
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
      title: 'Inspections, Cleaning & Checks',
      icon: 'check',
      items: [
        'Wash vehicle',
        'Clean brake calipers and pads',
        'Inspect drive belts',
        'Check suspension for wear and tear',
        'Inspect exhaust system',
        'Check all lights, horns, and wipers',
        'Tyre rotation, pressure check, and condition inspection',
      ],
    },
    {
      title: 'Important Recommendations',
      icon: 'warn',
      items: [
        'Wheel alignment and balancing strongly recommended',
        'Throttle body cleaning',
        'A/C system servicing',
        'Consider 3M treatments (Antirust, Silencer coating)',
      ],
    },
  ],
};

// Add fallbacks for higher mileage services
const servicesToCopy = [
  { from: 'Paid Service (20,000 km)', to: 'Paid Service (100,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (50,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (70,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (90,000 km)' },
  { from: 'Paid Service (30,000 km)', to: 'Paid Service (110,000 km)' },
  { from: 'Paid Service (40,000 km)', to: 'Paid Service (80,000 km)' },
];

servicesToCopy.forEach(({ from, to }) => {
  if (pmsChecklists[from]) {
    pmsChecklists[to] = pmsChecklists[from];
  }
});

// Specific override for 60k and 120k km services
pmsChecklists['Paid Service (60,000 km)'] = [
  ...pmsChecklists['Paid Service (20,000 km)'],
  {
    title: 'Additional Replacements (60,000 km)',
    icon: 'sparkle',
    items: ['Transmission fluid replacement'],
  },
];

pmsChecklists['Paid Service (120,000 km)'] = [
  ...pmsChecklists['Paid Service (40,000 km)'],
  {
    title: 'Additional Replacements (120,000 km)',
    icon: 'sparkle',
    items: ['Transmission fluid replacement'],
  },
];
