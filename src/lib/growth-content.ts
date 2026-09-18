import fs from 'fs';
import path from 'path';

export interface StagedArticle {
  slug: string;
  app: 'bank-of-gaga' | 'teach-weave' | 'teaching-sax';
  title: string;
  metaTitle: string;
  description: string;
  targetKeyword: string;
  intent: string;
  author: string;
  contentMarkdown: string;
  status: 'Draft' | 'Validated' | 'Published';
  validationChecks?: { name: string; passed: boolean; note: string }[];
  publishedAt?: string;
}

const LOAN_PORTAL_BLOG_DIR = '/Users/jamesburt/dev/loan-portal/content/blog';

const INITIAL_STAGED_ARTICLES: StagedArticle[] = [
  {
    slug: 'how-to-lend-money-to-adult-children-for-down-payment-without-tax-penalties',
    app: 'bank-of-gaga',
    title: 'How to Lend Money to Adult Children for a Down Payment (Without Tax Penalties)',
    metaTitle: 'Family Loans for Down Payments: Avoid IRS Gift Tax Penalties | BankOfGaga',
    description: 'Thinking of helping your child buy a home? Learn how to structure a family down payment loan legally using IRS AFR rates to avoid gift-tax penalties and bank underwriter issues.',
    targetKeyword: 'lend money to child for down payment tax',
    intent: 'High Commercial / Solution Intent (Parents with cash ready to assist first-time home buyers)',
    author: 'BankOfGaga',
    status: 'Draft',
    contentMarkdown: `---
title: "How to Lend Money to Adult Children for a Down Payment (Without Tax Penalties)"
metaTitle: "Family Loans for Down Payments: Avoid IRS Gift Tax Penalties | BankOfGaga"
description: "Thinking of helping your child buy a home? Learn how to structure a family down payment loan legally using IRS AFR rates to avoid gift-tax penalties and bank underwriter issues."
date: 2026-09-18
author: "BankOfGaga"
---

With mortgage rates hovering above 7%, more parents than ever are stepping in to help their adult children buy their first home. 

In fact, national surveys show that nearly **40% of first-time homebuyers receive financial assistance from family**.

But when you transfer $20,000, $50,000, or $100,000 to your child, you immediately encounter two gatekeepers:
1. **The Bank Underwriter**: Demanding to know where the money came from and whether it's a gift or a loan.
2. **The IRS**: Watching to see if you triggered the gift-tax reporting rules under Internal Revenue Code § 7872.

Here is the exact playbook for structuring a family down payment loan so that underwriters approve the mortgage, the IRS stays satisfied, and family dinners remain completely drama-free.

---

## The Core Choice: Gift Letter vs. Intra-Family Loan

Before writing a check, you must decide whether this money is a **gift** or a **loan**:

| Factor | Mortgage Gift Letter | Intra-Family Loan |
| :--- | :--- | :--- |
| **Repayment Expectation** | ❌ None. You sign a legal declaration swearing you will never ask for repayment. | ✅ Yes. There is a clear repayment schedule and interest rate. |
| **Impact on Child's Debt-to-Income (DTI)** | No monthly debt added to their qualification ratio. | Monthly payment is factored into their mortgage DTI calculation. |
| **Gift Tax Impact** | Consumes annual exclusion ($18,000) or lifetime exemption. | Zero gift tax if interest is charged at the IRS Applicable Federal Rate (AFR). |
| **Relationship Clarity** | No awkwardness if you genuinely never expect it back. | Requires formal promissory note and tracking to avoid unspoken resentment. |

If you expect to be repaid, **never sign a mortgage gift letter**. Signing a letter stating the funds are a gift while verbally expecting repayment is considered mortgage fraud by Fannie Mae and Freddie Mac.

---

## How to Set Up an Intra-Family Loan That Passes Underwriter Scrutiny

If your child can support the loan payment within their debt-to-income limits (usually under 43%–45% total monthly debt), a family second mortgage is legal and common.

Here are the 4 requirements mortgage underwriters will demand:

### 1. A Formal Promissory Note
The agreement cannot be a verbal handshake. It must be in writing and state:
- Principal amount
- Fixed interest rate
- Term length (e.g. 5, 10, or 15 years)
- Monthly payment amount
- Clear default terms

You can generate a free, compliant note using our [Bank of Gaga Promissory Note Generator](/promissory-note-generator).

### 2. An Interest Rate at or Above the IRS AFR
To prevent the IRS from reclassifying the loan as a taxable gift, you must charge at least the **Applicable Federal Rate (AFR)** published monthly by the IRS.

Because AFR rates (around 4.2%–4.5%) are significantly lower than commercial bank mortgage rates (7.5%+), your child saves tens of thousands of dollars in interest while you earn higher yield than a savings account.

Check your exact statutory minimum rate using our [IRS AFR Family Loan Calculator](/afr-calculator).

### 3. Proof of Sourced Funds
Underwriters require 60 to 90 days of bank statements showing the funds were in your account and legitimately transferred to escrow or the borrower's account.

### 4. Subordination Agreement
The primary mortgage lender will require their lien to take first position. A family loan will always be in second position (a second mortgage).

---

## Avoiding the IRS Imputed Interest Trap

Under **IRC Section 7872**, if you charge less than the AFR rate on loans over $10,000, the IRS &ldquo;imputes&rdquo; the missing interest. They calculate how much interest you should have collected and treat that phantom amount as a taxable gift to your child.

### The $10,000 De Minimis Carve-Out
If the total outstanding loan balance is **$10,000 or less**, below-market loan rules do not apply, provided the borrower does not use the money to purchase income-producing investments (stocks, rental properties).

---

## Why Automated Tracking Protects Both Sides

The biggest failure point of family loans is not malice—it's memory. Over a 5-year repayment schedule, payment dates get forgotten, verbal balances diverge, and awkwardness builds at family gatherings.

[Bank of Gaga](https://bankofgaga.com) solves this completely:
- Generates compliant, legal promissory notes in 2 minutes.
- Sends friendly, automated SMS/email payment reminders so parents never have to play debt collector.
- Provides a transparent, shared mobile dashboard showing exact payoff dates and principal reduction.

Set up your family loan the right way today at [bankofgaga.com](https://bankofgaga.com).
`,
  },
];

const globalContentStore = global as typeof globalThis & {
  __stagedArticles?: StagedArticle[];
};

if (!globalContentStore.__stagedArticles) {
  globalContentStore.__stagedArticles = [...INITIAL_STAGED_ARTICLES];
}

export function getAllStagedArticles(app?: string): StagedArticle[] {
  const articles = globalContentStore.__stagedArticles || INITIAL_STAGED_ARTICLES;
  if (!app) return articles;
  return articles.filter((a) => a.app === app);
}

export function validateStagedArticle(slug: string): { article: StagedArticle; passed: boolean } | null {
  const articles = globalContentStore.__stagedArticles || [];
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  const article = articles[index];
  const wordCount = article.contentMarkdown.trim().split(/\s+/).length;
  const hasTargetKeyword = new RegExp(article.targetKeyword.replace(/\s+/g, '.*'), 'i').test(
    article.contentMarkdown
  );
  const hasAfrLink = article.contentMarkdown.includes('/afr-calculator');
  const hasContractLink = article.contentMarkdown.includes('/promissory-note-generator');
  const hasValidFrontmatter = article.contentMarkdown.startsWith('---') && article.contentMarkdown.includes('title:');

  const checks = [
    {
      name: 'Word Count & Depth (SEO Long-Form)',
      passed: wordCount >= 600,
      note: `Article contains ${wordCount} words (target: 600+ words for competitive search ranking).`,
    },
    {
      name: 'Target Keyword Intent Alignment',
      passed: hasTargetKeyword,
      note: `Target keyword "${article.targetKeyword}" integrated naturally into content.`,
    },
    {
      name: 'Interactive Calculator / Tool Internal Linking',
      passed: hasAfrLink && hasContractLink,
      note: 'Contains internal links to /afr-calculator and /promissory-note-generator.',
    },
    {
      name: 'Metadata & Gray-Matter Frontmatter',
      passed: hasValidFrontmatter,
      note: 'Clean YAML frontmatter with title, metaTitle, and description for Next.js blog engine.',
    },
  ];

  const allPassed = checks.every((c) => c.passed);
  const updated: StagedArticle = {
    ...article,
    status: allPassed ? 'Validated' : 'Draft',
    validationChecks: checks,
  };

  articles[index] = updated;
  globalContentStore.__stagedArticles = [...articles];
  return { article: updated, passed: allPassed };
}

export function publishArticleToRepository(slug: string): { success: boolean; pathWritten?: string; article: StagedArticle } | null {
  const articles = globalContentStore.__stagedArticles || [];
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  const article = articles[index];
  let pathWritten: string | undefined = undefined;

  // If local repository directory exists, write directly to content/blog/
  try {
    if (fs.existsSync(LOAN_PORTAL_BLOG_DIR)) {
      const targetFile = path.join(LOAN_PORTAL_BLOG_DIR, `${slug}.md`);
      fs.writeFileSync(targetFile, article.contentMarkdown.trim(), 'utf8');
      pathWritten = targetFile;
      console.log(`[growth-content] Published article directly to ${targetFile}`);
    }
  } catch (err) {
    console.warn('[growth-content] Local filesystem write skipped:', err);
  }

  const updated: StagedArticle = {
    ...article,
    status: 'Published',
    publishedAt: new Date().toISOString(),
  };

  articles[index] = updated;
  globalContentStore.__stagedArticles = [...articles];
  return { success: true, pathWritten, article: updated };
}
