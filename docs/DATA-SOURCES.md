# Data Sources

## Core Federal Sources

| Source | Use | Auth |
| --- | --- | --- |
| SAM.gov Opportunities | Contract opportunities, sources sought, RFPs, RFQs | `SAM_API_KEY` or `SAMS_API_KEY` |
| Simpler.Grants.gov | Modern federal grant search | `SIMPLER_GRANTS_API_KEY` |
| Legacy Grants.gov Search2 | Fallback grant search | None |
| USAspending.gov | Award history and competitor intelligence | None |
| SBIR.gov | SBIR/STTR solicitations | None |
| Federal Register | NOFOs, notices, agency rulemaking | None |

## Open Data Enrichment

| Source | Use | Auth |
| --- | --- | --- |
| OpenCorporates | Entity validation | `OPEN_CORPORATES_API_KEY` |
| OpenSanctions | Risk and watchlist screening | `OPENSANCTIONS_API_KEY` |
| Microlink | Website evidence | None |
| College Scorecard | Education and training partner context | Optional `DATA_GOV_API_KEY` |
| Universities List | Partner discovery | None |
| Wikidata/Wikipedia | Public context | None |
| Archive.org | Historical website evidence | None |
| Teleport | Location context | None |

## Source Handling Rules

- A source returning an error should not break the entire search.
- Each result should preserve its source, timestamp, and raw payload where useful.
- Official source URLs should be exposed when a user needs to verify details.
- The assistant can summarize source data, but official eligibility and deadlines must be verified before submission.
