import { NextResponse } from "next/server";
import { COMPLIANCE_RULES } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    status: "compliant",
    policyFramework: "Meta Commercial Developer Terms & TikTok Content API Guidelines",
    prohibitedMethodsDetected: {
      headlessBrowserBots: false,
      privateInstagramScraping: false,
      automatedBulkDms: false,
      fakeFollowerInjectors: false
    },
    humanInTheLoopEnforced: true,
    rulesCount: COMPLIANCE_RULES.length,
    rules: COMPLIANCE_RULES,
    timestamp: new Date().toISOString()
  });
}
