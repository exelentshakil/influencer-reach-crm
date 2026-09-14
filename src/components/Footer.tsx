"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Zap,
  Lock,
  ExternalLink,
  Code2,
  CheckCircle2,
  Activity
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Enterprise Security & Compliance Architecture */}
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-primary)] font-mono">
                Enterprise Infrastructure & Policy Governance
              </span>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-tight">
                Architectural Safety & Platform Guardrails
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-xs text-[var(--color-text-muted)] font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Zero Headless Scrapers</span>
              </span>
              <span>•</span>
              <span className="text-[var(--color-brand-primary)] font-medium">100% Platform Compliant</span>
            </div>
          </div>

          {/* 4 Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 flex items-center justify-center">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Meta Graph API v20.0
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Queries public creator metrics and media nodes via official Business Discovery endpoints. Zero browser cookie scraping.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)] flex items-center justify-center">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Human-in-the-Loop Gate
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                AI drafts personalized icebreakers grounded in real posts, but strictly enforces 1-click human approval before dispatch.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Multi-Brand Token Vault
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Complete isolation between brand profiles with AES-256 encrypted credential storage and independent rate limit monitors.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-2xs space-y-2">
              <div className="h-7 w-7 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-[var(--color-text-primary)]">
                Deterministic Audit Logs
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Structured verification endpoints expose full policy audit checks, SLA reminder queues, and platform health telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Live System Health & Governance Bar */}
        <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center space-x-3 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5 font-medium font-mono text-emerald-700 dark:text-emerald-400">
              <Activity className="h-3.5 w-3.5" />
              <span>All Systems Operational</span>
            </span>
            <span>•</span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">SOC2 Type II Architecture</span>
            <span>•</span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">99.99% Uptime SLA</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/compliance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] transition-colors font-mono shadow-2xs"
            >
              <Code2 className="h-3 w-3 text-[var(--color-brand-primary)]" />
              <span>/api/compliance</span>
              <ExternalLink className="h-2.5 w-2.5 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] transition-colors font-mono shadow-2xs"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>/api/health</span>
              <ExternalLink className="h-2.5 w-2.5 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>

        {/* Enterprise Footer */}
        <div className="pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              ReachVault.AI
            </span>
            <span>•</span>
            <span>Enterprise Influencer Operations & Compliance CRM</span>
          </div>

          <div className="text-xs font-mono">
            Powered by BarakahSoft LLC • Meta Tech Provider & TikTok for Business Ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
