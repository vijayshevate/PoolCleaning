import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { EstimateService } from '../../core/estimate.service';
import { LeadService } from '../../core/lead.service';
import { EstimateResult, PoolCondition, PoolSize } from '../../core/models';
import { POOL_CONDITIONS, POOL_FEATURES, POOL_SIZES, PRICING_PLANS } from '../../core/site-data';

@Component({
  selector: 'app-estimate',
  standalone: true,
  imports: [FormsModule, RouterLink, IconComponent],
  templateUrl: './estimate.component.html',
  styleUrl: './estimate.component.scss'
})
export class EstimateComponent {
  private readonly estimates = inject(EstimateService);
  private readonly leads = inject(LeadService);
  private readonly router = inject(Router);

  readonly sizes = POOL_SIZES;
  readonly conditions = POOL_CONDITIONS;
  readonly featureOptions = POOL_FEATURES;
  readonly steps = ['Your Pool', 'Condition', 'Details', 'Contact', 'Estimate'];

  readonly step = signal(0);
  readonly result = signal<EstimateResult | null>(null);
  readonly submitted = signal(false);

  poolSize: PoolSize | null = null;
  condition: PoolCondition | null = null;
  features: string[] = [];
  frequency: 'weekly' | 'biweekly' | 'onetime' = 'weekly';
  name = '';
  email = '';
  phone = '';
  zip = '';

  readonly recommendedPlan = computed(() => {
    const result = this.result();
    return result ? PRICING_PLANS.find(plan => plan.id === result.recommendedPlanId) : undefined;
  });

  canAdvance(): boolean {
    switch (this.step()) {
      case 0:
        return this.poolSize !== null;
      case 1:
        return this.condition !== null;
      default:
        return true;
    }
  }

  selectSize(size: PoolSize): void {
    this.poolSize = size;
  }

  selectCondition(condition: PoolCondition): void {
    this.condition = condition;
  }

  toggleFeature(feature: string): void {
    this.features = this.features.includes(feature)
      ? this.features.filter(item => item !== feature)
      : [...this.features, feature];
  }

  next(): void {
    if (this.step() === 3) {
      this.submit();
      return;
    }
    if (!this.canAdvance()) {
      return;
    }
    this.step.update(step => Math.min(step + 1, this.steps.length - 1));
  }

  back(): void {
    this.step.update(step => Math.max(step - 1, 0));
  }

  private submit(): void {
    this.submitted.set(true);
    if (!this.contactValid()) {
      return;
    }
    this.result.set(
      this.estimates.calculate({
        poolSize: this.poolSize ?? 'unknown',
        condition: this.condition ?? 'sparkling',
        features: this.features,
        frequency: this.frequency
      })
    );
    this.leads.capture({
      name: this.name,
      email: this.email,
      phone: this.phone,
      zip: this.zip,
      source: 'estimate',
      message: `Pool: ${this.poolSize}, condition: ${this.condition}, frequency: ${this.frequency}`
    });
    this.step.set(4);
  }

  contactValid(): boolean {
    return (
      this.name.trim().length > 1 &&
      this.email.includes('@') &&
      this.phone.replace(/\D/g, '').length >= 10 &&
      /^\d{5}$/.test(this.zip.trim())
    );
  }

  bookWithPlan(): void {
    void this.router.navigate(['/book'], {
      queryParams: { plan: this.result()?.recommendedPlanId ?? 'standard' }
    });
  }

  restart(): void {
    this.step.set(0);
    this.result.set(null);
    this.submitted.set(false);
    this.poolSize = null;
    this.condition = null;
    this.features = [];
    this.frequency = 'weekly';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.zip = '';
  }
}
