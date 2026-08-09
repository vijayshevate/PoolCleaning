import { TestBed } from '@angular/core/testing';
import { EstimateService } from './estimate.service';

describe('EstimateService', () => {
  let service: EstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimateService);
  });

  it('prices a larger pool above a small one', () => {
    const small = service.calculate({ poolSize: 'small', condition: 'sparkling', features: [], frequency: 'weekly' });
    const large = service.calculate({ poolSize: 'large', condition: 'sparkling', features: [], frequency: 'weekly' });
    expect(large.monthlyLow).toBeGreaterThan(small.monthlyLow);
  });

  it('returns a one-time price and no monthly commitment for single visits', () => {
    const result = service.calculate({
      poolSize: 'medium',
      condition: 'green',
      features: [],
      frequency: 'onetime'
    });
    expect(result.oneTime).toBeGreaterThan(0);
    expect(result.monthlyLow).toBe(0);
  });

  it('recommends premium for neglected pools', () => {
    const result = service.calculate({
      poolSize: 'medium',
      condition: 'neglected',
      features: [],
      frequency: 'weekly'
    });
    expect(result.recommendedPlanId).toBe('premium');
    expect(result.notes.length).toBeGreaterThan(0);
  });

  it('adds surcharges for equipment features', () => {
    const plain = service.calculate({ poolSize: 'medium', condition: 'sparkling', features: [], frequency: 'weekly' });
    const loaded = service.calculate({
      poolSize: 'medium',
      condition: 'sparkling',
      features: ['Heater', 'Spa / water feature'],
      frequency: 'weekly'
    });
    expect(loaded.monthlyHigh).toBeGreaterThan(plain.monthlyHigh);
  });
});
