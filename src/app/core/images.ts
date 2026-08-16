import { SiteImage } from './models';

/**
 * Photography lives in `public/images` as two WebP widths per asset
 * (`<name>-<width>.webp`). Sources are listed in `public/images/CREDITS.md`.
 */
function asset(name: string, large: number, small: number, height: number, alt: string): SiteImage {
  return {
    src: `/images/${name}-${large}.webp`,
    srcset: `/images/${name}-${small}.webp ${small}w, /images/${name}-${large}.webp ${large}w`,
    width: large,
    height,
    alt
  };
}

export const HERO_IMAGE = asset(
  'hero-backyard-pool',
  1400,
  700,
  1050,
  'Sparkling blue backyard swimming pool beside a modern home'
);

export const CREW_IMAGE = asset(
  'team-crew',
  1200,
  600,
  900,
  'Pool service technician smiling next to a freshly cleaned pool'
);

export const SERVICE_AREA_IMAGE = asset(
  'service-area-phoenix-aerial',
  1400,
  700,
  788,
  'Aerial view of a Phoenix valley neighborhood full of backyard pools'
);

export const CONTACT_IMAGE = asset(
  'contact-phoenix-skyline',
  1400,
  700,
  788,
  'Phoenix, Arizona skyline with the desert mountains behind it'
);

export const SERVICE_IMAGES = {
  'weekly-pool-cleaning': asset(
    'service-weekly-cleaning',
    1200,
    600,
    750,
    'Clean residential pool and spa after a weekly service visit'
  ),
  'green-pool-cleanup': asset('service-green-pool', 1200, 600, 750, 'Neglected pool with green algae-stained water'),
  'chemical-balancing': asset(
    'service-chemical-balancing',
    1200,
    600,
    750,
    'Crystal clear pool water with perfectly balanced chemistry'
  ),
  'equipment-inspection': asset(
    'service-equipment-inspection',
    1200,
    600,
    750,
    'Pool pump and plumbing being inspected at the equipment pad'
  ),
  'filter-cleaning': asset('service-filter-cleaning', 1200, 600, 750, 'Pool filter and valve manifold ready for service'),
  'pool-drain-acid-wash': asset(
    'service-acid-wash',
    1200,
    600,
    750,
    'Empty pool with tiled surface prepared for an acid wash'
  )
} satisfies Record<string, SiteImage>;

export const TRANSFORMATION_IMAGES = {
  neglected: {
    before: asset(
      'transformation-neglected-before',
      1000,
      500,
      750,
      'Neglected backyard pool with murky green water before cleanup'
    ),
    after: asset('transformation-neglected-after', 1000, 500, 750, 'The same backyard pool restored to clear blue water')
  },
  tileLine: {
    before: asset('transformation-tile-before', 1000, 500, 750, 'Pool tile line covered in calcium scale and grime'),
    after: asset('transformation-tile-after', 1000, 500, 750, 'Clean mosaic pool tile line after a full scrub')
  },
  cloudyWater: {
    before: asset('transformation-cloudy-before', 1000, 500, 750, 'Cloudy pool water caused by a failing filter'),
    after: asset('transformation-cloudy-after', 1000, 500, 750, 'Clear pool water after a filter deep clean')
  }
} satisfies Record<string, { before: SiteImage; after: SiteImage }>;

export const BLOG_IMAGES = {
  'keep-pool-sparkling-all-summer': asset(
    'blog-summer-pool-care',
    1200,
    600,
    750,
    'Sunlight sparkling across clear blue pool water'
  ),
  'how-often-clean-pool-filter': asset('blog-pool-filter', 800, 400, 500, 'Resort pool at sunset lined with palm trees'),
  'signs-pool-needs-professional-help': asset(
    'blog-professional-help',
    800,
    400,
    500,
    'Pool ladder and deck on a bright sunny day'
  ),
  'ultimate-guide-pool-chemicals': asset('blog-pool-chemicals', 800, 400, 500, 'Close-up of rippling turquoise pool water')
} satisfies Record<string, SiteImage>;
