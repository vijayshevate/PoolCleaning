import { Injectable, inject, signal } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ChatMessage, PoolCondition, PoolSize } from './models';
import { EstimateService } from './estimate.service';
import { LeadService } from './lead.service';
import { COMPANY, FAQS, SERVICES } from './site-data';

type Intent = 'greeting' | 'pricing' | 'estimate' | 'booking' | 'coverage' | 'services' | 'faq' | 'handoff' | 'fallback';

const GREETING: ChatMessage = {
  role: 'assistant',
  text: `Hi! I'm the ${COMPANY.name} Pool Concierge. I can price your service, answer pool questions, or get you booked. What can I help with?`,
  quickReplies: ['Get an estimate', 'Book a cleaning', 'My pool is green', 'Talk to a human'],
  createdAt: new Date().toISOString()
};

/**
 * Rule-based concierge. Intent detection and answer composition live here so a
 * hosted LLM endpoint can replace `reply()` without touching the chat UI.
 */
@Injectable({ providedIn: 'root' })
export class ConciergeService {
  private readonly estimates = inject(EstimateService);
  private readonly leads = inject(LeadService);

  readonly messages = signal<ChatMessage[]>([GREETING]);
  readonly handedOff = signal(false);

  reset(): void {
    this.messages.set([GREETING]);
    this.handedOff.set(false);
  }

  send(text: string): Observable<ChatMessage> {
    const trimmed = text.trim();
    if (!trimmed) {
      return of(this.assistant('Ask me anything about your pool and I will help.'));
    }
    this.messages.update(messages => [
      ...messages,
      { role: 'user', text: trimmed, createdAt: new Date().toISOString() }
    ]);

    const reply = this.reply(trimmed);
    this.messages.update(messages => [...messages, reply]);
    return of(reply).pipe(delay(450));
  }

  private reply(text: string): ChatMessage {
    switch (this.detectIntent(text)) {
      case 'greeting':
        return this.assistant('Happy to help! Tell me about your pool — size, condition, and your ZIP code.', [
          'Get an estimate',
          'See pricing',
          'Service areas'
        ]);
      case 'pricing':
        return this.assistant(
          'Weekly plans are $99 (Basic), $129 (Standard, most popular) and $179 (Premium) per month. Chemicals are always included and there is no contract.',
          ['Get an exact estimate', 'Book a cleaning']
        );
      case 'estimate':
        return this.estimateAnswer(text);
      case 'booking':
        return this.assistant(
          'I can get you on the schedule. Pick a service and time on the booking page and you will get an instant confirmation by email and text.',
          ['Book now', 'What is included?']
        );
      case 'coverage':
        return this.coverageAnswer(text);
      case 'services':
        return this.assistant(
          `We handle ${SERVICES.map(service => service.name.toLowerCase()).join(', ')}. Which one sounds closest to what you need?`,
          ['Weekly cleaning', 'Green pool cleanup', 'Filter cleaning']
        );
      case 'faq':
        return this.faqAnswer(text);
      case 'handoff':
        this.handedOff.set(true);
        return this.assistant(
          `No problem — I am handing you to a human. Call us at ${COMPANY.phone} or leave your name, phone and ZIP here and a technician will follow up within one business hour.`
        );
      default:
        return this.assistant(
          'I can help with pricing, estimates, booking, service areas, and pool care questions. Which would you like?',
          ['Get an estimate', 'See pricing', 'Talk to a human']
        );
    }
  }

  private detectIntent(text: string): Intent {
    const value = text.toLowerCase();
    if (/^(hi|hey|hello|yo)\b/.test(value)) {
      return 'greeting';
    }
    if (/(human|agent|person|representative|call me|talk to someone)/.test(value)) {
      return 'handoff';
    }
    if (/(book|schedule|appointment|available|slot)/.test(value)) {
      return 'booking';
    }
    if (/(estimate|quote|how much|what would it cost|cost for my)/.test(value)) {
      return 'estimate';
    }
    if (/(price|pricing|plan|monthly|cheap)/.test(value)) {
      return 'pricing';
    }
    if (/(\b\d{5}\b|area|serve|near me|zip|city)/.test(value)) {
      return 'coverage';
    }
    if (/(service|clean|acid wash|filter|chemical|equipment|green pool|algae)/.test(value)) {
      return this.matchFaq(value) ? 'faq' : 'services';
    }
    if (this.matchFaq(value)) {
      return 'faq';
    }
    return 'fallback';
  }

  private estimateAnswer(text: string): ChatMessage {
    const value = text.toLowerCase();
    const size = this.detectSize(value);
    const condition = this.detectCondition(value);
    const result = this.estimates.calculate({
      poolSize: size,
      condition,
      features: /salt/.test(value) ? ['Salt water system'] : [],
      frequency: /one\s?time|single visit/.test(value) ? 'onetime' : 'weekly'
    });

    const price = result.oneTime
      ? `about $${result.oneTime} for a one-time visit`
      : `about $${result.monthlyLow} - $${result.monthlyHigh} per month`;

    return this.assistant(
      `Based on a ${size === 'unknown' ? 'typical' : size} ${condition} pool, weekly service runs ${price}. ` +
        `I would recommend our ${result.recommendedPlanId} plan. Want the full 5-question estimate for an exact number?`,
      ['Run full estimate', 'Book a cleaning', 'Talk to a human']
    );
  }

  private coverageAnswer(text: string): ChatMessage {
    const zip = text.match(/\b\d{5}\b/)?.[0];
    if (!zip) {
      return this.assistant('What is your ZIP code? I will check if we service your area.', ['85048', '85251', '85224']);
    }
    const city = this.leads.cityForZip(zip);
    if (city) {
      return this.assistant(`Yes — we service ${zip} (${city}). Want me to check open appointment times?`, [
        'Book a cleaning',
        'Get an estimate'
      ]);
    }
    return this.assistant(
      `We do not have a route in ${zip} yet, but we are expanding. Leave your name and phone and we will reach out when we do.`,
      ['Talk to a human']
    );
  }

  private faqAnswer(text: string): ChatMessage {
    const faq = this.matchFaq(text.toLowerCase());
    return faq
      ? this.assistant(faq.answer, ['Get an estimate', 'Book a cleaning'])
      : this.assistant('I do not have that one yet — a technician can answer it directly.', ['Talk to a human']);
  }

  private matchFaq(value: string): (typeof FAQS)[number] | undefined {
    let best: { faq: (typeof FAQS)[number]; score: number } | undefined;
    for (const faq of FAQS) {
      const score = this.keywords(faq.question).filter(word => value.includes(word)).length;
      if (score > 0 && (!best || score > best.score)) {
        best = { faq, score };
      }
    }
    return best && best.score >= 2 ? best.faq : undefined;
  }

  private keywords(question: string): string[] {
    return question
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
  }

  private detectSize(value: string): PoolSize {
    if (/extra large|xl|60,?000|70,?000/.test(value)) {
      return 'xlarge';
    }
    if (/large|big|30,?000|40,?000/.test(value)) {
      return 'large';
    }
    if (/small|tiny|plunge|spool/.test(value)) {
      return 'small';
    }
    if (/medium|average|15,?000|20,?000/.test(value)) {
      return 'medium';
    }
    return 'unknown';
  }

  private detectCondition(value: string): PoolCondition {
    if (/green|algae|swamp/.test(value)) {
      return 'green';
    }
    if (/neglect|abandon|months|years/.test(value)) {
      return 'neglected';
    }
    if (/cloudy|murky|hazy/.test(value)) {
      return 'cloudy';
    }
    return 'sparkling';
  }

  private assistant(text: string, quickReplies?: string[]): ChatMessage {
    return { role: 'assistant', text, quickReplies, createdAt: new Date().toISOString() };
  }
}
