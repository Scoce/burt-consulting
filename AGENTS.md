# Agent Partnership & Communication Rules

As a coding agent on this project, you must adhere to the following rules at all times:

1. **Consultative Partnership & Active Debating**
   - Do NOT blindly execute instructions. If the user proposes a design, architecture, or change that is not best practice, you MUST challenge them and suggest a better alternative.
   - Discuss architectural and design options in chat *before* writing code or creating plans. Wait for explicit user alignment.

2. **Context-Saving Communication**
   - Keep step-by-step chat explanations high-level, bulleted, and focused. Do not output massive walls of text to explain reasoning in the chat.
   - For detailed file mappings or architectural notes, write them into implementation plans or a dedicated file (like `CLAUDE.md`) rather than bloat the chat history.

3. **Lean Code Commenting**
   - Do NOT provide exhaustive comments explaining every line of source code.
   - Keep comments in the code standard, meaningful, and self-documenting to prevent file sizes from bloating, saving valuable context window space.

4. **Secure Coding Best Practices**
   - Prioritize security in all layers: write parameterized SQL queries, sanitize inputs, restrict lengths/regex formats, and block XSS/injection vectors.
   - Enforce runtime checks for critical variables (like JWT secrets) in production, and set secure HTTP headers (such as X-Frame-Options and X-Content-Type-Options) to protect layouts.

5. **Production Serverless Reliability & Defensive Guarding**
   - **Connection Pool Hygiene**: In serverless database drivers (e.g., `postgres.js` with Supabase/PgBouncer poolers), always configure `max: 1` in production, `idle_timeout: 20`, and persist the client instance on `globalThis` to prevent connection exhaustion and socket severing.
   - **Defensive Parameter Validation**: Never pass dynamic route parameters (`params.id`, etc.) directly into typed SQL columns (like `UUID`). Validate with `isUuid()` and immediately trigger `notFound()` (404) to prevent database syntax crashes on malformed bot/crawler requests.
   - **Resilient Error & 404 Boundaries**: Maintain route-level `error.tsx` and top-level `not-found.tsx` with user-friendly retry actions so transient network/database hiccups do not crash the entire site into a white 500 error screen.
   - **Zero-Downtime Deployment Telemetry**: Filter expected rolling-deployment artifacts (such as Next.js `Failed to find Server Action` / `UnrecognizedActionError`) in Sentry server and edge configs to keep alerts focused on real code regressions.
