import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IconComponent } from '../../shared/icon.component';
import { MediaComponent } from '../../shared/media.component';
import { PRICING_PLANS, SERVICES } from '../../core/site-data';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, IconComponent, MediaComponent],
  template: `
    @if (service(); as item) {
      <section class="section">
        <div class="container detail">
          <div>
            <a class="back" routerLink="/services"><app-icon name="arrow" [size]="16" /> All services</a>
            <h1>{{ item.name }}</h1>
            <p class="lede muted">{{ item.description }}</p>

            <h3>What's included</h3>
            <ul class="checks">
              @for (highlight of item.highlights; track highlight) {
                <li><app-icon name="check" [size]="18" /> {{ highlight }}</li>
              }
            </ul>

            <div class="actions">
              <a class="btn btn--primary" routerLink="/estimate">Get My Estimate</a>
              <a class="btn btn--ghost" routerLink="/book">Book This Service</a>
            </div>
          </div>

          <aside class="card">
            <app-media
              class="detail__media media--flush-top"
              [image]="item.image"
              ratio="16 / 10"
              sizes="(max-width: 900px) 100vw, 420px"
              [priority]="true"
            />
            <h3>Plans that include this</h3>
            <ul class="plans">
              @for (plan of plans; track plan.id) {
                <li>
                  <strong>{{ plan.name }}</strong>
                  <span class="muted">\${{ plan.price }}{{ plan.cadence }}</span>
                </li>
              }
            </ul>
            <a class="btn btn--subtle btn--block" routerLink="/pricing">Compare plans</a>
          </aside>
        </div>
      </section>
    } @else {
      <section class="section">
        <div class="container section__head">
          <h1>Service not found</h1>
          <p><a routerLink="/services">Browse all services</a></p>
        </div>
      </section>
    }
  `,
  styles: [
    `
      .detail {
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        gap: 32px;
        align-items: start;
      }

      .back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 14px;
      }

      .lede {
        font-size: 1.05rem;
      }

      .checks {
        list-style: none;
        padding: 0;
        margin: 0 0 24px;
        display: grid;
        gap: 10px;
      }

      .checks li {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .checks app-icon {
        color: var(--success);
      }

      .actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .plans {
        list-style: none;
        padding: 0;
        margin: 0 0 16px;
        display: grid;
        gap: 8px;
      }

      .plans li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--line);
        padding-bottom: 6px;
        font-size: 0.9rem;
      }

      aside.card {
        overflow: hidden;
      }

      .detail__media {
        margin: -20px -20px 16px;
      }

      @media (max-width: 900px) {
        .detail {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly plans = PRICING_PLANS;

  private readonly slug = toSignal(this.route.paramMap.pipe(map(params => params.get('slug') ?? '')), {
    initialValue: ''
  });

  readonly service = computed(() => SERVICES.find(item => item.slug === this.slug()));
}
