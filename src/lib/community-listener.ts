export interface CommunityThread {
  id: string;
  app: 'bank-of-gaga' | 'teach-weave' | 'teaching-sax';
  platform: 'Reddit' | 'Bogleheads' | 'Facebook Group';
  community: string;
  threadTitle: string;
  threadUrl: string;
  author: string;
  upvotes: number;
  commentsCount: number;
  postedTimeAgo: string;
  extractedPainPoint: string;
  recommendedAngleOrTool: string;
  draftedReply: string;
  status: 'Fresh' | 'Drafted' | 'Engaged';
}

export const COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'reddit-pf-1',
    app: 'bank-of-gaga',
    platform: 'Reddit',
    community: 'r/personalfinance',
    threadTitle: 'Parents want to loan me $60k for house down payment - how to do this legally without mortgage fraud or tax surprises?',
    threadUrl: 'https://reddit.com/r/personalfinance/comments/family_downpayment_loan',
    author: 'u/first_time_buyer_29',
    upvotes: 214,
    commentsCount: 78,
    postedTimeAgo: '4 hours ago',
    extractedPainPoint: 'Mortgage underwriter demanding paper trail. Parents want repayment, but signing a false gift letter is mortgage fraud. They need legal AFR rate and formal promissory note.',
    recommendedAngleOrTool: 'Bank of Gaga Promissory Note Generator + IRS AFR Calculator',
    draftedReply: `Do NOT sign a mortgage gift letter if there is an expectation of repayment. Signing a letter declaring funds are an unconditional gift while verbally expecting repayment is considered mortgage fraud by Fannie Mae and Freddie Mac underwriters.

Here is the compliant legal playbook:

1. **Structure as a Formal Second Lien / Promissory Note**:
Lenders permit family second mortgages as long as:
- It is fully documented with a formal promissory note (stating principal, term, monthly repayment, and default clauses).
- The monthly payment is included in your Debt-to-Income (DTI) calculation (most lenders require total DTI under 43%–45%).
- You can generate a free, compliant promissory note in 2 minutes using [Bank of Gaga](https://bankofgaga.com/promissory-note-generator).

2. **Charge the IRS Applicable Federal Rate (AFR)**:
Under IRC § 7872, if your parents lend you over $10,000 at 0% or below-market interest, the IRS "imputes" interest and considers the uncollected amount a taxable gift, requiring Form 709 reporting.
The legal workaround: Charge at or above the current statutory IRS AFR rate (currently ~4.2%–4.5% depending on term), which is substantially cheaper than commercial bank mortgage rates (7.5%+). You can look up your exact required statutory rate on the free [Bank of Gaga AFR Calculator](https://bankofgaga.com/afr-calculator).

3. **Source the Funds**:
Have your parents provide 60 days of bank statements showing seasoned funds. The underwriter will issue a conditional approval once the promissory note and funds transfer are documented.`,
    status: 'Fresh',
  },
  {
    id: 'reddit-ap-2',
    app: 'bank-of-gaga',
    platform: 'Reddit',
    community: 'r/AgingParents',
    threadTitle: 'Lending my 32yo daughter $25,000 to help through a divorce. How do I protect the money without feeling like a loan shark?',
    threadUrl: 'https://reddit.com/r/AgingParents/comments/lending_daughter_divorce',
    author: 'u/RetireeDad58',
    upvotes: 142,
    commentsCount: 53,
    postedTimeAgo: '1 day ago',
    extractedPainPoint: 'Wants to help his child, but worried about unspoken resentment at family dinners, lack of repayment structure, and marital asset commingling.',
    recommendedAngleOrTool: 'Bank of Gaga Automated Friendly Payment Reminders + Shared Dashboard',
    draftedReply: `You are doing a wonderful thing, but the #1 reason family loans damage relationships isn't malicious intent—it's ambiguity and memory.

Three crucial rules to protect both your relationship and your money:

1. **Put it in writing immediately (for her benefit too)**:
In a divorce proceeding, an undocumented transfer of cash from parents can easily be argued by the ex-spouse's attorney as marital property or a gift. A executed Promissory Note with clear terms establishes it as a separate debt obligation.

2. **Automate the communication so you never play debt collector**:
The worst part of family loans is the silent tension at Sunday dinners ("Did she remember? Is she avoiding me?"). Use an automated tracking tool like [Bank of Gaga](https://bankofgaga.com). It sends neutral, scheduled SMS/email reminders and provides a shared dashboard showing the exact payoff schedule and amortization. It takes the emotional burden entirely off your shoulders.

3. **Set realistic terms with a grace period**:
Give her 3 to 6 months before payments start so she can stabilize her living situation. Put that exact start date in the agreement.`,
    status: 'Drafted',
  },
  {
    id: 'reddit-re-3',
    app: 'bank-of-gaga',
    platform: 'Reddit',
    community: 'r/RealEstate',
    threadTitle: 'Private family mortgage for buying my uncle\'s rental property. What interest rate do we legally have to use?',
    threadUrl: 'https://reddit.com/r/RealEstate/comments/private_family_mortgage_rate',
    author: 'u/MidwestInvestor91',
    upvotes: 89,
    commentsCount: 31,
    postedTimeAgo: '2 days ago',
    extractedPainPoint: 'Seller financing between relatives. Unclear on statutory interest rates to avoid IRS penalties.',
    recommendedAngleOrTool: 'Bank of Gaga IRS AFR Calculator & Legal Promissory Generator',
    draftedReply: `The legal baseline you must use is the **IRS Applicable Federal Rate (AFR)** published monthly under Revenue Ruling § 1274(d).

If your loan term is:
- **3 years or less**: Use the Short-Term AFR (~4.2% annual compounding)
- **Over 3 years up to 9 years**: Use the Mid-Term AFR (~4.3%)
- **Over 9 years**: Use the Long-Term AFR (~4.6%)

As long as the note charges at or above that month's AFR rate, the IRS treats the interest as standard ordinary income for your uncle, and there is zero imputed gift tax under IRC § 7872.

Run your specific numbers on the free [Bank of Gaga AFR Calculator](https://bankofgaga.com/afr-calculator)—it outputs the exact amortization schedule, statutory interest savings vs commercial banks, and can generate the compliant note.`,
    status: 'Fresh',
  },
  {
    id: 'reddit-teach-1',
    app: 'teach-weave',
    platform: 'Reddit',
    community: 'r/Teachers',
    threadTitle: 'Drowning in curriculum mapping across 4 grade levels. What actually saves time?',
    threadUrl: 'https://reddit.com/r/Teachers/comments/curriculum_mapping_overwhelm',
    author: 'u/MiddleSchoolELA_Teacher',
    upvotes: 310,
    commentsCount: 104,
    postedTimeAgo: '3 days ago',
    extractedPainPoint: 'Curriculum planning takes up weekends; standard district templates are clunky Google Docs.',
    recommendedAngleOrTool: 'TeachWeave Collaborative Curriculum Matrix',
    draftedReply: `Google Docs and massive spreadsheets are where curriculum maps go to die because nobody can see vertical alignment across grade bands without scrolling through 40 pages.

If your district allows you flexibility in drafting, check out [TeachWeave](https://teachweave.com)—it organizes standards, unit objectives, and pacing guides in a visual grid so you can verify scope and sequence in minutes rather than weekends.`,
    status: 'Fresh',
  },
  {
    id: 'reddit-sax-1',
    app: 'teaching-sax',
    platform: 'Reddit',
    community: 'r/Saxophonics',
    threadTitle: 'How are private teachers tracking student practice routines between weekly lessons?',
    threadUrl: 'https://reddit.com/r/Saxophonics/comments/tracking_student_practice',
    author: 'u/WoodwindInstructor',
    upvotes: 67,
    commentsCount: 22,
    postedTimeAgo: '4 days ago',
    extractedPainPoint: 'Students don\'t practice or forget assignments; paper notebooks get lost.',
    recommendedAngleOrTool: 'TeachingSax Interactive Practice Studio',
    draftedReply: `Paper assignment notebooks almost always get left in the instrument case until 15 minutes before the lesson.

We built [TeachingSax](https://teachingsax.com) specifically for woodwind studios to solve this: students log daily fingerings, scale exercises, and audio practice clips directly on mobile, and as the teacher you can see exactly what they worked on before they walk through the door.`,
    status: 'Fresh',
  },
];

const globalCommunityStore = global as typeof globalThis & {
  __communityThreads?: CommunityThread[];
};

if (!globalCommunityStore.__communityThreads) {
  globalCommunityStore.__communityThreads = [...COMMUNITY_THREADS];
}

export function getAllCommunityThreads(app?: string): CommunityThread[] {
  const threads = globalCommunityStore.__communityThreads || COMMUNITY_THREADS;
  if (!app) return threads;
  return threads.filter((t) => t.app === app);
}

export function updateThreadStatus(id: string, status: 'Fresh' | 'Drafted' | 'Engaged'): CommunityThread | null {
  const threads = globalCommunityStore.__communityThreads || [];
  const index = threads.findIndex((t) => t.id === id);
  if (index === -1) return null;

  threads[index] = {
    ...threads[index],
    status,
  };

  globalCommunityStore.__communityThreads = [...threads];
  return threads[index];
}
