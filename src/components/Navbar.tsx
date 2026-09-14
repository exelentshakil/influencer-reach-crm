"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Users,
  Send,
  BarChart3,
  Sun,
  Moon,
  RotateCcw,
  ChevronDown,
  Lock
} from "lucide-react";
import { BrandProfile } from "@/lib/types";

export interface NavbarProps {
  activeTab: "pipeline" | "composer" | "compliance" | "analytics";
  setActiveTab: (tab: "pipeline" | "composer" | "compliance" | "analytics") => void;
  onTabChange?: (tab: "pipeline" | "composer" | "compliance" | "analytics") => void;
  brands: BrandProfile[];
  selectedBrandId: string;
  onSelectBrand: (brandId: string) => void;
  pendingApprovalsCount?: number;
  totalCreatorsCount?: number;
  onResetDemo: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onTabChange,
  brands,
  selectedBrandId,
  onSelectBrand,
  pendingApprovalsCount = 0,
  totalCreatorsCount = 0,
  onResetDemo
}: NavbarProps) {
  const { theme, setTheme } = useTheme();

  const handleTabClick = (tab: "pipeline" | "composer" | "compliance" | "analytics") => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between gap-4">
          {/* Brand Logo & Brand Profile Selector */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-primary)] text-white shadow-xs">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
                  ReachVault
                </span>
                <span className="rounded-md bg-[var(--color-brand-subtle)] border border-[var(--color-brand-primary)]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)] font-mono">
                  Enterprise
                </span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">
                Creator Operations & Compliance
              </p>
            </div>

            {/* Brand Profile Selector Dropdown */}
            <div className="hidden lg:flex items-center pl-3 border-l border-[var(--color-border)]">
              <label htmlFor="brand-switcher" className="sr-only">Active Brand Profile</label>
              <div className="relative">
                <select
                  id="brand-switcher"
                  value={selectedBrandId}
                  onChange={(e) => onSelectBrand(e.target.value)}
                  className="appearance-none rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 pr-7 text-xs font-medium text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none cursor-pointer transition-colors shadow-2xs"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      Brand: {b.name} ({b.handle})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs (Stripe Segmented Cockpit) */}
          <nav className="hidden md:flex items-center space-x-1 rounded-lg bg-[var(--color-panel-subtle)] p-1 border border-[var(--color-border)]">
            <button
              onClick={() => handleTabClick("pipeline")}
              className={`flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "pipeline"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Users className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
              <span>Pipeline & Directory</span>
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--color-text-secondary)] border border-[var(--color-border)] px-1.5 py-0.2 text-[10px] font-mono tabular-nums">
                {totalCreatorsCount}
              </span>
            </button>

            <button
              onClick={() => handleTabClick("composer")}
              className={`flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "composer"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Send className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
              <span>Review Queue</span>
              {pendingApprovalsCount > 0 ? (
                <span className="rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 px-1.5 py-0.2 text-[10px] font-mono font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {pendingApprovalsCount}
                </span>
              ) : (
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.2 text-[10px] font-mono font-semibold">
                  Clear
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabClick("compliance")}
              className={`flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "compliance"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Lock className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
              <span>API Governance</span>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.2 text-[9px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold">
                v20.0
              </span>
            </button>

            <button
              onClick={() => handleTabClick("analytics")}
              className={`flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
              <span>Intelligence</span>
            </button>
          </nav>

          {/* Right Controls: User Badge, Theme Toggle & Reset */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[var(--color-text-primary)]">Zeid</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">(Admin)</span>
            </div>

            <button
              onClick={onResetDemo}
              title="Reset state"
              className="inline-flex items-center space-x-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
              className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors shadow-2xs"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between space-x-1 border-t border-[var(--color-border)] py-2 text-xs overflow-x-auto">
          <button
            onClick={() => handleTabClick("pipeline")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "pipeline"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Pipeline ({totalCreatorsCount})
          </button>
          <button
            onClick={() => handleTabClick("composer")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "composer"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Queue ({pendingApprovalsCount})
          </button>
          <button
            onClick={() => handleTabClick("compliance")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "compliance"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Governance
          </button>
          <button
            onClick={() => handleTabClick("analytics")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "analytics"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
    </header>
  );
}
