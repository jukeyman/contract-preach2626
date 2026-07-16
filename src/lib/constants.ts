import type { NavLink, Service, Testimonial, FAQ, ProcessStep, Stat, BlogPost } from '@/types'

export const SITE_CONFIG = {
  name: 'The Contracting Preacher',
  tagline: 'Faith-Driven Federal Contracting Success',
  description:
    'Dr. McKnight — The Contracting Preacher — helps small businesses nationwide win federal government contracts. SAM registration, bid writing, 8(a) certification, proposal preparation, and more.',
  url: 'https://thecontractingpreacher.com',
  phone: '(202) 276-2913',
  email: 'info@thecontractingpreacher.com',
  founder: 'Dr. McKnight',
  foundedYear: 2024,
  mainOffice: {
    address: '1225 Laurel Street, Ste 415',
    city: 'Columbia',
    state: 'SC',
    zip: '29201',
  },
  offices: [
    { address: '1225 Laurel Street, Ste 415', city: 'Columbia', state: 'SC', zip: '29201', isMain: true },
    { address: '1535 Hobby Street, Suite 300', city: 'N. Charleston', state: 'SC', zip: '29405' },
    { address: '201 Sigma Drive, Suite 300', city: 'Summerville', state: 'SC', zip: '29486' },
    { address: '2 Corpus Christie Place, Suite 200', city: 'Hilton Head', state: 'SC', zip: '29228' },
    { address: '101 S. Tryon Street, Suite 2700', city: 'Charlotte', state: 'NC', zip: '28280' },
    { address: '1301 Riverplace Blvd., Suite 800', city: 'Jacksonville', state: 'FL', zip: '32207' },
    { address: '1200 Brickell Ave., Suite 800', city: 'Miami', state: 'FL', zip: '33131' },
    { address: '999 Peachtree St. NE, Suite 300 & 400', city: 'Atlanta', state: 'GA', zip: '30309' },
    { address: '151 Calle De San Francisco', city: 'San Juan', state: 'PR', zip: '00901' },
    { address: '1717 Pennsylvania Ave NW, Suite 1025', city: 'Washington', state: 'DC', zip: '20006' },
    { address: '400 Army Navy Drive, Unit 1422', city: 'Arlington', state: 'VA', zip: '22202' },
    { address: '48 Wall Street, 11th Floor', city: 'New York', state: 'NY', zip: '10005' },
    { address: '1000 Dean Street, Suite 101', city: 'Brooklyn', state: 'NY', zip: '11238' },
    { address: '8565 S. Eastern Avenue, Suite 150', city: 'Las Vegas', state: 'NV', zip: '89123' },
    { address: '111 W. Illinois Street', city: 'Chicago', state: 'IL', zip: '60654' },
  ],
  social: {
    facebook: 'https://facebook.com/thecontractingpreacher',
    linkedin: 'https://linkedin.com/in/thecontractingpreacher',
    youtube: 'https://youtube.com/@thecontractingpreacher',
    instagram: 'https://instagram.com/thecontractingpreacher',
    tiktok: 'https://tiktok.com/@thecontractingpreacher',
  },
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'SAM.gov Registration', href: '/services/sam-registration' },
      { label: 'Bid & Proposal Writing', href: '/services/bid-proposal-writing' },
      { label: '8(a) Certification', href: '/services/8a-certification' },
      { label: 'HUBZone Certification', href: '/services/hubzone-certification' },
      { label: 'WOSB Certification', href: '/services/wosb-certification' },
      { label: 'SDVOSB Certification', href: '/services/sdvosb-certification' },
    ],
  },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Intel CRM', href: '/intelligence' },
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'AI Agent', href: '/agent' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES: Service[] = [
  {
    id: 'sam-registration',
    title: 'SAM.gov Registration & Renewal',
    slug: 'sam-registration',
    shortDescription:
      'Complete System for Award Management registration so your business can bid on federal contracts and receive government payments.',
    longDescription:
      'SAM.gov registration is the mandatory first step for any business wanting to work with the federal government. Dr. McKnight handles your entire SAM registration from start to finish — obtaining your UEI number, completing your entity registration, setting up your NAICS codes, configuring your socioeconomic representations, and ensuring your profile is optimized so contracting officers can find you. We also handle annual renewals so you never lose your active status.',
    icon: 'ClipboardCheck',
    features: [
      'UEI Number acquisition and setup',
      'Complete SAM.gov entity registration',
      'NAICS code selection and optimization',
      'Core data and assertions configuration',
      'Entity validation and troubleshooting',
      'Annual renewal management',
      'Profile optimization for discoverability',
      'Representations and certifications setup',
    ],
    price: 'Starting at $497',
    popular: true,
  },
  {
    id: 'bid-proposal-writing',
    title: 'Bid & Proposal Writing',
    slug: 'bid-proposal-writing',
    shortDescription:
      'Professional government bid and proposal writing services that position your business to win federal contracts.',
    longDescription:
      'Winning federal contracts requires more than just showing up — it requires proposals that speak the government\'s language, meet every evaluation criteria, and stand out from the competition. Dr. McKnight and his team craft compelling, compliant proposals that address every requirement in the solicitation. From RFPs and RFQs to sole-source justifications, we write proposals that win.',
    icon: 'FileText',
    features: [
      'RFP and RFQ response writing',
      'Technical proposal development',
      'Past performance narratives',
      'Management approach sections',
      'Cost and pricing volume preparation',
      'Compliance matrix creation',
      'Executive summary writing',
      'Proposal review and editing',
    ],
    price: 'Starting at $1,497',
  },
  {
    id: '8a-certification',
    title: 'SBA 8(a) Certification',
    slug: '8a-certification',
    shortDescription:
      'Navigate the 8(a) Business Development Program application process and unlock sole-source and set-aside contract opportunities.',
    longDescription:
      'The SBA 8(a) Business Development Program is one of the most powerful tools for disadvantaged small businesses to access federal contracting opportunities. Dr. McKnight guides you through every step of the application — from eligibility assessment to document preparation to submission and follow-up. This 9-year program opens doors to sole-source contracts up to $4.5 million for goods and services and $7 million for manufacturing.',
    icon: 'Award',
    features: [
      'Eligibility pre-assessment',
      'Application document preparation',
      'Personal narrative statement writing',
      'Financial document organization',
      'Business plan review and enhancement',
      'SBA liaison and follow-up',
      'Annual review preparation',
      'Mentor-Protege program guidance',
    ],
    price: 'Starting at $2,497',
  },
  {
    id: 'hubzone-certification',
    title: 'HUBZone Certification',
    slug: 'hubzone-certification',
    shortDescription:
      'Qualify for the Historically Underutilized Business Zone program and access set-aside federal contract opportunities.',
    longDescription:
      'The HUBZone program helps small businesses in historically underutilized areas gain preferential access to federal procurement opportunities. The government\'s goal is to award at least 3% of all federal contract dollars to HUBZone-certified businesses. Dr. McKnight helps you determine eligibility based on your business location and employee residences, prepares your application, and manages the certification process from start to finish.',
    icon: 'MapPin',
    features: [
      'HUBZone map eligibility verification',
      'Employee residency documentation',
      'Principal office verification',
      'Application preparation and filing',
      'Supporting document compilation',
      'SBA review response management',
      'Recertification assistance',
      'Compliance monitoring',
    ],
    price: 'Starting at $1,997',
  },
  {
    id: 'wosb-certification',
    title: 'WOSB/EDWOSB Certification',
    slug: 'wosb-certification',
    shortDescription:
      'Women-Owned and Economically Disadvantaged Women-Owned Small Business certification for set-aside federal contracts.',
    longDescription:
      'The federal government has a goal of awarding at least 5% of all federal contracting dollars to women-owned small businesses. The WOSB and EDWOSB certifications qualify your business for exclusive set-aside contracts. Dr. McKnight walks you through the entire certification process, ensuring your documentation meets SBA requirements and your business is positioned to compete for these reserved opportunities.',
    icon: 'Heart',
    features: [
      'WOSB eligibility assessment',
      'EDWOSB qualification review',
      'Ownership documentation preparation',
      'Control and management verification',
      'SBA certification application',
      'Third-party certifier coordination',
      'Annual recertification support',
      'Set-aside opportunity identification',
    ],
    price: 'Starting at $1,497',
  },
  {
    id: 'sdvosb-certification',
    title: 'SDVOSB/VOSB Certification',
    slug: 'sdvosb-certification',
    shortDescription:
      'Service-Disabled Veteran-Owned and Veteran-Owned Small Business certification through the SBA.',
    longDescription:
      'The federal government is committed to awarding at least 3% of all federal contracting dollars to service-disabled veteran-owned small businesses. The SDVOSB and VOSB certifications through the SBA\'s Veterans Small Business Certification Program give veteran entrepreneurs access to sole-source and set-aside contracts. Dr. McKnight honors your service by helping you navigate the certification process with dignity and precision.',
    icon: 'Shield',
    features: [
      'Veteran status verification',
      'Service-connected disability documentation',
      'Ownership and control analysis',
      'SBA VetCert application preparation',
      'Supporting document compilation',
      'VA and SBA coordination',
      'Annual recertification',
      'Contract opportunity identification',
    ],
    price: 'Starting at $1,497',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Deacon James Williams',
    company: 'Williams Construction Services LLC',
    role: 'Owner',
    quote:
      'Dr. McKnight didn\'t just help me register on SAM.gov — he helped me understand the entire federal contracting ecosystem. Within 6 months of working with him, I won my first $350,000 government contract. His faith-based approach gave me the confidence I needed.',
    rating: 5,
    contractValue: '$350,000',
  },
  {
    id: '2',
    name: 'Patricia Simmons',
    company: 'Simmons IT Solutions',
    role: 'CEO',
    quote:
      'I was completely lost trying to get my 8(a) certification. Dr. McKnight walked me through every single step, prepared all my documents, and even helped me write my personal narrative. Approved on the first try! Now I\'m competing for set-aside contracts I never knew existed.',
    rating: 5,
    contractValue: '$1.2M',
  },
  {
    id: '3',
    name: 'Marcus & Tanya Johnson',
    company: 'J&T Janitorial Services',
    role: 'Co-Owners',
    quote:
      'We\'re a small husband-and-wife cleaning company from Charleston. Dr. McKnight helped us realize we could compete for federal facility maintenance contracts. He handled our SAM registration, wrote our first proposal, and we won a $180K annual contract with a military base. God is good!',
    rating: 5,
    contractValue: '$180,000/yr',
  },
  {
    id: '4',
    name: 'Robert Chen',
    company: 'Lowcountry Logistics LLC',
    role: 'Founder',
    quote:
      'Dr. McKnight\'s proposal writing is on another level. He understands how the government evaluates bids and knows exactly what contracting officers are looking for. We\'ve now won 4 contracts totaling over $2 million. The Contracting Preacher is the real deal.',
    rating: 5,
    contractValue: '$2M+',
  },
  {
    id: '5',
    name: 'Vanessa Thompson',
    company: 'Thompson Environmental Services',
    role: 'President',
    quote:
      'As a woman-owned small business, I qualified for WOSB set-aside contracts but didn\'t even know it. Dr. McKnight got me certified, optimized my SAM profile, and connected me to opportunities I would have missed. My first year in federal contracting brought in $750K in revenue.',
    rating: 5,
    contractValue: '$750,000',
  },
  {
    id: '6',
    name: 'Sergeant (Ret.) David Monroe',
    company: 'Monroe Security Group',
    role: 'CEO',
    quote:
      'After 20 years in the Army, I wanted to start a security company. Dr. McKnight helped me get my SDVOSB certification and navigate the VA verification process. His respect for veterans shows in everything he does. I\'m now living my dream with two active federal security contracts.',
    rating: 5,
    contractValue: '$500,000+',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Free Consultation',
    description:
      'Schedule a free 30-minute call with Dr. McKnight. We\'ll discuss your business, your goals, and map out a clear path to federal contracting success.',
    icon: 'Phone',
  },
  {
    step: 2,
    title: 'Strategic Assessment',
    description:
      'We evaluate your business capabilities, identify the best NAICS codes, determine which certifications you qualify for, and create your personalized federal contracting roadmap.',
    icon: 'Search',
  },
  {
    step: 3,
    title: 'Registration & Certification',
    description:
      'We handle your SAM.gov registration, prepare your certification applications, and ensure every document is accurate and complete before submission.',
    icon: 'FileCheck',
  },
  {
    step: 4,
    title: 'Opportunity Identification',
    description:
      'We identify active and upcoming federal contract opportunities that match your capabilities, location, and certifications.',
    icon: 'Target',
  },
  {
    step: 5,
    title: 'Proposal Preparation',
    description:
      'Our team writes compelling, compliant proposals that speak the government\'s language and maximize your evaluation scores.',
    icon: 'PenTool',
  },
  {
    step: 6,
    title: 'Win & Grow',
    description:
      'We support you through contract award, help with post-award compliance, and position you for future opportunities and contract growth.',
    icon: 'Trophy',
  },
]

export const STATS: Stat[] = [
  { value: '500', suffix: '+', label: 'Businesses Served' },
  { value: '89', suffix: '%', label: 'Proposal Win Rate' },
  { value: '50', prefix: '$', suffix: 'M+', label: 'Contracts Won' },
  { value: '15', suffix: '+', label: 'Years Experience' },
]

export const FAQS: FAQ[] = [
  {
    question: 'What is SAM.gov and why do I need to register?',
    answer:
      'SAM.gov (System for Award Management) is the official U.S. government system where businesses must register to bid on federal contracts, receive government payments, and be visible to contracting officers. Without an active SAM registration, your business cannot participate in any federal procurement opportunity. Registration is free on SAM.gov, but the process can be complex — which is exactly where we help.',
    category: 'Getting Started',
  },
  {
    question: 'How long does SAM.gov registration take?',
    answer:
      'The SAM.gov registration process typically takes 7-10 business days when handled correctly. However, if there are issues with your IRS TIN validation, CAGE code assignment, or entity verification, it can take significantly longer. When you work with The Contracting Preacher, we handle all aspects of your registration to minimize delays and ensure accuracy.',
    category: 'Getting Started',
  },
  {
    question: 'What is the 8(a) Business Development Program?',
    answer:
      'The 8(a) program is a 9-year business development program administered by the SBA for small businesses owned by socially and economically disadvantaged individuals. It provides access to sole-source contracts (up to $4.5M for services and $7M for manufacturing), mentoring, and federal contracting set-aside opportunities. It is one of the most powerful programs in federal contracting.',
    category: 'Certifications',
  },
  {
    question: 'Do I need to be local to work with you?',
    answer:
      'Not at all! With 15 offices across the country — from Columbia, SC to New York, Washington DC, Miami, Atlanta, Chicago, Las Vegas, and San Juan, PR — we serve clients nationwide. Federal contracting is a national marketplace, and our services work the same regardless of your location. We\'ve helped businesses across all 50 states win federal contracts.',
    category: 'General',
  },
  {
    question: 'How much does it cost to get started in federal contracting?',
    answer:
      'The cost varies based on your specific needs. SAM.gov registration itself is free (beware of scam sites that charge for this!), but getting expert help ensures it\'s done correctly. Our service packages start at $497 for SAM registration assistance. Certification applications and proposal writing services have separate pricing. We always provide a clear quote during your free consultation — no hidden fees.',
    category: 'Pricing',
  },
  {
    question: 'What types of businesses can get government contracts?',
    answer:
      'Virtually every type of business can compete for federal contracts. The government buys everything — from office supplies, IT services, and janitorial services to construction, consulting, healthcare, logistics, food services, and more. There are over 1,000 NAICS codes that the government uses to classify its purchases. During your consultation, we identify which codes best match your capabilities.',
    category: 'Getting Started',
  },
  {
    question: 'What is a NAICS code and why does it matter?',
    answer:
      'NAICS (North American Industry Classification System) codes are 6-digit codes that classify businesses by industry. Every federal contract solicitation includes a NAICS code that determines which businesses can bid and what the small business size standard is. Selecting the right NAICS codes during your SAM registration is critical — it determines which contracts you\'re eligible for.',
    category: 'Getting Started',
  },
  {
    question: 'What is your proposal win rate?',
    answer:
      'Our proposal win rate is 89%, which is significantly above the industry average of 25-40%. This success comes from our disciplined approach: we only recommend bidding on contracts where you have a genuine competitive advantage, and we invest the time to craft proposals that directly address every evaluation criterion. Quality over quantity — that\'s the Contracting Preacher way.',
    category: 'Results',
  },
  {
    question: 'What is the difference between WOSB and EDWOSB?',
    answer:
      'WOSB stands for Women-Owned Small Business, requiring at least 51% ownership and control by one or more women. EDWOSB stands for Economically Disadvantaged Women-Owned Small Business, which has the same requirements plus additional criteria based on the woman owner\'s personal net worth (must be less than $750,000, excluding primary residence and business ownership). EDWOSB certification opens up additional set-aside contract opportunities.',
    category: 'Certifications',
  },
  {
    question: 'How is The Contracting Preacher different from other consultants?',
    answer:
      'Dr. McKnight brings a unique combination of deep federal contracting expertise and faith-driven values. We don\'t just process paperwork — we build relationships, educate our clients, and genuinely care about your success. Our approach is hands-on and personalized. You won\'t be treated like a number. And with an 89% proposal win rate and over $50 million in contracts won for our clients, the results speak for themselves.',
    category: 'General',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Steps to Win Your First Federal Government Contract in 2026',
    slug: '5-steps-win-first-federal-contract-2026',
    excerpt:
      'Breaking into federal contracting doesn\'t have to be overwhelming. Dr. McKnight shares the five essential steps every small business needs to take to win their first government contract this year.',
    content: `The federal government is the world's largest buyer — spending over $600 billion annually on goods and services. Small businesses receive more than 23% of those dollars, which means there's more than $150 billion available to companies just like yours every single year. Yet most small business owners don't know where to start. That changes today.

Here are the five non-negotiable steps to winning your first federal contract in 2026.

**Step 1: Get Your SAM.gov Registration Done Right**

SAM.gov — the System for Award Management — is the federal government's official supplier database. Without an active SAM registration, you cannot bid on federal contracts, receive government payments, or be visible to contracting officers. Period.

Registration is free at SAM.gov, but the process is complex. You'll need your Employer Identification Number (EIN), your DUNS/UEI number, your NAICS codes, and detailed business information. Errors during registration can delay your active status by weeks or even months.

Pro tip: Many businesses make the mistake of rushing through SAM registration. Take your time with NAICS code selection — these codes determine which contracts you're eligible for. Choose too few and you miss opportunities. Choose the wrong ones and contracting officers won't find you.

**Step 2: Identify the Right NAICS Codes for Your Business**

NAICS (North American Industry Classification System) codes are 6-digit industry classifications that the government uses for every single contract. When a contracting officer issues a solicitation, they list a primary NAICS code that determines which businesses can bid.

Before you register on SAM.gov, research which NAICS codes best describe your business capabilities. Don't just pick one — most businesses legitimately qualify for multiple codes. The more relevant codes you register under, the more contract opportunities you'll find.

Here's what matters: each NAICS code has a size standard (annual revenue or number of employees) that defines what "small business" means in that industry. Make sure you qualify as a small business under the codes you select.

**Step 3: Pursue the Right Certifications**

Federal certifications give your business access to set-aside contracts — contracts that are reserved exclusively for businesses with specific certifications. This dramatically reduces competition and increases your win probability.

The major certifications to consider:
- **8(a) Business Development Program** — For socially and economically disadvantaged business owners. Provides access to sole-source contracts up to $4.5 million (services) and $7 million (manufacturing) with no competition required.
- **HUBZone Certification** — For businesses in Historically Underutilized Business Zones. The government targets 3% of all contract dollars for HUBZone businesses.
- **WOSB/EDWOSB** — Women-Owned Small Business certification. The government targets 5% of contract dollars for women-owned businesses.
- **SDVOSB/VOSB** — Service-Disabled Veteran-Owned Small Business. The government targets 3% for veteran-owned businesses.

You may qualify for more than one certification. Each one you hold opens additional doors.

**Step 4: Find and Monitor Contract Opportunities**

Once you're registered and certified, you need to actively hunt for opportunities. The primary source for federal contract opportunities is SAM.gov — specifically the Contract Opportunities section (formerly FedBizOpps). Set up keyword searches and email alerts for your NAICS codes.

Other resources to monitor:
- **USASpending.gov** — See who's currently winning contracts in your industry and how much they're worth
- **Agency-specific forecast tools** — Many agencies publish annual procurement forecasts showing upcoming contracts
- **Small Business Administration** — The SBA's DSBS (Dynamic Small Business Search) helps contracting officers find you

Don't just respond to every solicitation you see. Be strategic. Identify contracts where you have a genuine competitive advantage — relevant experience, local presence, unique capabilities, or certifications that limit competition.

**Step 5: Write a Proposal That Wins**

This is where most small businesses lose. A technically compliant proposal isn't enough — you need a proposal that scores higher than your competitors on every evaluation factor.

Before you write a single word, read the solicitation completely. Understand the Statement of Work. Identify the evaluation criteria (price, technical approach, past performance, management plan) and their relative weights. Then build your proposal to maximize your score on the highest-weighted factors.

Key principles for a winning proposal:
- **Be compliant first** — Follow every instruction exactly. Non-compliant proposals are disqualified.
- **Use the government's language** — Echo the solicitation's terminology throughout your proposal.
- **Show, don't tell** — Don't say you're experienced. Show your experience with specific, quantified examples.
- **Address every evaluation criterion** — If the government asks about quality control, dedicate a full section to it.
- **Have someone else review it** — Fresh eyes catch errors and identify missing information.

**The Bottom Line**

Winning your first federal contract is absolutely achievable for any well-run small business. The process has a learning curve, but it's learnable — and once you understand the system, it becomes a repeatable, reliable revenue stream.

If you want to shortcut the learning curve, that's exactly what The Contracting Preacher is here for. We've guided over 500 businesses through this exact process, and our 89% proposal win rate speaks to what's possible when you approach federal contracting the right way.

Schedule your free consultation today and let's map out your path to your first — or next — federal contract.`,
    author: 'Dr. McKnight',
    date: '2026-02-20',
    category: 'Getting Started',
    readTime: '8 min read',
    tags: ['federal contracting', 'small business', 'government contracts', 'SAM.gov', 'beginners guide'],
  },
  {
    id: '2',
    title: 'SAM.gov Registration Guide: Everything You Need to Know in 2026',
    slug: 'sam-gov-registration-guide-2026',
    excerpt:
      'A comprehensive guide to registering your business on SAM.gov in 2026. Learn about UEI numbers, NAICS codes, representations and certifications, and common mistakes to avoid.',
    content: `SAM.gov — the System for Award Management — is the federal government's central database for vendors, contractors, and grant recipients. If you want to do business with the federal government in any capacity, SAM registration is not optional. It's mandatory.

Yet every year, thousands of small businesses fail to complete their registration correctly, miss their annual renewal deadline, or get tripped up by technical errors that delay their active status for weeks. This guide will walk you through everything you need to know to get registered right the first time.

**What is SAM.gov and Why Does It Matter?**

SAM.gov is the official federal government system where businesses must register to:
- Bid on federal contracts and grants
- Receive payments from federal agencies
- Be visible to federal contracting officers searching for vendors
- Apply for SBA certifications (8(a), HUBZone, WOSB, SDVOSB)

An active SAM registration is a prerequisite for virtually every federal procurement opportunity. Without it, you're invisible to the government.

**What You Need Before You Start**

Gather these items before you begin your SAM registration:

1. **Employer Identification Number (EIN)** — Your federal tax ID from the IRS. Your EIN must match IRS records exactly.
2. **Unique Entity Identifier (UEI)** — This replaced the DUNS number in 2022. You can get your UEI directly through SAM.gov during registration.
3. **NAICS codes** — Research your industry classification codes before you start. The SBA has a size standards tool at sba.gov.
4. **Bank account information** — For Electronic Funds Transfer (EFT) setup to receive government payments.
5. **Legal business name and address** — Must match your IRS records exactly.
6. **Point of contact information** — Government contracting officers need to reach you.

**Step-by-Step: The SAM Registration Process**

*Step 1: Create a Login.gov Account*
SAM.gov uses Login.gov for authentication. Go to login.gov, create an account with your business email, and set up multi-factor authentication.

*Step 2: Access SAM.gov*
Navigate to sam.gov and click "Register/Update Entity." Sign in with your Login.gov credentials.

*Step 3: Get Your UEI*
If you don't have a UEI, SAM.gov will create one for you during registration. This is a 12-character alphanumeric identifier unique to your business.

*Step 4: Complete Core Data*
This includes your legal business name, physical address, business type (corporation, LLC, sole proprietor, etc.), and tax identification information. This is where IRS validation happens — your EIN and business name must match IRS records exactly.

*Step 5: Select NAICS Codes*
You'll designate a primary NAICS code and can add additional codes. Choose codes that accurately reflect your business capabilities and where you want to compete for contracts.

*Step 6: Complete Assertions*
This section covers your business size, ownership information, socioeconomic categories (woman-owned, veteran-owned, disadvantaged, etc.), and EDI information.

*Step 7: Representations and Certifications*
This is the longest section. You'll answer dozens of questions about your business's compliance with federal regulations, certifications, and policies. Read each question carefully — these are legal certifications.

*Step 8: Points of Contact*
Add government points of contact, past performance points of contact, and electronic business points of contact.

*Step 9: Submit and Wait*
After submission, SAM.gov sends your information to the IRS for TIN validation. This typically takes 1-3 business days. After IRS validation, you'll receive CAGE code assignment (if you don't already have one) from the Defense Logistics Agency. Total processing time is typically 7-10 business days.

**The Annual Renewal Requirement**

This is the #1 mistake businesses make: forgetting to renew. SAM registrations expire every 365 days. If your registration lapses, you cannot bid on contracts or receive payments until you renew and your status is active again.

SAM.gov will send you email reminders 60 days, 30 days, and 14 days before your expiration. Don't ignore these. The renewal process is similar to the initial registration — you're verifying and updating your information.

**Common Mistakes to Avoid**

1. **EIN/Name mismatch with IRS records** — This is the most common cause of registration delays. Double-check that your legal business name on SAM.gov exactly matches what the IRS has on file.

2. **Wrong NAICS codes** — Choosing codes based on what sounds good rather than what accurately describes your capabilities. Contracting officers use NAICS codes to find qualified vendors.

3. **Incomplete representations** — Skipping questions or providing incomplete answers in the Representations and Certifications section can cause your registration to be rejected.

4. **Using a third-party service that charges fees** — SAM.gov registration is completely free. Any company charging you to "register on SAM.gov" is collecting a fee for what you can do for free. (Note: getting expert help to ensure it's done correctly — like working with The Contracting Preacher — is different from paying for the registration itself.)

5. **Not updating after business changes** — If your address, ownership, banking information, or other details change, you must update SAM.gov promptly.

**What Happens After You're Active?**

Once your SAM registration shows "Active" status, you're ready to:
- Search for contract opportunities on SAM.gov/contract-opportunities
- Respond to Sources Sought Notices and Requests for Information (RFIs)
- Submit bids and proposals
- Apply for SBA certifications
- Be found by contracting officers in the System for Award Management

Your active registration also enables you to appear in the Dynamic Small Business Search (DSBS), which is how small business specialists and contracting officers find potential vendors for set-aside contracts.

**Need Help Getting It Done Right?**

SAM.gov registration seems straightforward, but the details matter enormously. An error in your NAICS codes means missing contracts you should be competing for. An IRS validation error means weeks of delay. Missing the annual renewal means losing your active status at the worst possible time.

The Contracting Preacher offers comprehensive SAM.gov registration assistance starting at $497. We handle the entire process — from UEI acquisition to final submission — and ensure your profile is optimized for maximum visibility to contracting officers.

Ready to get registered? Schedule your free consultation today.`,
    author: 'Dr. McKnight',
    date: '2026-02-15',
    category: 'SAM Registration',
    readTime: '12 min read',
    tags: ['SAM.gov', 'registration', 'UEI', 'NAICS codes', 'federal contracting'],
  },
  {
    id: '3',
    title: 'How South Carolina Small Businesses Can Leverage the 8(a) Program',
    slug: 'south-carolina-small-businesses-8a-program',
    excerpt:
      'South Carolina has a vibrant small business community with tremendous potential for federal contracting. Learn how the SBA 8(a) program can open doors to lucrative government contracts.',
    content: `South Carolina is home to a thriving small business community — and one of the best-kept secrets in federal contracting. With major military installations like Joint Base Charleston, Fort Jackson, and Marine Corps Air Station Beaufort generating billions in annual procurement, plus a growing federal civilian presence across the state, South Carolina businesses are ideally positioned to win government contracts.

But too few are taking advantage of the most powerful program the SBA offers: the 8(a) Business Development Program.

**What Is the SBA 8(a) Program?**

The 8(a) Business Development Program is a nine-year program administered by the Small Business Administration designed to help socially and economically disadvantaged business owners compete for federal contracts.

The program provides access to:
- **Sole-source contracts** — Contracts awarded without competition, up to $4.5 million for services and $7 million for manufacturing
- **Set-aside competitions** — Contracts reserved exclusively for 8(a) firms
- **Mentor-protégé relationships** — Partnerships with larger, experienced contractors
- **Business development assistance** — Training, counseling, and technical assistance from the SBA

The numbers are significant. The federal government is required to award at least 5% of all federal contracting dollars to small disadvantaged businesses — and 8(a) firms are the primary pathway to those contracts.

**Who Qualifies for 8(a) Certification?**

To qualify for the 8(a) program, your business must meet these primary criteria:

*Ownership and Control*
At least 51% of the business must be owned and controlled by one or more socially and economically disadvantaged individuals who are U.S. citizens.

*Social Disadvantage*
The SBA presumes social disadvantage for members of certain racial and ethnic groups: African Americans, Hispanic Americans, Asian Pacific Americans, Subcontinent Asian Americans, and Native Americans. Others can qualify by demonstrating social disadvantage through a personal narrative.

*Economic Disadvantage*
The disadvantaged owner(s) must have:
- Personal net worth less than $850,000 (excluding equity in primary residence and business)
- Average adjusted gross income of $400,000 or less over the past three years
- Total assets of $6.5 million or less

*Business Requirements*
- Must be a small business under SBA size standards for your primary NAICS code
- Must have been in business for at least two years (waivable in certain circumstances)
- Must demonstrate potential for success
- Must not have previously participated in the 8(a) program

**Why South Carolina Businesses Have an Advantage**

South Carolina's business community is particularly well-positioned for 8(a) success for several reasons:

*Military Presence*
South Carolina has four major military installations plus numerous Reserve and National Guard facilities. Military bases are among the most active federal buyers, procuring everything from IT services and construction to food services, janitorial, and logistics. An 8(a) firm in South Carolina has natural geographic advantages for base contracts.

*Growing Federal Civilian Footprint*
Federal agencies with significant presence in South Carolina include the Department of Transportation (Charleston port operations), Social Security Administration, IRS service center in Columbia, and various Department of Defense activities. Each represents contracting opportunities.

*Strong Business Community*
South Carolina's business community includes many African American, Hispanic, and veteran-owned businesses that qualify for the 8(a) program. Yet the application rate relative to the eligible population remains low — which means less competition for those who do apply.

**The 9-Year Program Structure**

The 8(a) program is divided into two phases:

*Developmental Stage (Years 1-4)*
During this phase, the SBA provides intensive business development assistance. You can receive sole-source contracts up to the thresholds mentioned above. The focus is on building your business's capacity and competitive positioning.

*Transitional Stage (Years 5-9)*
In this phase, the program emphasizes preparing you for full and open competition. Contract opportunities shift more toward competed 8(a) set-asides. You continue to have access to program benefits but with increasing independence.

**The Application Process**

The 8(a) application is submitted through the SBA's MySBA Certifications portal. The application requires extensive documentation including:

- Three years of business and personal tax returns
- Financial statements (balance sheet, profit & loss)
- Personal financial statements for all owners
- Business licenses and registrations
- Organizational documents (articles of incorporation, operating agreement, bylaws)
- Personal narrative statement demonstrating social disadvantage
- Contracts and revenues history
- Resumes and professional credentials

The personal narrative is one of the most critical elements for applicants who must demonstrate social disadvantage outside the presumed groups. This document tells your story — the specific experiences that have created disadvantage in your business life. It requires careful, thoughtful writing.

Processing time from submission to approval typically runs 90 days, though complex cases can take longer.

**Common Reasons for 8(a) Application Denial**

Understanding why applications get denied helps you avoid these pitfalls:

1. **Insufficient evidence of control** — The disadvantaged owner must truly control the business, not just own it on paper. Day-to-day management, key business decisions, and operational authority must rest with the eligible owner.

2. **Personal net worth issues** — Assets that should be excluded are sometimes included, or excluded assets aren't properly documented.

3. **Weak personal narrative** — The personal narrative doesn't provide sufficient specific examples of social disadvantage.

4. **Two-year rule** — Business hasn't been operating for two years (though there are limited waivers).

5. **Size standard non-compliance** — Business exceeds the SBA size standard for its primary NAICS code.

**How The Contracting Preacher Can Help**

Dr. McKnight has guided numerous South Carolina businesses through the 8(a) application process successfully — including approvals on the first submission. Our 8(a) Certification assistance includes:

- Complete eligibility pre-assessment before you invest time in the application
- Full application document preparation and organization
- Personal narrative statement writing (the most challenging component)
- Financial document review and preparation
- SBA liaison and follow-up throughout the review process
- Annual review preparation for the program's duration
- Mentor-Protégé program guidance

If you're a South Carolina small business owner from a socially and economically disadvantaged background, the 8(a) program could be the most powerful business development tool available to you. Schedule your free consultation to find out if you qualify.`,
    author: 'Dr. McKnight',
    date: '2026-02-10',
    category: 'Certifications',
    readTime: '10 min read',
    tags: ['8a certification', 'South Carolina', 'small business', 'SBA', 'disadvantaged business'],
  },
  {
    id: '4',
    title: 'The Art of Writing a Winning Federal Proposal: Lessons from the Pulpit',
    slug: 'writing-winning-federal-proposal-lessons-from-pulpit',
    excerpt:
      'What do great sermons and winning proposals have in common? More than you think. Dr. McKnight draws parallels between powerful preaching and persuasive proposal writing.',
    content: `People sometimes ask me how a preacher became a federal contracting expert. My answer is always the same: the skills are the same.

A great sermon and a winning proposal share the same fundamental architecture. Both must know their audience intimately. Both must be organized, clear, and compelling. Both must address specific needs and answer real questions. Both must build to a conclusion that moves the listener to action.

After 15 years in federal contracting and a lifetime in ministry, I'm convinced that the principles of effective communication that make a sermon powerful are the same principles that make a proposal win. Let me walk you through the parallels.

**Know Your Congregation (Know Your Evaluators)**

The first rule of preaching is: know who you're preaching to. A sermon for a congregation of elderly believers is structured differently than one for young adults. The illustrations are different, the pace is different, the assumed knowledge is different.

The same principle governs proposal writing. Before you write a single word, you need to understand who will evaluate your proposal and what they care about.

Federal proposals are evaluated by a Source Selection Evaluation Board (SSEB) — a team of technical, management, and contracting personnel. They are evaluating your proposal against specific criteria spelled out in the solicitation's Section M (Evaluation Factors).

Study those evaluation factors like you'd study scripture. They tell you exactly what the evaluators are looking for and how much weight each factor carries. A typical solicitation might weight Technical Approach at 40%, Past Performance at 30%, and Price at 30%. That tells you where to invest your writing energy.

**Start with the Problem, Not the Solution**

Ineffective sermons start with the answer. Effective ones start with the problem — the struggle, the question, the pain point that the audience actually lives with. You hook the congregation by showing that you understand their reality before you reveal the solution.

Winning proposals do the same thing. Your technical approach section should not open with "ABC Company will provide..." It should open by demonstrating that you deeply understand the government's problem, challenge, or need.

When an evaluator reads your proposal and thinks "they understand exactly what we're dealing with" — you've already differentiated yourself from most of your competition.

**Structure Creates Credibility**

A well-organized sermon is a credible sermon. When the congregation can follow the logic, see how each point builds on the last, and anticipate the conclusion, they trust the message.

Poorly organized proposals get low scores — not because the technical approach is weak, but because evaluators can't find the information they need. Federal proposals use a compliance matrix for a reason: you need to address every requirement, in a logical order, so evaluators can score your proposal efficiently.

Structure your proposal to mirror the evaluation criteria. Use clear headings and subheadings that echo the government's own language from the solicitation. When an evaluator is scoring your "Management Approach," they should be able to flip directly to your Management Approach section and find every required element exactly where they expect it.

**Concrete Evidence Over Abstract Claims**

"We are a highly qualified team with extensive experience" is the proposal equivalent of a preacher saying "God is great." Technically true, practically useless.

Effective preaching uses stories, specific examples, scripture references — concrete evidence that makes abstract truth tangible. Effective proposals work exactly the same way.

Instead of "extensive experience in facilities management," write: "Our team has managed facilities maintenance contracts at 14 military installations over 12 years, maintaining 98.7% uptime on all critical systems." Now you're credible.

Past performance is the proposal section where concrete evidence matters most. Don't describe past contracts in vague terms. Name the agency, the contract number, the dollar value, the period of performance, and the specific results you delivered. Contracting officers can verify past performance — and they do.

**Address the Doubts Directly**

Every congregation has skeptics. The best preachers don't ignore the hard questions — they address them head-on, because unaddressed doubts become objections that prevent belief.

Every evaluator reading your proposal has questions. What happens if a key person leaves? How will you handle scope changes? What's your quality control process? If your proposal doesn't address these questions, evaluators will score you down for them — or worse, assume you haven't thought about them.

Look at the evaluation criteria and ask yourself: "What would make an evaluator doubt us on this factor?" Then address those doubts proactively and directly in your proposal.

**Price Is Part of the Message**

In ministry, how you talk about money reveals your values. In federal contracting, your price tells a story — and evaluators are reading it.

Unrealistically low prices suggest you don't understand the scope of work, plan to use unqualified labor, or will request modifications after award. Unrealistically high prices suggest inefficiency or profit-seeking at the government's expense.

Your price should be competitive with similar work in the market, defensible with a detailed cost buildup, and consistent with the staffing and approach you've described in your technical proposal. Price inconsistencies — like claiming senior engineers but pricing junior labor — are red flags that trained evaluators catch immediately.

**The Close: Make the Decision Easy**

Every sermon builds to a call to action. The invitation. The moment where the congregation is moved to respond. The close should feel inevitable — the natural conclusion of everything that came before.

Your proposal's executive summary is the close. It should be written last, but placed first. It should summarize your most compelling differentiators, restate your understanding of the requirement, and make the evaluator's decision feel obvious.

A great executive summary answers this question in two pages: "Why should the government award this contract to us rather than to anyone else?" If you can answer that compellingly and specifically — not generically — you've written a close that wins.

**The 89% Win Rate Isn't Magic**

People sometimes react with disbelief when I tell them our proposal win rate is 89%. They assume there's some secret technique, some insider knowledge.

There isn't. The principles are the same ones I've described above — the same ones that make a sermon move a congregation. Know your audience. Start with their problem. Organize logically. Use concrete evidence. Address doubts. Price honestly. Close with conviction.

What separates winning proposals from losing ones is usually not technical brilliance — it's disciplined application of these fundamentals.

If you want help applying these principles to your next federal contract opportunity, The Contracting Preacher's proposal writing team is ready. Schedule a free consultation and let's talk about what you're bidding on.`,
    author: 'Dr. McKnight',
    date: '2026-02-05',
    category: 'Proposal Writing',
    readTime: '7 min read',
    tags: ['proposal writing', 'federal contracts', 'bid writing', 'RFP response', 'winning proposals'],
  },
  {
    id: '5',
    title: 'HUBZone Certification: Is Your South Carolina Business Eligible?',
    slug: 'hubzone-certification-south-carolina-eligible',
    excerpt:
      'Many South Carolina businesses are located in Historically Underutilized Business Zones and don\'t even know it. Find out if your business qualifies for HUBZone certification.',
    content: `Here's something most South Carolina small business owners don't know: a significant percentage of businesses in our state are located in Historically Underutilized Business Zones (HUBZones) — and they're leaving federal contracting money on the table because they haven't applied for HUBZone certification.

The federal government is required to award at least 3% of all federal contracting dollars — more than $18 billion annually — to HUBZone-certified small businesses. Yet the total number of HUBZone-certified businesses nationwide is relatively small, which means less competition for certified firms.

If your business is located in a HUBZone, this certification could be one of the most valuable assets in your federal contracting strategy.

**What Is a HUBZone?**

HUBZones are geographic areas designated by the SBA as "historically underutilized" based on factors like unemployment rates, income levels, and census designations. The program was created to stimulate economic development and employment growth in distressed communities.

HUBZone designations include:
- **Qualified Census Tracts** — Low-income census tracts as defined by HUD
- **Qualified Non-Metropolitan Counties** — Counties with high unemployment or low median household incomes
- **Qualified Indian Reservation Lands** — Federally recognized tribal lands
- **Qualified Base Closure Areas** — Areas near closed or realigning military bases
- **Redesignated Areas** — Areas that recently lost their HUBZone status but are protected for a transition period
- **Governor-Designated Covered Areas** — Disaster areas and certain rural zones

**South Carolina's HUBZone Map**

South Carolina has a substantial number of HUBZone-designated areas, particularly in rural counties and certain urban census tracts. Counties and areas with significant HUBZone coverage include portions of:

- Rural counties in the Pee Dee region
- Parts of the Lowcountry
- Certain census tracts in Columbia, Charleston, and Greenville
- Multiple rural counties along the I-95 corridor
- Base Closure Areas near Fort Jackson and other facilities

The best way to check your specific address is to use the SBA's official HUBZone Map at sbagov's mapping tool. Enter your business address and employee residences to see real-time eligibility.

**The Three Core HUBZone Requirements**

To qualify for HUBZone certification, your business must meet all three of these requirements:

*1. Principal Office Location*
Your business's principal office — where the greatest number of employees perform their work — must be located in a HUBZone. A P.O. box does not count. This must be a physical location where work is actually performed.

*2. Small Business Status*
Your business must qualify as a small business under SBA size standards for your primary NAICS code. Check the current size standards at sba.gov/size-standards.

*3. Ownership and Control*
At least 51% of your business must be owned and controlled by U.S. citizens. Certain other entities can also qualify, including Community Development Corporations and agricultural cooperatives.

*4. Employee Residency (35% Rule)*
At least 35% of your employees must reside in a HUBZone — not necessarily the same HUBZone where your office is located. Any HUBZone counts.

This last requirement is often the most challenging. If you have 10 employees, at least 4 must live in a HUBZone. You'll need to document employee residences and maintain this percentage as you hire.

**What HUBZone Certification Gets You**

Once certified, HUBZone businesses have access to:

*Price Evaluation Preference*
In full and open competitions, HUBZone businesses receive a 10% price evaluation preference. This means if a non-HUBZone firm bids $100,000, your bid is evaluated as if it were $90,000 — even though you'd actually receive $100,000 if you win. This can be a decisive competitive advantage.

*Set-Aside Contracts*
Contracting officers can restrict competitions to HUBZone firms only when they reasonably expect at least two qualified HUBZone businesses to bid. These set-asides dramatically reduce competition.

*Sole-Source Awards*
HUBZone businesses can receive sole-source contracts (no competition required) up to $4.5 million for services and $7 million for manufacturing.

**The HUBZone Application Process**

The application is submitted through the SBA's certify.sba.gov platform. Here's what you'll need:

*Documentation Required*
- Business formation documents (articles of incorporation, LLC operating agreement, partnership agreement)
- Proof of principal office location (lease agreement, utility bills, mortgage statement)
- Employee list with home addresses for all employees
- Proof of employee residences (driver's licenses, utility bills — documents showing actual residence, not just addresses)
- Business ownership documentation
- Most recent tax return
- Active SAM.gov registration

The SBA will verify that your principal office is indeed in a HUBZone and that at least 35% of your employees live in a HUBZone. They may conduct site visits or request additional documentation.

Processing time is typically 90 days, though it can vary.

**Maintaining Your HUBZone Certification**

HUBZone certification requires annual recertification. You must document that your principal office remains in a HUBZone and that at least 35% of your employees still reside in HUBZones.

This is where businesses sometimes lose their certification: employee turnover changes the residency percentage, or an employee moves out of a HUBZone and you drop below 35%. You're required to notify the SBA within 30 days of any change that might affect your eligibility.

Growth can also create challenges. As you add employees, the 35% residency requirement becomes harder to maintain unless you're intentional about where you recruit.

**Is HUBZone Right for Your Business?**

HUBZone certification is most valuable when:
- Your principal office is already in a HUBZone (no relocation required)
- A significant portion of your workforce already lives in HUBZones
- You're competing for contracts in industries with strong HUBZone set-aside activity
- You're combining HUBZone with other certifications (e.g., 8(a) + HUBZone, or SDVOSB + HUBZone)

If you're close to eligibility but not quite there, it's worth evaluating whether strategic decisions — like relocating your office or being intentional about where you hire — would make HUBZone certification worthwhile for your specific situation.

The Contracting Preacher offers complete HUBZone eligibility assessments and certification assistance starting at $1,997. We handle the entire application, from documenting employee residences to filing with the SBA and responding to any SBA inquiries.

Schedule your free consultation today and let's check whether your South Carolina business qualifies for HUBZone certification.`,
    author: 'Dr. McKnight',
    date: '2026-01-28',
    category: 'Certifications',
    readTime: '9 min read',
    tags: ['HUBZone', 'South Carolina', 'certification', 'set-aside contracts', 'small business'],
  },
  {
    id: '6',
    title: 'Top 10 NAICS Codes for Small Businesses New to Federal Contracting',
    slug: 'top-10-naics-codes-small-businesses-federal-contracting',
    excerpt:
      'Choosing the right NAICS codes is critical for your SAM registration and your ability to find and win contracts. Here are the top 10 NAICS codes that small businesses should consider.',
    content: `When you register on SAM.gov, one of the most consequential decisions you'll make is selecting your NAICS codes. These 6-digit codes classify your business by industry and determine which federal contracts you can compete for. Choose the wrong codes — or too few — and you'll miss contracts you should be winning. Choose codes that don't accurately reflect your capabilities and you'll waste time pursuing work you're not set up to perform.

This guide covers the top 10 NAICS codes that small businesses new to federal contracting should be aware of, along with the key facts you need to evaluate whether they apply to your business.

**What Are NAICS Codes and Why Do They Matter?**

NAICS stands for North American Industry Classification System. The U.S. Census Bureau maintains these codes, which classify businesses by their primary economic activity. There are over 1,000 NAICS codes across all industries.

In federal contracting, NAICS codes matter for three reasons:

1. **Contract eligibility** — Each solicitation has a primary NAICS code. Generally, you need to be registered under that code to bid.

2. **Small business size standards** — The SBA defines "small business" differently for each NAICS code. For some codes, the standard is annual revenue (e.g., $19 million for many service industries). For others, it's number of employees (e.g., 500 employees for many manufacturing codes). Make sure you qualify under the codes you register.

3. **Set-aside eligibility** — Certifications like 8(a), HUBZone, WOSB, and SDVOSB are often tied to specific NAICS codes. Registering under the right codes ensures you can access set-aside opportunities.

**The Top 10 NAICS Codes for New Federal Contractors**

**1. NAICS 541611 — Administrative Management and General Management Consulting Services**
*Size Standard: $19 million in annual revenue*

This is one of the most common NAICS codes in federal contracting. Management consultants help federal agencies improve processes, develop strategies, and manage organizational change. If you have business, management, or operations expertise, this code opens enormous opportunity. The federal government spends billions annually on management consulting across virtually every agency.

**2. NAICS 541512 — Computer Systems Design Services**
*Size Standard: $34 million in annual revenue*

IT services represent one of the largest segments of federal procurement. This code covers custom computer programming, software design, and computer systems integration. With every federal agency modernizing IT infrastructure, demand for IT services contractors is consistently high. This code is particularly relevant for technology firms and software developers.

**3. NAICS 561720 — Building Cleaning and Maintenance Services**
*Size Standard: $22 million in annual revenue*

Janitorial and facility cleaning services are among the most consistently procured services by federal agencies, military installations, and government buildings. Competition exists, but so does enormous volume. Many small businesses — including family-owned operations — have built substantial federal contracting revenue through building services contracts. This code is an excellent entry point for service businesses.

**4. NAICS 236220 — Commercial and Institutional Building Construction**
*Size Standard: $45 million in average annual revenue over 3 years*

Federal construction is a massive market. Agencies are constantly building, renovating, and maintaining facilities. This code covers the construction of commercial and institutional buildings. If you're a licensed general contractor, this code can open doors to significant federal construction opportunities, particularly through the Army Corps of Engineers and General Services Administration.

**5. NAICS 561110 — Office Administrative Services**
*Size Standard: $19 million in annual revenue*

Administrative support services include records management, data entry, clerical support, and general office administration. This code covers businesses that provide outsourced administrative functions to government agencies. It's a strong entry-level federal contracting NAICS code for businesses with administrative and office management capabilities.

**6. NAICS 541620 — Environmental Consulting Services**
*Size Standard: $19 million in annual revenue*

Environmental consulting is a specialized and consistently funded federal contracting area. Agencies like the EPA, Department of Defense, and Department of Energy regularly need environmental assessments, remediation planning, compliance consulting, and sustainability services. If you have environmental science or engineering expertise, this code represents high-value opportunities.

**7. NAICS 611430 — Professional and Management Development Training**
*Size Standard: $19 million in annual revenue*

Federal agencies invest heavily in employee training and development. This code covers businesses that provide professional development, leadership training, technical skills training, and management education. If you're a trainer, coach, or learning and development professional, federal training contracts can be highly lucrative.

**8. NAICS 562111 — Solid Waste Collection**
*Size Standard: $41.5 million in annual revenue*

Waste management and collection services are needed at federal facilities nationwide. Military bases, government buildings, and federal lands all require waste collection services. This is a steady, recurring revenue source for businesses in the waste management sector.

**9. NAICS 561210 — Facilities Support Services**
*Size Standard: $47 million in annual revenue*

Facilities management is one of the largest categories of federal procurement. This code covers comprehensive building operations and maintenance — covering everything from HVAC maintenance to grounds keeping, security, and facility operations. Federal agencies and military installations regularly award large, multi-year facilities management contracts.

**10. NAICS 541690 — Other Scientific and Technical Consulting Services**
*Size Standard: $19 million in annual revenue*

This broader scientific and technical consulting code covers specialized advisory services that don't fit other categories. It's useful for businesses providing niche technical expertise — engineering analysis, scientific research support, technical writing, and similar specialized services.

**How to Choose the Right Codes for Your Business**

Here's the approach I recommend to every client:

*Step 1: Start with what you actually do*
List every service or product your business provides. For each one, find the NAICS code that most accurately describes that activity. Don't stretch codes to cover activities you don't genuinely perform.

*Step 2: Check the size standards*
For each code you're considering, verify that your business qualifies as small. Use the SBA's Size Standards Tool at sba.gov.

*Step 3: Research federal spending in that code*
Use USASpending.gov to research how much federal money is spent in each NAICS code. Filter by contract awards in the past 1-3 years. This tells you whether real opportunity exists.

*Step 4: Identify your primary code*
Your primary NAICS code is the one that best describes your core business. This is what SBA certifications and size determinations are based on. Choose thoughtfully.

*Step 5: Register all applicable secondary codes*
You can register under multiple NAICS codes on SAM.gov. Register under every code that accurately describes your capabilities. More codes mean more opportunities to appear in contracting officer searches.

**Common NAICS Code Mistakes**

- Selecting codes based on where you want to work rather than what you actually do
- Forgetting to check size standards for each code
- Not updating codes when you add new capabilities
- Registering under too-broad codes that don't match specific solicitations
- Missing relevant codes because you didn't know they existed

**Need Help with NAICS Code Selection?**

NAICS code selection is one of the most important decisions in your SAM.gov registration. The wrong codes — or missing codes — directly impact which contract opportunities you can pursue.

The Contracting Preacher includes comprehensive NAICS code consultation as part of every SAM.gov registration engagement. We research federal spending in codes relevant to your business, help you identify the right primary code, and ensure your registration reflects all of your capabilities.

Schedule your free consultation to discuss your business and identify the NAICS codes that will open the most federal contracting doors for you.`,
    author: 'Dr. McKnight',
    date: '2026-01-20',
    category: 'Getting Started',
    readTime: '11 min read',
    tags: ['NAICS codes', 'SAM.gov', 'small business', 'federal contracting', 'industry codes'],
  },
]
