"use client";

import React, { useState, useEffect } from "react";
import { InfluencerRecord, PipelineStage } from "@/lib/types";
import { TEAM_MEMBERS } from "@/lib/constants";
import { formatCompactNumber, cn } from "@/lib/utils";
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Send,
  RotateCcw,
  ExternalLink,
  Video,
  Clock,
  UserCheck,
  Check,
  FileCheck
} from "lucide-react";
import { Instagram } from "@/components/SocialIcons";

interface OutreachComposerDrawerProps {
  creator: InfluencerRecord | null;
  onClose: () => void;
  onApproveAndSend: (creatorId: string, updatedMessage: string, approvedBy: string) => void;
  onSaveDraft: (creatorId: string, updatedMessage: string, subject?: string) => void;
}

export function OutreachComposerDrawer({
  creator,
  onClose,
  onApproveAndSend,
  onSaveDraft
}: OutreachComposerDrawerProps) {
  if (!creator) return null;

  const [message, setMessage] = useState(creator.outreachDraft.message);
  const [subject, setSubject] = useState(creator.outreachDraft.subject || "");
  const [assignedApprover, setAssignedApprover] = useState(
    creator.assignedTeamMember || "Zeid (Owner / Strategy)"
  );
  const [copied, setCopied] = useState(false);
  const [toneSelected, setToneSelected] = useState<"CASUAL" | "FOUNDER" | "SEEDING">("CASUAL");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    setMessage(creator.outreachDraft.message);
    setSubject(creator.outreachDraft.subject || "");
    setAssignedApprover(creator.assignedTeamMember || "Zeid (Owner / Strategy)");
    setActionSuccess(null);
  }, [creator]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyTone = (tone: "CASUAL" | "FOUNDER" | "SEEDING") => {
    setToneSelected(tone);
    const firstName = creator.name.split(" ")[0].toLowerCase();

    if (tone === "CASUAL") {
      setMessage(
        `hi ${firstName}, caught your recent ${creator.platform === "INSTAGRAM" ? "reel" : "video"} on morning wellness routines — really loved your breakdown of botanical textures.\n\nat bearvana, we formulated our body toning collection around the exact cold-pressed botanical bases you mentioned. our team would love to gift you our complete curve & wellness kit with zero mandatory posting obligations.\n\nlet us know if you'd be open to trying it out!`
      );
    } else if (tone === "FOUNDER") {
      setMessage(
        `hi ${firstName}, zeid here from bearvana.\n\nsaw your latest post regarding ${creator.recentPost.relevanceHook.toLowerCase()} — your perspective on holistic ingredient transparency really resonated with our team.\n\nwe'd be thrilled to send you our full collection as a gift. no obligations or scripts whatsoever, just genuine respect for your content.\n\nif you're open to receiving a parcel, let me know the best shipping address!`
      );
    } else if (tone === "SEEDING") {
      setMessage(
        `hi ${firstName}! loved your recent ${creator.recentPost.mediaType.toLowerCase()} on body care.\n\nwe have a VIP seeding package for bearvana's Q3 wellness line that we've reserved for you. includes our full botanical firming set + clean gummy complex.\n\nshoot us your postal address if you'd like us to dispatch yours this week!`
      );
    }
  };

  const handleApprove = () => {
    onApproveAndSend(creator.id, message, assignedApprover);
    setActionSuccess("Approved by " + assignedApprover.split(" ")[0] + " & Stage advanced to OUTREACH_SENT!");
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSaveOnly = () => {
    onSaveDraft(creator.id, message, subject);
    setActionSuccess("Draft saved successfully.");
    setTimeout(() => setActionSuccess(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-3xl bg-[var(--color-panel)] h-full shadow-2xl border-l border-[var(--color-border)] flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-panel-subtle)]/60">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-500/20"
              />
              <span
                className={cn(
                  "absolute -bottom-1 -right-1 p-0.5 rounded-full border border-[var(--color-panel)] text-white text-[10px]",
                  creator.platform === "INSTAGRAM" ? "bg-pink-600" : "bg-cyan-600"
                )}
              >
                {creator.platform === "INSTAGRAM" ? (
                  <Instagram className="h-3 w-3" />
                ) : (
                  <Video className="h-3 w-3" />
                )}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                  {creator.name}
                </h2>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {creator.handle}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                <span>{formatCompactNumber(creator.followers)} followers</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {creator.engagementRate}% engagement
                </span>
                <span>•</span>
                <span>{creator.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Human Gate Active</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Action Notification Banner */}
        {actionSuccess && (
          <div className="bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {actionSuccess}
            </span>
          </div>
        )}

        {/* Drawer Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section 1: Audited Public Content (Official API Discovery) */}
          <div className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-panel-subtle)]/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
                  Official API Content Discovery (No Scrapers)
                </h3>
              </div>
              <a
                href={creator.recentPost.postUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-mono"
              >
                <span>View on {creator.platform === "INSTAGRAM" ? "Instagram" : "TikTok"}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                <span className="px-2 py-0.5 rounded bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] font-bold">
                  {creator.recentPost.mediaType}
                </span>
                <span>Published: {creator.recentPost.date}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {creator.recentPost.likes.toLocaleString()} likes • {creator.recentPost.comments.toLocaleString()} comments
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-primary)] leading-relaxed italic border-l-2 border-blue-500 pl-3">
                &ldquo;{creator.recentPost.caption}&rdquo;
              </p>
              <div className="text-[11px] text-[var(--color-text-secondary)] bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                  AI Context Hook:
                </span>{" "}
                {creator.recentPost.relevanceHook}
              </div>
            </div>
          </div>

          {/* Section 2: Human-in-the-Loop Composer */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Personalized Outreach Draft</span>
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Context-grounded in their verified public content. Review and edit before sending.
                </p>
              </div>

              {/* Tone Quick Presets */}
              <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-xl border border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => handleApplyTone("CASUAL")}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors",
                    toneSelected === "CASUAL"
                      ? "bg-[var(--color-panel)] text-blue-600 shadow-xs"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  Casual & Warm
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTone("FOUNDER")}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors",
                    toneSelected === "FOUNDER"
                      ? "bg-[var(--color-panel)] text-blue-600 shadow-xs"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  From Zeid (Founder)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTone("SEEDING")}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors",
                    toneSelected === "SEEDING"
                      ? "bg-[var(--color-panel)] text-blue-600 shadow-xs"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  VIP Seeding
                </button>
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="text-[11px] font-bold uppercase text-[var(--color-text-muted)] block mb-1 font-mono">
                Message Subject / Hook
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Collaboration with Bearvana..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase text-[var(--color-text-muted)] font-mono">
                  Message Content (Editable)
                </label>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline font-mono"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 text-xs rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
              />
            </div>

            {/* Compliance Verification Badge Checklist */}
            <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel-subtle)] p-3.5 space-y-2">
              <h4 className="text-[11px] font-bold uppercase text-[var(--color-text-muted)] font-mono flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Zero-Risk Compliance Guardrails</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[var(--color-text-secondary)]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>No headless scraper bot employed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Grounded in verified public media</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Mandatory human-in-the-loop review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Meta & TikTok direct policy compliant</span>
                </div>
              </div>
            </div>

            {/* Assign Approver & SLA Reminder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold uppercase text-[var(--color-text-muted)] block mb-1 font-mono">
                  Designated Reviewer
                </label>
                <select
                  value={assignedApprover}
                  onChange={(e) => setAssignedApprover(e.target.value)}
                  className="w-full text-xs rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] py-2 px-3 text-[var(--color-text-primary)] outline-none"
                >
                  {TEAM_MEMBERS.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[var(--color-text-muted)] block mb-1 font-mono">
                  SLA Follow-up Window
                </label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] font-mono">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span>48 Hours (Auto-Remind Sep 16)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSaveOnly}
            className="px-4 py-2.5 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors text-center"
          >
            Save Draft Only
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-3.5 py-2.5 text-xs font-bold rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copied ? "Copied" : "Copy to App"}</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>1-Click Human Approve & Mark Sent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
