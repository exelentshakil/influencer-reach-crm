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
  GitBranch
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)]/60 py-12 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Architecture Specs Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                System Engineering Specifications
              </span>
              <h3 className="text-base font-extrabold text-[var(--color-text-primary)]">
                Core Architectural Decisions
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-mono">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Zero Bot Circumvention</span>
              </span>
              <span>•</span>
              <span>100% Platform Compliant</span>
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
                Connects through official Business Discovery endpoints to query public metrics. Zero headless scrapers or cookie spoofing.
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
                Personalized AI drafts require explicit 1-click human verification before dispatch, strictly obeying anti-spam platform policies.
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
                Separate encrypted credential vaults for Bearvana, AuraGlow, and future brands. Zero cross-brand token or rate-limit leakage.
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
                Structured endpoint at /api/compliance and /api/health exposes full policy checks for automated compliance verification.
              </p>
            </div>
          </div>
        </div>

        {/* Turnaround & SLA Metrics */}
        <div className="p-5 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
              Production Turnaround SLA
            </span>
            <div className="text-sm font-bold text-[var(--color-text-primary)]">
              Production-ready deployment in 10 working days
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Phase 0 prototype delivered live at $0 investment • Complete turnkey scope estimated at $34.00/hr
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/compliance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] transition-colors"
            >
              <Code2 className="h-3.5 w-3.5 text-blue-600" />
              <span>/api/compliance</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
            </a>
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] transition-colors"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>/api/health</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-text-muted)]" />
            </a>
          </div>
        </div>

        {/* Copyright & Founder Attribution */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              BarakahSoft LLC
            </span>
            <span>•</span>
            <span>AI Automation & Platform Engineering</span>
            <span>•</span>
            <span className="font-mono text-[11px]">Wyoming, USA</span>
          </div>

          <div className="text-[11px] font-mono">
            Architected by Md Shakil A. • 12+ Years Full-Stack Engineering • Former Lead @ Legiit ($1M ARR)
          </div>
        </div>
      </div>
    </footer>
  );
}
