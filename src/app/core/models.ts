export interface ServiceItem {
  slug: string;
  name: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  blurb: string;
  features: string[];
  mostPopular: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Review {
  author: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

export interface Transformation {
  title: string;
  service: string;
  beforeLabel: string;
  afterLabel: string;
  summary: string;
}

export interface ServiceArea {
  city: string;
  zips: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  featured: boolean;
}

export type PoolSize = 'small' | 'medium' | 'large' | 'xlarge' | 'unknown';
export type PoolCondition = 'sparkling' | 'cloudy' | 'green' | 'neglected';

export interface EstimateRequest {
  poolSize: PoolSize;
  condition: PoolCondition;
  features: string[];
  frequency: 'weekly' | 'biweekly' | 'onetime';
  name: string;
  email: string;
  phone: string;
  zip: string;
}

export interface EstimateResult {
  monthlyLow: number;
  monthlyHigh: number;
  oneTime: number | null;
  recommendedPlanId: string;
  notes: string[];
}

export interface BookingRequest {
  serviceSlug: string;
  planId: string | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
}

export interface Booking extends BookingRequest {
  reference: string;
  serviceName: string;
  estimatedPrice: string;
  createdAt: string;
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  text: string;
  quickReplies?: string[];
  createdAt: string;
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  zip: string;
  source: 'estimate' | 'contact' | 'concierge' | 'booking';
  message?: string;
  qualified: boolean;
  createdAt: string;
}
