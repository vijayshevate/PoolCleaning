import { Injectable } from '@angular/core';
import { EstimateRequest, EstimateResult, PoolCondition, PoolSize } from './models';

const SIZE_MULTIPLIER: Record<PoolSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.25,
  xlarge: 1.55,
  unknown: 1.1
};

const CONDITION_SURCHARGE: Record<PoolCondition, number> = {
  sparkling: 0,
  cloudy: 15,
  green: 45,
  neglected: 75
};

const FEATURE_SURCHARGE: Record<string, number> = {
  'Salt water system': 8,
  Heater: 10,
  'Spa / water feature': 12,
  'Screen enclosure': 5,
  'Heavy tree cover': 15,
  'Pets swim in pool': 10
};

const FREQUENCY_MULTIPLIER = {
  weekly: 1,
  biweekly: 0.7,
  onetime: 0
};

const BASE_MONTHLY = 99;

@Injectable({ providedIn: 'root' })
export class EstimateService {
  calculate(request: Omit<EstimateRequest, 'name' | 'email' | 'phone' | 'zip'>): EstimateResult {
    const featureCost = request.features.reduce((total, feature) => total + (FEATURE_SURCHARGE[feature] ?? 0), 0);
    const sizeAdjusted = BASE_MONTHLY * SIZE_MULTIPLIER[request.poolSize];
    const monthlyBase = (sizeAdjusted + featureCost) * FREQUENCY_MULTIPLIER[request.frequency];
    const notes: string[] = [];

    let oneTime: number | null = null;
    if (request.frequency === 'onetime') {
      oneTime = Math.round((sizeAdjusted + featureCost) * 1.4 + CONDITION_SURCHARGE[request.condition] * 3);
      notes.push('One-time visits are quoted per visit with no ongoing commitment.');
    }

    const monthlyLow = Math.round(monthlyBase / 5) * 5;
    const monthlyHigh = Math.round((monthlyBase * 1.18) / 5) * 5;

    if (request.condition === 'green' || request.condition === 'neglected') {
      notes.push(
        `A one-time recovery visit of about $${CONDITION_SURCHARGE[request.condition] * 6} is recommended before regular service starts.`
      );
    }

    if (request.poolSize === 'unknown') {
      notes.push('We assumed an average size pool. Your technician will confirm volume on the first visit.');
    }

    if (request.features.includes('Heavy tree cover')) {
      notes.push('Heavy tree cover usually means extra skimming time during the fall.');
    }

    return {
      monthlyLow,
      monthlyHigh,
      oneTime,
      recommendedPlanId: this.recommendPlan(request.poolSize, request.condition, request.features.length),
      notes
    };
  }

  private recommendPlan(size: PoolSize, condition: PoolCondition, featureCount: number): string {
    if (condition === 'neglected' || size === 'xlarge' || featureCount >= 4) {
      return 'premium';
    }
    if (condition === 'sparkling' && featureCount <= 1 && (size === 'small' || size === 'medium')) {
      return 'basic';
    }
    return 'standard';
  }
}
