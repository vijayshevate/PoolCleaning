import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COMPANY, SERVICES } from '../core/site-data';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss'
})
export class SiteFooterComponent {
  readonly company = COMPANY;
  readonly services = SERVICES;
  readonly year = new Date().getFullYear();

  email = '';
  readonly subscribed = signal(false);

  subscribe(): void {
    if (!this.email.includes('@')) {
      return;
    }
    this.subscribed.set(true);
    this.email = '';
  }
}
