"use client";

import React, { useState } from "react";
import { COMPLIANCE_RULES } from "@/lib/constants";
import { ComplianceFeatureRule } from "@/lib/types";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Code2,
  Lock,
  Video,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  Copy,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Instagram } from "@/components/SocialIcons";

export function ApiComplianceMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
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

  const handleCopyApiUrl = () => {
    navigator.clipboard.writeText(window.location.origin + "/api/compliance");
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner: Zero-Bot Guarantee */}
      <div className="border border-emerald-500/20 rounded-3xl bg-emerald-500/5 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[var(--color-text-primary)]">
                Official API Compliance & Safety Guarantee
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Direct answer to your requirement: zero bots, zero headless scraping, and zero account ban risks.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/api/compliance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-bold text-blue-600 hover:text-blue-700 shadow-xs transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Inspect /api/compliance JSON</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* 3 Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-pink-600">
              <Instagram className="h-4 w-4" />
              <span>Meta Graph API v20.0</span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-medium">
              Business Discovery Endpoint
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Official queries to public business/creator IG nodes via your verified Facebook App Token. Zero reverse-engineered session cookies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-600">
              <Video className="h-4 w-4" />
              <span>TikTok for Business API</span>
            </div>
            <p className="text-xs text-[var(--color-text-primary)] font-medium">
              Creator Marketplace & Content API
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Legitimate developer app OAuth tokens querying verified creator information and public video statistics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Lock className="h-4 w-4" />
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
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Feature-by-Feature Official API Support Matrix
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Detailed technical mapping of which features are natively supported vs requiring human approval.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-xl border border-[var(--color-border)]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-colors",
                  selectedCategory === cat.id
                    ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-panel)] overflow-hidden shadow-xs">
          <div className="divide-y divide-[var(--color-border)]">
            {filteredRules.map((rule) => {
              const isExpanded = expandedRow === rule.id;
              return (
                <div key={rule.id} className="transition-colors hover:bg-[var(--color-panel-subtle)]/40">
                  <div
                    onClick={() => setExpandedRow(isExpanded ? null : rule.id)}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">
                          {rule.featureName}
                        </span>
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border",
                            rule.officialSupport === "NATIVE_OFFICIAL_API"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          )}
                        >
                          {rule.officialSupport === "NATIVE_OFFICIAL_API"
                            ? "✓ Native Official API"
                            : "⚠️ Human-in-the-Loop Gateway"}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase bg-[var(--color-panel-subtle)] px-2 py-0.5 rounded border border-[var(--color-border)]">
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
                    <div className="px-4 sm:px-5 pb-5 pt-1 bg-[var(--color-panel-subtle)]/60 border-t border-[var(--color-border)] space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Meta Endpoint */}
                        <div className="p-3 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-pink-600 font-bold font-mono text-[11px]">
                            <Instagram className="h-3.5 w-3.5" />
                            <span>Meta Graph API Endpoint</span>
                          </div>
                          <code className="text-[11px] font-mono text-[var(--color-text-primary)] block bg-[var(--color-panel-subtle)] p-2 rounded-lg break-all border border-[var(--color-border)]">
                            {rule.metaEndpoint}
                          </code>
                        </div>

                        {/* TikTok Endpoint */}
                        <div className="p-3 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-cyan-600 font-bold font-mono text-[11px]">
                            <Video className="h-3.5 w-3.5" />
                            <span>TikTok for Business API</span>
                          </div>
                          <code className="text-[11px] font-mono text-[var(--color-text-primary)] block bg-[var(--color-panel-subtle)] p-2 rounded-lg break-all border border-[var(--color-border)]">
                            {rule.tikTokEndpoint}
                          </code>
                        </div>
                      </div>

                      {/* Policy Guideline */}
                      <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-blue-900 dark:text-blue-300 space-y-1">
                        <span className="font-bold text-[11px] uppercase font-mono block">
                          Official Platform Policy Rule:
                        </span>
                        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
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

      {/* Structural Architectural Difference: Bots vs BarakahSoft Compliant Engine */}
      <div className="border border-[var(--color-border)] rounded-3xl bg-[var(--color-panel)] p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-[var(--color-text-primary)]">
          Architectural Comparison: Why Bot Tools Fail vs How We Protect Your Accounts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prohibited Bot Architecture */}
          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-red-600 font-bold text-sm">
              <XCircle className="h-5 w-5" />
              <span>Prohibited Bot / Scraper Architecture (Account Ban Risk)</span>
            </div>
            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Headless Chrome/Playwright instances logging in with user credentials</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Hijacking private session cookies (detected within 24–48 hours by Meta anti-bot AI)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Sending unverified bulk spam DMs triggering automated shadowbans</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>Direct violation of Instagram Platform Terms Section 3.b & Upwork TOS</span>
              </li>
            </ul>
          </div>

          {/* BarakahSoft Compliant Architecture */}
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>Our Platform-Compliant CRM Engine (100% Safe)</span>
            </div>
            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Official Meta App & TikTok Developer OAuth tokens with explicit permissions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Queries only public Business Discovery data — zero private account penetration</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Mandatory Human-in-the-Loop review: AI drafts personalized copy, human clicks approve</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Isolated brand tokens in encrypted vault — Bearvana & AuraGlow never leak context</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
