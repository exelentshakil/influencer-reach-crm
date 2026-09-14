"use client";

import React, { useState } from "react";
import {
  InfluencerRecord,
  PipelineStage,
  SocialPlatform
} from "@/lib/types";
import { TEAM_MEMBERS } from "@/lib/constants";
import { formatCompactNumber, getStageConfig, cn } from "@/lib/utils";
import {
  Search,
  Video,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus,
  ShieldCheck,
  LayoutGrid,
  ListFilter,
  ArrowRight,
  Sparkles,
  X
} from "lucide-react";
import { Instagram } from "@/components/SocialIcons";

interface InfluencerCrmPipelineProps {
  creators: InfluencerRecord[];
  onSelectCreatorForComposer: (creator: InfluencerRecord) => void;
  onUpdateCreatorStage: (creatorId: string, newStage: PipelineStage) => void;
  onUpdateAssignee: (creatorId: string, newAssignee: string) => void;
  onAddSimulatedCreator: (newRecord: InfluencerRecord) => void;
}

export function InfluencerCrmPipeline({
  creators,
  onSelectCreatorForComposer,
  onUpdateCreatorStage,
  onUpdateAssignee,
  onAddSimulatedCreator
}: InfluencerCrmPipelineProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<"ALL" | SocialPlatform>("ALL");
  const [stageFilter, setStageFilter] = useState<"ALL" | PipelineStage>("ALL");
  const [viewMode, setViewMode] = useState<"TABLE" | "KANBAN">("TABLE");
  const [showImportModal, setShowImportModal] = useState(false);
  const [importHandle, setImportHandle] = useState("");
  const [importPlatform, setImportPlatform] = useState<SocialPlatform>("INSTAGRAM");

  // Filtering
  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "ALL" || c.platform === platformFilter;
    const matchesStage = stageFilter === "ALL" || c.pipelineStage === stageFilter;
    return matchesSearch && matchesPlatform && matchesStage;
  });

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importHandle.trim()) return;

    const cleanHandle = importHandle.startsWith("@") ? importHandle : `@${importHandle}`;
    const newCreator: InfluencerRecord = {
      id: `inf_${Date.now()}`,
      brandId: "brand_bearvana",
      name: cleanHandle.replace("@", "").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      handle: cleanHandle,
      platform: importPlatform,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      followers: 88500,
      engagementRate: 5.1,
      niche: "Fitness & Curve Aesthetics",
      location: "Los Angeles, CA",
      verifiedBadge: true,
      pipelineStage: "DRAFT_READY",
      assignedTeamMember: "Queen Y. (Outreach & Sourcing Lead)",
      nextReminderDate: "2026-09-17",
      lastOutreachDate: null,
      recentPost: {
        caption: "Audited via official API: Morning wellness regimen featuring clean supplements and targeted curve body oil.",
        date: "Just now",
        likes: 3410,
        comments: 180,
        mediaType: "REEL",
        postUrl: `https://${importPlatform === "INSTAGRAM" ? "instagram.com" : "tiktok.com"}/${cleanHandle.replace("@", "")}`,
        relevanceHook: "High content alignment with active campaign positioning."
      },
      outreachDraft: {
        subject: `Partnership with Bearvana — Loved your latest ${importPlatform === "INSTAGRAM" ? "reel" : "video"}`,
        message: `hi ${cleanHandle.replace("@", "")},\n\ncaught your recent post on body wellness and holistic routines — really loved your authentic breakdown.\n\nat bearvana, we formulated our botanical curve and skin care collection around cold-pressed botanical bases. our team would love to gift you our complete collection with zero posting obligations.\n\nlet us know if you'd like us to send a package your way!`,
        personalizedContext: "Grounded in recent public post audit via official API.",
        status: "GENERATED",
        compliancePassed: true
      },
      complianceChecks: {
        officialApiVerified: true,
        humanReviewPassed: false,
        zeroSpamKeywords: true,
        rateLimitCompliant: true
      },
      notes: ["Imported via Official API discovery sandbox. Ready for human review."]
    };

    onAddSimulatedCreator(newCreator);
    setImportHandle("");
    setShowImportModal(false);
  };

  const STAGES_KANBAN: PipelineStage[] = [
    "DRAFT_READY",
    "HUMAN_APPROVED",
    "OUTREACH_SENT",
    "NEGOTIATING",
    "SHIPPED",
    "LIVE"
  ];

  return (
    <div className="space-y-5">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl p-3 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creator name, @handle, niche, location..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] font-medium transition-all"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
          <button
            onClick={() => setPlatformFilter("ALL")}
            className={cn(
              "px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all",
              platformFilter === "ALL"
                ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            )}
          >
            All Platforms
          </button>
          <button
            onClick={() => setPlatformFilter("INSTAGRAM")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all",
              platformFilter === "INSTAGRAM"
                ? "bg-[var(--color-panel)] text-pink-700 dark:text-pink-400 shadow-2xs border border-[var(--color-border)]"
                : "text-[var(--color-text-secondary)] hover:text-pink-600"
            )}
          >
            <Instagram className="h-3.5 w-3.5" />
            <span>Instagram</span>
          </button>
          <button
            onClick={() => setPlatformFilter("TIKTOK")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all",
              platformFilter === "TIKTOK"
                ? "bg-[var(--color-panel)] text-cyan-700 dark:text-cyan-400 shadow-2xs border border-[var(--color-border)]"
                : "text-[var(--color-text-secondary)] hover:text-cyan-600"
            )}
          >
            <Video className="h-3.5 w-3.5" />
            <span>TikTok</span>
          </button>
        </div>

        {/* View Mode Toggle & Import Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-[var(--color-panel-subtle)] rounded-lg border border-[var(--color-border)]">
            <button
              onClick={() => setViewMode("TABLE")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "TABLE"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              )}
              title="Table View"
            >
              <ListFilter className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("KANBAN")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "KANBAN"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              )}
              title="Kanban Board View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white text-xs sm:text-sm font-semibold shadow-2xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Import Handle</span>
          </button>
        </div>
      </div>

      {/* Main CRM View: TABLE MODE (Stripe-Style High Density Cockpit) */}
      {viewMode === "TABLE" && (
        <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[960px]">
              <thead className="bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 font-semibold w-[22%] whitespace-nowrap">Creator / Channel</th>
                  <th className="py-3.5 px-3 sm:px-4 font-semibold w-[17%] whitespace-nowrap">Audience & Reach</th>
                  <th className="py-3.5 px-3 sm:px-4 font-semibold w-[26%] whitespace-nowrap">Recent Verified Media</th>
                  <th className="py-3.5 px-3 sm:px-4 font-semibold w-[13%] whitespace-nowrap">Pipeline Stage</th>
                  <th className="py-3.5 px-3 sm:px-4 font-semibold w-[12%] whitespace-nowrap">Assignee & SLA</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right font-semibold w-[10%] whitespace-nowrap">Human Review Gate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-[var(--color-text-muted)]">
                      No creators match current search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCreators.map((creator) => {
                    const stageConfig = getStageConfig(creator.pipelineStage);
                    return (
                      <tr
                        key={creator.id}
                        className="hover:bg-[var(--color-panel-subtle)]/60 transition-colors group"
                      >
                        {/* Creator Profile */}
                        <td className="py-3.5 px-3 sm:px-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative shrink-0">
                              <img
                                src={creator.avatarUrl}
                                alt={creator.name}
                                className="h-10 w-10 rounded-lg object-cover border border-[var(--color-border)]"
                              />
                              <span
                                className={cn(
                                  "absolute -bottom-1 -right-1 p-0.5 rounded-full border border-[var(--color-panel)] text-white",
                                  creator.platform === "INSTAGRAM" ? "bg-pink-600" : "bg-cyan-600"
                                )}
                              >
                                {creator.platform === "INSTAGRAM" ? (
                                  <Instagram className="h-2.5 w-2.5" />
                                ) : (
                                  <Video className="h-2.5 w-2.5" />
                                )}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                                  {creator.name}
                                </span>
                                {creator.verifiedBadge && (
                                  <span title="Verified Creator">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-brand-primary)] shrink-0" />
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono mt-0.5 whitespace-nowrap">
                                <span className="text-[var(--color-text-secondary)] font-medium truncate">{creator.handle}</span>
                                <span>•</span>
                                <span className="truncate">{creator.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Metrics */}
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-sm sm:text-base text-[var(--color-text-primary)] tabular-nums">
                            {formatCompactNumber(creator.followers)}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-semibold mt-0.5">
                            {creator.engagementRate}% engagement
                          </div>
                          <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)] whitespace-nowrap">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]/70 shrink-0" />
                            <span>{creator.niche}</span>
                          </span>
                        </td>

                        {/* Recent Verified Content */}
                        <td className="py-3.5 px-3 sm:px-4 max-w-xs">
                          <p className="text-xs sm:text-[13px] text-[var(--color-text-primary)] truncate font-normal leading-snug" title={creator.recentPost.caption}>
                            &ldquo;{creator.recentPost.caption}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-muted)] font-mono whitespace-nowrap">
                            <span className="font-medium text-[var(--color-text-secondary)]">{creator.recentPost.mediaType}</span>
                            <span>•</span>
                            <span>{creator.recentPost.likes.toLocaleString()} likes</span>
                            <span>•</span>
                            <a
                              href={creator.recentPost.postUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-0.5 text-[var(--color-brand-primary)] hover:underline font-semibold shrink-0"
                            >
                              <span>Post</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          </div>
                        </td>

                        {/* Pipeline Stage with Quick Selector */}
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                          <select
                            value={creator.pipelineStage}
                            onChange={(e) =>
                              onUpdateCreatorStage(creator.id, e.target.value as PipelineStage)
                            }
                            className={cn(
                              "w-full text-xs font-semibold rounded-md px-2.5 py-1.5 border cursor-pointer outline-none transition-colors whitespace-nowrap",
                              stageConfig.badgeClass
                            )}
                          >
                            <option value="DRAFT_READY">Draft Ready</option>
                            <option value="HUMAN_APPROVED">Human Approved</option>
                            <option value="OUTREACH_SENT">Outreach Sent</option>
                            <option value="NEGOTIATING">Negotiating</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="LIVE">Live & Tracking</option>
                          </select>
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-medium whitespace-nowrap">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                            <span>Official API Verified</span>
                          </div>
                        </td>

                        {/* Assignee & SLA */}
                        <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                          <select
                            value={creator.assignedTeamMember}
                            onChange={(e) => onUpdateAssignee(creator.id, e.target.value)}
                            className="w-full text-xs font-medium rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] py-1.5 px-2.5 text-[var(--color-text-primary)] outline-none"
                          >
                            {TEAM_MEMBERS.map((member) => (
                              <option key={member} value={member}>
                                {member}
                              </option>
                            ))}
                          </select>
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono whitespace-nowrap">
                            <Clock className="h-3 w-3 text-amber-500 shrink-0" />
                            <span>SLA: {creator.nextReminderDate}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 sm:px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => onSelectCreatorForComposer(creator)}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] hover:bg-[var(--color-brand-primary)] hover:border-[var(--color-brand-primary)] text-[var(--color-text-primary)] hover:text-white text-xs font-semibold transition-all shadow-2xs group/btn whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-primary)] group-hover/btn:text-white transition-colors shrink-0" />
                            <span className="whitespace-nowrap font-medium">Review Draft</span>
                            <ArrowRight className="h-3 w-3 ml-0.5 transition-transform group-hover/btn:translate-x-0.5 shrink-0" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main CRM View: KANBAN MODE */}
      {viewMode === "KANBAN" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {STAGES_KANBAN.map((stage) => {
            const stageConfig = getStageConfig(stage);
            const stageCreators = filteredCreators.filter((c) => c.pipelineStage === stage);

            return (
              <div
                key={stage}
                className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl p-3 flex flex-col min-h-[480px] shadow-2xs"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border)]">
                  <span className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                    {stageConfig.label}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] font-semibold border border-[var(--color-border)]">
                    {stageCreators.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                  {stageCreators.map((creator) => (
                    <div
                      key={creator.id}
                      onClick={() => onSelectCreatorForComposer(creator)}
                      className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] cursor-pointer transition-all hover:shadow-2xs group space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="h-8 w-8 rounded-lg object-cover border border-[var(--color-border)] shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-[13px] font-semibold text-[var(--color-text-primary)] leading-snug truncate">
                              {creator.name}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] font-mono truncate">
                              {creator.handle}
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "p-1 rounded-md shrink-0",
                            creator.platform === "INSTAGRAM"
                              ? "text-pink-700 bg-pink-50 dark:bg-pink-950/40"
                              : "text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40"
                          )}
                        >
                          {creator.platform === "INSTAGRAM" ? (
                            <Instagram className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                        </span>
                      </div>

                      <div className="text-xs text-[var(--color-text-secondary)] line-clamp-2 bg-[var(--color-panel)] p-2.5 rounded-lg border border-[var(--color-border)] leading-relaxed">
                        &ldquo;{creator.recentPost.caption}&rdquo;
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono pt-1.5 border-t border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">
                        <span className="font-medium text-[var(--color-text-secondary)]">{formatCompactNumber(creator.followers)} reach</span>
                        <span className="text-[var(--color-brand-primary)] font-semibold group-hover:underline flex items-center gap-0.5">
                          Review <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageCreators.length === 0 && (
                    <div className="text-center py-8 text-xs text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-lg font-medium">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Simulated Import Modal (100% Official API simulation) */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                Import Creator via Official API
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-1.5">
                  Target Platform
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setImportPlatform("INSTAGRAM")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors",
                      importPlatform === "INSTAGRAM"
                        ? "border-pink-500/40 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram Graph</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportPlatform("TIKTOK")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors",
                      importPlatform === "TIKTOK"
                        ? "border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    <Video className="h-4 w-4" />
                    <span>TikTok Creator API</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-1.5">
                  Creator Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@creatorhandle"
                  value={importHandle}
                  onChange={(e) => setImportHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] font-medium"
                />
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Zero-Bot Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Zero headless browser scraping. Only queries publicly available business accounts under official platform terms.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white shadow-2xs"
                >
                  Query & Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
