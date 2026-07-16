# Security Policy

## Reporting

Report security concerns privately to `support@rjbizsolution.com`. Do not open public issues for exposed credentials, authentication bypasses, private client data, or federal API keys.

## Secrets

Do not commit real values for:

- `ADMIN_ACCESS_CODE`
- `PORTAL_ACCESS_CODE`
- `SENDGRID_API_KEY`
- `SAM_API_KEY` or `SAMS_API_KEY`
- `SIMPLER_GRANTS_API_KEY`
- `DATA_GOV_API_KEY`
- `OPEN_CORPORATES_API_KEY`
- `OPENSANCTIONS_API_KEY`
- `OPENAI_API_KEY`
- Cloudflare API tokens
- GitHub PATs

Production secrets must be stored in Cloudflare Pages environment settings. Local placeholders belong in `.env.example`; real local values belong in untracked `.env.local`.

## Access Control

The current admin and portal flows use access-code gates. They are enough for controlled launch and demo operations, but they are not a substitute for per-user accounts when storing sensitive client documents. Before storing private client documents, connect a real identity provider or Cloudflare Access policy.

## Federal Data Accuracy

The system can search and summarize federal data, but it must not be treated as a legal determination or official certification decision. Always verify final opportunity details, eligibility, deadlines, SAM status, and solicitation terms against the current official source.

## Rotation

Rotate any token or API key that is pasted into chat, logs, screenshots, issue comments, or commits. Treat pasted credentials as exposed.
