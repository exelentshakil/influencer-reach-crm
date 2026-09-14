"use client";

import React from "react";
import { BrandProfile } from "@/lib/types";
import {
  ShieldCheck,
  Video,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  Send,
  Zap,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Instagram } from "@/components/SocialIcons";

interface WorkspaceHeaderProps {
  brand: BrandProfile;
  totalCreators: number;
  pendingApprovals: number;
  activeCollabs: number;
}

export function WorkspaceHeader({
  brand,
  totalCreators,
  pendingApprovals,
  activeCollabs
}: WorkspaceHeaderProps) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]/40 py-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Control Bar: Workspace Breadcrumb & Connected APIs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-[var(--color-text-primary)]">
              Workspace
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs font-semibold text-[var(--color-text-primary)]">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>{brand.name}</span>
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono">{brand.handle}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <span className="text-[var(--color-text-secondary)] font-medium">
              {brand.activeCampaign}
            </span>
          </div>

          {/* Connected Live API Endpoints */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-mono">
              <Instagram className="h-3.5 w-3.5 text-pink-600" />
              <span className="text-[var(--color-text-secondary)]">Meta Graph v20.0:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-mono">
              <Video className="h-3.5 w-3.5 text-cyan-600" />
              <span className="text-[var(--color-text-secondary)]">TikTok Business:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
          </div>
        </div>

        {/* 5-Card Bento KPI Strip (Enterprise SaaS Density) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* KPI 1: Verified Total Reach */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              <span>Audited Reach</span>
              <Users className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[var(--color-text-primary)] font-mono tracking-tight">
                877.8K
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">
                +12.4%
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Verified public creator audience
            </p>
          </div>

          {/* KPI 2: Average Engagement Rate */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              <span>Avg Engagement</span>
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                5.8%
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                target &gt;3.5%
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Weighted by verified reel views
            </p>
          </div>

          {/* KPI 3: Human Review Queue */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              <span>Review Gate</span>
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {pendingApprovals} Pending
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Mandatory human sign-off
            </p>
          </div>

          {/* KPI 4: In Pipeline */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              <span>Active Pipeline</span>
              <Zap className="h-3.5 w-3.5 text-purple-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[var(--color-text-primary)] font-mono tracking-tight">
                {totalCreators} Creators
              </span>
              <span className="text-[10px] text-blue-600 font-semibold font-mono">
                {activeCollabs} active
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Draft to VIP fulfillment
            </p>
          </div>

          {/* KPI 5: Bot & Account Risk */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              <span>Bot Risk Score</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                0.0%
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">
                Safe
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-medium">
              Official APIs • Zero browser bots
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
