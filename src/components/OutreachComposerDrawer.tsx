"use client";

import React, { useState, useEffect } from "react";
import { InfluencerRecord } from "@/lib/types";
import { TEAM_MEMBERS } from "@/lib/constants";
import { formatCompactNumber, cn } from "@/lib/utils";
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Video,
  Clock,
  Check
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-[var(--color-panel)] h-full shadow-2xl border-l border-[var(--color-border)] flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-panel-subtle)]">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="h-11 w-11 rounded-md object-cover border border-[var(--color-border)]"
              />
              <span
                className={cn(
                  "absolute -bottom-1 -right-1 p-0.5 rounded-full border border-[var(--color-panel)] text-white text-[9px]",
                  creator.platform === "INSTAGRAM" ? "bg-pink-600" : "bg-cyan-600"
                )}
              >
                {creator.platform === "INSTAGRAM" ? (
                  <Instagram className="h-2.5 w-2.5" />
                ) : (
                  <Video className="h-2.5 w-2.5" />
                )}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-semibold text-[var(--color-text-primary)] truncate">
                  {creator.name}
                </h2>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {creator.handle}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)] font-mono mt-0.5">
                <span>{formatCompactNumber(creator.followers)} followers</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {creator.engagementRate}% engagement
                </span>
                <span>•</span>
                <span>{creator.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Human Gate Active</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Notification Banner */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between animate-in slide-in-from-top duration-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {actionSuccess}
            </span>
          </div>
        )}

        {/* Drawer Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Section 1: Audited Public Content (Official API Discovery) */}
          <div className="border border-[var(--color-border)] rounded-xl bg-[var(--color-panel-subtle)] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <h3 className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Official API Content Discovery (No Scrapers)
                </h3>
              </div>
              <a
                href={creator.recentPost.postUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[var(--color-brand-primary)] hover:underline font-mono"
              >
                <span>View on {creator.platform === "INSTAGRAM" ? "Instagram" : "TikTok"}</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            <div className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-[var(--color-text-muted)]">
                <span className="px-1.5 py-0.2 rounded bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] font-semibold border border-[var(--color-border)]">
                  {creator.recentPost.mediaType}
                </span>
                <span>Published: {creator.recentPost.date}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  {creator.recentPost.likes.toLocaleString()} likes • {creator.recentPost.comments.toLocaleString()} comments
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-primary)] leading-relaxed italic border-l-2 border-[var(--color-brand-primary)] pl-2.5">
                &ldquo;{creator.recentPost.caption}&rdquo;
              </p>
              <div className="text-[11px] text-[var(--color-text-secondary)] bg-[var(--color-panel-subtle)] p-2 rounded-md border border-[var(--color-border)]">
                <span className="font-semibold text-[var(--color-brand-primary)]">
                  AI Context Hook:
                </span>{" "}
                {creator.recentPost.relevanceHook}
              </div>
            </div>
          </div>

          {/* Section 2: Human-in-the-Loop Composer */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                  <span>Personalized Outreach Draft</span>
                </h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Context-grounded in verified public content. Review and edit before sending.
                </p>
              </div>

              {/* Tone Quick Presets */}
              <div className="flex items-center gap-0.5 bg-[var(--color-panel-subtle)] p-0.5 rounded-md border border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => handleApplyTone("CASUAL")}
                  className={cn(
                    "px-2 py-1 text-[10.5px] font-medium rounded-sm transition-all",
                    toneSelected === "CASUAL"
                      ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  Casual
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTone("FOUNDER")}
                  className={cn(
                    "px-2 py-1 text-[10.5px] font-medium rounded-sm transition-all",
                    toneSelected === "FOUNDER"
                      ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  Founder
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTone("SEEDING")}
                  className={cn(
                    "px-2 py-1 text-[10.5px] font-medium rounded-sm transition-all",
                    toneSelected === "SEEDING"
                      ? "bg-[var(--color-panel)] text-[var(--color-text-primary)] shadow-2xs border border-[var(--color-border)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  VIP Seeding
                </button>
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="text-[10.5px] font-semibold uppercase text-[var(--color-text-muted)] block mb-1">
                Message Subject / Hook
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Collaboration with Bearvana..."
                className="w-full px-3 py-1.5 text-xs rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
              />
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10.5px] font-semibold uppercase text-[var(--color-text-muted)]">
                  Message Content (Editable)
                </label>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[11px] text-[var(--color-brand-primary)] hover:underline font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span>Copied</span>
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
                className="w-full p-3 text-xs rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] leading-relaxed focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] font-sans transition-all"
              />
            </div>

            {/* Compliance Verification Badge Checklist */}
            <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-panel-subtle)] p-3 space-y-2">
              <h4 className="text-[10.5px] font-semibold uppercase text-[var(--color-text-muted)] flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Zero-Risk Compliance Guardrails</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[var(--color-text-secondary)]">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>No headless scraper bot employed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Grounded in verified public media</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Mandatory human-in-the-loop review</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Meta & TikTok direct policy compliant</span>
                </div>
              </div>
            </div>

            {/* Assign Approver & SLA Reminder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10.5px] font-semibold uppercase text-[var(--color-text-muted)] block mb-1">
                  Designated Reviewer
                </label>
                <select
                  value={assignedApprover}
                  onChange={(e) => setAssignedApprover(e.target.value)}
                  className="w-full text-xs rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] py-1.5 px-2.5 text-[var(--color-text-primary)] outline-none"
                >
                  {TEAM_MEMBERS.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10.5px] font-semibold uppercase text-[var(--color-text-muted)] block mb-1">
                  SLA Follow-up Window
                </label>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] font-mono">
                  <Clock className="h-3 w-3 text-amber-500" />
                  <span>48 Hours (Auto-Remind Sep 16)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[var(--color-border)] bg-[var(--color-panel)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleSaveOnly}
            className="px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors text-center"
          >
            Save Draft Only
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-3 py-2 text-xs font-medium rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="h-3 w-3" />
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-md bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>1-Click Human Approve & Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
