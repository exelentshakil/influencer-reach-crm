"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Users,
  Send,
  FileCheck2,
  BarChart3,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Layers,
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
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo & Brand Profile Selector */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
                  ReachVault
                </span>
                <span className="rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
                  v2.4 Enterprise
                </span>
              </div>
              <p className="text-[10.5px] text-[var(--color-text-muted)] font-medium">
                Creator Operations & Compliance Engine
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
                  className="appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-3 py-1.5 pr-8 text-xs font-semibold text-[var(--color-text-primary)] focus:border-blue-500 focus:outline-hidden cursor-pointer shadow-2xs"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      Brand: {b.name} ({b.handle})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs (Refined Enterprise Design) */}
          <nav className="hidden md:flex items-center space-x-1 rounded-xl bg-[var(--color-panel-subtle)] p-1 border border-[var(--color-border)]">
            <button
              onClick={() => handleTabClick("pipeline")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "pipeline"
                  ? "bg-[var(--color-panel)] text-blue-600 dark:text-blue-400 shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Pipeline & Directory</span>
              <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 text-[10px] font-mono">
                {totalCreatorsCount}
              </span>
            </button>

            <button
              onClick={() => handleTabClick("composer")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "composer"
                  ? "bg-[var(--color-panel)] text-blue-600 dark:text-blue-400 shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Approval Queue</span>
              {pendingApprovalsCount > 0 ? (
                <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-1.5 py-0.2 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {pendingApprovalsCount} Review
                </span>
              ) : (
                <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-1.5 py-0.2 text-[10px] font-mono font-bold">
                  Clear
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabClick("compliance")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "compliance"
                  ? "bg-[var(--color-panel)] text-blue-600 dark:text-blue-400 shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              <span>API Governance</span>
              <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                v20.0 Verified
              </span>
            </button>

            <button
              onClick={() => handleTabClick("analytics")}
              className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "analytics"
                  ? "bg-[var(--color-panel)] text-blue-600 dark:text-blue-400 shadow-xs border border-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Intelligence & ROI</span>
            </button>
          </nav>

          {/* Right Controls: User Badge, Theme Toggle & Reset */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[var(--color-text-primary)]">Zeid</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">(Admin)</span>
            </div>

            <button
              onClick={onResetDemo}
              title="Reset state"
              className="inline-flex items-center space-x-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between space-x-1 border-t border-[var(--color-border)] py-2 text-xs overflow-x-auto">
          <button
            onClick={() => handleTabClick("pipeline")}
            className={`px-3 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "pipeline"
                ? "bg-blue-600 text-white font-bold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Pipeline ({totalCreatorsCount})
          </button>
          <button
            onClick={() => handleTabClick("composer")}
            className={`px-3 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "composer"
                ? "bg-blue-600 text-white font-bold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Queue ({pendingApprovalsCount})
          </button>
          <button
            onClick={() => handleTabClick("compliance")}
            className={`px-3 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "compliance"
                ? "bg-blue-600 text-white font-bold"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            Governance
          </button>
          <button
            onClick={() => handleTabClick("analytics")}
            className={`px-3 py-1 rounded-md shrink-0 font-medium ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white font-bold"
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
