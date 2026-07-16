# The Contracting Preacher

Federal contracting website, CRM, client portal, opportunity finder, and Cloudflare AI assistant for Dr. McKnight and The Contracting Preacher team.

## Live System

| Environment | URL |
| --- | --- |
| Production | https://contracting-preacher.pages.dev |
| Latest verified deployment | https://48d49e43.contracting-preacher.pages.dev |
| GitHub | https://github.com/rjbizsolution23-wq/contracting-preacher |
| Future custom domain | https://thecontractingpreacher.com |

## What This Repo Contains

This is no longer only a marketing site. It is a Cloudflare-backed federal contracting operating system with:

- Public service pages for SAM registration, proposal writing, and federal contracting certifications.
- Client intake with readiness scoring.
- Admin CRM for Dr. McKnight's team.
- Client portal with roadmap, watchlist, documents, and deadlines.
- AI contracting assistant powered by Cloudflare Workers AI.
- Unified opportunity finder across contracts, grants, SBIR/STTR, NOFOs, and award history.
- Open-data enrichment for entity, risk, public context, university, location, and website research.

## Product Routes

| Route | Purpose |
| --- | --- |
| `/` | Public homepage and conversion funnel |
| `/services` | Federal contracting services |
| `/intelligence` | Federal funding intelligence overview |
| `/opportunities` | Unified opportunity finder |
| `/agent` | Client-facing AI contracting assistant |
| `/intake` | Client intake and readiness scoring |
| `/admin` | Admin CRM command center |
| `/portal` | Client portal |
| `/resources` | Federal contracting resources |
| `/free-consultation` | Consultation booking |

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/agent/chat` | `POST` | AI assistant with federal-data tools |
| `/api/agent/status` | `GET` | AI, D1, KV, and tool readiness |
| `/api/crm/leads` | `GET/POST` | Lead creation and admin CRM list |
| `/api/funding/discover` | `GET` | Unified opportunity search |
| `/api/funding/search` | `GET` | Single-source federal search |
| `/api/funding/status` | `GET` | Federal-data configuration status |
| `/api/open-data/search` | `GET` | Open-data enrichment |
| `/api/portal/login` | `POST` | Client portal login |
| `/api/contact` | `POST` | Contact form |
| `/api/newsletter` | `POST` | Newsletter signup |

Detailed API docs: [docs/API.md](docs/API.md)

## Architecture

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Serverless API | Cloudflare Pages Functions |
| AI | Cloudflare Workers AI binding named `AI` |
| CRM database | Cloudflare D1 binding named `DB` |
| Cache | Cloudflare KV binding named `FEDFUNDING_CACHE` |
| Deployment | Cloudflare Pages |
| CI/CD | GitHub Actions |

Architecture docs: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Federal Data Sources

| Source | Status | Auth |
| --- | --- | --- |
| SAM.gov Opportunities | Wired, key required | `SAM_API_KEY` or `SAMS_API_KEY` |
| Simpler.Grants.gov | Wired, key recommended | `SIMPLER_GRANTS_API_KEY` |
| Legacy Grants.gov Search2 | Wired fallback | None |
| USAspending.gov | Wired | None |
| SBIR.gov | Wired | None |
| Federal Register | Wired | None |
| OpenCorporates | Wired, key required | `OPEN_CORPORATES_API_KEY` |
| OpenSanctions | Wired, key required | `OPENSANCTIONS_API_KEY` |
| Microlink, Wikidata, Wikipedia, Archive.org, Teleport, Universities List | Wired | None |

Data-source notes: [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md)

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Open:

```text
http://localhost:3000
```

Use `.env.example` as the local configuration template. Do not commit real secrets.

## Validation

```bash
npm run lint
npm run build
npm run verify
```

Known current lint warnings are unrelated legacy warnings in:

- `src/app/blog/[slug]/page.tsx`
- `src/app/resources/page.tsx`
- `src/components/forms/BookingCalendar.tsx`
- `src/components/home/TestimonialsCarousel.tsx`
- `src/lib/schema.ts`

## Deployment

Production branch:

```text
production
```

Manual production deploy:

```bash
npm run build
npx wrangler pages deploy out --project-name contracting-preacher --branch production --commit-dirty=true
```

Deployment runbook: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Cloudflare Bindings

Declared in `wrangler.toml`:

| Binding | Type | Purpose |
| --- | --- | --- |
| `AI` | Workers AI | Agent responses |
| `DB` | D1 | CRM leads |
| `FEDFUNDING_CACHE` | KV | Federal-data cache |

## Cloudflare Secrets

Required or recommended production secrets:

```text
ADMIN_ACCESS_CODE
PORTAL_ACCESS_CODE
SENDGRID_API_KEY
SENDGRID_FROM_EMAIL
SAM_API_KEY
SAMS_API_KEY
SIMPLER_GRANTS_API_KEY
DATA_GOV_API_KEY
OPEN_CORPORATES_API_KEY
OPENSANCTIONS_API_KEY
OPENAI_API_KEY
OPENAI_MODEL
AGENT_MODEL
```

The requested admin access code has been set in Cloudflare production. Do not put real access codes or API keys in repository files.

## Production Smoke Checks

```bash
curl -I https://contracting-preacher.pages.dev/
curl https://contracting-preacher.pages.dev/api/agent/status
curl https://contracting-preacher.pages.dev/api/funding/status
curl 'https://contracting-preacher.pages.dev/api/funding/discover?q=cybersecurity&limit=2'
curl -X POST https://contracting-preacher.pages.dev/api/agent/chat \
  -H 'Content-Type: application/json' \
  --data '{"messages":[{"role":"user","content":"Find construction grants and contracts in South Carolina"}]}'
```

Release checklist: [docs/RELEASE-CHECKLIST.md](docs/RELEASE-CHECKLIST.md)

## Repository Guide

| File | Purpose |
| --- | --- |
| [docs/PRODUCT.md](docs/PRODUCT.md) | Product brief and workflows |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |
| [docs/API.md](docs/API.md) | API reference |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment guide |
| [docs/OPERATIONS.md](docs/OPERATIONS.md) | Runbook and incident notes |
| [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md) | Federal and open-data source map |
| [SECURITY.md](SECURITY.md) | Security policy |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution standards |
| [CHANGELOG.md](CHANGELOG.md) | Release history |

## Security and Accuracy

- Never commit secrets.
- Rotate any token pasted into chat, logs, screenshots, or issues.
- Do not show secret names, binding names, or provider fallback details in client-facing UI.
- Treat CRM readiness scores as operational triage, not legal advice.
- Verify SAM status, certification eligibility, solicitation deadlines, and grant requirements against current official sources before advising a client.

## License

Proprietary. See [LICENSE](LICENSE).
