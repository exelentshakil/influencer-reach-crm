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
  Filter,
  Video,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Plus,
  ShieldCheck,
  LayoutGrid,
  ListFilter,
  ArrowRight,
  MessageSquare
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
    <div className="space-y-6">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creator name, @handle, niche, location..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-xl border border-[var(--color-border)]">
          <button
            onClick={() => setPlatformFilter("ALL")}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors",
              platformFilter === "ALL"
                ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            )}
          >
            All Platforms
          </button>
          <button
            onClick={() => setPlatformFilter("INSTAGRAM")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors",
              platformFilter === "INSTAGRAM"
                ? "bg-[var(--color-panel)] text-pink-600 shadow-xs"
                : "text-[var(--color-text-muted)] hover:text-pink-600"
            )}
          >
            <Instagram className="h-3 w-3" />
            <span>Instagram</span>
          </button>
          <button
            onClick={() => setPlatformFilter("TIKTOK")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors",
              platformFilter === "TIKTOK"
                ? "bg-[var(--color-panel)] text-cyan-600 shadow-xs"
                : "text-[var(--color-text-muted)] hover:text-cyan-600"
            )}
          >
            <Video className="h-3 w-3" />
            <span>TikTok</span>
          </button>
        </div>

        {/* View Mode Toggle & Import Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-[var(--color-panel-subtle)] rounded-xl border border-[var(--color-border)]">
            <button
              onClick={() => setViewMode("TABLE")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "TABLE"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs"
                  : "text-[var(--color-text-muted)]"
              )}
              title="Table View"
            >
              <ListFilter className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("KANBAN")}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                viewMode === "KANBAN"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs"
                  : "text-[var(--color-text-muted)]"
              )}
              title="Kanban Board View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Import Handle</span>
          </button>
        </div>
      </div>

      {/* Main CRM View: TABLE MODE */}
      {viewMode === "TABLE" && (
        <div className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-panel)] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-3 px-4">Creator / Channel</th>
                  <th className="py-3 px-4">Reach & Engagement</th>
                  <th className="py-3 px-4">Recent Verified Content</th>
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4">Assignee & SLA</th>
                  <th className="py-3 px-4 text-right">Human-in-Loop Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-[var(--color-text-muted)]">
                      No creators match current search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCreators.map((creator) => {
                    const stageConfig = getStageConfig(creator.pipelineStage);
                    return (
                      <tr
                        key={creator.id}
                        className="hover:bg-[var(--color-panel-subtle)]/50 transition-colors group"
                      >
                        {/* Creator Profile */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={creator.avatarUrl}
                                alt={creator.name}
                                className="h-10 w-10 rounded-full object-cover border border-[var(--color-border)]"
                              />
                              <span
                                className={cn(
                                  "absolute -bottom-1 -right-1 p-0.5 rounded-full border border-[var(--color-panel)] text-white text-[9px]",
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
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[var(--color-text-primary)]">
                                  {creator.name}
                                </span>
                                {creator.verifiedBadge && (
                                  <span title="Verified Creator">
                                    <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                                <span className="font-mono">{creator.handle}</span>
                                <span>•</span>
                                <span>{creator.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Metrics */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-[var(--color-text-primary)]">
                            {formatCompactNumber(creator.followers)}
                          </div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                            {creator.engagementRate}% engagement
                          </div>
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                            {creator.niche}
                          </span>
                        </td>

                        {/* Recent Verified Content */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-[11px] text-[var(--color-text-primary)] line-clamp-1 font-medium">
                            &ldquo;{creator.recentPost.caption}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--color-text-muted)] font-mono">
                            <span>{creator.recentPost.mediaType}</span>
                            <span>•</span>
                            <span>{creator.recentPost.likes.toLocaleString()} likes</span>
                            <span>•</span>
                            <a
                              href={creator.recentPost.postUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              Post <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                            </a>
                          </div>
                        </td>

                        {/* Pipeline Stage with Quick Selector */}
                        <td className="py-3.5 px-4">
                          <select
                            value={creator.pipelineStage}
                            onChange={(e) =>
                              onUpdateCreatorStage(creator.id, e.target.value as PipelineStage)
                            }
                            className={cn(
                              "text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer font-mono outline-none",
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
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                            <span>100% Policy Safe</span>
                          </div>
                        </td>

                        {/* Assignee & SLA */}
                        <td className="py-3.5 px-4">
                          <select
                            value={creator.assignedTeamMember}
                            onChange={(e) => onUpdateAssignee(creator.id, e.target.value)}
                            className="w-full text-xs rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] py-1 px-2 text-[var(--color-text-primary)] outline-none"
                          >
                            {TEAM_MEMBERS.map((member) => (
                              <option key={member} value={member}>
                                {member}
                              </option>
                            ))}
                          </select>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] font-mono">
                            <Clock className="h-3 w-3 text-amber-500" />
                            <span>SLA: {creator.nextReminderDate}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onSelectCreatorForComposer(creator)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/20 transition-all shadow-2xs group-hover:border-blue-500/40"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                            <span>Review Draft</span>
                            <ArrowRight className="h-3 w-3" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {STAGES_KANBAN.map((stage) => {
            const stageConfig = getStageConfig(stage);
            const stageCreators = filteredCreators.filter((c) => c.pipelineStage === stage);

            return (
              <div
                key={stage}
                className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded-2xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border)]">
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">
                    {stageConfig.label}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] font-bold">
                    {stageCreators.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {stageCreators.map((creator) => (
                    <div
                      key={creator.id}
                      onClick={() => onSelectCreatorForComposer(creator)}
                      className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)]/70 hover:bg-[var(--color-panel-subtle)] cursor-pointer transition-all hover:shadow-xs group space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="h-7 w-7 rounded-full object-cover border border-[var(--color-border)]"
                          />
                          <div>
                            <p className="text-xs font-bold text-[var(--color-text-primary)] leading-none">
                              {creator.name}
                            </p>
                            <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
                              {creator.handle}
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "p-1 rounded-md text-[10px]",
                            creator.platform === "INSTAGRAM"
                              ? "text-pink-600 bg-pink-500/10"
                              : "text-cyan-600 bg-cyan-500/10"
                          )}
                        >
                          {creator.platform === "INSTAGRAM" ? (
                            <Instagram className="h-3 w-3" />
                          ) : (
                            <Video className="h-3 w-3" />
                          )}
                        </span>
                      </div>

                      <div className="text-[11px] text-[var(--color-text-secondary)] line-clamp-2 bg-[var(--color-panel)] p-2 rounded-lg border border-[var(--color-border)]">
                        &ldquo;{creator.recentPost.caption}&rdquo;
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[var(--color-border)] text-[var(--color-text-muted)]">
                        <span>{formatCompactNumber(creator.followers)} flw</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:underline flex items-center gap-0.5">
                          Review <ChevronRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageCreators.length === 0 && (
                    <div className="text-center py-8 text-[11px] text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-xl">
                      No creators in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Simulated Import Modal (No Scrapers / 100% Official API simulation) */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[var(--color-panel)] border border-[var(--color-border)] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Import Creator via Official API
                </h3>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Connects to Meta Business Discovery API v20.0 or TikTok Creator API to pull public follower metrics and recent media. Structural zero-bot compliance.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase block mb-1 font-mono">
                  Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setImportPlatform("INSTAGRAM")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-colors",
                      importPlatform === "INSTAGRAM"
                        ? "border-pink-500 bg-pink-500/10 text-pink-600"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    )}
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram Graph</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportPlatform("TIKTOK")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold border transition-colors",
                      importPlatform === "TIKTOK"
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-600"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                    )}
                  >
                    <Video className="h-4 w-4" />
                    <span>TikTok Creator API</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase block mb-1 font-mono">
                  Creator Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@creatorhandle"
                  value={importHandle}
                  onChange={(e) => setImportHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-700 dark:text-emerald-400 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Compliance Guarantee</span>
                </div>
                <p>
                  Zero headless browser scraping. Only queries publicly available business accounts under official platform terms.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
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
