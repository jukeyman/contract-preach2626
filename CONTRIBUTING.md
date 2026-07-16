# Contributing

## Development Flow

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Run the app:

```bash
npm run dev
```

3. Validate before pushing:

```bash
npm run verify
```

## Code Standards

- Keep user-facing copy client-friendly. Do not expose implementation details such as secret names, bindings, internal tool calls, or provider fallback logic in public UI.
- Keep federal-data claims conservative. If a number, deadline, eligibility rule, or API behavior can change, verify it against the current official source before presenting it as current.
- Keep API routes resilient. One failed upstream source should not break the entire opportunity search.
- Keep secrets out of code, markdown examples, screenshots, and test fixtures.

## Branching

- `main` is the primary development branch.
- `production` is the Cloudflare Pages production branch for this project.
- Pull requests should include validation evidence and note any Cloudflare binding or secret changes.

## Pull Request Checklist

- `npm run lint` passes.
- `npm run build` passes.
- UI copy is appropriate for the intended audience.
- API changes include graceful error states.
- D1 schema changes include migration SQL under `db/`.
- README or docs are updated for new operational requirements.
