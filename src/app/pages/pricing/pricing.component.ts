import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ADD_ONS, COMPANY, ONE_TIME_PLANS, PRICING_PLANS } from '../../core/site-data';

type Tab = 'weekly' | 'onetime' | 'addons';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  readonly company = COMPANY;
  readonly addOns = ADD_ONS;
  readonly tab = signal<Tab>('weekly');

  readonly tabs: { id: Tab; label: string }[] = [
    { id: 'weekly', label: 'Weekly Service' },
    { id: 'onetime', label: 'One-Time Service' },
    { id: 'addons', label: 'Add-Ons' }
  ];

  readonly plans = computed(() => (this.tab() === 'onetime' ? ONE_TIME_PLANS : PRICING_PLANS));

  select(tab: Tab): void {
    this.tab.set(tab);
  }
}
