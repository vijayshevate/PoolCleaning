import {
  AddOn,
  BlogPost,
  PricingPlan,
  Review,
  ServiceArea,
  ServiceItem,
  Transformation
} from './models';

export const COMPANY = {
  name: 'Badass Pool Clean',
  tagline: 'Cleaner pools. Happier homes.',
  phone: '(602) 555-1234',
  phoneHref: 'tel:+16025551234',
  email: 'info@badasspoolclean.com',
  address: '1234 Sunnyvale Dr.',
  cityState: 'Phoenix, AZ 85048',
  hours: [
    'Mon - Fri: 7AM - 6PM',
    'Sat: 8AM - 2PM',
    'Sun: Closed'
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    slug: 'weekly-pool-cleaning',
    name: 'Weekly Pool Cleaning',
    description: 'Regular cleaning, skimming, vacuuming and chemical balancing so your pool is always swim-ready.',
    icon: 'droplet',
    highlights: ['Skim & net debris', 'Vacuum floor and steps', 'Brush walls and tile line', 'Full chemical balance']
  },
  {
    slug: 'green-pool-cleanup',
    name: 'Green Pool Cleanup',
    description: 'Fast and effective green pool cleanup and restoration, from algae bloom back to crystal clear.',
    icon: 'leaf',
    highlights: ['Algae shock treatment', 'Heavy debris removal', 'Filter deep clean', 'Follow-up water test']
  },
  {
    slug: 'chemical-balancing',
    name: 'Chemical Balancing',
    description: 'Keep your water safe, comfortable and crystal clear with precise chemistry every visit.',
    icon: 'flask',
    highlights: ['pH & alkalinity', 'Chlorine / salt levels', 'Stabilizer and calcium', 'Written water report']
  },
  {
    slug: 'equipment-inspection',
    name: 'Equipment Inspection',
    description: 'We inspect and check all pool equipment to keep it running at peak efficiency.',
    icon: 'gauge',
    highlights: ['Pump & motor check', 'Heater diagnostics', 'Leak inspection', 'Repair recommendations']
  },
  {
    slug: 'filter-cleaning',
    name: 'Filter Cleaning',
    description: 'Extend the life of your filter and keep your water cleaner for longer.',
    icon: 'filter',
    highlights: ['Cartridge deep clean', 'DE / sand service', 'Pressure test', 'O-ring replacement']
  },
  {
    slug: 'pool-drain-acid-wash',
    name: 'Pool Drain & Acid Wash',
    description: 'Remove stains and buildup to bring your pool surface back to life.',
    icon: 'sparkle',
    highlights: ['Controlled drain', 'Acid wash surface', 'Stain and scale removal', 'Refill guidance']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    cadence: '/month',
    blurb: 'Essential cleaning and maintenance.',
    features: ['Skimming', 'Vacuuming', 'Brush walls', 'Chemical balance', 'Equipment check'],
    mostPopular: false
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 129,
    cadence: '/month',
    blurb: 'Everything you need for a sparkling clean pool.',
    features: ['Everything in Basic', 'Filter cleaning', 'Water test report', 'Priority scheduling'],
    mostPopular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 179,
    cadence: '/month',
    blurb: 'Our best service for a worry-free pool.',
    features: [
      'Everything in Standard',
      'Monthly deep clean',
      'Heater & salt check',
      'Equipment inspection',
      'No contract'
    ],
    mostPopular: false
  }
];

export const ONE_TIME_PLANS: PricingPlan[] = [
  {
    id: 'onetime-standard',
    name: 'One-Time Clean',
    price: 149,
    cadence: 'per visit',
    blurb: 'A single full-service visit, no commitment.',
    features: ['Full skim & vacuum', 'Brush walls and tile', 'Chemical balance', 'Water report'],
    mostPopular: false
  },
  {
    id: 'onetime-green',
    name: 'Green Pool Recovery',
    price: 349,
    cadence: 'starting at',
    blurb: 'Algae bloom cleanup and restoration.',
    features: ['Shock treatment', 'Debris removal', 'Filter deep clean', '1 follow-up visit'],
    mostPopular: true
  },
  {
    id: 'onetime-acid',
    name: 'Drain & Acid Wash',
    price: 595,
    cadence: 'starting at',
    blurb: 'Surface restoration for stained pools.',
    features: ['Controlled drain', 'Acid wash', 'Stain removal', 'Refill guidance'],
    mostPopular: false
  }
];

export const ADD_ONS: AddOn[] = [
  { id: 'filter-deep-clean', name: 'Filter Deep Clean', price: 89, description: 'Full teardown and cartridge cleaning.' },
  { id: 'salt-cell-service', name: 'Salt Cell Service', price: 79, description: 'Descale and inspect your salt cell.' },
  { id: 'tile-scrub', name: 'Tile Line Scrub', price: 69, description: 'Remove calcium buildup at the water line.' },
  { id: 'pet-hair', name: 'Heavy Debris Visit', price: 59, description: 'Extra time for storms, pets and heavy leaf fall.' }
];

export const REVIEWS: Review[] = [
  {
    author: 'Jessica M.',
    city: 'Scottsdale, AZ',
    rating: 5,
    text: 'Our pool went from swamp green to sparkling in two visits. The weekly service has kept it perfect since.',
    date: '2025-05-02'
  },
  {
    author: 'Daniel R.',
    city: 'Phoenix, AZ',
    rating: 5,
    text: 'On time every week, detailed water reports, and they caught a failing pump before it flooded my yard.',
    date: '2025-04-18'
  },
  {
    author: 'Priya S.',
    city: 'Chandler, AZ',
    rating: 5,
    text: 'Transparent pricing and no contract games. The instant estimate matched my actual bill exactly.',
    date: '2025-04-04'
  },
  {
    author: 'Marcus T.',
    city: 'Mesa, AZ',
    rating: 4,
    text: 'Great crew and easy scheduling. Would love a slightly earlier arrival window in summer.',
    date: '2025-03-21'
  }
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    title: 'Neglected backyard pool',
    service: 'Green Pool Cleanup',
    beforeLabel: 'Before',
    afterLabel: 'After',
    summary: 'Two weeks of algae bloom cleared in a single restoration visit plus one follow-up.'
  },
  {
    title: 'Calcium-stained tile line',
    service: 'Tile Line Scrub',
    beforeLabel: 'Before',
    afterLabel: 'After',
    summary: 'Heavy scale removed without draining the pool.'
  },
  {
    title: 'Cloudy water, failing filter',
    service: 'Filter Cleaning',
    beforeLabel: 'Before',
    afterLabel: 'After',
    summary: 'Cartridge deep clean and rebalanced chemistry restored clarity in 48 hours.'
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { city: 'Phoenix', zips: ['85001', '85004', '85048', '85050'] },
  { city: 'Scottsdale', zips: ['85251', '85254', '85260'] },
  { city: 'Mesa', zips: ['85201', '85206', '85213'] },
  { city: 'Tempe', zips: ['85281', '85283'] },
  { city: 'Chandler', zips: ['85224', '85226', '85248'] },
  { city: 'Gilbert', zips: ['85233', '85295', '85297'] },
  { city: 'Peoria', zips: ['85345', '85381', '85383'] },
  { city: 'Surprise', zips: ['85374', '85379'] },
  { city: 'Glendale', zips: ['85301', '85308', '85310'] }
];

export const STATS = [
  { value: '10+', label: 'Years in Business' },
  { value: '250+', label: 'Happy Customers' },
  { value: '100+', label: 'Pools Serviced' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'keep-pool-sparkling-all-summer',
    title: '5 Tips to Keep Your Pool Sparkling All Summer Long',
    excerpt:
      'Arizona summers are brutal on pool water. These five habits keep chemistry stable and algae out when temperatures climb past 110°F.',
    category: 'Pool Care',
    date: '2025-05-10',
    readMinutes: 6,
    featured: true
  },
  {
    slug: 'how-often-clean-pool-filter',
    title: 'How Often Should You Clean Your Pool Filter?',
    excerpt: 'Cartridge, DE and sand filters all have different service intervals. Here is the schedule we use.',
    category: 'Equipment',
    date: '2025-04-28',
    readMinutes: 4,
    featured: false
  },
  {
    slug: 'signs-pool-needs-professional-help',
    title: 'Signs Your Pool Needs Professional Help',
    excerpt: 'Persistent cloudiness, short filter cycles and rising chlorine demand are early warnings worth acting on.',
    category: 'Maintenance',
    date: '2025-04-15',
    readMinutes: 5,
    featured: false
  },
  {
    slug: 'ultimate-guide-pool-chemicals',
    title: 'The Ultimate Guide to Pool Chemicals',
    excerpt: 'pH, alkalinity, calcium hardness and stabilizer explained in plain English, with target ranges.',
    category: 'Chemistry',
    date: '2025-04-01',
    readMinutes: 9,
    featured: false
  }
];

export const FAQS = [
  {
    question: 'How much does weekly pool cleaning cost?',
    answer:
      'Weekly plans start at $99/month for standard residential pools. Our most popular Standard plan is $129/month and includes filter cleaning and a written water report.'
  },
  {
    question: 'Do you require a contract?',
    answer: 'No. All plans are month to month and you can cancel or pause any time, including our Premium plan.'
  },
  {
    question: 'Are chemicals included in the price?',
    answer: 'Yes, all standard chemicals are included in every plan. Specialty treatments such as algaecide are quoted up front.'
  },
  {
    question: 'How fast can you fix a green pool?',
    answer:
      'Most green pools clear within 3 to 5 days. We shock the water, remove debris, deep clean the filter and return for a follow-up water test.'
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve Phoenix, Scottsdale, Mesa, Tempe, Chandler, Gilbert, Peoria, Surprise and Glendale. Enter your ZIP code on the Service Areas page to confirm.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes. We are fully licensed and insured, and every visit is backed by our 100% satisfaction guarantee.'
  }
];

export const POOL_SIZES = [
  { id: 'small', label: 'Small', detail: 'Up to 11,000 gal' },
  { id: 'medium', label: 'Medium', detail: '11,000 - 20,000 gal' },
  { id: 'large', label: 'Large', detail: '20,000 - 50,000 gal' },
  { id: 'xlarge', label: 'Extra Large', detail: '50,000+ gal' }
] as const;

export const POOL_CONDITIONS = [
  { id: 'sparkling', label: 'Sparkling', detail: 'Clear water, well maintained' },
  { id: 'cloudy', label: 'Cloudy', detail: 'Hazy water, needs balancing' },
  { id: 'green', label: 'Green', detail: 'Visible algae bloom' },
  { id: 'neglected', label: 'Neglected', detail: 'Unused for months' }
] as const;

export const POOL_FEATURES = [
  'Salt water system',
  'Heater',
  'Spa / water feature',
  'Screen enclosure',
  'Heavy tree cover',
  'Pets swim in pool'
];

export const TIME_SLOTS = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
