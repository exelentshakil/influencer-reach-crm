"use client";

import React from "react";
import { BrandProfile } from "@/lib/types";
import { ShieldCheck, Instagram, Video, CheckCircle2, AlertCircle, Clock } from "lucide-react";

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
    <section className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]/60 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Workspace Title & Active Campaign Info */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
              Brand: {brand.name} ({brand.handle})
            </span>
            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              <span className="font-semibold text-[var(--color-text-primary)]">Campaign:</span> {brand.activeCampaign}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Platform-Compliant Influencer Outreach & CRM Engine
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-3xl">
            Human-in-the-loop personalized outreach with official Meta Graph & TikTok API Business Discovery. No scrapers, no headless browser bots, and zero policy risk for your authorized accounts.
          </p>
        </div>

        {/* Operational Status Badges */}
        <div className="flex flex-wrap items-center gap-2 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-2xl p-2.5 shadow-xs">
          {/* Official API Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 border-r border-[var(--color-border)]">
            <div className="flex -space-x-1">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/10 text-pink-600 border border-pink-500/20 text-[10px]" title="Meta Instagram Graph API v20.0">
                <Instagram className="h-3 w-3" />
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 text-[10px]" title="TikTok Creator API">
                <Video className="h-3 w-3" />
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] block font-mono">
                Official APIs
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active v20.0
              </span>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="px-3 py-1.5 border-r border-[var(--color-border)]">
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] block font-mono">
              Human Review Gate
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
              {pendingApprovals} Pending
            </span>
          </div>

          {/* Total Managed Creators */}
          <div className="px-3 py-1.5 border-r border-[var(--color-border)]">
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] block font-mono">
              In Pipeline
            </span>
            <span className="text-xs font-bold text-[var(--color-text-primary)] font-mono">
              {totalCreators} Creators
            </span>
          </div>

          {/* Policy Compliance */}
          <div className="px-3 py-1.5">
            <span className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] block font-mono">
              Bot Risk
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              0.0% Compliant
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
