# Portfolio Growth Hub — Architecture & Operational Memory

## 1. Vision & Purpose
A centralized, hands-off growth, marketing, and analytics engine housed inside `BurtConsulting` to drive traffic, trial signups, and paid conversions across James Burt's software portfolio:
- **Bank of Gaga** (`/Users/jamesburt/dev/loan-portal`): Family loan tracking & promissory note generation.
- **TeachingSax** (`/Users/jamesburt/dev/TeachingSax`): Music lesson & practice management.
- **TeachWeave** (`/Users/jamesburt/dev/teach-weave`): Collaborative curriculum planning.
- **Truths & Lies / CaponeTracker**: Interactive utility & finance tools.

---

## 2. Strategic Rationale: Headless Automation vs. Off-the-Shelf / Screen Agents
- **Why Not Zeely.ai**: Zeely is optimized for e-commerce dropshipping with marked-up ad spend (12% fees) and low-trust generic AI avatars. Software requires high-trust problem-solving content and intent-driven search.
- **Why Not Screen-Clicking Agents (Astra / Computer-Use)**: Visual GUI agents are brittle, slow, and expensive. Because all apps in the portfolio are modern Next.js web applications, automation runs headless via REST APIs, webhooks, database connections, and structured LLM toolchains.

---

## 3. Core Capabilities to Build

### Module A: Unified "What's Working" Performance Dashboard
A private internal portal at `/admin/growth` within `BurtConsulting`:
1. **Stripe Performance**:
   - Live metrics per app: Active Trials, 14-day Trial Conversion Rate, MRR, Churn, LTV.
   - Real-time conversion alerts when a trial transitions to paid active.
2. **Traffic & Acquisition Telemetry**:
   - Google Analytics 4 (GA4 Data API) + Google Search Console API.
   - Top-performing landing pages, organic search queries, and conversion rate per referrer channel.

### Module B: High-Intent SEO & Programmatic Content Flywheel
1. **Keyword Intent Discovery**:
   - Identifies high-intent queries where users have an urgent need (e.g., *"How to lend money to adult children for down payment without tax penalties"*).
2. **Drafting & Validation Pipeline**:
   - Generates long-form guides, FAQ schemas, and embedded interactive calculator configurations.
   - Stores content in a staging queue with 1-click publishing to the respective repository.

### Module C: Creative & Ad Script Generator (Custom In-House "Zeely")
1. **Formulaic Ad Scripts**:
   - Generates targeted Meta Advantage+ ad angles (Problem → Agitation → Solution) tailored to specific demographics (e.g. Boomer parents lending to Millennials).
2. **Asset Renderer**:
   - Programmatic visual card generation using Canvas/SVG or FFmpeg video reels highlighting real product workflows.

### Module D: Community & Social Discussion Monitor
1. **Intent Listener**:
   - Monitors public discussions across relevant forums (Reddit `r/personalfinance`, `r/AgingParents`, Facebook Groups).
   - Generates authentic, helpful reply drafts and links to free tools (promissory note generator, amortization calculator) for manual or scheduled posting.

---

## 4. Technical Stack
- **Host**: `BurtConsulting` (Next.js 16 App Router).
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`).
- **Authentication**: Secured admin route guarding `/admin/growth` (`disallow: ['/admin/']` in `robots.ts`).
- **Telemetry**: Headless aggregator (`lib/growth-telemetry.ts` and `/api/admin/growth/metrics`).

---

## 5. Live Assets & Implemented Modules

### Bank of Gaga (`loan-portal`)
1. **Interactive Acquisition Magnet**:
   - Location: `https://bankofgaga.com/afr-calculator` ([`afr-calculator/page.tsx`](file:///Users/jamesburt/dev/loan-portal/src/app/afr-calculator/page.tsx))
   - Features: Monthly statutory IRS AFR rate tiers (Short/Mid/Long-Term), commercial bank interest savings calculation, IRS § 7872 / § 2503(b) gift-tax compliance analyzer, and 1-click contract builder export.
   - SEO: Rich structured JSON-LD data (`SoftwareApplication` + `FAQPage`).
2. **Paid Ad & Social Creative Playbook**:
   - Location: [`docs/marketing/bank-of-gaga-ad-playbook.md`](file:///Users/jamesburt/dev/loan-portal/docs/marketing/bank-of-gaga-ad-playbook.md)
   - Features: Battle-tested hooks, primary text, headlines, and video/carousel specs for 3 buyer cohorts (Boomer Parents, Adult Borrowers, and Estate Planners).

### Centralized Growth Hub (`BurtConsulting`)
1. **Portfolio Telemetry Dashboard**:
   - Route: [`/admin/growth`](file:///Users/jamesburt/dev/BurtConsulting/src/app/admin/growth/page.tsx)
   - API: [`/api/admin/growth/metrics`](file:///Users/jamesburt/dev/BurtConsulting/src/app/api/admin/growth/metrics/route.ts)
   - Features: Portfolio MRR, active trials, paid subscriber counts, trial conversion rate, live marketing campaign tracking, ad creative generator, SEO staging flywheel, and community discussion listener.

---

## 6. Brand Voice & Tone Codex (Extracted from BankOfGaga Agent Memory)

To ensure strict marketing consistency across all growth campaigns, ad scripts, blog articles, and community forum replies:

### 1. The Core Persona: "The Costco Membership Middle"
- **Not an 'AARP app'**: Do not over-correct into medicalized, fragile, or patronizing language. Older parents and grandparents are competent, proud, and often tech-literate.
- **Large, Clear, and Confident**: Emphasize explicit over terse, visible over discoverable, and safety nets over minimalism.
- **Warmth and Dignity**: Protect the emotional sanctity of family gatherings (*"Thanksgiving stays Thanksgiving"*).

### 2. Mandatory Brand Vocabulary
| Preferred Language | Deprecated / Avoided Language | Context / Reason |
| :--- | :--- | :--- |
| **"BankOfGaga"** | "Bank of Gaga" (in official legal / brand headers) | Single-word branding prevents Texas bank-naming regulatory scrutiny. |
| **"Money agreement"** | "Loan" | Softens transactional coldness when talking between parents and kids. |
| **"Member"** | "Borrower" | Removes debt stigma; frames borrowing as family participation. |
| **"Gaga"** | "Admin", "Lender", "Creditor" | Centers the beloved patriarch/matriarch origin story. |
| **"Mark Paid"** | "Record", "Confirm", "Verify" | Plain, unambiguous action label for older users. |
| **"30-Day Free Trial"** | "14-Day Free Trial" | Extended sitewide on 2026-07-02 to give a full monthly payment cycle. |
| **"Sunday dinner / Thanksgiving table"** | Generic "family events" | Concrete, visceral emotional hook that resonates instantly. |

### 3. Dual-Audience Messaging
- **Gagas (Lenders - Paying Segment)**:
  - *Core Fears*: Awkward holiday dinners, playing unpaid debt collector, IRS § 7872 gift-tax audits, losing touch with kids over money.
  - *Tone*: Reassuring, protective, structured, respectful, authoritative on tax/underwriting rules.
- **Members (Adult Children - Borrowers)**:
  - *Core Fears*: Feeling like a dependent child, having money held over their head, paying $100k+ in commercial 7.5%+ bank interest to Wall Street.
  - *Tone*: Empowering, respectful, dignity-first, mathematical clarity.

### 4. Technical & Regulatory Guardrails
- **Zero Money Movement / No Escrow**: Always clarify that BankOfGaga is a tracking and documentation software, never holding or moving client funds directly (avoids money transmitter licensing).
- **Statutory Authority**: Always ground tax discussions in real statutes: IRC § 7872 (imputed interest), IRS Applicable Federal Rates (AFR), and Fannie Mae/Freddie Mac mortgage gift-letter rules.


