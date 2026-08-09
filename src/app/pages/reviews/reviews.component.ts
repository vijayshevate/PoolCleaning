import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewCardComponent } from '../../shared/review-card.component';
import { REVIEWS } from '../../core/site-data';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink, ReviewCardComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h1>What Our Customers Say</h1>
          <p>{{ average }} average rating across {{ reviews.length }} verified reviews.</p>
        </div>
        <div class="grid grid--3">
          @for (review of reviews; track review.author) {
            <app-review-card [review]="review" />
          }
        </div>
        <p class="center"><a class="btn btn--primary" routerLink="/estimate">Get My Free Estimate</a></p>
      </div>
    </section>
  `,
  styles: [
    `
      .center {
        text-align: center;
        margin-top: 30px;
      }
    `
  ]
})
export class ReviewsComponent {
  readonly reviews = REVIEWS;
  readonly average = (REVIEWS.reduce((total, review) => total + review.rating, 0) / REVIEWS.length).toFixed(1);
}
