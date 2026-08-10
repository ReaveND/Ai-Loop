import Link from "next/link"
import React from "react"
import {
  Inbox,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Share2,
  HelpCircle,
  BarChart3,
} from "lucide-react"
import ProductPreviewDemo from "@/components/landing/ProductPreviewDemo"
import RoiCalculator from "@/components/landing/RoiCalculator"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-textPrimary selection:bg-accent-500 selection:text-white overflow-x-hidden">
      {/* Ambient Glowing Radial Wash & Fine Dot Pattern */}
      {/* Ambient Glowing Radial Wash & Fine Dot Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-surface-1/50 via-canvas to-surface-2/30">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Massive Ambient Gradient Orbs */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-accent-500/20 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] -left-[10%] w-[800px] h-[800px] bg-purple-500/15 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-[10%] w-[900px] h-[900px] bg-accent-400/15 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-[20%] left-[20%] w-[1000px] h-[1000px] bg-purple-600/15 blur-[220px] rounded-full pointer-events-none" />
      </div>

      {/* Modern Full-Width Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 animate-fade-in-up group/nav">
        {/* Interactive Glowing Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-500/0 to-transparent group-hover/nav:via-accent-500/50 transition-all duration-700 z-50" />
        
        <header className="w-full px-6 lg:px-12 py-4 bg-surface-1/70 backdrop-blur-2xl border-b border-borderSubtle flex justify-between items-center relative">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center text-white font-extrabold text-base tracking-tighter shadow-lg shadow-accent-500/30 group-hover:scale-105 transition-transform duration-300">
                LP
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-textPrimary via-textPrimary to-accent-400 bg-clip-text text-transparent tracking-tight">
                LOOP
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent-500/10 text-accent-400 border border-accent-500/30 shadow-inner group-hover/nav:border-accent-500/60 transition-colors duration-500">
              <Sparkles className="w-3 h-3 mr-1" />
              AI PRO
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-textSecondary">
            <a href="#demo" className="hover:text-textPrimary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-400 after:transition-all after:duration-300">
              Live Preview
            </a>
            <a href="#features" className="hover:text-textPrimary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-400 after:transition-all after:duration-300">
              AI Intelligence
            </a>
            <a href="#roi" className="hover:text-textPrimary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-400 after:transition-all after:duration-300">
              ROI Simulator
            </a>
            <a href="#pricing" className="hover:text-textPrimary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-400 after:transition-all after:duration-300">
              Pricing
            </a>
            <a href="#faq" className="hover:text-textPrimary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent-400 after:transition-all after:duration-300">
              FAQ
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-textSecondary hover:text-textPrimary hover:bg-surface-3/50 border border-transparent hover:border-borderSubtle transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-accent-500 hover:bg-accent-400 text-white transition-all duration-300 shadow-[0_0_20px_-5px_rgba(59,91,255,0.5)] hover:shadow-[0_0_30px_-5px_rgba(59,91,255,0.7)] group flex items-center border border-accent-400/50 hover:border-white/50"
            >
              Start Free Trial <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <main className="flex-1 relative z-10">
        <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-12 relative">
          {/* Left Column: Text & CTA */}
          <div className="flex-1 text-left flex flex-col items-start relative z-10">
            {/* Animated Hero Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full card-gradient border !border-accent-500/30 text-xs tracking-wide font-semibold text-accent-400 mb-6 shadow-sm hover:!border-accent-500/60 transition-all cursor-pointer animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>v2.0 RELEASED — NEXT-GEN AI SENTIMENT & THEME DISCOVERY</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-balance leading-[1.12] max-w-[42rem] drop-shadow-lg animate-fade-in-up delay-100">
              Turn Customer Feedback Into Your{" "}
              <span className="bg-gradient-to-r from-accent-400 via-purple-400 to-accent-500 bg-clip-text text-transparent">
                Unfair Product Advantage.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-textSecondary/90 font-medium max-w-xl text-balance leading-relaxed animate-fade-in-up delay-200">
              LOOP centralizes feedback from Discord, App Store, Support, and Surveys, automatically tags sentiment with{" "}
              <span className="text-textPrimary font-semibold">99.9% accuracy</span>, and groups thousands of quotes into actionable product roadmaps.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md lg:max-w-none animate-fade-in-up delay-300">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-accent-500 hover:bg-accent-400 text-white transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 flex items-center justify-center group"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm card-gradient card-gradient-hover text-textPrimary border border-borderSubtle transition-all flex items-center justify-center shadow-md group"
              >
                Explore Live Demo <ArrowRight className="w-4 h-4 ml-2 opacity-50 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual / Staggered Metrics Stack */}
          <div className="flex-1 w-full relative flex flex-col gap-5 items-center lg:items-end mt-12 lg:mt-0 animate-fade-in delay-400">
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent-500/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="w-full max-w-[400px] flex flex-col p-6 rounded-2xl card-gradient hover:!border-accent-500/50 hover:-translate-y-1 transition-all duration-300 z-10 shadow-lg animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-textPrimary flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3 border border-yellow-400/20">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  10,000+ / min
                </span>
                <span className="px-2.5 py-1 rounded-md bg-semantic-success/10 text-semantic-success text-[10px] font-bold border border-semantic-success/20 flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1 -rotate-45" /> +14%
                </span>
              </div>
              <span className="text-xs text-textSecondary mt-3 leading-relaxed">Customer feedback items ingested and analyzed in real-time across 5 active integrations.</span>
              <div className="mt-4 flex gap-1 h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400/80 w-1/3 rounded-full" />
                <div className="h-full bg-accent-400/80 w-1/4 rounded-full" />
                <div className="h-full bg-purple-400/80 w-1/5 rounded-full" />
              </div>
            </div>

            <div className="w-full max-w-[400px] flex flex-col p-6 rounded-2xl card-gradient hover:!border-accent-500/50 hover:-translate-y-1 transition-all duration-300 z-10 shadow-xl relative border-l-2 !border-l-accent-500 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-textPrimary flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center mr-3 border border-accent-500/20">
                    <BrainCircuit className="w-4 h-4 text-accent-400" />
                  </div>
                  99.9% Accuracy
                </span>
              </div>
              <span className="text-xs text-textSecondary mt-3 leading-relaxed">Proprietary NLP models for sentiment, theme extraction, and feature request mapping.</span>
              <div className="mt-4 flex items-center justify-between text-[10px] font-semibold text-textTertiary">
                <span>Model Confidence</span>
                <span className="text-accent-400">High</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-500 to-purple-500 w-[99.9%] rounded-full shadow-[0_0_10px_rgba(59,91,255,0.8)]" />
              </div>
            </div>

            <div className="w-full max-w-[400px] flex flex-col p-6 rounded-2xl card-gradient hover:!border-accent-500/50 hover:-translate-y-1 transition-all duration-300 z-10 shadow-lg animate-float" style={{ animationDelay: '4s' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-textPrimary flex items-center">
                  <div className="w-8 h-8 rounded-full bg-semantic-success/10 flex items-center justify-center mr-3 border border-semantic-success/20">
                    <ShieldCheck className="w-4 h-4 text-semantic-success" />
                  </div>
                  SOC2 Type II
                </span>
                <span className="text-[10px] font-bold text-textSecondary px-2.5 py-1 rounded-md bg-surface-2 border border-borderSubtle">Certified</span>
              </div>
              <span className="text-xs text-textSecondary mt-3 leading-relaxed">Enterprise-grade data security with end-to-end encryption and full GDPR compliance.</span>
              <div className="mt-4 flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-surface-3 border-2 border-surface-1 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-semantic-success" /></div>
                 <div className="w-6 h-6 rounded-full bg-surface-3 border-2 border-surface-1 flex items-center justify-center"><Lock className="w-3 h-3 text-semantic-success" /></div>
                 <div className="w-6 h-6 rounded-full bg-surface-3 border-2 border-surface-1 flex items-center justify-center"><ShieldCheck className="w-3 h-3 text-semantic-success" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Interactive Live Product Preview Showcase */}
        <section id="demo" className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-fade-in-up delay-100">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                INTERACTIVE PRODUCT SHOWCASE
              </span>
              <h2 className="text-3xl font-extrabold text-textPrimary mt-2">
                Experience LOOP in Action
              </h2>
              <p className="text-sm text-textSecondary max-w-xl mx-auto mt-1">
                Click the tabs below to test drive the live Executive Dashboard, AI Inbox, and Theme Discovery.
              </p>
            </div>

            {/* Embedded Live Tabbed Product Demo */}
            <ProductPreviewDemo />
          </div>
        </section>

        {/* Section 2: Enterprise Customer Logo Showcase */}
        <section className="py-12 px-6 border-y border-borderSubtle bg-surface-1/50">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up delay-200">
            <p className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-8">
              TRUSTED BY ENGINEERING &amp; PRODUCT LEADERS AT 4,800+ HIGH-GROWTH SAAS COMPANYS
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-center opacity-85">
              {[
                { name: "Linear", badge: "LINEAR" },
                { name: "Vercel", badge: "VERCEL" },
                { name: "Stripe", badge: "STRIPE" },
                { name: "Figma", badge: "FIGMA" },
                { name: "Notion", badge: "NOTION" },
                { name: "Ramp", badge: "RAMP" },
              ].map((logo) => (
                <div
                  key={logo.name}
                  className="p-4 rounded-xl card-gradient card-gradient-hover hover:!border-accent-500/50 transition-all flex items-center justify-center"
                >
                  <span className="font-extrabold tracking-tight text-sm text-textSecondary hover:text-textPrimary transition-colors">
                    {logo.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Comprehensive 6-Card Feature Grid with Gradients */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up delay-100">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                WHY PRODUCT TEAMS SWITCH TO LOOP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary mt-2">
                Every Tool You Need to Build What Customers Actually Want
              </h2>
              <p className="text-base text-textSecondary max-w-2xl mx-auto mt-3">
                Stop manually reading spreadsheets. Let AI synthesize customer urgency and feed it directly into your product roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group animate-fade-in-up delay-200">
                <div className="w-14 h-14 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400 mb-6 group-hover:scale-110 transition-transform">
                  <Inbox className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Multi-Channel Centralization
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Connect Zendesk, Intercom, Discord, App Store reviews, email support, and NPS surveys into a single unified workspace.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-accent-400">
                  <span>6 out-of-the-box connectors →</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group animate-fade-in-up delay-300">
                <div className="w-14 h-14 rounded-2xl bg-semantic-success-bg border border-semantic-success/20 flex items-center justify-center text-semantic-success mb-6 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Instant AI Sentiment Scoring
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Proprietary NLP models score customer quotes for positive, neutral, or negative sentiment and flag churn risk in 20 milliseconds.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-semantic-success">
                  <span>99.9% sentiment accuracy →</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group animate-fade-in-up delay-400">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Autonomous Theme Clustering
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Never miss an emerging trend. LOOP automatically groups thousands of unstructured quotes into ranked feature requests.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-yellow-400">
                  <span>Auto-grouped roadmaps →</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group">
                <div className="w-14 h-14 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400 mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Executive AI Briefs
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Generate one-click board reports and weekly customer sentiment digests that synthesize volume, trends, and top churn risks.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-accent-400">
                  <span>Board-ready markdown export →</span>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Two-Way Engineering Sync
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Create Linear, Jira, or GitHub issues directly from customer feedback clusters. When tickets ship, customers are notified automatically.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-purple-400">
                  <span>Linear &amp; Jira synced →</span>
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-8 rounded-3xl card-gradient card-gradient-hover group">
                <div className="w-14 h-14 rounded-2xl bg-semantic-success-bg border border-semantic-success/20 flex items-center justify-center text-semantic-success mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-textPrimary">
                  Enterprise Security &amp; RBAC
                </h3>
                <p className="text-sm text-textSecondary mt-2 leading-relaxed">
                  Granular role permissions (Admin, Analyst, Viewer), SOC2 Type II compliance, encryption at rest, and full SSO/SAML support.
                </p>
                <div className="mt-6 pt-4 border-t border-borderSubtle/60 flex items-center text-xs font-semibold text-semantic-success">
                  <span>SOC2 Type II &amp; GDPR Ready →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive ROI / Time-Saved Simulator */}
        <section id="roi" className="py-16 px-6 border-t border-borderSubtle bg-surface-1/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                PROVEN EFFICIENCY
              </span>
              <h2 className="text-3xl font-extrabold text-textPrimary mt-2">
                See How Much Time Your Support &amp; PM Team Will Save
              </h2>
              <p className="text-sm text-textSecondary max-w-xl mx-auto mt-1">
                Drag the slider below to calculate your team&apos;s monthly engineering hours and dollar savings.
              </p>
            </div>

            {/* Embedded Interactive ROI Calculator */}
            <RoiCalculator />
          </div>
        </section>

        {/* Section 5: Interactive Pricing Comparison Plan Cards */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                TRANSPARENT PRICING
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary mt-2">
                Start Free. Scale as Your Customer Base Grows.
              </h2>
              <p className="text-base text-textSecondary max-w-xl mx-auto mt-3">
                14-day free trial on all paid plans. No credit card required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Plan 1: Starter */}
              <div className="p-8 rounded-3xl card-gradient flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-xs font-bold uppercase text-textSecondary tracking-wider">
                    STARTER
                  </span>
                  <div className="my-4">
                    <span className="text-4xl font-extrabold text-textPrimary">$0</span>
                    <span className="text-sm text-textSecondary"> / month</span>
                  </div>
                  <p className="text-xs text-textSecondary mb-6">
                    Perfect for solo founders and pre-seed product teams.
                  </p>
                  <ul className="space-y-3 text-xs text-textPrimary">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>Up to 500 feedback items / mo</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>AI Sentiment Detection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>2 Team Members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>CSV &amp; Email Ingress</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/signup"
                  className="mt-8 w-full py-3 rounded-xl bg-surface-2 hover:bg-surface-3 text-textPrimary font-semibold text-xs text-center border border-borderSubtle transition-all"
                >
                  Start Free Forever
                </Link>
              </div>

              {/* Plan 2: Growth Pro (MOST POPULAR) */}
              <div className="p-8 rounded-3xl card-gradient border-2 !border-accent-500 shadow-2xl shadow-accent-500/20 flex flex-col justify-between relative transform md:-translate-y-2 hover:-translate-y-3 transition-all duration-300">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                  MOST POPULAR
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-accent-400 tracking-wider">
                    GROWTH PRO
                  </span>
                  <div className="my-4">
                    <span className="text-4xl font-extrabold text-textPrimary">$79</span>
                    <span className="text-sm text-textSecondary"> / month</span>
                  </div>
                  <p className="text-xs text-textSecondary mb-6">
                    For growing SaaS teams needing autonomous theme discovery and Linear sync.
                  </p>
                  <ul className="space-y-3 text-xs text-textPrimary">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mr-2.5 shrink-0" />
                      <span className="font-semibold">10,000 feedback items / mo</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mr-2.5 shrink-0" />
                      <span className="font-semibold">Autonomous Theme Discovery</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mr-2.5 shrink-0" />
                      <span>Two-Way Linear &amp; Jira Sync</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mr-2.5 shrink-0" />
                      <span>Unlimited Team Members &amp; Roles</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mr-2.5 shrink-0" />
                      <span>AI Board Briefing Reports</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/signup"
                  className="mt-8 w-full py-3.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-white font-bold text-xs text-center shadow-lg shadow-accent-500/30 transition-all"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="p-8 rounded-3xl card-gradient flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-xs font-bold uppercase text-textSecondary tracking-wider">
                    ENTERPRISE
                  </span>
                  <div className="my-4">
                    <span className="text-4xl font-extrabold text-textPrimary">Custom</span>
                    <span className="text-sm text-textSecondary"> / annual</span>
                  </div>
                  <p className="text-xs text-textSecondary mb-6">
                    For large engineering organizations requiring custom SLA and security controls.
                  </p>
                  <ul className="space-y-3 text-xs text-textPrimary">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>Unlimited feedback volume</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>Custom AI Sentiment fine-tuning</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>SSO / SAML &amp; Audit Logs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-semantic-success mr-2.5 shrink-0" />
                      <span>Dedicated Account Manager &amp; 24/7 SLA</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/signup"
                  className="mt-8 w-full py-3 rounded-xl bg-surface-2 hover:bg-surface-3 text-textPrimary font-semibold text-xs text-center border border-borderSubtle transition-all"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Comprehensive B2B SaaS FAQ Accordion */}
        <section id="faq" className="py-20 px-6 border-t border-borderSubtle bg-surface-1/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl font-extrabold text-textPrimary mt-2">
                Everything You Need to Know About LOOP
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How accurate is LOOP's AI sentiment detection?",
                  a: "LOOP uses specialized NLP models trained on over 50 million SaaS support tickets and app reviews. It achieves 99.9% accuracy in distinguishing subtle sarcasm, urgency, and churn risk from normal feature requests.",
                },
                {
                  q: "Can we import existing historical feedback from CSV or Zendesk?",
                  a: "Yes! You can upload historical CSV files or connect Zendesk/Intercom in one click. Our AI will automatically tag and backfill sentiment and theme clusters for all historical records in minutes.",
                },
                {
                  q: "How does the Two-Way Linear and Jira sync work?",
                  a: "When you link a customer theme cluster to a Linear or Jira issue, LOOP automatically syncs the ticket status. When your engineering team marks the ticket as 'Done', LOOP notifies your support team so they can close the loop with customers.",
                },
                {
                  q: "Is our customer data used to train public AI models?",
                  a: "Never. Your workspace data is isolated, encrypted at rest (AES-256) and in transit (TLS 1.3), and is never shared with or used to train third-party public language models. We are SOC2 Type II and GDPR verified.",
                },
                {
                  q: "How long does it take to set up LOOP?",
                  a: "Less than 2 minutes. Simply sign up, connect your Discord channel, email inbox, or upload a CSV file, and your AI sentiment dashboard populates immediately.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl card-gradient hover:!border-accent-500/50 transition-all duration-300 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-textPrimary flex items-center justify-between">
                    <span>{faq.q}</span>
                    <HelpCircle className="w-4 h-4 text-accent-400 shrink-0 ml-4" />
                  </h4>
                  <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Final Bottom CTA Banner */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto p-12 rounded-3xl card-gradient border !border-accent-500/40 text-center relative overflow-hidden shadow-[0_0_80px_-15px_rgba(59,91,255,0.3)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
              Ready to Transform Customer Feedback Into Actionable Intelligence?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-textSecondary max-w-xl mx-auto">
              Join 4,800+ engineering and product leaders who trust LOOP to prioritize their roadmap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl font-bold text-sm bg-accent-500 hover:bg-accent-400 text-white transition-all shadow-xl shadow-accent-500/30"
              >
                Start 14-Day Free Trial →
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-xl font-semibold text-sm bg-surface-2 hover:bg-surface-3 text-textPrimary border border-borderSubtle transition-all"
              >
                Sign In to Existing Workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Comprehensive 4-Column Enterprise Footer */}
      <footer className="border-t border-borderSubtle bg-surface-1/80 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center text-white font-bold text-xs">
                LP
              </div>
              <span className="text-lg font-bold text-textPrimary">LOOP</span>
            </div>
            <p className="text-xs text-textSecondary max-w-sm leading-relaxed">
              LOOP is an AI-powered customer feedback intelligence platform built for B2B SaaS product and support leaders.
            </p>
            <div className="text-[11px] text-textTertiary">
              © {new Date().getFullYear()} LOOP Inc. All rights reserved.
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-textPrimary uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-2 text-textSecondary">
              <li><a href="#features" className="hover:text-textPrimary transition-colors">Unified Inbox</a></li>
              <li><a href="#features" className="hover:text-textPrimary transition-colors">AI Sentiment Engine</a></li>
              <li><a href="#features" className="hover:text-textPrimary transition-colors">Theme Discovery</a></li>
              <li><a href="#features" className="hover:text-textPrimary transition-colors">Linear &amp; Jira Sync</a></li>
              <li><a href="#features" className="hover:text-textPrimary transition-colors">Security &amp; SOC2</a></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-textPrimary uppercase tracking-wider text-[11px]">Solutions</h4>
            <ul className="space-y-2 text-textSecondary">
              <li><a href="#roi" className="hover:text-textPrimary transition-colors">For Product Managers</a></li>
              <li><a href="#roi" className="hover:text-textPrimary transition-colors">For Support Leaders</a></li>
              <li><a href="#roi" className="hover:text-textPrimary transition-colors">For SaaS Founders</a></li>
              <li><a href="#pricing" className="hover:text-textPrimary transition-colors">Enterprise Pricing</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-textPrimary uppercase tracking-wider text-[11px]">Legal</h4>
            <ul className="space-y-2 text-textSecondary">
              <li><a href="#" className="hover:text-textPrimary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-textPrimary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-textPrimary transition-colors">Security Audit Report</a></li>
              <li><a href="#" className="hover:text-textPrimary transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
