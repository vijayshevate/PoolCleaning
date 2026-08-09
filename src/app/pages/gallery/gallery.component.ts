import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterComponent } from '../../shared/before-after.component';
import { TRANSFORMATIONS } from '../../core/site-data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, BeforeAfterComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h1>Before &amp; After</h1>
          <p>Transformations from pools around the Phoenix valley.</p>
        </div>
        <div class="grid grid--2">
          @for (item of transformations; track item.title) {
            <app-before-after [item]="item" />
          }
        </div>
        <p class="center"><a class="btn btn--primary" routerLink="/estimate">Get My Pool Assessed</a></p>
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
export class GalleryComponent {
  readonly transformations = TRANSFORMATIONS;
}
