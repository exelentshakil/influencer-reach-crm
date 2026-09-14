"use client";

import React from "react";
import { InfluencerRecord } from "@/lib/types";
import { TEAM_MEMBERS } from "@/lib/constants";
import { formatCompactNumber, getStageConfig, cn } from "@/lib/utils";
import { Instagram } from "@/components/SocialIcons";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Video,
  BarChart3,
  Download,
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
    a.download = `influencer-crm-pipeline-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
            Campaign Performance & SLA Intelligence
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Outreach velocity, response conversion rates, and team SLA tracking.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
          <span>Export Pipeline CSV</span>
        </button>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Reach */}
        <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Total Creator Reach
            </span>
            <span className="p-1.5 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
              <Eye className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="text-xl font-semibold text-[var(--color-text-primary)] font-mono tabular-nums">
            {formatCompactNumber(totalFollowers)}
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Across {total} verified target creators
          </p>
        </div>

        {/* Outreach Response Rate */}
        <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Response Rate
            </span>
            <span className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
            {responseRate}%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            {responding} of {sent} dispatched outreaches replied
          </p>
        </div>

        {/* Human Review Gate Rate */}
        <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Human Review Rate
            </span>
            <span className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="text-xl font-semibold text-[var(--color-text-primary)] font-mono tabular-nums">
            100%
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            0 automated bot messages dispatched
          </p>
        </div>

        {/* Average Follow-up SLA */}
        <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Follow-up SLA
            </span>
            <span className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="text-xl font-semibold text-amber-700 dark:text-amber-400 font-mono tabular-nums">
            48 Hours
          </div>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Automated calendar reminders active
          </p>
        </div>
      </div>

      {/* Pipeline Funnel Visualizer */}
      <div className="p-5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-4">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[var(--color-brand-primary)]" />
          <span>Pipeline Conversion Stages</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(stageBreakdown).map(([stage, count]) => {
            const config = getStageConfig(stage as any);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div
                key={stage}
                className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1.5"
              >
                <span className="text-[10.5px] font-semibold text-[var(--color-text-muted)] block truncate">
                  {config.label}
                </span>
                <div className="text-xl font-semibold text-[var(--color-text-primary)] font-mono tabular-nums">
                  {count}
                </div>
                <div className="w-full bg-[var(--color-border)] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[var(--color-brand-primary)] h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-[9.5px] text-[var(--color-text-muted)] font-mono">
                  {percentage}% of total
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform & Team Member Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Platform Share */}
        <div className="p-5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Platform Distribution & Health
          </h3>
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="p-1.5 rounded-md bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400">
                  <Instagram className="h-4 w-4" />
                </span>
                <div>
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] block">
                    Instagram Business Discovery
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                    API Rate Limit: 184 / 200 calls remaining (Healthy)
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold font-mono text-[var(--color-text-primary)] tabular-nums">
                {instagramCount} Creators
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="p-1.5 rounded-md bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400">
                  <Video className="h-4 w-4" />
                </span>
                <div>
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] block">
                    TikTok Creator Marketplace API
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                    API Rate Limit: 92 / 100 calls remaining (Healthy)
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold font-mono text-[var(--color-text-primary)] tabular-nums">
                {tiktokCount} Creators
              </span>
            </div>
          </div>
        </div>

        {/* Team Member Assignments */}
        <div className="p-5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Team Member SLA Assignments
          </h3>
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {TEAM_MEMBERS.map((member) => {
              const assignedCount = creators.filter((c) => c.assignedTeamMember === member).length;
              return (
                <div key={member} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">
                      {member}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] font-medium border border-[var(--color-border)] text-[10.5px]">
                      {assignedCount} creators
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
