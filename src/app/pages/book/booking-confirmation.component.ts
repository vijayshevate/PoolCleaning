import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { BookingService } from '../../core/booking.service';
import { COMPANY } from '../../core/site-data';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="section">
      <div class="container narrow">
        @if (booking(); as item) {
          <div class="card confirm">
            <span class="confirm__tick"><app-icon name="check" [size]="30" /></span>
            <h1>You're All Set!</h1>
            <p class="muted">Your pool service has been booked. Reference {{ item.reference }}.</p>

            <ul class="details">
              <li><app-icon name="droplet" [size]="18" /><span class="muted">Service</span><strong>{{ item.serviceName }}</strong></li>
              <li><app-icon name="calendar" [size]="18" /><span class="muted">Date</span><strong>{{ item.date }}</strong></li>
              <li><app-icon name="clock" [size]="18" /><span class="muted">Time</span><strong>{{ item.time }}</strong></li>
              <li><app-icon name="pin" [size]="18" /><span class="muted">Address</span><strong>{{ item.address }}, {{ item.city }} {{ item.zip }}</strong></li>
              <li><app-icon name="wallet" [size]="18" /><span class="muted">Estimated price</span><strong>{{ item.estimatedPrice }}</strong></li>
            </ul>

            <p class="muted small">
              We sent a confirmation to {{ item.email }} and {{ item.phone }}. Need to change something? Call
              {{ company.phone }}.
            </p>

            <div class="confirm__actions">
              <a class="btn btn--primary btn--block" routerLink="/portal">View My Booking</a>
              <a class="btn btn--subtle btn--block" routerLink="/">Back to Home</a>
            </div>
          </div>
        } @else {
          <div class="card confirm">
            <h1>No booking yet</h1>
            <p class="muted">Pick a service and time and we will hold your slot.</p>
            <a class="btn btn--primary" routerLink="/book">Book a Cleaning</a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .narrow {
        max-width: 560px;
      }

      .confirm {
        text-align: center;
        padding: 34px 28px;
      }

      .confirm__tick {
        display: grid;
        place-items: center;
        width: 62px;
        height: 62px;
        margin: 0 auto 16px;
        border-radius: 50%;
        background: var(--brand);
        color: #fff;
      }

      .details {
        list-style: none;
        margin: 22px 0;
        padding: 0;
        display: grid;
        gap: 10px;
        text-align: left;
      }

      .details li {
        display: grid;
        grid-template-columns: 24px 110px 1fr;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid var(--line);
        padding-bottom: 8px;
        font-size: 0.9rem;
      }

      .details app-icon {
        color: var(--brand);
      }

      .small {
        font-size: 0.8rem;
      }

      .confirm__actions {
        display: grid;
        gap: 10px;
        margin-top: 18px;
      }
    `
  ]
})
export class BookingConfirmationComponent {
  private readonly bookings = inject(BookingService);
  readonly company = COMPANY;
  readonly booking = this.bookings.lastBooking.asReadonly();
}
