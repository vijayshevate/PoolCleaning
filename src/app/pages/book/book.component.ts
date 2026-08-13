import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { BookingService } from '../../core/booking.service';
import { LeadService } from '../../core/lead.service';
import { PRICING_PLANS, SERVICES, TIME_SLOTS } from '../../core/site-data';

interface CalendarDay {
  date: Date | null;
  iso: string;
  label: number | null;
  selectable: boolean;
}

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  private readonly bookings = inject(BookingService);
  private readonly leads = inject(LeadService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly services = SERVICES;
  readonly plans = PRICING_PLANS;
  readonly timeSlots = TIME_SLOTS;
  readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly steps = ['Service', 'Date & Time', 'Details', 'Confirm'];

  readonly step = signal(0);
  readonly month = signal(new Date());
  readonly submitted = signal(false);

  serviceSlug = SERVICES[0].slug;
  planId: string | null = 'standard';
  selectedDate = '';
  selectedTime = '';
  name = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  zip = '';
  notes = '';

  constructor() {
    const plan = this.route.snapshot.queryParamMap.get('plan');
    if (plan && PRICING_PLANS.some(item => item.id === plan)) {
      this.planId = plan;
    }
    const service = this.route.snapshot.queryParamMap.get('service');
    if (service && SERVICES.some(item => item.slug === service)) {
      this.serviceSlug = service;
    }
  }

  readonly monthLabel = computed(() =>
    this.month().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );

  readonly calendar = computed<CalendarDay[]>(() => {
    const reference = this.month();
    const year = reference.getFullYear();
    const monthIndex = reference.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: CalendarDay[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, iso: `blank-${i}`, label: null, selectable: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      days.push({
        date,
        iso: this.toIso(date),
        label: day,
        selectable: date >= today && date.getDay() !== 0
      });
    }
    return days;
  });

  selectedService() {
    return SERVICES.find(item => item.slug === this.serviceSlug);
  }

  selectedPlan() {
    return this.plans.find(item => item.id === this.planId);
  }

  canAdvance(): boolean {
    switch (this.step()) {
      case 1:
        return !!this.selectedDate && !!this.selectedTime;
      default:
        return true;
    }
  }

  shiftMonth(offset: number): void {
    const current = this.month();
    this.month.set(new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  pickDay(day: CalendarDay): void {
    if (!day.selectable) {
      return;
    }
    this.selectedDate = day.iso;
    this.selectedTime = '';
  }

  pickTime(time: string): void {
    this.selectedTime = time;
  }

  next(): void {
    if (this.step() === 2) {
      this.submitted.set(true);
      if (this.detailsValid()) {
        this.step.set(3);
      }
      return;
    }
    if (this.step() === 3) {
      this.confirm();
      return;
    }
    if (this.canAdvance()) {
      this.step.update(step => step + 1);
    }
  }

  back(): void {
    this.step.update(step => Math.max(0, step - 1));
  }

  detailsValid(): boolean {
    return (
      this.name.trim().length > 1 &&
      this.email.includes('@') &&
      this.phone.replace(/\D/g, '').length >= 10 &&
      this.address.trim().length > 3 &&
      /^\d{5}$/.test(this.zip.trim())
    );
  }

  confirm(): void {
    this.submitted.set(true);
    if (!this.detailsValid()) {
      this.step.set(2);
      return;
    }
    this.leads.capture({
      name: this.name,
      email: this.email,
      phone: this.phone,
      zip: this.zip,
      source: 'booking',
      message: `Booked ${this.serviceSlug} on ${this.selectedDate} at ${this.selectedTime}`
    });
    this.bookings.create({
      serviceSlug: this.serviceSlug,
      planId: this.planId,
      date: this.selectedDate,
      time: this.selectedTime,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      zip: this.zip,
      notes: this.notes
    });
    void this.router.navigate(['/booking-confirmed']);
  }

  formatDate(iso: string): string {
    if (!iso) {
      return '';
    }
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  private toIso(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
