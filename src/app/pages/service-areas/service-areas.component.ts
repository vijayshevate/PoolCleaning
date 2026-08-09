import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { LeadService } from '../../core/lead.service';
import { SERVICE_AREAS, STATS } from '../../core/site-data';

@Component({
  selector: 'app-service-areas',
  standalone: true,
  imports: [FormsModule, RouterLink, IconComponent],
  templateUrl: './service-areas.component.html',
  styleUrl: './service-areas.component.scss'
})
export class ServiceAreasComponent {
  private readonly leads = inject(LeadService);

  readonly areas = SERVICE_AREAS;
  readonly stats = STATS;

  zip = '';
  readonly result = signal<{ serviced: boolean; zip: string; city: string | null } | null>(null);

  check(): void {
    const zip = this.zip.trim();
    if (!/^\d{5}$/.test(zip)) {
      this.result.set(null);
      return;
    }
    this.result.set({ serviced: this.leads.isServiced(zip), zip, city: this.leads.cityForZip(zip) });
  }
}
