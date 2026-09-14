"use client";

import React, { useState } from "react";
import { COMPLIANCE_RULES } from "@/lib/constants";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Lock,
  Video,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Instagram } from "@/components/SocialIcons";

export function ApiComplianceMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedRow, setExpandedRow] = useState<string | null>("comp_3");

  const categories = [
    { id: "ALL", label: "All Architecture (6)" },
    { id: "CREATOR_DISCOVERY", label: "Discovery" },
    { id: "PUBLIC_CONTENT_REVIEW", label: "Content Review" },
    { id: "OUTREACH_MESSAGING", label: "Outreach & DMs" },
    { id: "RELATIONSHIP_CRM", label: "CRM & Isolation" }
  ];

  const filteredRules = COMPLIANCE_RULES.filter((rule) =>
    selectedCategory === "ALL" ? true : rule.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner: Zero-Bot Guarantee */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
                Official API Compliance & Account Protection
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Zero bots, zero headless scraping, and zero account ban risks under Meta & TikTok developer policies.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/api/compliance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-brand-primary)] hover:bg-[var(--color-panel)] shadow-2xs transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>/api/compliance JSON</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>

        {/* 3 Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-pink-700 dark:text-pink-400">
              <Instagram className="h-3.5 w-3.5" />
              <span>Meta Graph API v20.0</span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-medium">
              Business Discovery Endpoint
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Official queries to public business/creator IG nodes via verified Facebook App Token. Zero reverse-engineered session cookies.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
              <Video className="h-3.5 w-3.5" />
              <span>TikTok for Business API</span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-medium">
              Creator Marketplace & Content API
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Legitimate developer app OAuth tokens querying verified creator information and public video performance.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Lock className="h-3.5 w-3.5" />
              <span>Human-in-the-Loop Gate</span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-medium">
              100% Policy-Safe Outreach
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Prohibits unsupervised bot spam DMs. AI writes personalized drafts; team member confirms and approves before any message is sent.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature-by-Endpoint Matrix */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Feature-by-Feature Official API Support Matrix
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Technical mapping of which features are natively supported vs requiring human approval.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-0.5 bg-[var(--color-panel-subtle)] p-0.5 rounded-md border border-[var(--color-border)]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all",
                  selectedCategory === cat.id
                    ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)] font-semibold"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] overflow-hidden shadow-2xs">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredRules.map((rule) => {
              const isExpanded = expandedRow === rule.id;
              return (
                <div key={rule.id} className="transition-colors hover:bg-[var(--color-panel-subtle)]/50">
                  <div
                    onClick={() => setExpandedRow(isExpanded ? null : rule.id)}
                    className="p-3.5 sm:p-4 flex items-start sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                          {rule.featureName}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.2 rounded text-[10px] font-medium font-mono border",
                            rule.officialSupport === "NATIVE_OFFICIAL_API"
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
                          )}
                        >
                          {rule.officialSupport === "NATIVE_OFFICIAL_API"
                            ? "✓ Native Official API"
                            : "⚠️ Human-in-the-Loop Gateway"}
                        </span>
                        <span className="text-[9.5px] text-[var(--color-text-muted)] font-mono uppercase bg-[var(--color-panel-subtle)] px-1.5 py-0.2 rounded border border-[var(--color-border)]">
                          {rule.category}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {rule.safeImplementation}
                      </p>
                    </div>

                    <button className="text-[var(--color-text-muted)] p-1">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Expanded Technical Details */}
                  {isExpanded && (
                    <div className="px-3.5 sm:px-4 pb-4 pt-1 bg-[var(--color-panel-subtle)]/60 border-t border-[var(--color-border-subtle)] space-y-3 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Meta Endpoint */}
                        <div className="p-2.5 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1">
                          <div className="flex items-center space-x-1 text-pink-700 dark:text-pink-400 font-semibold font-mono text-[10.5px]">
                            <Instagram className="h-3 w-3" />
                            <span>Meta Graph API Endpoint</span>
                          </div>
                          <code className="text-[10.5px] font-mono text-[var(--color-text-primary)] block bg-[var(--color-panel-subtle)] p-2 rounded break-all border border-[var(--color-border)]">
                            {rule.metaEndpoint}
                          </code>
                        </div>

                        {/* TikTok Endpoint */}
                        <div className="p-2.5 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1">
                          <div className="flex items-center space-x-1 text-cyan-700 dark:text-cyan-400 font-semibold font-mono text-[10.5px]">
                            <Video className="h-3 w-3" />
                            <span>TikTok for Business API</span>
                          </div>
                          <code className="text-[10.5px] font-mono text-[var(--color-text-primary)] block bg-[var(--color-panel-subtle)] p-2 rounded break-all border border-[var(--color-border)]">
                            {rule.tikTokEndpoint}
                          </code>
                        </div>
                      </div>

                      {/* Policy Guideline */}
                      <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 text-blue-950 dark:text-blue-200 space-y-1">
                        <span className="font-semibold text-[10.5px] uppercase font-mono block">
                          Official Platform Policy Rule:
                        </span>
                        <p className="text-[11.5px] leading-relaxed text-[var(--color-text-secondary)]">
                          {rule.policyGuideline}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structural Architectural Difference: Bots vs Compliant Engine */}
      <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 sm:p-6 space-y-4 shadow-2xs">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Architectural Comparison: Why Bot Tools Fail vs How We Protect Your Accounts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prohibited Bot Architecture */}
          <div className="p-4 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2.5">
            <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-semibold text-xs">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>Prohibited Bot / Scraper Architecture (Account Ban Risk)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Headless Chrome/Playwright instances logging in with user credentials</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Hijacking private session cookies (detected within 24–48 hours by Meta anti-bot AI)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Sending unverified bulk spam DMs triggering automated shadowbans</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Direct violation of Instagram Platform Terms Section 3.b & Upwork TOS</span>
              </li>
            </ul>
          </div>

          {/* Compliant Architecture */}
          <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Platform-Compliant CRM Engine (100% Safe)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Official Meta App & TikTok Developer OAuth tokens with explicit permissions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Queries only public Business Discovery data — zero private account penetration</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Mandatory Human-in-the-Loop review: AI drafts personalized copy, human clicks approve</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Isolated brand tokens in encrypted vault — multi-brand profiles never leak context</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
