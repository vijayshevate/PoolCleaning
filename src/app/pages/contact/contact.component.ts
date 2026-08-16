import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/icon.component';
import { MediaComponent } from '../../shared/media.component';
import { LeadService } from '../../core/lead.service';
import { COMPANY, SERVICE_AREAS } from '../../core/site-data';
import { CONTACT_IMAGE } from '../../core/images';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, IconComponent, MediaComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly leads = inject(LeadService);

  readonly company = COMPANY;
  readonly contactImage = CONTACT_IMAGE;
  readonly areas = SERVICE_AREAS.map(area => area.city);
  readonly sent = signal(false);
  readonly submitted = signal(false);

  name = '';
  phone = '';
  email = '';
  zip = '';
  message = '';

  submit(): void {
    this.submitted.set(true);
    if (!this.valid()) {
      return;
    }
    this.leads.capture({
      name: this.name,
      email: this.email,
      phone: this.phone,
      zip: this.zip,
      source: 'contact',
      message: this.message
    });
    this.sent.set(true);
    this.name = '';
    this.phone = '';
    this.email = '';
    this.zip = '';
    this.message = '';
    this.submitted.set(false);
  }

  valid(): boolean {
    return this.name.trim().length > 1 && this.email.includes('@') && this.message.trim().length > 4;
  }
}
