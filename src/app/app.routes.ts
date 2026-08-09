import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Badass Pool Clean — Pool Cleaning in Phoenix, AZ',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'services',
    title: 'Our Services — Badass Pool Clean',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/:slug',
    title: 'Service Details — Badass Pool Clean',
    loadComponent: () => import('./pages/services/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'pricing',
    title: 'Pricing — Badass Pool Clean',
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'service-areas',
    title: 'Service Areas — Badass Pool Clean',
    loadComponent: () => import('./pages/service-areas/service-areas.component').then(m => m.ServiceAreasComponent)
  },
  {
    path: 'reviews',
    title: 'Reviews — Badass Pool Clean',
    loadComponent: () => import('./pages/reviews/reviews.component').then(m => m.ReviewsComponent)
  },
  {
    path: 'gallery',
    title: 'Before & After — Badass Pool Clean',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'estimate',
    title: 'Instant Estimate — Badass Pool Clean',
    loadComponent: () => import('./pages/estimate/estimate.component').then(m => m.EstimateComponent)
  },
  {
    path: 'book',
    title: 'Book Service — Badass Pool Clean',
    loadComponent: () => import('./pages/book/book.component').then(m => m.BookComponent)
  },
  {
    path: 'booking-confirmed',
    title: 'Booking Confirmed — Badass Pool Clean',
    loadComponent: () =>
      import('./pages/book/booking-confirmation.component').then(m => m.BookingConfirmationComponent)
  },
  {
    path: 'portal',
    title: 'Customer Portal — Badass Pool Clean',
    loadComponent: () => import('./pages/portal/portal.component').then(m => m.PortalComponent)
  },
  {
    path: 'blog',
    title: 'Pool Care Blog — Badass Pool Clean',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'contact',
    title: 'Contact Us — Badass Pool Clean',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'about',
    title: 'About Us — Badass Pool Clean',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'faqs',
    title: 'FAQs — Badass Pool Clean',
    loadComponent: () => import('./pages/faqs/faqs.component').then(m => m.FaqsComponent)
  },
  { path: '**', redirectTo: '' }
];
