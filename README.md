# Badass Pool Clean

Customer-facing website for a pool cleaning company, built with Angular 18 (standalone components, lazy routes, SCSS).
The UI follows the approved wireframes: homepage, services, pricing, service areas, instant estimate flow, booking
flow, booking confirmation, customer portal, blog, contact and a global footer, plus an AI Pool Concierge chat widget.

## Getting started

```bash
npm install
npm start        # dev server on http://localhost:4200
npm run build    # production build into dist/
npm test         # unit tests (Karma + ChromeHeadless)
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage — hero, what we do, before/after, reviews, stats |
| `/services`, `/services/:slug` | Service catalog and detail |
| `/pricing` | Weekly / one-time / add-on pricing tabs |
| `/service-areas` | Coverage list + ZIP availability check |
| `/reviews`, `/gallery` | Reviews and before/after transformations |
| `/estimate` | 5-step instant estimate with live pricing engine |
| `/book`, `/booking-confirmed` | 4-step booking flow and confirmation |
| `/portal` | Customer portal (dashboard, appointments, history, invoices, photo assessment, profile) |
| `/blog`, `/faqs`, `/about`, `/contact` | Content and lead capture pages |

## Architecture

- `src/app/core/` — domain models, site content (`site-data.ts`) and services:
  - `estimate.service.ts` — deterministic pricing engine (size, condition, features, frequency).
  - `booking.service.ts` — booking creation and persistence (`localStorage`).
  - `lead.service.ts` — lead capture, qualification and ZIP coverage lookup.
  - `concierge.service.ts` — rule-based AI concierge: intent detection, FAQ answering, estimate quoting,
    booking hand-off and human hand-off.
- `src/app/layout/` — global header and footer.
- `src/app/shared/` — icon set, before/after viewer, review card, concierge chat widget.
- `src/app/pages/` — one lazily loaded standalone component per route.

## Roadmap status

Phase 1 (customer website) is implemented. Phase 2-4 capabilities are present as UI plus deterministic local logic so
they can be re-pointed at real providers without touching the components:

| Phase | Item | Status |
| --- | --- | --- |
| 1 | Homepage, services, before/after, reviews, service areas, estimate, contact | Done |
| 1 | AI Pool Concierge widget | Done (rule-based) |
| 2 | Lead qualification, estimate generation, FAQ answering, booking, lead capture, human handoff | Done in `ConciergeService` / `LeadService`; swap `ConciergeService.reply()` for an LLM endpoint |
| 3 | CRM, follow-up agent, SMS/email, appointment management, review agent | Not started — needs a backend (CRM store, Twilio/SendGrid credentials) |
| 4 | Photo assessment, customer portal, pool history, service reports | Portal, history and reports done; photo assessment is a mocked analyzer pending a vision API |
| 4 | Marketing agent, analytics, voice agent | Not started — needs analytics and telephony providers |

Leads, bookings and portal data are stored in the browser (`localStorage`) and seeded with demo content; no backend is
required to run or demo the site.
