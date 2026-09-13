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
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

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
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "composer" && !selectedCreatorForComposer) {
            // Default to the first creator needing review
            const candidate = brandCreators.find((c) => c.pipelineStage === "DRAFT_READY") || brandCreators[0];
            if (candidate) setSelectedCreatorForComposer(candidate);
          }
        }}
        activeBrand={activeBrand}
        brands={brands}
        onSelectBrand={(brandId) => setActiveBrandId(brandId)}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
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
          <div className="space-y-6">
            <div className="border border-[var(--color-border)] rounded-3xl bg-[var(--color-panel)] p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <span>Human-in-the-Loop AI Outreach Composer</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    Review and edit AI-grounded drafts. Select any creator from your pipeline to open the verification drawer.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("pipeline")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Open Pipeline View</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Quick Creator Selector Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {brandCreators.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCreatorForComposer(c)}
                    className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-panel-subtle)]/80 cursor-pointer transition-all hover:shadow-xs space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="h-10 w-10 rounded-full object-cover border border-[var(--color-border)]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                          {c.name}
                        </h4>
                        <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                          {c.handle} • {c.platform}
                        </p>
                      </div>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] bg-[var(--color-panel)] p-2.5 rounded-xl border border-[var(--color-border)] line-clamp-2">
                      &ldquo;{c.outreachDraft.message}&rdquo;
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)] pt-1">
                      <span>Status: {c.outreachDraft.status}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                        Open Review Drawer <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
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
