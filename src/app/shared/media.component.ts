import { Component, HostBinding, Input } from '@angular/core';
import { SiteImage } from '../core/models';

@Component({
  selector: 'app-media',
  standalone: true,
  template: `
    <img
      [src]="image.src"
      [srcset]="image.srcset"
      [attr.sizes]="sizes"
      [width]="image.width"
      [height]="image.height"
      [alt]="image.alt"
      [attr.loading]="priority ? null : 'lazy'"
      [attr.fetchpriority]="priority ? 'high' : null"
      decoding="async"
    />
  `,
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  @Input({ required: true }) image!: SiteImage;

  /** Rendered width hint for the browser's srcset selection. */
  @Input() sizes = '(max-width: 720px) 100vw, 50vw';

  /** Aspect ratio of the cropped frame, e.g. `16 / 9`. */
  @Input() ratio = '16 / 10';

  /** Eagerly load with high priority (use for above-the-fold imagery only). */
  @Input() priority = false;

  @HostBinding('style.aspect-ratio')
  get aspectRatio(): string {
    return this.ratio;
  }
}
