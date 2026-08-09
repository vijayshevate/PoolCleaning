import { Component, Input } from '@angular/core';
import { Review } from '../core/models';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <article class="card review">
      <div class="review__stars" [attr.aria-label]="review.rating + ' out of 5 stars'">
        @for (star of stars; track $index) {
          <app-icon name="star" [size]="16" [class.dim]="$index >= review.rating" />
        }
      </div>
      <p class="review__text">“{{ review.text }}”</p>
      <p class="review__meta">
        <strong>{{ review.author }}</strong>
        <span class="muted">{{ review.city }} · {{ review.date }}</span>
      </p>
    </article>
  `,
  styles: [
    `
      .review {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .review__stars {
        display: flex;
        gap: 2px;
        color: #f59e0b;
        margin-bottom: 10px;
      }

      .review__stars .dim {
        color: #d6dced;
      }

      .review__text {
        flex: 1;
        font-size: 0.925rem;
      }

      .review__meta {
        margin: 0;
        display: flex;
        flex-direction: column;
        font-size: 0.85rem;
      }
    `
  ]
})
export class ReviewCardComponent {
  @Input({ required: true }) review!: Review;
  readonly stars = [0, 1, 2, 3, 4];
}
