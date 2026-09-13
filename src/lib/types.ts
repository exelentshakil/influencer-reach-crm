export type SocialPlatform = "INSTAGRAM" | "TIKTOK";

export type PipelineStage =
  | "DISCOVERED"
  | "CONTENT_REVIEWED"
  | "DRAFT_READY"
  | "HUMAN_APPROVED"
  | "OUTREACH_SENT"
  | "NEGOTIATING"
  | "SHIPPED"
  | "LIVE";

export interface BrandAuthorizedAccount {
  platform: SocialPlatform;
  handle: string;
  apiConnected: boolean;
  rateLimitRemaining: number;
}

export interface BrandProfile {
  id: string;
  name: string;
  handle: string;
  category: string;
  activeCampaign: string;
  complianceStatus: "VERIFIED_BUSINESS" | "PENDING_OAUTH";
  targetNiche: string[];
  productCatalogSample: string;
  authorizedAccounts: BrandAuthorizedAccount[];
}

export interface RecentPostData {
  caption: string;
  date: string;
  likes: number;
  comments: number;
  mediaType: "REEL" | "VIDEO" | "CAROUSEL" | "PHOTO";
  postUrl: string;
  relevanceHook: string;
}

export interface OutreachDraft {
  subject?: string;
  message: string;
  personalizedContext: string;
  status: "GENERATED" | "EDITED" | "APPROVED" | "SENT";
  compliancePassed: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ComplianceAuditChecks {
  officialApiVerified: boolean;
  humanReviewPassed: boolean;
  zeroSpamKeywords: boolean;
  rateLimitCompliant: boolean;
}

export interface InfluencerRecord {
  id: string;
  brandId: string;
  name: string;
  handle: string;
  platform: SocialPlatform;
  avatarUrl: string;
  followers: number;
  engagementRate: number;
  niche: string;
  location: string;
  verifiedBadge: boolean;
  pipelineStage: PipelineStage;
  assignedTeamMember: string;
  nextReminderDate: string;
  lastOutreachDate: string | null;
  recentPost: RecentPostData;
  outreachDraft: OutreachDraft;
  complianceChecks: ComplianceAuditChecks;
  notes: string[];
}

export interface ComplianceFeatureRule {
  id: string;
  featureName: string;
  category: "CREATOR_DISCOVERY" | "PUBLIC_CONTENT_REVIEW" | "OUTREACH_MESSAGING" | "RELATIONSHIP_CRM";
  officialSupport: "NATIVE_OFFICIAL_API" | "HUMAN_IN_THE_LOOP" | "POLICY_PROHIBITED_BOT";
  metaEndpoint: string;
  tikTokEndpoint: string;
  policyGuideline: string;
  safeImplementation: string;
}

export interface OutreachAnalyticsSummary {
  totalCreators: number;
  pendingApprovals: number;
  activeCollaborations: number;
  overallResponseRate: number;
  complianceScore: number;
  stageBreakdown: Record<PipelineStage, number>;
}
