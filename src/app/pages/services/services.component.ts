import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { MediaComponent } from '../../shared/media.component';
import { SERVICES } from '../../core/site-data';
import { ConciergeService } from '../../core/concierge.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, IconComponent, MediaComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  private readonly concierge = inject(ConciergeService);
  readonly services = SERVICES;

  askConcierge(): void {
    this.concierge.send('Not sure what service I need');
  }
}
