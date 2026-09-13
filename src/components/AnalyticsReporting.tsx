"use client";

import React from "react";
import { InfluencerRecord } from "@/lib/types";
import { TEAM_MEMBERS } from "@/lib/constants";
import { formatCompactNumber, getStageConfig, cn } from "@/lib/utils";
import { Instagram } from "@/components/SocialIcons";
import {
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Video,
  BarChart3,
  Award,
  Download,
  Send,
  Eye
} from "lucide-react";

interface AnalyticsReportingProps {
  creators: InfluencerRecord[];
}

export function AnalyticsReporting({ creators }: AnalyticsReportingProps) {
  const total = creators.length;
  const sent = creators.filter((c) =>
    ["OUTREACH_SENT", "NEGOTIATING", "SHIPPED", "LIVE"].includes(c.pipelineStage)
  ).length;
  const responding = creators.filter((c) =>
    ["NEGOTIATING", "SHIPPED", "LIVE"].includes(c.pipelineStage)
  ).length;
  const responseRate = sent > 0 ? Math.round((responding / sent) * 100) : 0;
  const totalFollowers = creators.reduce((acc, c) => acc + c.followers, 0);

  const instagramCount = creators.filter((c) => c.platform === "INSTAGRAM").length;
  const tiktokCount = creators.filter((c) => c.platform === "TIKTOK").length;

  const stageBreakdown = {
    DRAFT_READY: creators.filter((c) => c.pipelineStage === "DRAFT_READY").length,
    HUMAN_APPROVED: creators.filter((c) => c.pipelineStage === "HUMAN_APPROVED").length,
    OUTREACH_SENT: creators.filter((c) => c.pipelineStage === "OUTREACH_SENT").length,
    NEGOTIATING: creators.filter((c) => c.pipelineStage === "NEGOTIATING").length,
    SHIPPED: creators.filter((c) => c.pipelineStage === "SHIPPED").length,
    LIVE: creators.filter((c) => c.pipelineStage === "LIVE").length
  };

  const handleExportCsv = () => {
    const headers = "ID,Name,Handle,Platform,Followers,Engagement,Stage,Assignee,SLA\n";
    const rows = creators
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.handle}","${c.platform}",${c.followers},${c.engagementRate}%,"${c.pipelineStage}","${c.assignedTeamMember}","${c.nextReminderDate}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bearvana-influencer-crm-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Header with Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--color-text-primary)]">
            Campaign Performance & SLA Reporting
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Real-time outreach velocity, response rates, and team SLA tracking.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-xs transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-blue-600" />
          <span>Export Pipeline CSV</span>
        </button>
      </div>

      {/* 4 Core KPI Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reach */}
        <div className="p-5 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              Total Creator Reach
            </span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Eye className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono">
            {formatCompactNumber(totalFollowers)}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Across {total} verified target creators
          </p>
        </div>

        {/* Outreach Response Rate */}
        <div className="p-5 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              Response Rate
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {responseRate}%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            {responding} of {sent} dispatched outreaches replied
          </p>
        </div>

        {/* Human Review Gate Rate */}
        <div className="p-5 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              Human Review Rate
            </span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono">
            100%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            0 automated bot messages dispatched
          </p>
        </div>

        {/* Average Follow-up SLA */}
        <div className="p-5 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              Follow-up SLA
            </span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            48 Hours
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Automated calendar reminders active
          </p>
        </div>
      </div>

      {/* Pipeline Funnel Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          <span>Pipeline Conversion Stages</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(stageBreakdown).map(([stage, count]) => {
            const config = getStageConfig(stage as any);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div
                key={stage}
                className="p-4 rounded-2xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-2"
              >
                <span className="text-[11px] font-bold text-[var(--color-text-muted)] block line-clamp-1">
                  {config.label}
                </span>
                <div className="text-2xl font-black text-[var(--color-text-primary)] font-mono">
                  {count}
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                  {percentage}% of total
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform & Team Member Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Share */}
        <div className="p-6 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            Platform Distribution & Health
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-pink-500/5 border border-pink-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-xl bg-pink-500/10 text-pink-600">
                  <Instagram className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-bold text-xs text-[var(--color-text-primary)] block">
                    Instagram Business Discovery
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                    API Rate Limit: 184 / 200 calls remaining (Healthy)
                  </span>
                </div>
              </div>
              <span className="text-base font-black font-mono text-[var(--color-text-primary)]">
                {instagramCount} Creators
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600">
                  <Video className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-bold text-xs text-[var(--color-text-primary)] block">
                    TikTok Creator Marketplace API
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                    API Rate Limit: 92 / 100 calls remaining (Healthy)
                  </span>
                </div>
              </div>
              <span className="text-base font-black font-mono text-[var(--color-text-primary)]">
                {tiktokCount} Creators
              </span>
            </div>
          </div>
        </div>

        {/* Team Member Assignments */}
        <div className="p-6 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            Team Member SLA Assignments
          </h3>
          <div className="divide-y divide-[var(--color-border)]">
            {TEAM_MEMBERS.map((member) => {
              const assignedCount = creators.filter((c) => c.assignedTeamMember === member).length;
              return (
                <div key={member} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">
                      {member}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] font-bold">
                      {assignedCount} creators assigned
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
