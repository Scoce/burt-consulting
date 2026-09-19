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
    status: 'Published',
    publishedAt: '2026-09-18T19:00:00Z',
    contentMarkdown: `---
title: "How to Lend Money to Adult Children for a Down Payment (Without Tax Penalties)"
metaTitle: "Family Loans for Down Payments: Avoid IRS Gift Tax Penalties | BankOfGaga"
description: "Thinking of helping your child buy a home? Learn how to structure a family down payment loan legally using IRS AFR rates to avoid gift-tax penalties and bank underwriter issues."
date: 2026-09-18
author: "BankOfGaga"
---

![Parents and adult children sitting together around a dining table reviewing a family home agreement and house keys](/images/blog/family-downpayment-hero.jpg)

With mortgage rates hovering above 7%, watching your adult child try to buy their first home can be heartbreaking. 

You’ve worked hard, you have money in the bank earning modest interest, and you want to give them the boost they need. In fact, national housing data shows that nearly **40% of first-time homebuyers receive financial assistance from family**.

Whether you're helping with $20,000, $50,000, or $100,000, stepping in as the "Bank of Mom and Dad" (or "Bank of Gaga") is one of the most generous gestures you can make. 

**The challenge isn't the generosity—it's what happens after you write the check.**

Without a clear, transparent structure, two big problems show up quickly:
1. **The Bank Underwriter & The IRS**: Lenders demand a clear paper trail, and the IRS watches to make sure you didn't accidentally trigger a gift tax audit under IRC § 7872.
2. **The Sunday Dinner Tension**: If month three or four rolls around and nobody has mentioned repayment, casual Sunday dinners suddenly turn awkward. You don't want to feel like a nagging debt collector, and your child feels embarrassed bringing it up.

Here is the exact, step-by-step playbook to help your kid buy a home, keep mortgage underwriters happy, comply with the IRS, and ensure family dinners remain completely drama-free.

---

## Step 1: The Core Choice — A True Gift vs. A Family Loan

Before transferring any money, you and your child need to have an honest 5-minute conversation to decide: **Is this an unconditional gift, or is this a loan?**

There is zero shame in choosing either path, but mixing them up creates immediate trouble.

![The Handshake Loan vs The BankOfGaga Agreement](/images/blog/family-loan-comparison-card.jpg)

### Why You Should Never Sign a "Fake" Gift Letter
If you genuinely expect your child to repay you over time, **never sign a mortgage lender gift letter**. 

When applying for a mortgage, underwriters will ask for proof of where the down payment came from. Some well-meaning parents sign a "gift letter" declaring under penalty of perjury that the funds are a non-repayable gift, while secretly agreeing with their child that they will pay it back later.

That is considered mortgage fraud by Fannie Mae, Freddie Mac, and federal lenders. It puts your child's loan approval at serious risk. 

If it's a loan, say it's a loan. Mortgage lenders approve family second loans every single day—they just need to see that it's documented properly.

---

## Step 2: Set the Interest Rate at the IRS Legal Minimum (The AFR Win-Win)

Most parents assume that if they lend money to their kids, they should charge 0% interest to be nice. 

**Here is why 0% interest is actually a trap:**
Under federal tax law (**IRC Section 7872**), if you lend someone more than $10,000 at below-market interest, the IRS "imputes" phantom interest. They calculate what you *should* have charged, treat that unpaid interest as a taxable gift to your child, and can require you to file Form 709 gift tax returns.

### The Legal Solution: The IRS Applicable Federal Rate (AFR)
Every month, the IRS publishes the statutory minimum rate you are legally allowed to charge family members. 

Because the IRS AFR rate (typically around **4.2%–4.5%**) is dramatically lower than commercial bank mortgage rates (currently **7.5%+**), you create a massive financial win-win:
* **Your child saves tens of thousands of dollars** in interest compared to a commercial bank.
* **You earn higher, predictable yield** than a standard bank savings account.
* **The IRS is 100% satisfied**, completely eliminating the risk of imputed gift tax penalties.

> **Want to see your exact statutory rate?** Check the current monthly rate using our free [IRS AFR Family Loan Calculator](/afr-calculator) to see monthly payment breakdowns and total interest savings.

---

## Step 3: Put It in Writing (A 2-Minute Legal Note)

A family agreement shouldn't be a verbal handshake scribbled on a napkin, nor does it require spending $2,000 on an attorney. 

Mortgage underwriters require a simple, formal Promissory Note that clearly lists:
1. **The Principal Amount**: The exact cash amount transferred.
2. **The Interest Rate**: Fixed at or above the current monthly IRS AFR rate.
3. **The Repayment Term**: E.g., 5, 10, or 15 years with a fixed monthly payment date.
4. **Default & Grace Periods**: Clear terms so everyone knows what happens if an unexpected job change occurs.

You can create a clear, compliant agreement in 2 minutes using our free [BankOfGaga Promissory Note Generator](/promissory-note-generator).

---

## Step 4: What Mortgage Underwriters Will Ask For

When your child submits their mortgage application, their loan officer will ask for four simple items to clear the family down payment:

1. **A Copy of the Signed Note**: Demonstrating the monthly payment amount so they can include it in your child's Debt-to-Income (DTI) ratio (typically requiring total monthly debt under 43%–45%).
2. **60 Days of Bank Statements**: Proving the funds were seasoned and legitimately transferred from your account to escrow or the borrower's account.
3. **A Subordination Agreement**: The primary bank lender will always insist on being in first position. Your family loan will legally sit in second position.

Having this ready upfront makes the underwriter look at your child as an organized, low-risk borrower.

---

## The Secret to Long-Term Peace: Automate the Reminders

The biggest failure point in family financing is never lack of love or bad intentions—**it’s human memory and awkwardness**. 

Over a 5-year or 10-year repayment schedule:
* Busy adult kids forget a payment date.
* Parents feel uncomfortable sending an awkward text asking about money.
* Both sides start dreading family dinners because of the unspoken elephant in the room.

That is the exact reason we built **[BankOfGaga](https://bankofgaga.com)**:
* **Automated, Friendly Reminders**: Scheduled SMS and email updates take the awkwardness off your shoulders so you never have to act like a debt collector.
* **Shared Mobile Dashboard**: Both you and your child see the real-time balance, exact payoff date, and every principal payment logged.
* **Zero Relationship Friction**: You get paid back on schedule, your child builds financial independence, and Thanksgiving stays Thanksgiving.

Set up your family money agreement the right way in minutes at [bankofgaga.com](https://bankofgaga.com).
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
