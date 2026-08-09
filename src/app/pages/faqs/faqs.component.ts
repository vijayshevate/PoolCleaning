import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS } from '../../core/site-data';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container narrow">
        <div class="section__head">
          <h1>Frequently Asked Questions</h1>
          <p>Still stuck? Ask the AI Pool Concierge in the corner — it answers these too.</p>
        </div>

        <div class="faqs">
          @for (faq of faqs; track faq.question; let i = $index) {
            <article class="card faq">
              <button type="button" class="faq__q" (click)="toggle(i)" [attr.aria-expanded]="open() === i">
                {{ faq.question }}
                <span>{{ open() === i ? '−' : '+' }}</span>
              </button>
              @if (open() === i) {
                <p class="muted faq__a">{{ faq.answer }}</p>
              }
            </article>
          }
        </div>

        <p class="center"><a class="btn btn--primary" routerLink="/estimate">Get My Free Estimate</a></p>
      </div>
    </section>
  `,
  styles: [
    `
      .narrow {
        max-width: 760px;
      }

      .faqs {
        display: grid;
        gap: 12px;
      }

      .faq {
        padding: 0;
      }

      .faq__q {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        width: 100%;
        background: none;
        border: none;
        font: inherit;
        font-weight: 600;
        text-align: left;
        padding: 16px 20px;
        cursor: pointer;
        color: var(--navy);
      }

      .faq__a {
        margin: 0;
        padding: 0 20px 16px;
        font-size: 0.9rem;
      }

      .center {
        text-align: center;
        margin-top: 26px;
      }
    `
  ]
})
export class FaqsComponent {
  readonly faqs = FAQS;
  readonly open = signal<number | null>(0);

  toggle(index: number): void {
    this.open.update(current => (current === index ? null : index));
  }
}
