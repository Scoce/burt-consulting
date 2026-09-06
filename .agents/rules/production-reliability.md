---
trigger: always_on
description: "Production serverless reliability, connection pool hygiene, defensive route parameter validation, and error boundaries"
---

# Production Serverless Reliability & Defensive Guarding

1. **Connection Pool Hygiene**:
   - In serverless database drivers (e.g., `postgres.js` with Supabase/PgBouncer poolers), always configure `max: 1` in production, `idle_timeout: 20`, and persist the client instance on `globalThis` to prevent connection exhaustion and abrupt socket severing.

2. **Defensive Parameter Validation**:
   - Never pass dynamic route parameters (`params.id`, `params.slug`) directly into typed SQL columns (like `UUID`). Validate with regex/Zod (`isUuid()`) and immediately trigger `notFound()` (404) to prevent database syntax 500 errors on malformed bot/crawler requests.

3. **Resilient Error & 404 Boundaries**:
   - Maintain route-level `error.tsx` and a top-level `not-found.tsx` with user-friendly retry actions so transient network/database hiccups do not crash the entire site into a white 500 error screen.

4. **Zero-Downtime Deployment Telemetry**:
   - Filter expected rolling-deployment artifacts (such as Next.js `Failed to find Server Action` / `UnrecognizedActionError`) in Sentry server and edge configs to keep alerts focused strictly on real code regressions.
