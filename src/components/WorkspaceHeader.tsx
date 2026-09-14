"use client";

import React from "react";
import { BrandProfile } from "@/lib/types";
import {
  ShieldCheck,
  Video,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
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
    <section className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Control Bar: Workspace Breadcrumb & Connected APIs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-[var(--color-text-secondary)]">
              Workspace
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs font-semibold text-[var(--color-text-primary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
              <span>{brand.name}</span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">{brand.handle}</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <span className="text-[var(--color-text-primary)] font-medium">
              {brand.activeCampaign}
            </span>
          </div>

          {/* Connected Live API Endpoints */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-mono shadow-2xs">
              <Instagram className="h-3.5 w-3.5 text-pink-600 shrink-0" />
              <span className="text-[var(--color-text-secondary)] font-medium">Meta Graph v20.0:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                Live
              </span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-mono shadow-2xs">
              <Video className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
              <span className="text-[var(--color-text-secondary)] font-medium">TikTok Business:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                Live
              </span>
            </div>
          </div>
        </div>

        {/* 5-Card Bento KPI Strip (Enterprise Stripe Density & High Contrast) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* KPI 1: Verified Total Reach */}
          <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <span>Audited Reach</span>
              <Users className="h-4 w-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] font-mono tabular-nums tracking-tight">
                877.8K
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                +12.4%
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Verified public creator audience
            </p>
          </div>

          {/* KPI 2: Average Engagement Rate */}
          <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <span>Avg Engagement</span>
              <TrendingUp className="h-4 w-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums tracking-tight">
                5.8%
              </span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium">
                target &gt;3.5%
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Weighted by verified reel views
            </p>
          </div>

          {/* KPI 3: Human Review Queue */}
          <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <span>Review Gate</span>
              <ShieldCheck className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 font-mono tabular-nums tracking-tight">
                {pendingApprovals} Pending
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Mandatory human sign-off
            </p>
          </div>

          {/* KPI 4: In Pipeline */}
          <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <span>Active Pipeline</span>
              <Zap className="h-4 w-4 text-[var(--color-brand-primary)]" />
            </div>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] font-mono tabular-nums tracking-tight">
                {totalCreators} Creators
              </span>
              <span className="text-xs text-[var(--color-brand-primary)] font-semibold font-mono">
                {activeCollabs} active
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Draft to VIP fulfillment
            </p>
          </div>

          {/* KPI 5: Bot & Account Risk */}
          <div className="p-4 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs col-span-2 sm:col-span-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <span>Bot Risk Score</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums tracking-tight">
                0.0%
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                Safe
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-medium">
              Official APIs • Zero browser bots
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
