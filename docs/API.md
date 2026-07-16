# API Reference

Base URL:

```text
https://contracting-preacher.pages.dev
```

## Agent

### `POST /api/agent/chat`

Runs the ContractingPreacher AI assistant.

Request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Find construction grants and contracts in South Carolina"
    }
  ]
}
```

Response:

```json
{
  "source": "ContractingPreacher AI Agent",
  "live": true,
  "model": "@cf/meta/llama-3.1-8b-instruct",
  "answer": "..."
}
```

### `GET /api/agent/status`

Reports whether AI, D1, KV, and tool configuration are available.

## CRM

### `GET /api/crm/leads`

Requires:

```http
Authorization: Bearer <ADMIN_ACCESS_CODE>
```

Returns CRM leads from D1.

### `POST /api/crm/leads`

Creates a scored CRM lead from intake data.

Important: CRM readiness scoring is an operational triage score, not a legal, certification, or procurement eligibility determination.

## Funding

### `GET /api/funding/discover`

Unified opportunity search.

Query parameters:

| Parameter | Required | Description |
| --- | --- | --- |
| `q` | No | Keyword, capability, industry, agency, or problem |
| `limit` | No | Per-source result limit, capped server-side |
| `naics` | No | NAICS filter for SAM.gov when configured |
| `state` | No | State filter for compatible sources |

Example:

```bash
curl 'https://contracting-preacher.pages.dev/api/funding/discover?q=cybersecurity&limit=5'
```

### `GET /api/funding/search`

Single-source search.

Supported `source` values:

- `contracts`
- `grants`
- `awards`
- `sbir`
- `nofo`

Example:

```bash
curl 'https://contracting-preacher.pages.dev/api/funding/search?source=nofo&q=construction'
```

### `GET /api/funding/status`

Reports source and binding readiness. It does not verify client eligibility, entity status, or legal requirements.

## Open Data

### `GET /api/open-data/search`

Supported `source` values:

- `opensanctions`
- `opencorporates`
- `microlink`
- `college-scorecard`
- `universities`
- `wikidata`
- `wikipedia`
- `archive`
- `teleport`

Example:

```bash
curl 'https://contracting-preacher.pages.dev/api/open-data/search?source=wikipedia&q=Department%20of%20Defense'
```

## Portal

### `POST /api/portal/login`

Request:

```json
{
  "email": "client@example.com",
  "accessCode": "issued-code"
}
```

Returns a portal payload with roadmap, watchlist, documents, and deadlines.
