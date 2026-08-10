"use client"

import React, { useState } from "react"
import {
  BarChart3,
  MessageSquare,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Search,
} from "lucide-react"

export default function ProductPreviewDemo() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "inbox" | "themes" | "roi">("dashboard")

  return (
    <div className="w-full max-w-6xl mx-auto my-12 rounded-2xl border border-borderSubtle card-gradient shadow-[0_0_80px_-15px_rgba(59,91,255,0.3)] overflow-hidden">
      {/* Top Browser Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-2/90 border-b border-borderSubtle">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-canvas/80 border border-borderSubtle text-xs text-textSecondary font-mono">
          <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
          <span>https://app.loop.ai/dashboard</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold text-accent-400 bg-accent-500/10 px-2.5 py-1 rounded-md border border-accent-500/20">
            LIVE DEMO
          </span>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="flex items-center border-b border-borderSubtle bg-surface-1 px-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "dashboard"
              ? "border-accent-500 text-textPrimary bg-surface-2/50"
              : "border-transparent text-textSecondary hover:text-textPrimary hover:bg-surface-2/30"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-accent-400" />
          <span>1. Executive AI Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "inbox"
              ? "border-accent-500 text-textPrimary bg-surface-2/50"
              : "border-transparent text-textSecondary hover:text-textPrimary hover:bg-surface-2/30"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-semantic-success" />
          <span>2. Unified Customer Inbox</span>
        </button>

        <button
          onClick={() => setActiveTab("themes")}
          className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "themes"
              ? "border-accent-500 text-textPrimary bg-surface-2/50"
              : "border-transparent text-textSecondary hover:text-textPrimary hover:bg-surface-2/30"
          }`}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>3. Autonomous Theme Discovery</span>
        </button>

        <button
          onClick={() => setActiveTab("roi")}
          className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "roi"
              ? "border-accent-500 text-textPrimary bg-surface-2/50"
              : "border-transparent text-textSecondary hover:text-textPrimary hover:bg-surface-2/30"
          }`}
        >
          <Zap className="w-4 h-4 text-accent-400" />
          <span>4. AI Action Efficiency</span>
        </button>
      </div>

      {/* Tab 1 Content: Executive Dashboard Mockup */}
      {activeTab === "dashboard" && (
        <div className="p-6 md:p-8 space-y-6 bg-canvas/40 animate-fadeIn">
          {/* Top Hero Banner in Demo */}
          <div className="p-5 rounded-2xl card-gradient border !border-accent-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-500/40 flex items-center justify-center text-accent-400 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-textPrimary">
                    AI Customer Sentiment Briefing — July 2026
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-semantic-success-bg text-semantic-success border border-semantic-success/20">
                    REAL-TIME
                  </span>
                </div>
                <p className="text-xs text-textSecondary mt-0.5">
                  &ldquo;Customer satisfaction jumped +14.2% after shipping dark mode and Slack export.&rdquo;
                </p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-accent-500 text-white text-xs font-semibold shadow-md shrink-0">
              Generate Board Brief
            </button>
          </div>

          {/* 3 KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl card-gradient flex items-center space-x-4 shadow-sm hover:!border-accent-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent-500/15 text-accent-400 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-textSecondary">Total Feedback Volume</span>
                <p className="text-2xl font-bold text-textPrimary tabular-nums mt-0.5">14,280</p>
                <span className="text-[11px] font-medium text-semantic-success flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +24% vs last month
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl card-gradient flex items-center space-x-4 shadow-sm hover:!border-accent-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-semantic-success-bg text-semantic-success flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-textSecondary">Positive Sentiment</span>
                <p className="text-2xl font-bold text-textPrimary tabular-nums mt-0.5">78.4%</p>
                <span className="text-[11px] font-medium text-semantic-success flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8.1% improvement
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl card-gradient flex items-center space-x-4 shadow-sm hover:!border-accent-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-semantic-danger-bg text-semantic-danger flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-textSecondary">Churn Risk Cluster</span>
                <p className="text-2xl font-bold text-textPrimary tabular-nums mt-0.5">4.2%</p>
                <span className="text-[11px] font-medium text-semantic-success flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-0.5" /> -3.5% risk reduction
                </span>
              </div>
            </div>
          </div>

          {/* Simulated Chart Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl card-gradient space-y-4 hover:!border-accent-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-textPrimary">Feedback Volume (30 Days)</h5>
                  <p className="text-xs text-textSecondary">Ingress rate across App Store, Support, and Discord</p>
                </div>
                <span className="text-xs font-mono text-accent-400 font-semibold bg-accent-500/10 px-2.5 py-1 rounded-lg">
                  +1,420 this week
                </span>
              </div>
              {/* Fake visual bars */}
              <div className="h-44 flex items-end justify-between gap-1.5 pt-6 border-b border-borderSubtle pb-2">
                {[40, 55, 30, 70, 85, 65, 90, 75, 100, 110, 95, 120, 105, 130, 125, 140, 115, 150].map((h, i) => (
                  <div key={i} className="w-full bg-accent-500 opacity-20 hover:opacity-100 transition-all rounded-t" style={{ height: `${(h / 150) * 100}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-textTertiary font-mono">
                <span>Jul 1</span>
                <span>Jul 10</span>
                <span>Jul 20</span>
                <span>Jul 28</span>
              </div>
            </div>

            <div className="p-5 rounded-xl card-gradient flex flex-col justify-between hover:!border-accent-500/50 transition-all">
              <div>
                <h5 className="text-sm font-bold text-textPrimary">Sentiment Breakdown</h5>
                <p className="text-xs text-textSecondary">AI NLP sentiment distribution</p>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="w-32 h-32 rounded-full border-8 border-semantic-success flex flex-col items-center justify-center relative">
                  <span className="text-xl font-bold text-textPrimary">78%</span>
                  <span className="text-[10px] text-textSecondary uppercase">Positive</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-semantic-success mr-2" /> Positive</span>
                  <span className="font-mono font-bold text-textPrimary">11,195</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-neutral-500 mr-2" /> Neutral</span>
                  <span className="font-mono font-bold text-textPrimary">2,485</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-semantic-danger mr-2" /> Negative</span>
                  <span className="font-mono font-bold text-textPrimary">600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 Content: Unified Customer Inbox Mockup */}
      {activeTab === "inbox" && (
        <div className="p-6 md:p-8 space-y-6 bg-canvas/40 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-textSecondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                value="export csv performance..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-2 border border-borderSubtle text-xs text-textPrimary focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 rounded-xl bg-semantic-danger-bg text-semantic-danger text-xs font-semibold border border-semantic-danger/20">
                2 High Priority
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-surface-2 text-textSecondary text-xs font-medium border border-borderSubtle">
                All Channels (6)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-borderSubtle overflow-hidden bg-surface-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-2/60 border-b border-borderSubtle text-textSecondary font-semibold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Sentiment</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Customer Quote</th>
                  <th className="py-3 px-4">AI Auto-Tag</th>
                  <th className="py-3 px-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderSubtle">
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-semantic-danger-bg text-semantic-danger">
                      NEGATIVE
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-textSecondary">Discord #support</td>
                  <td className="py-3.5 px-4 font-medium text-textPrimary">
                    &ldquo;We need CSV data export on the team analytics page immediately...&rdquo;
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-accent-500/10 text-accent-400 font-medium">
                      CSV Export
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">
                      HIGH
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-semantic-success-bg text-semantic-success">
                      POSITIVE
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-textSecondary">App Store iOS</td>
                  <td className="py-3.5 px-4 font-medium text-textPrimary">
                    &ldquo;Best SaaS customer feedback app we have used. The AI tagging saves us 10+ hours a week.&rdquo;
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-accent-500/10 text-accent-400 font-medium">
                      UI/UX Praise
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-surface-2 text-textSecondary font-semibold">
                      NORMAL
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-500/20 text-neutral-400">
                      NEUTRAL
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-textSecondary">Email Support</td>
                  <td className="py-3.5 px-4 font-medium text-textPrimary">
                    &ldquo;When will the Linear two-way issue sync be available for enterprise workspaces?&rdquo;
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-accent-500/10 text-accent-400 font-medium">
                      Linear Sync
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-bold">
                      MEDIUM
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3 Content: Autonomous Theme Discovery */}
      {activeTab === "themes" && (
        <div className="p-6 md:p-8 space-y-6 bg-canvas/40 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-textPrimary">Autonomous Customer Theme Roadmap</h4>
              <p className="text-xs text-textSecondary">
                AI clustered 14,280 feedback items into 4 top priority feature requests.
              </p>
            </div>
            <span className="text-xs font-semibold text-accent-400 bg-accent-500/10 px-3 py-1.5 rounded-xl border border-accent-500/20">
              4 Clusters Analyzed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-1 border border-accent-500/30 hover:border-accent-400 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-textPrimary">1. CSV & Analytics Export</span>
                <span className="px-2 py-0.5 rounded-md bg-accent-500/15 text-accent-400 text-xs font-bold">
                  2,450 mentions
                </span>
              </div>
              <p className="text-xs text-textSecondary mb-3">
                High demand from operations and PM teams for one-click CSV and Slack data export.
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-semantic-success">
                <span>🔥 92% Urgency Score</span>
                <span className="text-accent-400">View 48 Quotes →</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface-1 border border-borderSubtle hover:border-borderStrong transition-all shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-textPrimary">2. Two-Way Linear & Jira Sync</span>
                <span className="px-2 py-0.5 rounded-md bg-accent-500/15 text-accent-400 text-xs font-bold">
                  1,820 mentions
                </span>
              </div>
              <p className="text-xs text-textSecondary mb-3">
                Engineering leaders want customer quotes linked directly to existing Linear tickets.
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-semantic-success">
                <span>⚡ 88% Urgency Score</span>
                <span className="text-accent-400">View 34 Quotes →</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface-1 border border-borderSubtle hover:border-borderStrong transition-all shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-textPrimary">3. Dark Mode & Custom Branding</span>
                <span className="px-2 py-0.5 rounded-md bg-accent-500/15 text-accent-400 text-xs font-bold">
                  1,140 mentions
                </span>
              </div>
              <p className="text-xs text-textSecondary mb-3">
                Users love the new dark mode aesthetics and request custom workspace branding colors.
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-semantic-success">
                <span>✨ Shipped in v2.0</span>
                <span className="text-accent-400">View 22 Quotes →</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface-1 border border-borderSubtle hover:border-borderStrong transition-all shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-textPrimary">4. Webhook & Slack Real-time Alerts</span>
                <span className="px-2 py-0.5 rounded-md bg-accent-500/15 text-accent-400 text-xs font-bold">
                  890 mentions
                </span>
              </div>
              <p className="text-xs text-textSecondary mb-3">
                Customer success teams want instant Slack pings when negative sentiment is detected.
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-semantic-success">
                <span>🚀 In Active Sprint</span>
                <span className="text-accent-400">View 19 Quotes →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4 Content: AI Action Efficiency */}
      {activeTab === "roi" && (
        <div className="p-6 md:p-8 space-y-6 bg-canvas/40 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            <div className="p-6 rounded-2xl bg-surface-1 border border-borderSubtle shadow-md">
              <span className="text-xs font-semibold text-textSecondary">PM & Support Hours Saved</span>
              <p className="text-4xl font-extrabold text-accent-400 mt-2">84 hrs / mo</p>
              <span className="text-xs text-semantic-success font-medium mt-1 inline-block">
                ~2 full work weeks saved per month
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-surface-1 border border-borderSubtle shadow-md">
              <span className="text-xs font-semibold text-textSecondary">Ticket Creation Speedup</span>
              <p className="text-4xl font-extrabold text-semantic-success mt-2">12.4x</p>
              <span className="text-xs text-textSecondary font-medium mt-1 inline-block">
                From 14 mins manual triage to 68 sec with AI
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-surface-1 border border-borderSubtle shadow-md">
              <span className="text-xs font-semibold text-textSecondary">Annual Support ROI</span>
              <p className="text-4xl font-extrabold text-accent-400 mt-2">$76,800</p>
              <span className="text-xs text-semantic-success font-medium mt-1 inline-block">
                Based on $95/hr fully loaded engineering cost
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface-1 border border-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-8 h-8 text-semantic-success shrink-0" />
              <div>
                <h5 className="text-sm font-bold text-textPrimary">SOC2 Type II & GDPR Verified</h5>
                <p className="text-xs text-textSecondary">
                  Your customer data is encrypted at rest and in transit. Never used to train public LLMs.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-surface-2 text-xs font-semibold text-textPrimary border border-borderSubtle shrink-0">
              View Audit Report →
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
