import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PipelineStage } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num.toString();
}

export function getStageConfig(stage: PipelineStage): {
  label: string;
  badgeClass: string;
  dotColor: string;
} {
  switch (stage) {
    case "DISCOVERED":
      return {
        label: "Discovered",
        badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
        dotColor: "bg-slate-400"
      };
    case "CONTENT_REVIEWED":
      return {
        label: "Content Reviewed",
        badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
        dotColor: "bg-sky-500"
      };
    case "DRAFT_READY":
      return {
        label: "Draft Ready",
        badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
        dotColor: "bg-amber-500"
      };
    case "HUMAN_APPROVED":
      return {
        label: "Human Approved",
        badgeClass: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
        dotColor: "bg-indigo-500"
      };
    case "OUTREACH_SENT":
      return {
        label: "Outreach Sent",
        badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
        dotColor: "bg-purple-500"
      };
    case "NEGOTIATING":
      return {
        label: "Negotiating",
        badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
        dotColor: "bg-blue-500"
      };
    case "SHIPPED":
      return {
        label: "Product Shipped",
        badgeClass: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
        dotColor: "bg-teal-500"
      };
    case "LIVE":
      return {
        label: "Collab Live",
        badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
        dotColor: "bg-emerald-500"
      };
    default:
      return {
        label: stage,
        badgeClass: "bg-slate-500/10 text-slate-700 border-slate-500/20",
        dotColor: "bg-slate-400"
      };
  }
}
