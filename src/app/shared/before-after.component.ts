import { Component, Input, signal } from '@angular/core';
import { Transformation } from '../core/models';

@Component({
  selector: 'app-before-after',
  standalone: true,
  template: `
    <figure class="ba">
      <div class="ba__panes">
        <div class="ba__pane media-placeholder">
          <span class="ba__tag">{{ item.beforeLabel }}</span>
          <span class="ba__hint">Before photo</span>
        </div>
        <button type="button" class="ba__swap" (click)="toggle()" [attr.aria-pressed]="showingAfter()">
          {{ showingAfter() ? 'Show before' : 'Show after' }}
        </button>
        <div class="ba__pane media-placeholder" [class.ba__pane--dim]="!showingAfter()">
          <span class="ba__tag ba__tag--after">{{ item.afterLabel }}</span>
          <span class="ba__hint">After photo</span>
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
