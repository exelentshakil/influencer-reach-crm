# Product Requirements Document: Platform-Compliant Influencer Outreach & CRM Engine

## 1. Executive Summary & Core Principle
E-commerce brands and agencies scaling influencer marketing face account suspension risks when using unauthorized scrapers, automated DMs, or headless browser bots. This system enforces a **100% Platform-Compliant Architecture** designed strictly around official Meta (Instagram Graph API Business Discovery) and TikTok for Business / Creator APIs. 

**Core Principle**: Every AI-generated message draft requires **Human-in-the-Loop Review** before dispatch. The system completely eliminates account-circumvention risks, headless bot scraping, and automated bulk messaging, guaranteeing zero compliance violations under Meta and TikTok commercial developer terms.

---

## 2. In Scope vs. Out of Scope

### In Scope (Phase 0 Prototype & Phase 1 Production)
1. **Multi-Brand Profile Management**: Switch seamlessly between authorized brand profiles (e.g., Bearvana, sister wellness brands) with isolated credentials, tone guidelines, and campaign tracking.
2. **Platform-Compliant Creator CRM**: Structured pipeline tracking influencers across stages: `Discovered` -> `Content Reviewed` -> `Draft Ready` -> `Human Approved` -> `Outreach Sent` -> `Negotiating` -> `Product Shipped` -> `Content Live`.
3. **Official API Compliance Matrix (`/api/compliance`)**: Interactive audit grid outlining exact endpoint permissions under Meta Instagram Graph API (v20.0) and TikTok Commercial Content API, contrasting official capabilities with prohibited bot mechanisms.
4. **Context-Grounded Outreach Composer**: AI drafting engine that ingests the creator's verified public profile and recent media highlights to compose bespoke 1-to-1 outreach drafts (zero generic templates), with mandatory human edit/approval gates.
5. **Team Work Order Assignment & Reminders**: Assign creators to internal team members with automated SLA reminders (e.g., 48-hour follow-up trigger).
6. **Activity & Response Rate Reporting**: Real-time conversion analytics measuring reply rates, accepted collaborations, and outreach velocity.
7. **Credential-Free Fallback**: Complete deterministic client-side simulator with pre-loaded authentic creators, real-time stage updates, and mock API status verification.

### Out of Scope
- Unofficial browser automation or private Instagram API scraping (violates Terms of Service).
- Headless bots for auto-commenting or mass DM blasts.

---

## 3. Data Model

### `BrandProfile`
- `id`: string
- `name`: string (e.g., "Bearvana", "Aura Wellness")
- `handle`: string
- `category`: "BEAUTY_WELLNESS" | "FITNESS" | "LIFESTYLE"
- `activeCampaign`: string
- `complianceStatus`: "VERIFIED_BUSINESS" | "PENDING_OAUTH"

### `InfluencerRecord`
- `id`: string
- `name`: string
- `handle`: string
- `platform`: "INSTAGRAM" | "TIKTOK"
- `followers`: number
- `engagementRate`: number
- `niche`: string
- `recentContentSnippet`: string
- `recentPostDate`: string
- `pipelineStage`: "DISCOVERED" | "CONTENT_REVIEWED" | "DRAFT_READY" | "HUMAN_APPROVED" | "OUTREACH_SENT" | "NEGOTIATING" | "SHIPPED" | "LIVE"
- `assignedTeamMember`: string
- `nextReminderDate`: string
- `lastOutreachDate`: string | null
- `outreachDraft`: string
- `complianceChecklist`: {
    officialApiVerified: boolean;
    humanReviewed: boolean;
    zeroSpamKeywords: boolean;
  }

### `ComplianceFeatureMap`
- `feature`: string
- `officialApiSupport`: "NATIVE_API" | "HUMAN_IN_THE_LOOP" | "RESTRICTED_BY_POLICY"
- `metaEndpoint`: string
- `tikTokEndpoint`: string
- `complianceVerdict`: string

---

## 4. Pipeline & State Transition Workflow

```
[Import Creator via Handle] 
        │
        ▼
[Fetch Public Insights via Official API] 
        │
        ▼
[Context-Aware AI Generates Draft]
        │
        ▼
[Human Review & Policy Check Gate] ──► [Edits / Approve]
        │
        ▼
[Authorized Send / External Link]
        │
        ▼
[Follow-up Scheduler & CRM Reporting]
```

---

## 5. Acceptance Criteria (Mapped to Client Brief)
- [x] Import and organize influencer lists across Instagram and TikTok.
- [x] Multi-brand profile switching with isolated campaigns.
- [x] Context-aware personalized outreach drafts requiring human approval.
- [x] Conversation, follow-up, and pipeline status tracking.
- [x] Schedule reminders and team member assignments.
- [x] Recent public content viewer for manual human review.
- [x] Transparent compliance breakdown detailing official API support.
- [x] Response rate and outreach velocity reporting.
