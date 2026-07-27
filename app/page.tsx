import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="px-6 py-4 border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LOOP</div>
        <nav className="space-x-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">Login</Link>
          <Link href="/signup" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Get Started</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          AI Customer Feedback <br/> <span className="text-blue-600">Intelligence Platform</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10">
          Project LOOP centralizes all your customer feedback, giving you AI-powered insights to build better products, faster.
        </p>
        <div className="flex space-x-4">
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all">Start Free Trial</Link>
          <Link href="/login" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Sign In</Link>
        </div>
      </main>
    </div>
  )
}
