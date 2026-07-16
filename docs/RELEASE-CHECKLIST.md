# Release Checklist

## Before Merge

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] No real secrets in changed files
- [ ] New routes documented
- [ ] New Cloudflare secrets/bindings documented
- [ ] New D1 migrations added under `db/`

## Before Production Deploy

- [ ] Cloudflare Pages project is `contracting-preacher`
- [ ] Deploy branch is `production`
- [ ] D1 schema applied remotely if changed
- [ ] `ADMIN_ACCESS_CODE` confirmed
- [ ] Agent status returns `live: true`
- [ ] Funding status returns D1 and KV bindings as true

## After Production Deploy

- [ ] `/` returns 200
- [ ] `/agent` returns 200
- [ ] `/admin` returns 200
- [ ] `/portal` returns 200
- [ ] `/api/agent/chat` returns 200
- [ ] `/api/funding/discover` returns 200 or 206 with partial-source warnings
- [ ] `/api/crm/leads` returns 401 without admin code
- [ ] `/api/crm/leads` returns 200 with admin code

## Evidence

Paste route checks, deployment URL, commit SHA, and known source warnings into the release notes.
