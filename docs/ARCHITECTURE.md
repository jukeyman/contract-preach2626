# Architecture

## Product Surface

The Contracting Preacher system has three operating layers:

1. Public marketing site for federal contracting services.
2. Federal funding intelligence product layer for opportunity search, AI assistance, intake, and client portal views.
3. Cloudflare Pages Functions backend for CRM, AI agent, federal-data proxies, and open-data enrichment.

## Runtime

| Layer | Implementation |
| --- | --- |
| Web app | Next.js App Router static export |
| UI | React 19, Tailwind CSS, Lucide icons |
| Serverless API | Cloudflare Pages Functions |
| AI | Cloudflare Workers AI binding named `AI`; optional OpenAI fallback |
| CRM storage | Cloudflare D1 binding named `DB` |
| API cache | Cloudflare KV binding named `FEDFUNDING_CACHE` |
| Deployment | Cloudflare Pages project `contracting-preacher` |

## Key Pages

| Route | Purpose |
| --- | --- |
| `/` | Public conversion homepage |
| `/intelligence` | Federal funding intelligence overview |
| `/opportunities` | Unified opportunity finder |
| `/agent` | Client-facing AI contracting assistant |
| `/admin` | Dr. McKnight admin CRM |
| `/intake` | Client intake and readiness scoring |
| `/portal` | Client access-code portal |

## API Routes

| Route | Purpose |
| --- | --- |
| `/api/agent/chat` | Runs the AI assistant and calls internal tools |
| `/api/agent/status` | Reports AI, D1, KV, and tool readiness |
| `/api/crm/leads` | Creates and lists CRM leads |
| `/api/funding/discover` | Searches multiple federal sources and normalizes results |
| `/api/funding/search` | Searches one federal source |
| `/api/funding/status` | Reports configured federal-data sources |
| `/api/open-data/search` | Searches enrichment data sources |
| `/api/portal/login` | Opens client portal data after access-code validation |

## Agent Flow

1. User sends a message from `/agent`.
2. `/api/agent/chat` extracts a search intent.
3. The function calls internal tools such as `/api/funding/discover`, `/api/funding/status`, `/api/open-data/search`, and readiness guidance.
4. Tool results are summarized into an LLM prompt.
5. Cloudflare Workers AI generates the client-facing answer.
6. If no LLM binding exists, the route returns deterministic tool summarization instead of failing.

## Data Boundaries

- D1 stores submitted CRM leads.
- KV stores cacheable federal-data lookups.
- Secrets are read only from Cloudflare environment variables.
- Public UI should never expose secret names, API keys, binding names, internal warnings, or provider details.

## Failure Strategy

Each upstream source is isolated. If SAM.gov, SBIR.gov, USAspending, or another source is unavailable, the API returns partial results with source-level warnings instead of failing the whole search.
