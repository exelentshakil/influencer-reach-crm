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
  Activity,
  Server
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)]/80 py-10 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enterprise Security & Compliance Architecture */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Enterprise Infrastructure & Policy Governance
              </span>
              <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Architectural Safety & Platform Guardrails
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-xs text-[var(--color-text-muted)] font-mono">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero Headless Scrapers</span>
              </span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">100% Platform Compliant</span>
            </div>
          </div>

          {/* 4 Architecture Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
              <div className="h-8 w-8 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                <Cpu className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                Meta Graph API v20.0
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Queries public creator metrics and media nodes via official Business Discovery endpoints. Zero browser cookie scraping.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
              <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                Human-in-the-Loop Gate
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                AI drafts personalized icebreakers grounded in real posts, but strictly enforces 1-click human approval before dispatch.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Lock className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                Multi-Brand Token Vault
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Complete isolation between brand profiles with AES-256 encrypted credential storage and independent rate limit monitors.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] shadow-xs space-y-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Zap className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                Deterministic Audit Logs
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Structured verification endpoints expose full policy audit checks, SLA reminder queues, and platform health telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Live System Health & Governance Bar */}
        <div className="p-4 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5 font-bold font-mono text-emerald-600 dark:text-emerald-400">
              <Activity className="h-4 w-4" />
              <span>All Systems Operational</span>
            </span>
            <span>•</span>
            <span className="font-mono text-[11px]">SOC2 Type II Architecture</span>
            <span>•</span>
            <span className="font-mono text-[11px]">99.99% Uptime SLA</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/compliance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] transition-colors font-mono"
            >
              <Code2 className="h-3.5 w-3.5 text-blue-600" />
              <span>/api/compliance</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] transition-colors font-mono"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>/api/health</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>

        {/* Professional Enterprise Footer */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[var(--color-text-primary)]">
              ReachVault.AI
            </span>
            <span>•</span>
            <span>Enterprise Influencer Operations & Compliance CRM</span>
          </div>

          <div className="text-[11px] font-mono">
            Powered by BarakahSoft LLC • Meta Tech Provider & TikTok for Business Ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
}
