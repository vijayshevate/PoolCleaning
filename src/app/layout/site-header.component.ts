import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../shared/icon.component';
import { COMPANY } from '../core/site-data';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent {
  readonly company = COMPANY;
  readonly menuOpen = signal(false);

  readonly links = [
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/service-areas', label: 'Service Areas' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/portal', label: 'My Account' }
  ];

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
