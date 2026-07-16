# Product Brief

## Mission

The Contracting Preacher helps small businesses become ready for federal contracting, find suitable opportunities, and move through a clear capture plan with Dr. McKnight's team.

## Users

| User | Needs |
| --- | --- |
| Business owner | Understand readiness, required documents, and opportunity fit |
| Dr. McKnight | Review leads, risks, strengths, and next-step strategy |
| Consulting team | Track intake, pipeline, opportunity matches, and client tasks |

## Primary Workflows

### Client Intake

1. Client submits `/intake`.
2. API scores readiness across contracting dimensions.
3. Lead is stored in D1.
4. Admin reviews strengths, risks, and roadmap.

### Opportunity Discovery

1. User searches `/opportunities`.
2. System queries federal sources.
3. Results are normalized into contracts, grants, awards, SBIR/STTR, and notices.
4. User opens the official source for verification.

### AI Assistant

1. User asks `/agent` a business question.
2. Assistant searches connected data tools.
3. Assistant returns next steps, opportunity context, and readiness guidance.

### Admin CRM

1. Admin enters private access code.
2. Admin reviews lead queue.
3. Admin searches opportunities from the command center.
4. Admin moves client into readiness review, capture plan, active service, or retention.

## Non-Goals

- The system does not guarantee contract wins.
- The system does not make legal eligibility determinations.
- The system does not replace official source verification.
- The system does not store sensitive client documents until per-user identity and document access control are implemented.
