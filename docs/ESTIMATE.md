# Production Implementation Estimate & Scope of Work

**Project:** Platform-Compliant Influencer Outreach & Relationship CRM Engine  
**Client:** Zeid • Bearvana • Hoboken, NJ  
**Engineering Partner:** Md Shakil A. • Founder, BarakahSoft LLC  
**Primary Hourly Rate:** $34.00/hr (Calibrated to client historical average & optimal delivery velocity)  
**Estimated Timeline:** 10 Working Days (2 Weeks at 36 hrs/week)  
**Prototype Deliverable:** Live Interactive Demo Deployed at $0 (Phase 0 Complete)  

---

## 1. Executive Summary & Phase Breakdown

| Phase | Milestone Description | Estimated Hours | Billed Rate | Total Investment |
| :--- | :--- | :---: | :---: | :---: |
| **Phase 0** | **Rapid Architecture Spike & Live Prototype**<br>• Custom Next.js 15 interactive prototype tailored to Bearvana<br>• Simulated Meta Graph API v20.0 & TikTok Business endpoints<br>• Live `/api/compliance` audit matrix & human review gate drawer<br>• Delivered within 30 min of brief to demonstrate zero-bot compliance | **2 hrs (Spike)** | **$0.00/hr** | **$0.00** *(Completed & Live)* |
| **Phase 1** | **Official Meta & TikTok API Authentication & Token Vault**<br>• Meta App review setup for Instagram Graph API v20.0 (`instagram_basic`, `pages_read_engagement`)<br>• TikTok for Business Developer App integration<br>• Multi-brand encrypted token vault with automatic refresh in Supabase<br>• Real rate-limit monitors and throttle handlers | **18 hrs** | $34.00/hr | $612.00 |
| **Phase 2** | **Grounded AI Outreach Personalization & Post Auditing**<br>• Official Business Discovery media fetcher for recent reels & videos<br>• Claude / OpenAI API integration with strict brand prompt templates<br>• Zero-hallucination icebreakers grounded in real public captions<br>• Tone selectors (Casual & Warm, Founder Zeid, VIP Seeding) | **14 hrs** | $34.00/hr | $476.00 |
| **Phase 3** | **Human-in-the-Loop Gate, Team Roles & SLA Engine**<br>• Role-based permissions (Zeid Owner, Queen Y. Sourcing, Sarah M. Campaigns)<br>• 1-Click approval with timestamped audit logging<br>• 24h/48h/72h SLA reminder queues powered by Inngest durable workflows<br>• Deep-link generation into Instagram Direct Web / Mobile App | **16 hrs** | $34.00/hr | $544.00 |
| **Phase 4** | **Relationship CRM, Conversation Webhooks & Analytics**<br>• Webhook receiver for incoming Instagram Business Direct events<br>• Stage tracking (Draft Ready → Approved → Sent → Negotiating → Shipped → Live)<br>• Product gifting & tracking number dispatch logging<br>• CSV export & conversion reporting (response rate, reach, CPA) | **15 hrs** | $34.00/hr | $510.00 |
| **Phase 5** | **Security Hardening, Evals & Production Deployment**<br>• Zero-bot policy audit confirming 100% Upwork & Platform TOS compliance<br>• Production deployment to Vercel with custom domain configuration<br>• 14 days of post-launch warranty, monitoring, and live team onboarding | **9 hrs** | $34.00/hr | $306.00 |
| **TOTALS** | **Complete Turnkey Production System** | **72 hrs** | **$34.00/hr** | **$2,448.00** |

---

## 2. Fixed-Price Milestone Alternative

For clients who prefer fixed milestones over hourly tracking:

- **Milestone 1 (Days 1–4): $950.00** — Live API Connections, Brand Vault, & Creator Discovery Pipeline.
- **Milestone 2 (Days 5–8): $950.00** — Grounded AI Composer, Human Gate, & Team Member SLA Reminders.
- **Milestone 3 (Days 9–10): $548.00** — Conversation Tracking, Webhooks, Analytics Export, & Final Launch.
- **Total Fixed Contract:** **$2,448.00**

---

## 3. Technology Stack & Infrastructure

- **Frontend & Full-Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Lucide Icons.
- **Database & Vault:** Supabase (PostgreSQL with Row Level Security, Encrypted Token Storage).
- **Background Orchestration:** Inngest (Durable functions for SLA reminders, token refresh, rate limits).
- **AI Processing:** Claude 3.5 Sonnet / OpenAI GPT-4o with structured JSON outputs.
- **Social APIs:**
  - Meta Instagram Graph API v20.0 (Business Discovery, Webhooks).
  - TikTok for Business API (Creator Info, Display API).
- **Deployment:** Vercel Fluid Compute with sub-second Edge caching.

---

## 4. Why This Architecture Protects Bearvana

1. **Zero Bot Scraping:** No headless browsers, proxy rotations, or reverse-engineered cookies that trigger Meta or TikTok anti-fraud AI.
2. **Account Longevity:** Uses official OAuth tokens issued directly by Meta and TikTok developers.
3. **Strict Human Gate:** Guarantees zero automated spam DMs. Every communication is vetted by Zeid or team leads before dispatch.
4. **Isolated Brand Spaces:** Complete separation of Bearvana and other brand assets in database tables.
