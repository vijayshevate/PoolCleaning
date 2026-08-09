import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConciergeService } from '../core/concierge.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-concierge-widget',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './concierge-widget.component.html',
  styleUrl: './concierge-widget.component.scss'
})
export class ConciergeWidgetComponent {
  private readonly router = inject(Router);
  readonly concierge = inject(ConciergeService);

  @ViewChild('log') private log?: ElementRef<HTMLDivElement>;

  readonly open = signal(false);
  readonly thinking = signal(false);
  draft = '';

  toggle(): void {
    this.open.update(value => !value);
  }

  send(text?: string): void {
    const message = (text ?? this.draft).trim();
    if (!message || this.thinking()) {
      return;
    }
    this.draft = '';
    this.thinking.set(true);
    this.concierge.send(message).subscribe(() => {
      this.thinking.set(false);
      this.scrollToBottom();
    });
    this.scrollToBottom();
  }

  handleQuickReply(reply: string): void {
    const route = this.routeFor(reply);
    if (route) {
      this.open.set(false);
      void this.router.navigate([route]);
      return;
    }
    this.send(reply);
  }

  private routeFor(reply: string): string | null {
    const value = reply.toLowerCase();
    if (value.includes('full estimate') || value.includes('exact estimate') || value.includes('run full')) {
      return '/estimate';
    }
    if (value.includes('book now')) {
      return '/book';
    }
    if (value.includes('service areas')) {
      return '/service-areas';
    }
    if (value.includes('see pricing')) {
      return '/pricing';
    }
    return null;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const element = this.log?.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  }
}
