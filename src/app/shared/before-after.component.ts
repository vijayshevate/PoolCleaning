import { Component, Input, signal } from '@angular/core';
import { Transformation } from '../core/models';
import { MediaComponent } from './media.component';

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [MediaComponent],
  template: `
    <figure class="ba">
      <div class="ba__panes">
        <div class="ba__pane">
          <app-media [image]="item.beforeImage" ratio="4 / 3" sizes="(max-width: 720px) 45vw, 300px" />
          <span class="ba__tag">{{ item.beforeLabel }}</span>
        </div>
        <button type="button" class="ba__swap" (click)="toggle()" [attr.aria-pressed]="showingAfter()">
          {{ showingAfter() ? 'Show before' : 'Show after' }}
        </button>
        <div class="ba__pane" [class.ba__pane--dim]="!showingAfter()">
          <app-media [image]="item.afterImage" ratio="4 / 3" sizes="(max-width: 720px) 45vw, 300px" />
          <span class="ba__tag ba__tag--after">{{ item.afterLabel }}</span>
        </div>
      </div>
      <figcaption>
        <strong>{{ item.title }}</strong>
        <span class="pill">{{ item.service }}</span>
        <p class="muted">{{ item.summary }}</p>
      </figcaption>
    </figure>
  `,
  styleUrl: './before-after.component.scss'
})
export class BeforeAfterComponent {
  @Input({ required: true }) item!: Transformation;

  readonly showingAfter = signal(true);

  toggle(): void {
    this.showingAfter.update(value => !value);
  }
}
