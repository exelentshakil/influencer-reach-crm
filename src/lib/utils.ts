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
        badgeClass: "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        dotColor: "bg-slate-400"
      };
    case "CONTENT_REVIEWED":
      return {
        label: "Content Reviewed",
        badgeClass: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60",
        dotColor: "bg-sky-500"
      };
    case "DRAFT_READY":
      return {
        label: "Draft Ready",
        badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
        dotColor: "bg-amber-500"
      };
    case "HUMAN_APPROVED":
      return {
        label: "Human Approved",
        badgeClass: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60",
        dotColor: "bg-indigo-500"
      };
    case "OUTREACH_SENT":
      return {
        label: "Outreach Sent",
        badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60",
        dotColor: "bg-purple-500"
      };
    case "NEGOTIATING":
      return {
        label: "Negotiating",
        badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
        dotColor: "bg-blue-500"
      };
    case "SHIPPED":
      return {
        label: "Product Shipped",
        badgeClass: "bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/60",
        dotColor: "bg-teal-500"
      };
    case "LIVE":
      return {
        label: "Collab Live",
        badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
        dotColor: "bg-emerald-500"
      };
    default:
      return {
        label: stage,
        badgeClass: "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        dotColor: "bg-slate-400"
      };
  }
}
