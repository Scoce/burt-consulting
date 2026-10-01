---
name: portfolio-growth-engine
description: Autonomous growth flywheel, high-intent SEO content generator, ad packaging, and telemetry monitoring for James Burt's software portfolio (BankOfGaga, TeachingSax, TeachWeave). Executes research, drafting, visual asset generation, SEO compliance auditing, and stages Human-in-the-Loop (HITL) review cards before publishing.
---

# Portfolio Growth Engine & Content Flywheel Skill

This skill guides autonomous agents through the end-to-end execution of growth campaigns, high-intent programmatic SEO guides, Meta/LinkedIn direct-response ad scripts, and telemetry tracking across James Burt's software portfolio.

---

## 1. Operating Principles & Safety Guardrails

1. **Human-in-the-Loop (HITL) Staging First**:
   - The agent operates autonomously to discover topics, draft long-form guides, generate imagery, run SEO audits, and pre-wire UTM tags.
   - **MANDATORY**: Never publish directly to production or push git commits to live repositories without explicit user alignment/approval in the chat.
   - Always stage the article with `status: 'Validated'` in `BurtConsulting/src/lib/growth-content.ts` and render the **HITL Review Card** in the conversation.

2. **Historical Integrity**:
   - **NEVER** edit publication dates (`date: ...` in YAML frontmatter) on existing historical articles.

3. **Consistent Billing & Trial Terms**:
   - Always state **"14-Day Free Trial"** (matching Stripe `trial_period_days: 14`). Never claim 30-day trials.

4. **Brand Voice & Tone Codex (BankOfGaga)**:
   - **The Costco Membership Middle**: Older parents and grandparents are capable, proud, and tech-literate. Avoid condescending, overly simplistic, or medicalized "AARP" tones.
   - **Vocabulary Rules**:
     - Use **"BankOfGaga"** (single word, no spaces in brand headers).
     - Use **"money agreement"** instead of "loan".
     - Use **"member"** instead of "borrower".
     - Use **"Gaga"** instead of "lender" or "admin".
     - Use **"Sunday dinner / Thanksgiving table"** as the emotional anchor.
     - Use **"Mark Paid"** for recording payment events.
   - **Regulatory Precision**:
     - Always reference statutory law: IRC § 7872 (imputed interest), IRC § 2503(b) (annual gift exclusion: $18,000/$36,000), IRS Applicable Federal Rates (AFR), and Fannie Mae/Freddie Mac mortgage regulations.
     - Emphasize that BankOfGaga is tracking and documentation software; it does not hold or escrow client funds.

---

## 2. Autonomous Content Production Workflow

When triggered to produce or optimize content:

### Step 1: Select High-Intent Target from Backlog
Select high-intent commercial or regulatory queries from `GROWTH_HUB.md` or the user's backlog:
- *Down Payment Assistance*: `how-to-lend-money-to-adult-children-for-down-payment-without-tax-penalties` (Published)
- *Loan Forgiveness / Gift Tax*: `how-to-forgive-a-family-loan-without-tax-penalties`
- *Divorce / Estate Protection*: `protecting-family-loans-in-child-divorce`
- *Co-Signing vs. Intra-Family Loan*: `why-you-should-never-cosign-a-mortgage-for-your-kid`
- *Car Financing*: `parent-to-child-car-loan-agreement`

### Step 2: Content Generation Standards
The drafted markdown guide must satisfy:
1. **Length & Depth**: ≥ 1,200 words of tactical, authoritative advice.
2. **Interactive Internal Linking**:
   - Link to the interactive [IRS AFR Calculator](/afr-calculator) with context.
   - Link to the [Promissory Note Generator](/promissory-note-generator).
   - Link to [BankOfGaga Signup](https://bankofgaga.com/signup).
3. **Structured Data & Frontmatter**:
   ```yaml
   ---
   title: "Authoritative, Clickable Title"
   metaTitle: "SEO Optimized Meta Title | BankOfGaga"
   description: "Under 160 characters summary with high search intent."
   date: YYYY-MM-DD
   author: "BankOfGaga"
   ---
   ```
4. **Visual Editorial Assets**:
   - Generate contextual editorial photography or infographics using `generate_image`.
   - Embed within markdown using `/images/blog/<asset-name>.jpg`.

### Step 3: Run Automated Quality Checks
Verify the four core criteria:
1. Word count ≥ 1,000 words.
2. Target keyword in title, first 100 words, and subheadings.
3. Embedded calculator and contract generator links present.
4. Clean YAML frontmatter.

### Step 4: Stage in Central Growth Hub
1. Add the article to `INITIAL_STAGED_ARTICLES` in `BurtConsulting/src/lib/growth-content.ts` with `status: 'Validated'`.
2. Add the corresponding attribution tracking entry to `BANK_OF_GAGA_BLOG_CATALOG` in `BurtConsulting/src/lib/growth-telemetry.ts`.

### Step 5: Present the Human-in-the-Loop Review Card
Present an executive summary artifact or card to the user containing:
- **Article Title & Slug**
- **Target Keyword & Search Intent**
- **Editorial Hook & Outline**
- **Visual Assets Generated**
- **Pre-Wired UTM Distribution URLs** (Meta ad angle, newsletter, direct)
- **1-Click Approval Request**: "Reply **'Approve'** or provide feedback to make revisions."

### Step 6: Deployment Upon Approval
When the user approves:
1. Call `publishArticleToRepository(slug)` or write the file to `loan-portal/content/blog/<slug>.md`.
2. Ensure images are placed in `loan-portal/public/images/blog/`.
3. Verify the build (`npm run build` or Next.js route check).
4. Commit and push changes with `BypassSandbox: true`.

---

## 3. Telemetry & Analytics Monitoring Workflow

1. Fetch live metrics from `https://bankofgaga.com/api/telemetry/attribution` and Stripe API.
2. View performance in the Growth Hub at `/admin/growth`.
3. Highlight high-performing articles (high CTR or conversions) to clone into Meta Advantage+ ad angles.
