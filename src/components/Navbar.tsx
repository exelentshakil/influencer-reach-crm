"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Kanban,
  Sparkles,
  BarChart2,
  Sun,
  Moon,
  RotateCcw,
  ChevronDown
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
        <div className="flex h-14 sm:h-15 items-center justify-between gap-3 lg:gap-4">
          {/* Brand Logo & Brand Profile Selector */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#635bff] to-[#4b45d6] text-white shadow-xs shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
                  ReachVault
                </span>
                <span className="rounded-md bg-[var(--color-brand-subtle)] border border-[var(--color-brand-primary)]/20 px-1.5 py-0.2 text-[9.5px] font-semibold text-[var(--color-brand-primary)] font-mono">
                  Enterprise
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-[var(--color-text-muted)] font-medium">
                Creator Operations &amp; Compliance
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
                  className="appearance-none rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 pr-7 text-xs font-medium text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:outline-none cursor-pointer transition-colors shadow-2xs max-w-[200px] truncate"
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

          {/* Center Navigation Tabs (Stripe Segmented Cockpit - Strictly Single-Line) */}
          <nav className="hidden md:flex items-center space-x-1 rounded-lg bg-[var(--color-panel-subtle)] p-1 border border-[var(--color-border)] shrink-0 whitespace-nowrap shadow-2xs">
            {/* Tab 1: Pipeline */}
            <button
              onClick={() => handleTabClick("pipeline")}
              className={`group flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeTab === "pipeline"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel)]/50 border border-transparent"
              }`}
            >
              <Kanban
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  activeTab === "pipeline"
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              />
              <span className="whitespace-nowrap">Pipeline</span>
              <span className="rounded-md bg-[var(--color-panel-subtle)] dark:bg-slate-800/80 text-[var(--color-text-secondary)] border border-[var(--color-border)] px-1.5 py-0.2 text-[10px] font-mono tabular-nums font-semibold">
                {totalCreatorsCount}
              </span>
            </button>

            {/* Tab 2: Review Queue */}
            <button
              onClick={() => handleTabClick("composer")}
              className={`group flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeTab === "composer"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel)]/50 border border-transparent"
              }`}
            >
              <Sparkles
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  activeTab === "composer"
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              />
              <span className="whitespace-nowrap">Review Queue</span>
              {pendingApprovalsCount > 0 ? (
                <span className="rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 px-1.5 py-0.2 text-[10px] font-mono font-semibold flex items-center gap-1 tabular-nums">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {pendingApprovalsCount}
                </span>
              ) : (
                <span className="rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 px-1.5 py-0.2 text-[10px] font-mono font-semibold">
                  Clear
                </span>
              )}
            </button>

            {/* Tab 3: API Governance */}
            <button
              onClick={() => handleTabClick("compliance")}
              className={`group flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeTab === "compliance"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel)]/50 border border-transparent"
              }`}
            >
              <ShieldCheck
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  activeTab === "compliance"
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              />
              <span className="whitespace-nowrap">API Governance</span>
              <span className="rounded-md bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.2 text-[9px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold">
                v20.0
              </span>
            </button>

            {/* Tab 4: Intelligence */}
            <button
              onClick={() => handleTabClick("analytics")}
              className={`group flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeTab === "analytics"
                  ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel)]/50 border border-transparent"
              }`}
            >
              <BarChart2
                className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                  activeTab === "analytics"
                    ? "text-[var(--color-brand-primary)]"
                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                }`}
              />
              <span className="whitespace-nowrap">Intelligence</span>
            </button>
          </nav>

          {/* Right Controls: User Badge, Reset & Theme Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs font-mono shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[var(--color-text-primary)]">Zeid</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">(Admin)</span>
            </div>

            <button
              onClick={onResetDemo}
              title="Reset state"
              className="inline-flex items-center space-x-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors shadow-2xs whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
              className="inline-flex h-7.5 w-7.5 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors shadow-2xs shrink-0"
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
        <div className="flex md:hidden items-center justify-between space-x-1 border-t border-[var(--color-border)] py-2 text-xs overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => handleTabClick("pipeline")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === "pipeline"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <Kanban className="h-3 w-3" />
            <span>Pipeline ({totalCreatorsCount})</span>
          </button>
          <button
            onClick={() => handleTabClick("composer")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === "composer"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>Queue ({pendingApprovalsCount})</span>
          </button>
          <button
            onClick={() => handleTabClick("compliance")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === "compliance"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>Governance</span>
          </button>
          <button
            onClick={() => handleTabClick("analytics")}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === "analytics"
                ? "bg-[var(--color-brand-primary)] text-white font-semibold"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <BarChart2 className="h-3 w-3" />
            <span>Intelligence</span>
          </button>
        </div>
      </div>
    </header>
  );
}
