import { BrandProfile, InfluencerRecord, ComplianceFeatureRule } from "./types";

export const TEAM_MEMBERS = [
  "Zeid (Owner / Strategy)",
  "Queen Y. (Outreach & Sourcing Lead)",
  "Sarah M. (Campaign Manager)",
  "Alex K. (Creator Relations)"
];

export const INITIAL_BRANDS: BrandProfile[] = [
  {
    id: "brand_bearvana",
    name: "Bearvana",
    handle: "@bearvanabody",
    category: "Beauty & Wellness",
    activeCampaign: "Q3 Natural Curves & Wellness Creator Campaign",
    complianceStatus: "VERIFIED_BUSINESS",
    targetNiche: ["Wellness", "Body Positivity", "Holistic Fitness", "Self-Care"],
    productCatalogSample: "Natural Breast & Booty Enhancing Cream, Vitamin Gummy Complex, Firming Oil",
    authorizedAccounts: [
      {
        platform: "INSTAGRAM",
        handle: "@bearvanabody",
        apiConnected: true,
        rateLimitRemaining: 184
      },
      {
        platform: "TIKTOK",
        handle: "@bearvanaofficial",
        apiConnected: true,
        rateLimitRemaining: 92
      }
    ]
  },
  {
    id: "brand_auraglow",
    name: "AuraGlow Organics",
    handle: "@auraglow.organics",
    category: "Skincare & Supplements",
    activeCampaign: "Spring Hydration & Collagen Serum Launch",
    complianceStatus: "VERIFIED_BUSINESS",
    targetNiche: ["Clean Beauty", "Esthetician", "Dermatology Care", "Morning Routine"],
    productCatalogSample: "Marine Collagen Peptide Elixir, Barrier Repair Dew",
    authorizedAccounts: [
      {
        platform: "INSTAGRAM",
        handle: "@auraglow.organics",
        apiConnected: true,
        rateLimitRemaining: 198
      },
      {
        platform: "TIKTOK",
        handle: "@auraglow_beauty",
        apiConnected: true,
        rateLimitRemaining: 88
      }
    ]
  }
];

export const INITIAL_INFLUENCERS: InfluencerRecord[] = [
  {
    id: "inf_1",
    brandId: "brand_bearvana",
    name: "Elena Rostova",
    handle: "@elenarostovafit",
    platform: "INSTAGRAM",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    followers: 94200,
    engagementRate: 4.8,
    niche: "Holistic Fitness & Curves",
    location: "Miami, FL",
    verifiedBadge: true,
    pipelineStage: "DRAFT_READY",
    assignedTeamMember: "Queen Y. (Outreach & Sourcing Lead)",
    nextReminderDate: "2026-09-16",
    lastOutreachDate: null,
    recentPost: {
      caption: "Consistency over intensity every single morning 🧘‍♀️ Incorporating daily lymphatic massage and targeted plant-based body oils has completely transformed my skin texture.",
      date: "2 days ago",
      likes: 4820,
      comments: 312,
      mediaType: "REEL",
      postUrl: "https://instagram.com/p/C8kL92mS",
      relevanceHook: "Her recent reel on botanical skin toning aligns directly with Bearvana botanical firming complex."
    },
    outreachDraft: {
      subject: "Collaboration with Bearvana — Loved your lymphatic massage routine",
      message: "hi elena, caught your recent reel on morning lymphatic massage and skin toning routines — really loved your breakdown of plant-based oil textures.\n\nat bearvana, we formulated our botanical body toning elixir around the exact cold-pressed botanical bases you mentioned. our team in hoboken would love to gift you our full Q3 curve & skin care kit with zero mandatory posting obligations.\n\nif you're open to testing the formula, let us know where to ship your parcel!",
      personalizedContext: "Grounded in Reel #C8kL92mS (plant-based oil routines). Zero generic copy.",
      status: "GENERATED",
      compliancePassed: true
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: false,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Audited public reel via Instagram Graph API. High engagement in comments."]
  },
  {
    id: "inf_2",
    brandId: "brand_bearvana",
    name: "Maya Chen",
    handle: "@mayachen_glow",
    platform: "TIKTOK",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    followers: 168400,
    engagementRate: 6.2,
    niche: "Self-Care & Daily Routine",
    location: "Austin, TX",
    verifiedBadge: false,
    pipelineStage: "HUMAN_APPROVED",
    assignedTeamMember: "Zeid (Owner / Strategy)",
    nextReminderDate: "2026-09-15",
    lastOutreachDate: null,
    recentPost: {
      caption: "Everything I take and apply before bed for glowing skin and hormone balance ✨ honest reviews only.",
      date: "3 days ago",
      likes: 12400,
      comments: 640,
      mediaType: "VIDEO",
      postUrl: "https://tiktok.com/@mayachen_glow/video/73918237",
      relevanceHook: "Her bedtime wellness routine video specifically highlights clean beauty & vitamin gummies."
    },
    outreachDraft: {
      subject: "Bearvana bedtime gummies for your nightly routine video",
      message: "hi maya, saw your tiktok breaking down your nightly hormone and skin routine — loved how transparent your ingredient reviews are.\n\nwe produce clean gummy complexes designed specifically for evening wellness and body firmness. zeid and our team would love to send over a 60-day supply for you to try.\n\nwould love to get your address if you are interested in trying them out!",
      personalizedContext: "Grounded in TikTok video #73918237 regarding evening vitamin routines.",
      status: "APPROVED",
      compliancePassed: true,
      approvedBy: "Zeid (Owner / Strategy)",
      approvedAt: "2026-09-14 03:15 UTC"
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: true,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Approved by Zeid for seeding. Awaiting dispatch address."]
  },
  {
    id: "inf_3",
    brandId: "brand_bearvana",
    name: "Brianna Taylor",
    handle: "@briannat_wellness",
    platform: "INSTAGRAM",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    followers: 52100,
    engagementRate: 5.4,
    niche: "Body Positivity & Wellness",
    location: "Los Angeles, CA",
    verifiedBadge: false,
    pipelineStage: "OUTREACH_SENT",
    assignedTeamMember: "Queen Y. (Outreach & Sourcing Lead)",
    nextReminderDate: "2026-09-17",
    lastOutreachDate: "2026-09-13",
    recentPost: {
      caption: "Learning to love every phase of my physical journey. Healing my relationship with movement and nourishment.",
      date: "5 days ago",
      likes: 3180,
      comments: 189,
      mediaType: "CAROUSEL",
      postUrl: "https://instagram.com/p/C7xN21qP",
      relevanceHook: "High affinity for Bearvana self-love & body contouring values."
    },
    outreachDraft: {
      subject: "Bearvana x Brianna",
      message: "hi brianna, loved your carousel post on body acceptance and intuitive movement. our founder zeid started bearvana around those exact holistic principles.\n\nwe would love to gift you our complete sculpting and nourishment package. no expectations or obligations, just want to share our products with creators who inspire us.\n\nlet us know if you'd like a package sent your way!",
      personalizedContext: "Referenced post #C7xN21qP. Sent via verified Instagram Direct inbox.",
      status: "SENT",
      compliancePassed: true,
      approvedBy: "Queen Y. (Outreach & Sourcing Lead)",
      approvedAt: "2026-09-13 14:20 UTC"
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: true,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Sent 24h ago. Follow-up reminder scheduled for Sep 17."]
  },
  {
    id: "inf_4",
    brandId: "brand_bearvana",
    name: "Chloe Dupont",
    handle: "@chloedupont_fit",
    platform: "TIKTOK",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    followers: 245000,
    engagementRate: 7.1,
    niche: "Pilates & Core Sculpting",
    location: "New York, NY",
    verifiedBadge: true,
    pipelineStage: "NEGOTIATING",
    assignedTeamMember: "Sarah M. (Campaign Manager)",
    nextReminderDate: "2026-09-15",
    lastOutreachDate: "2026-09-10",
    recentPost: {
      caption: "15 min daily reformer routine for glutes & posture 🔥",
      date: "1 week ago",
      likes: 21300,
      comments: 950,
      mediaType: "VIDEO",
      postUrl: "https://tiktok.com/@chloedupont_fit/video/73891024",
      relevanceHook: "Active in reformer sculpting; highly targeted audience for body contouring products."
    },
    outreachDraft: {
      subject: "Partnership terms with Bearvana",
      message: "hi chloe, thanks for getting back to us! we are excited about partnering for your Q3 series. our standard gifting + sponsored TikTok rate matches your media kit.\n\nsending the formal collaboration agreement over for your review today.",
      personalizedContext: "Replied positively to initial outreach; negotiating dedicated video package.",
      status: "SENT",
      compliancePassed: true,
      approvedBy: "Sarah M. (Campaign Manager)",
      approvedAt: "2026-09-12 18:00 UTC"
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: true,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Creator requested $750 for 1 dedicated TikTok + 1 IG Reel. Reviewing budget with Zeid."]
  },
  {
    id: "inf_5",
    brandId: "brand_bearvana",
    name: "Jasmine Morales",
    handle: "@jasminemorales_skin",
    platform: "INSTAGRAM",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    followers: 78900,
    engagementRate: 3.9,
    niche: "Esthetician & Body Care",
    location: "Chicago, IL",
    verifiedBadge: false,
    pipelineStage: "SHIPPED",
    assignedTeamMember: "Queen Y. (Outreach & Sourcing Lead)",
    nextReminderDate: "2026-09-18",
    lastOutreachDate: "2026-09-08",
    recentPost: {
      caption: "Why professional estheticians look at carrier oil molecular weight 🔬",
      date: "6 days ago",
      likes: 1940,
      comments: 88,
      mediaType: "PHOTO",
      postUrl: "https://instagram.com/p/C6wB31yQ",
      relevanceHook: "Educational focus on carrier oils and skin barrier absorption."
    },
    outreachDraft: {
      subject: "Tracking info for your Bearvana parcel!",
      message: "hi jasmine, your bearvana kit is on its way via UPS Ground (Tracking: 1Z9999999999999999). excited to hear your professional thoughts on our botanical formulation!",
      personalizedContext: "Gifting kit shipped. Tracking confirmation shared.",
      status: "SENT",
      compliancePassed: true,
      approvedBy: "Queen Y. (Outreach & Sourcing Lead)",
      approvedAt: "2026-09-10 11:30 UTC"
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: true,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Kit in transit. Arriving Sep 16. Automated review check scheduled for Sep 18."]
  },
  {
    id: "inf_6",
    brandId: "brand_bearvana",
    name: "Kylie V.",
    handle: "@kylie_holisticbody",
    platform: "TIKTOK",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    followers: 310000,
    engagementRate: 8.4,
    niche: "Holistic Wellness & Lifestyle",
    location: "Nashville, TN",
    verifiedBadge: true,
    pipelineStage: "LIVE",
    assignedTeamMember: "Sarah M. (Campaign Manager)",
    nextReminderDate: "2026-09-20",
    lastOutreachDate: "2026-09-01",
    recentPost: {
      caption: "Testing out @bearvanabody firming oil for the last 3 weeks and here are my unfiltered results ✨ #bearvanapartner #bodycare",
      date: "Yesterday",
      likes: 41200,
      comments: 1820,
      mediaType: "VIDEO",
      postUrl: "https://tiktok.com/@kylie_holisticbody/video/73954321",
      relevanceHook: "Live sponsored post driving direct traffic and sales conversions."
    },
    outreachDraft: {
      subject: "Incredible video Kylie!",
      message: "kylie, the video is performing phenomenally! already seeing over 1,200 visits with your code. thank you so much for the authentic review!",
      personalizedContext: "Live content performance check-in.",
      status: "SENT",
      compliancePassed: true,
      approvedBy: "Sarah M. (Campaign Manager)",
      approvedAt: "2026-09-13 22:00 UTC"
    },
    complianceChecks: {
      officialApiVerified: true,
      humanReviewPassed: true,
      zeroSpamKeywords: true,
      rateLimitCompliant: true
    },
    notes: ["Post went live Sep 13. Generated 42 affiliate orders in first 24h. Excellent ROI."]
  }
];

export const COMPLIANCE_RULES: ComplianceFeatureRule[] = [
  {
    id: "comp_1",
    featureName: "Creator Profile & Follower Metrics Discovery",
    category: "CREATOR_DISCOVERY",
    officialSupport: "NATIVE_OFFICIAL_API",
    metaEndpoint: "GET /{ig-user-id}?fields=business_discovery.username({target_username}){followers_count,media_count}",
    tikTokEndpoint: "GET /open_api/v1.3/creator/info/?creator_username={username}",
    policyGuideline: "Meta Business Discovery API allows verified Business Accounts to query public metrics of other Creator/Business accounts.",
    safeImplementation: "Queries only public business/creator statistics through verified App Tokens. Zero private scraping or headless cookies."
  },
  {
    id: "comp_2",
    featureName: "Recent Public Posts & Engagement Review",
    category: "PUBLIC_CONTENT_REVIEW",
    officialSupport: "NATIVE_OFFICIAL_API",
    metaEndpoint: "GET /{ig-user-id}?fields=business_discovery.username({target}){media{id,caption,media_type,like_count,comments_count,timestamp,permalink}}",
    tikTokEndpoint: "GET /open_api/v1.3/video/list/?creator_username={username}",
    policyGuideline: "Permitted for commercial relationship management to audit publicly accessible media and verify brand alignment.",
    safeImplementation: "Fetches recent public media payloads to provide manual review cards for human operators before initiating outreach."
  },
  {
    id: "comp_3",
    featureName: "Personalized Outreach Message Generation",
    category: "OUTREACH_MESSAGING",
    officialSupport: "HUMAN_IN_THE_LOOP",
    metaEndpoint: "MESSAGING_POLICY: Bulk Automated DMs are explicitly forbidden under Section 3.b of Platform Terms.",
    tikTokEndpoint: "DIRECT_MESSAGE_API: Automated mass outreach is restricted. Must use Creator Marketplace or Human dispatch.",
    policyGuideline: "Instagram & TikTok strictly prohibit bots executing bulk unsolicited DMs. Commercial outreach must be 1-to-1, personalized, and human-approved.",
    safeImplementation: "AI drafts hyper-specific, context-aware messages referencing verified public posts. Mandatory human review and 1-click verification before dispatch."
  },
  {
    id: "comp_4",
    featureName: "Direct Message Dispatch & Conversation Tracking",
    category: "OUTREACH_MESSAGING",
    officialSupport: "NATIVE_OFFICIAL_API",
    metaEndpoint: "POST /v20.0/{ig-user-id}/messages (Instagram Direct API for authorized business messaging window)",
    tikTokEndpoint: "TikTok Commercial Content / Direct Collaboration API",
    policyGuideline: "Meta Messenger API permits sending to users who have initiated contact or authorized outreach via Business Direct.",
    safeImplementation: "Connects official Instagram Messaging Webhooks for incoming replies and provides deep-link dispatch buttons directly into the verified Instagram app."
  },
  {
    id: "comp_5",
    featureName: "Multi-Brand Profile & Token Isolation",
    category: "RELATIONSHIP_CRM",
    officialSupport: "NATIVE_OFFICIAL_API",
    metaEndpoint: "Meta Business Manager System User Tokens with scoped 'instagram_basic', 'pages_read_engagement'",
    tikTokEndpoint: "TikTok Developer App App ID & Secret per brand profile",
    policyGuideline: "Requires distinct OAuth credentials per legal brand entity to prevent cross-contamination and quota sharing.",
    safeImplementation: "Stores isolated OAuth tokens per brand profile in Supabase encrypted vault with automatic token refresh."
  },
  {
    id: "comp_6",
    featureName: "Follow-Up Scheduling & SLA Reminders",
    category: "RELATIONSHIP_CRM",
    officialSupport: "NATIVE_OFFICIAL_API",
    metaEndpoint: "Internal Event Queue (Inngest / PostgreSQL triggers)",
    tikTokEndpoint: "Internal Event Queue (Inngest / PostgreSQL triggers)",
    policyGuideline: "100% internal CRM functionality. No external platform policy restrictions.",
    safeImplementation: "Enforces 48-hour follow-up windows, team member task assignments, and response rate calculations."
  }
];
