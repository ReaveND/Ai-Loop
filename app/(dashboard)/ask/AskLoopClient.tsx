"use client"

import { useChat } from "@ai-sdk/react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export default function AskLoopClient() {
  const chatState = useChat()
  // @ts-ignore: mapping to sendMessage for newer AI SDK versions
  const { messages, status, sendMessage } = chatState || { messages: [], status: "idle", sendMessage: undefined }
  const [chatInput, setChatInput] = useState("")
  const isLoading = status === "streaming" || status === "submitted"
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    if (sendMessage) {
      // @ts-ignore
      sendMessage({ role: 'user', content: chatInput, id: Date.now().toString() })
    }
    setChatInput("")
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
          <Bot className="w-5 h-5" />
          <span>LOOP AI Assistant</span>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesEndRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-center max-w-sm">
              Ask me anything about your feedback data! I can summarize sentiments, identify feature requests, or analyze common complaints.
            </p>
          </div>
        ) : (
          messages.map(m => (
            <div 
              key={m.id}
              className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role !== 'user' && (
                <div className="w-8 h-8 shrink-0 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-sm'
              }`}>
                <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
                  {/* @ts-ignore */}
                  {m.content || m.parts?.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about your feedback..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !(chatInput || '').trim()}
            className="absolute right-2 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
