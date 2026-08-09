import { Injectable, signal } from '@angular/core';
import { Booking, BookingRequest } from './models';
import { PRICING_PLANS, SERVICES } from './site-data';

const STORAGE_KEY = 'bpc.bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly bookingsSignal = signal<Booking[]>(this.restore());

  readonly bookings = this.bookingsSignal.asReadonly();
  readonly lastBooking = signal<Booking | null>(null);

  create(request: BookingRequest): Booking {
    const service = SERVICES.find(item => item.slug === request.serviceSlug);
    const plan = PRICING_PLANS.find(item => item.id === request.planId);
    const booking: Booking = {
      ...request,
      reference: this.reference(),
      serviceName: service?.name ?? 'Pool Service',
      estimatedPrice: plan ? `$${plan.price}${plan.cadence}` : 'Quoted on site',
      createdAt: new Date().toISOString()
    };
    this.bookingsSignal.update(bookings => [booking, ...bookings]);
    this.lastBooking.set(booking);
    this.persist();
    return booking;
  }

  private reference(): string {
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `BPC-${new Date().getFullYear()}-${random}`;
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookingsSignal()));
  }

  private restore(): Booking[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw) as Booking[];
    } catch {
      return [];
    }
  }
}
