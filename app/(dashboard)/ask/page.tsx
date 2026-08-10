import AskLoopClient from "./AskLoopClient"

export default function AskLoopPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">Ask LOOP</h1>
        <p className="text-textSecondary">Ask questions about your feedback and get answers grounded in real customer quotes.</p>
      </div>
      
      <div className="flex-1 bg-surface-1 rounded-xl border border-borderSubtle shadow-sm overflow-hidden flex flex-col">
        <AskLoopClient />
      </div>
    </div>
  )
}
