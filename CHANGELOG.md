# Changelog

## 2026-06-01

### Added

- Federal funding intelligence system pages:
  - `/intelligence`
  - `/opportunities`
  - `/agent`
  - `/admin`
  - `/intake`
  - `/portal`
- Cloudflare Pages Functions for:
  - AI agent chat and status
  - CRM lead intake and readiness scoring
  - Portal login
  - Unified opportunity discovery
  - Single-source federal searches
  - Open-data enrichment searches
- Cloudflare resources:
  - Workers AI binding declaration
  - D1 database binding
  - KV cache binding
- D1 CRM schema migration.
- GitHub contribution, security, issue, and PR templates.

### Changed

- Build script now forces production webpack output for stable Cloudflare Pages export.
- Public agent, admin, and portal copy now describes business value instead of infrastructure details.
- Admin production access code set in Cloudflare to the requested private code.

### Verified

- Production deployment: `https://contracting-preacher.pages.dev`
- Cloudflare Workers AI: live
- D1: live
- KV cache: live
- CRM access-code gate: live
