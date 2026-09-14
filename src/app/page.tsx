"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { WorkspaceHeader } from "@/components/WorkspaceHeader";
import { InfluencerCrmPipeline } from "@/components/InfluencerCrmPipeline";
import { OutreachComposerDrawer } from "@/components/OutreachComposerDrawer";
import { ApiComplianceMatrix } from "@/components/ApiComplianceMatrix";
import { AnalyticsReporting } from "@/components/AnalyticsReporting";
import { Footer } from "@/components/Footer";
import {
  BrandProfile,
  InfluencerRecord,
  PipelineStage
} from "@/lib/types";
import { INITIAL_BRANDS, INITIAL_INFLUENCERS } from "@/lib/constants";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn, getStageConfig } from "@/lib/utils";

export default function HomePage() {
  const [brands, setBrands] = useState<BrandProfile[]>(INITIAL_BRANDS);
  const [activeBrandId, setActiveBrandId] = useState<string>(INITIAL_BRANDS[0].id);
  const [creators, setCreators] = useState<InfluencerRecord[]>(INITIAL_INFLUENCERS);
  const [activeTab, setActiveTab] = useState<"pipeline" | "composer" | "compliance" | "analytics">("pipeline");
  const [selectedCreatorForComposer, setSelectedCreatorForComposer] = useState<InfluencerRecord | null>(null);

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[0];
  const brandCreators = creators.filter((c) => c.brandId === activeBrandId);

  const pendingApprovals = brandCreators.filter((c) => c.pipelineStage === "DRAFT_READY").length;
  const activeCollabs = brandCreators.filter((c) => ["NEGOTIATING", "SHIPPED", "LIVE"].includes(c.pipelineStage)).length;

  const handleResetDemo = () => {
    setBrands(INITIAL_BRANDS);
    setActiveBrandId(INITIAL_BRANDS[0].id);
    setCreators(INITIAL_INFLUENCERS);
    setActiveTab("pipeline");
    setSelectedCreatorForComposer(null);
  };

  const handleSelectCreatorForComposer = (creator: InfluencerRecord) => {
    setSelectedCreatorForComposer(creator);
  };

  const handleUpdateCreatorStage = (creatorId: string, newStage: PipelineStage) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === creatorId ? { ...c, pipelineStage: newStage } : c))
    );
  };

  const handleUpdateAssignee = (creatorId: string, newAssignee: string) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === creatorId ? { ...c, assignedTeamMember: newAssignee } : c))
    );
  };

  const handleAddSimulatedCreator = (newRecord: InfluencerRecord) => {
    setCreators((prev) => [newRecord, ...prev]);
  };

  const handleApproveAndSend = (
    creatorId: string,
    updatedMessage: string,
    approvedBy: string
  ) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id !== creatorId) return c;
        return {
          ...c,
          pipelineStage: "OUTREACH_SENT",
          lastOutreachDate: new Date().toISOString().split("T")[0],
          assignedTeamMember: approvedBy,
          outreachDraft: {
            ...c.outreachDraft,
            message: updatedMessage,
            status: "SENT",
            approvedBy,
            approvedAt: new Date().toISOString()
          },
          complianceChecks: {
            ...c.complianceChecks,
            humanReviewPassed: true
          }
        };
      })
    );
  };

  const handleSaveDraft = (
    creatorId: string,
    updatedMessage: string,
    subject?: string
  ) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id !== creatorId) return c;
        return {
          ...c,
          outreachDraft: {
            ...c.outreachDraft,
            message: updatedMessage,
            subject: subject || c.outreachDraft.subject,
            status: "EDITED"
          }
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === "composer" && !selectedCreatorForComposer) {
            const candidate = brandCreators.find((c) => c.pipelineStage === "DRAFT_READY") || brandCreators[0];
            if (candidate) setSelectedCreatorForComposer(candidate);
          }
        }}
        brands={brands}
        selectedBrandId={activeBrandId}
        onSelectBrand={(brandId) => setActiveBrandId(brandId)}
        pendingApprovalsCount={pendingApprovals}
        totalCreatorsCount={brandCreators.length}
        onResetDemo={handleResetDemo}
      />

      {/* Operational Header Bar */}
      <WorkspaceHeader
        brand={activeBrand}
        totalCreators={brandCreators.length}
        pendingApprovals={pendingApprovals}
        activeCollabs={activeCollabs}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "pipeline" && (
          <InfluencerCrmPipeline
            creators={brandCreators}
            onSelectCreatorForComposer={handleSelectCreatorForComposer}
            onUpdateCreatorStage={handleUpdateCreatorStage}
            onUpdateAssignee={handleUpdateAssignee}
            onAddSimulatedCreator={handleAddSimulatedCreator}
          />
        )}

        {activeTab === "composer" && (
          <div className="space-y-5">
            <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel)] p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Human-in-the-Loop AI Outreach Composer</span>
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Review and edit AI-grounded drafts. Select any creator from your pipeline to open the verification drawer.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("pipeline")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-medium shadow-2xs transition-colors"
                >
                  <span>Open Pipeline View</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Quick Creator Selector Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {brandCreators.map((c) => {
                  const stage = getStageConfig(c.pipelineStage);
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCreatorForComposer(c)}
                      className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] hover:border-[var(--color-brand-primary)]/40 hover:shadow-xs cursor-pointer transition-all space-y-3 group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <img
                            src={c.avatarUrl}
                            alt={c.name}
                            className="h-10 w-10 rounded-lg object-cover border border-[var(--color-border)] shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                              {c.name}
                            </h4>
                            <p className="text-xs text-[var(--color-text-muted)] font-mono truncate">
                              {c.handle} • {c.platform}
                            </p>
                          </div>
                        </div>
                        <span className={cn("px-2.5 py-0.5 rounded text-xs font-mono font-semibold border shrink-0", stage.badgeClass)}>
                          {stage.label}
                        </span>
                      </div>

                      <div className="text-xs sm:text-[13px] text-[var(--color-text-secondary)] bg-[var(--color-panel-subtle)] p-3 rounded-lg border border-[var(--color-border)] line-clamp-2 leading-relaxed">
                        &ldquo;{c.outreachDraft.message}&rdquo;
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] pt-0.5">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className={cn("h-2 w-2 rounded-full shrink-0", stage.dotColor)} />
                          <span>Status: {c.outreachDraft.status}</span>
                        </span>
                        <span className="text-[var(--color-brand-primary)] font-semibold flex items-center gap-1 group-hover:underline whitespace-nowrap shrink-0">
                          <span className="whitespace-nowrap">Review Draft</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "compliance" && <ApiComplianceMatrix />}

        {activeTab === "analytics" && (
          <AnalyticsReporting creators={brandCreators} />
        )}
      </main>

      {/* Verification & Review Drawer */}
      <OutreachComposerDrawer
        creator={selectedCreatorForComposer}
        onClose={() => setSelectedCreatorForComposer(null)}
        onApproveAndSend={handleApproveAndSend}
        onSaveDraft={handleSaveDraft}
      />

      {/* System Engineering Architecture Specs Footer (strictly no proposals or screening questions in UI) */}
      <Footer />
    </div>
  );
}
