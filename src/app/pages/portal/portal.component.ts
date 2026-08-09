import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { BookingService } from '../../core/booking.service';
import { COMPANY } from '../../core/site-data';

interface ServiceVisit {
  date: string;
  service: string;
  technician: string;
  status: 'Completed' | 'Scheduled';
}

interface Invoice {
  number: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Due';
}

type PortalTab = 'dashboard' | 'appointments' | 'history' | 'invoices' | 'assessment' | 'profile';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent {
  private readonly bookings = inject(BookingService);

  readonly company = COMPANY;
  readonly customerName = 'John';
  readonly tab = signal<PortalTab>('dashboard');
  readonly assessment = signal<string[] | null>(null);
  readonly assessedFile = signal<string | null>(null);

  readonly nav: { id: PortalTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'history', label: 'Service History', icon: 'history' },
    { id: 'invoices', label: 'Invoices', icon: 'invoice' },
    { id: 'assessment', label: 'Photo Assessment', icon: 'camera' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  readonly history: ServiceVisit[] = [
    { date: '2025-05-19', service: 'Weekly Pool Cleaning', technician: 'Mike R.', status: 'Completed' },
    { date: '2025-05-12', service: 'Weekly Pool Cleaning', technician: 'Mike R.', status: 'Completed' },
    { date: '2025-05-05', service: 'Green Pool Cleanup', technician: 'Dana P.', status: 'Completed' },
    { date: '2025-04-28', service: 'Filter Cleaning', technician: 'Mike R.', status: 'Completed' }
  ];

  readonly invoices: Invoice[] = [
    { number: 'INV-1042', date: '2025-05-01', amount: 129, status: 'Paid' },
    { number: 'INV-1021', date: '2025-04-01', amount: 129, status: 'Paid' },
    { number: 'INV-0998', date: '2025-03-01', amount: 218, status: 'Paid' }
  ];

  readonly waterBalance = [
    { label: 'pH', value: '7.4', verdict: 'Good' },
    { label: 'Chlorine', value: '2.1 ppm', verdict: 'Good' },
    { label: 'Alkalinity', value: '90 ppm', verdict: 'Good' },
    { label: 'Calcium', value: '260 ppm', verdict: 'Watch' }
  ];

  readonly nextAppointment = computed(() => {
    const booking = this.bookings.bookings()[0];
    return booking
      ? { date: booking.date, time: booking.time, service: booking.serviceName, reference: booking.reference }
      : { date: '2025-05-26', time: '10:00 AM', service: 'Weekly Pool Cleaning', reference: 'BPC-2025-1187' };
  });

  select(tab: PortalTab): void {
    this.tab.set(tab);
  }

  assess(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.assessedFile.set(file.name);
    this.assessment.set([
      'Water clarity: moderate haze detected — likely filter or chemistry related.',
      'Visible algae on the shallow-end wall; recommend brushing plus algaecide.',
      'Water line shows light calcium scale; a tile scrub add-on is suggested.',
      'Estimated recovery: 1 restoration visit plus weekly service.'
    ]);
  }
}
