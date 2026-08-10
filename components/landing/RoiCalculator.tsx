"use client"

import React, { useState } from "react"
import { Calculator, Clock, DollarSign, Zap } from "lucide-react"
import Link from "next/link"

export default function RoiCalculator() {
  const [feedbackCount, setFeedbackCount] = useState<number>(3500)

  // Calculations
  // Average manual triage takes ~6 minutes per feedback item (read, tag sentiment, group theme, create Jira issue)
  // LOOP AI does it in ~10 seconds.
  // Hours saved = (feedbackCount * 5.8 mins) / 60
  const hoursSaved = Math.round((feedbackCount * 5.8) / 60)
  // Assuming average PM / Support / Eng loaded cost of $85/hour
  const dollarsSaved = Math.round(hoursSaved * 85)
  const ticketSpeedup = 12.4

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-8 rounded-3xl bg-surface-1 border border-borderSubtle shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Interactive Slider */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-center space-x-2 text-accent-400 font-semibold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive ROI Simulator</span>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-textPrimary tracking-tight">
              Calculate Your Team&apos;s Time Savings
            </h3>
            <p className="text-sm text-textSecondary mt-1">
              Drag the slider to match your monthly customer feedback volume across all channels.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-textSecondary">
                Monthly Feedback Volume
              </span>
              <span className="text-xl font-bold font-mono text-accent-400 bg-accent-500/10 px-3 py-1 rounded-xl border border-accent-500/20">
                {feedbackCount.toLocaleString('en-US')} items / mo
              </span>
            </div>

            <input
              type="range"
              min={500}
              max={25000}
              step={500}
              value={feedbackCount}
              onChange={(e) => setFeedbackCount(Number(e.target.value))}
              className="w-full h-2.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-accent-500"
            />

            <div className="flex justify-between text-[11px] text-textTertiary font-mono">
              <span>500 / mo (Seed startup)</span>
              <span>10,000+ / mo (Growth SaaS)</span>
              <span>25,000 / mo (Enterprise)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Calculated Savings Cards */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-surface-2 border border-borderSubtle flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-textSecondary text-xs font-semibold">
              <Clock className="w-4 h-4 text-accent-400" />
              <span>Hours Saved</span>
            </div>
            <div className="my-3">
              <p className="text-3xl font-extrabold text-textPrimary tabular-nums">
                {hoursSaved} <span className="text-sm font-normal text-textSecondary">hrs/mo</span>
              </p>
              <p className="text-xs text-semantic-success font-medium mt-0.5">
                ~{(hoursSaved / 8).toFixed(1)} full workdays saved
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-2 border border-borderSubtle flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-textSecondary text-xs font-semibold">
              <DollarSign className="w-4 h-4 text-semantic-success" />
              <span>Monthly Dollar ROI</span>
            </div>
            <div className="my-3">
              <p className="text-3xl font-extrabold text-semantic-success tabular-nums">
                ${dollarsSaved.toLocaleString('en-US')}
              </p>
              <p className="text-xs text-textSecondary font-medium mt-0.5">
                ${(dollarsSaved * 12).toLocaleString('en-US')} annual savings
              </p>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 p-5 rounded-2xl bg-accent-500/10 border border-accent-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-accent-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-textPrimary">
                  {ticketSpeedup}x Faster Issue Triaging
                </span>
                <p className="text-[11px] text-textSecondary">
                  Auto-tag customer sentiment & sync with Linear/Jira.
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-400 text-white text-xs font-semibold shadow-md transition-colors shrink-0"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
