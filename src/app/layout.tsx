import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Influencer Outreach & CRM Engine | Platform-Compliant Meta & TikTok Architecture",
  description: "Official Meta Instagram Graph API v20.0 and TikTok for Business influencer CRM engine with human-in-the-loop review, multi-brand isolation, and zero bot scraping risk."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Central Traffic Tracking Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=influencer-reach-crm"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
