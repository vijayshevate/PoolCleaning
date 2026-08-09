import { TestBed } from '@angular/core/testing';
import { ConciergeService } from './concierge.service';

describe('ConciergeService', () => {
  let service: ConciergeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciergeService);
    service.reset();
  });

  function lastReply(): string {
    const messages = service.messages();
    return messages[messages.length - 1].text;
  }

  it('answers pricing questions with plan prices', () => {
    service.send('what is your pricing?');
    expect(lastReply()).toContain('$129');
  });

  it('quotes a green pool estimate', () => {
    service.send('how much for a large green pool?');
    expect(lastReply()).toContain('green');
  });

  it('confirms coverage for a serviced ZIP code', () => {
    service.send('do you serve 85048?');
    expect(lastReply()).toContain('Phoenix');
  });

  it('flags an unserviced ZIP code', () => {
    service.send('do you serve 99999?');
    expect(lastReply()).toContain('do not have a route');
  });

  it('hands off to a human on request', () => {
    service.send('I want to talk to a human');
    expect(service.handedOff()).toBeTrue();
  });
});
