import { Injectable, signal } from '@angular/core';
import { Lead } from './models';
import { SERVICE_AREAS } from './site-data';

const STORAGE_KEY = 'bpc.leads';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly leadsSignal = signal<Lead[]>(this.restore());

  readonly leads = this.leadsSignal.asReadonly();

  capture(lead: Omit<Lead, 'qualified' | 'createdAt'>): Lead {
    const stored: Lead = {
      ...lead,
      qualified: this.isQualified(lead.zip, lead.phone),
      createdAt: new Date().toISOString()
    };
    this.leadsSignal.update(leads => [stored, ...leads]);
    this.persist();
    return stored;
  }

  isServiced(zip: string): boolean {
    const normalized = zip.trim();
    return SERVICE_AREAS.some(area => area.zips.includes(normalized));
  }

  cityForZip(zip: string): string | null {
    const normalized = zip.trim();
    return SERVICE_AREAS.find(area => area.zips.includes(normalized))?.city ?? null;
  }

  private isQualified(zip: string, phone: string): boolean {
    return this.isServiced(zip) && phone.replace(/\D/g, '').length >= 10;
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.leadsSignal()));
  }

  private restore(): Lead[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw) as Lead[];
    } catch {
      return [];
    }
  }
}
