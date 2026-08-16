import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterComponent } from '../../shared/before-after.component';
import { IconComponent } from '../../shared/icon.component';
import { MediaComponent } from '../../shared/media.component';
import { ReviewCardComponent } from '../../shared/review-card.component';
import { COMPANY, REVIEWS, SERVICES, STATS, TRANSFORMATIONS } from '../../core/site-data';
import { HERO_IMAGE } from '../../core/images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IconComponent, BeforeAfterComponent, ReviewCardComponent, MediaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly company = COMPANY;
  readonly heroImage = HERO_IMAGE;
  readonly services = SERVICES;
  readonly transformations = TRANSFORMATIONS;
  readonly reviews = REVIEWS.slice(0, 3);
  readonly stats = STATS;

  readonly promises = ['Licensed & Insured', '100% Satisfaction Guarantee', 'On-Time Service'];

  readonly steps = [
    { title: 'Get your estimate', detail: 'Answer five quick questions and see your price instantly.' },
    { title: 'Pick your day', detail: 'Choose the visit day and window that fits your week.' },
    { title: 'Swim, we handle the rest', detail: 'Weekly service, water reports and equipment checks.' }
  ];
}
