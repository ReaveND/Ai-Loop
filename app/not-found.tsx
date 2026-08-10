import Link from "next/link"
import { SearchX, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-textPrimary px-4">
      <div className="w-20 h-20 bg-surface-2 border border-borderSubtle rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-textTertiary" />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">404 - Page Not Found</h1>
      <p className="text-textSecondary text-center max-w-md mb-8 text-lg">
        The page you are looking for doesn&apos;t exist, has been moved, or you don&apos;t have permission to access it.
      </p>
      <Link 
        href="/dashboard"
        className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg focus-ring"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Return to Dashboard
      </Link>
    </div>
  )
}
