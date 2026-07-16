# Deployment

## Production

Production URL:

```text
https://contracting-preacher.pages.dev
```

Cloudflare Pages project:

```text
contracting-preacher
```

Production branch:

```text
production
```

## Build

```bash
npm install --legacy-peer-deps
npm run verify
```

## Manual Production Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name contracting-preacher --branch production --commit-dirty=true
```

## Required Cloudflare Bindings

These are declared in `wrangler.toml`:

| Binding | Type | Purpose |
| --- | --- | --- |
| `AI` | Workers AI | Generates agent responses |
| `DB` | D1 | Stores CRM leads |
| `FEDFUNDING_CACHE` | KV | Caches federal-data responses |

## Required Cloudflare Secrets

| Secret | Required | Purpose |
| --- | --- | --- |
| `ADMIN_ACCESS_CODE` | Yes | Admin CRM access |
| `PORTAL_ACCESS_CODE` | Yes | Client portal access |
| `SENDGRID_API_KEY` | Optional | Contact/newsletter email |
| `SENDGRID_FROM_EMAIL` | Optional | Sender address |
| `SAM_API_KEY` or `SAMS_API_KEY` | Recommended | SAM.gov live contract search |
| `SIMPLER_GRANTS_API_KEY` | Recommended | Modern Grants.gov API |
| `DATA_GOV_API_KEY` | Optional | api.data.gov sources |
| `OPEN_CORPORATES_API_KEY` | Optional | Entity lookup |
| `OPENSANCTIONS_API_KEY` | Optional | Sanctions/risk lookup |
| `OPENAI_API_KEY` | Optional | Fallback LLM if Cloudflare AI is unavailable |

## Set Secrets

```bash
printf '%s' 'mcknight1' | npx wrangler pages secret put ADMIN_ACCESS_CODE --project-name contracting-preacher
npx wrangler pages secret put PORTAL_ACCESS_CODE --project-name contracting-preacher
npx wrangler pages secret put SAM_API_KEY --project-name contracting-preacher
npx wrangler pages secret put SIMPLER_GRANTS_API_KEY --project-name contracting-preacher
```

## D1 Schema

Apply schema remotely:

```bash
npx wrangler d1 execute contracting_preacher_crm --remote --file db/0001_fedfunding_crm.sql
```

## Post-Deploy Checks

```bash
curl -I https://contracting-preacher.pages.dev/
curl https://contracting-preacher.pages.dev/api/agent/status
curl https://contracting-preacher.pages.dev/api/funding/status
curl 'https://contracting-preacher.pages.dev/api/funding/discover?q=cybersecurity&limit=2'
curl -X POST https://contracting-preacher.pages.dev/api/agent/chat \
  -H 'Content-Type: application/json' \
  --data '{"messages":[{"role":"user","content":"Find construction grants and contracts in South Carolina"}]}'
```
