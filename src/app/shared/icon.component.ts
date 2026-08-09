import { Component, Input } from '@angular/core';

const PATHS: Record<string, string> = {
  droplet: 'M12 2.7 6.8 8.5a7.2 7.2 0 1 0 10.4 0Z',
  leaf: 'M4 20c0-8 6-14 16-15 1 10-5 16-13 16H4Zm2-2c3-4 6-6 10-8',
  flask: 'M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V3M7.5 15h9',
  gauge: 'M12 13.5 16 9M4 19a9 9 0 1 1 16 0Z',
  filter: 'M3 5h18l-7 8v6l-4 2v-8Z',
  sparkle: 'M12 3l2.2 5.3L19.5 10l-5.3 1.7L12 17l-2.2-5.3L4.5 10l5.3-1.7ZM18 16l1 2.4 2.4 1-2.4 1L18 23l-1-2.6-2.4-1 2.4-1Z',
  check: 'M4 12.5 9.5 18 20 6.5',
  shield: 'M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6ZM8.5 12.5 11 15l4.5-5',
  clock: 'M12 7v5.5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  phone: 'M4 5c0-1 1-2 2-2h2l2 5-2.2 1.5a11 11 0 0 0 5.7 5.7L15 13l5 2v2c0 1-1 2-2 2A15 15 0 0 1 4 5Z',
  mail: 'M3 6h18v12H3ZM3 6l9 7 9-7',
  pin: 'M12 22s7-6.4 7-12A7 7 0 1 0 5 10c0 5.6 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  chat: 'M4 5h16v11H9l-5 4Z',
  calendar: 'M4 6h16v14H4ZM4 10h16M8 3v4M16 3v4',
  star: 'M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9Z',
  arrow: 'M5 12h13m-5-5 5 5-5 5',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0',
  dashboard: 'M4 4h7v7H4ZM13 4h7v4h-7ZM13 10h7v10h-7ZM4 13h7v7H4Z',
  invoice: 'M6 3h12v18l-3-2-3 2-3-2-3 2ZM9 8h6M9 12h6',
  wallet: 'M3 7h18v12H3ZM3 11h18M16 15h2',
  history: 'M12 7v5l4 2M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3 4v4h4',
  logout: 'M14 4H5v16h9M18 12H9m9 0-3.5-3.5M18 12l-3.5 3.5',
  camera: 'M4 8h3l1.5-2h7L17 8h3v11H4ZM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
  chart: 'M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9'
};

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path [attr.d]="path" />
    </svg>
  `,
  styles: [':host { display: inline-flex; line-height: 0; }']
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size = 20;

  get path(): string {
    return PATHS[this.name] ?? PATHS['droplet'];
  }
}
