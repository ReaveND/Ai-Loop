import AskLoopClient from "./AskLoopClient"

export default function AskLoopPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ask LOOP</h1>
        <p className="text-slate-500">Ask questions about your feedback and get answers grounded in real customer quotes.</p>
      </div>
      
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <AskLoopClient />
      </div>
    </div>
  )
}
