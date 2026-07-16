# Operations Runbook

## Daily Checks

1. Open `/api/agent/status`.
2. Open `/api/funding/status`.
3. Submit a low-volume test to `/api/funding/discover`.
4. Confirm `/admin` unlocks with the current admin access code.
5. Confirm `/agent` returns a useful answer.

## Weekly Checks

1. Review new leads in `/admin`.
2. Export or copy important lead records if needed.
3. Check Cloudflare Pages deployment status.
4. Check D1 storage and KV usage.
5. Confirm federal API keys have not expired or been rotated outside Cloudflare.

## Common Issues

### Admin CRM returns 401

Cause: wrong `ADMIN_ACCESS_CODE`, missing production secret, or request hitting preview instead of production.

Fix:

```bash
printf '%s' 'mcknight1' | npx wrangler pages secret put ADMIN_ACCESS_CODE --project-name contracting-preacher
npx wrangler pages deploy out --project-name contracting-preacher --branch production --commit-dirty=true
```

### Agent responds, but contract search says SAM.gov is not configured

Cause: missing `SAM_API_KEY` or `SAMS_API_KEY`.

Fix:

```bash
npx wrangler pages secret put SAM_API_KEY --project-name contracting-preacher
```

### Agent status says AI binding is false

Cause: Cloudflare Workers AI binding named `AI` is missing from the Pages project or deployment did not include `wrangler.toml`.

Fix:

1. Confirm `wrangler.toml` includes:

```toml
[ai]
binding = "AI"
```

2. Redeploy production.

### D1 is false

Cause: missing `DB` binding.

Fix:

1. Confirm `wrangler.toml` has the D1 binding.
2. Apply schema remotely.
3. Redeploy production.

### USAspending returns 525 or non-JSON response

Cause: upstream TLS or Cloudflare edge issue between worker and USAspending.

Fix:

1. Retry after a few minutes.
2. Verify direct API status outside the worker.
3. Keep partial results enabled so Grants.gov and Federal Register continue working.

## Incident Rules

- Do not expose API keys in screenshots, issues, logs, or chat.
- If a key is exposed, rotate it immediately.
- If client data is exposed, pause intake collection until access control is reviewed.
- If federal data conflicts between sources, preserve both claims and verify against the official source before advising a client.
