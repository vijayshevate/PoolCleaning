import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { COMPANY, STATS } from '../../core/site-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="section">
      <div class="container about">
        <div>
          <p class="eyebrow">About us</p>
          <h1>Pool people, not a call center.</h1>
          <p class="muted">
            {{ company.name }} started with one truck and a simple promise: show up on time, leave the water perfect,
            and never surprise a customer with a bill. Ten years later we still service every pool ourselves — no
            subcontractors.
          </p>
          <ul class="values">
            @for (value of values; track value.title) {
              <li>
                <app-icon [name]="value.icon" [size]="20" />
                <div>
                  <strong>{{ value.title }}</strong>
                  <span class="muted">{{ value.detail }}</span>
                </div>
              </li>
            }
          </ul>
          <a class="btn btn--primary" routerLink="/estimate">Get My Free Estimate</a>
        </div>
        <div class="media-placeholder about__media"><span>Our crew</span></div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container grid grid--3">
        @for (stat of stats; track stat.label) {
          <div class="stat">
            <strong>{{ stat.value }}</strong>
            <span class="muted">{{ stat.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .about {
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        gap: 34px;
        align-items: center;
      }

      .about__media {
        min-height: 320px;
      }

      .values {
        list-style: none;
        padding: 0;
        margin: 22px 0;
        display: grid;
        gap: 16px;
      }

      .values li {
        display: flex;
        gap: 12px;
      }

      .values app-icon {
        color: var(--brand);
        margin-top: 3px;
      }

      .values strong {
        display: block;
      }

      .values span {
        font-size: 0.875rem;
      }

      .stat {
        text-align: center;
      }

      .stat strong {
        display: block;
        font-size: 2rem;
        color: var(--brand);
      }

      @media (max-width: 900px) {
        .about {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class AboutComponent {
  readonly company = COMPANY;
  readonly stats = STATS;

  readonly values = [
    { icon: 'shield', title: 'Licensed & insured', detail: 'Fully covered crews with background-checked technicians.' },
    { icon: 'clock', title: 'On-time service', detail: 'You get an arrival window and a text when we are on the way.' },
    { icon: 'flask', title: 'Water reports every visit', detail: 'Exact chemistry numbers, not "looks good".' },
    { icon: 'check', title: 'No contracts', detail: 'Month to month, cancel or pause any time.' }
  ];
}
