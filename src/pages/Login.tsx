
import { SignIn } from '@clerk/clerk-react'
import { useTheme } from '@/hooks/useTheme'
import { Shield } from 'lucide-react'

export default function Login() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main login card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00C49F] to-[#0088CC] rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            SENTINEL
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Insight Beyond Headlines
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-8 transition-all duration-300">
          {/* Welcome text */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to your dashboard
            </p>
          </div>

          {/* Clerk SignIn component with custom styling */}
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: `
                  w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 
                  hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 
                  font-medium transition-all duration-200 py-3 rounded-lg mb-3
                `,
                socialButtonsBlockButtonText: "font-medium text-sm",
                formButtonPrimary: `
                  w-full bg-[#00C49F] hover:bg-[#00B090] text-white font-semibold 
                  py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                `,
                footerActionLink: `
                  text-[#00C49F] hover:text-[#00B090] font-medium transition-colors 
                  duration-200 text-sm underline-offset-4 hover:underline
                `,
                formFieldInput: `
                  w-full border border-slate-300 dark:border-slate-600 
                  focus:border-[#00C49F] focus:ring-1 focus:ring-[#00C49F] 
                  bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                  rounded-lg py-3 px-4 transition-all duration-200
                `,
                formFieldLabel: "text-slate-700 dark:text-slate-300 font-medium text-sm mb-2",
                dividerLine: "bg-slate-200 dark:bg-slate-600",
                dividerText: "text-slate-500 dark:text-slate-400 text-sm bg-white dark:bg-slate-800 px-4",
                identityPreviewText: "text-slate-600 dark:text-slate-300 text-sm",
                identityPreviewEditButton: "text-[#00C49F] hover:text-[#00B090] font-medium text-sm",
                formHeaderTitle: "text-slate-900 dark:text-white font-bold text-lg",
                formHeaderSubtitle: "text-slate-600 dark:text-slate-400 text-sm"
              }
            }}
            redirectUrl="/dashboard"
          />
        </div>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-[#00C49F] hover:text-[#00B090] font-medium transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-slate-400 dark:text-slate-500 text-xs">
            <div className="w-2 h-2 bg-[#00C49F] rounded-full opacity-60"></div>
            <span>Secured with bank-grade encryption</span>
            <div className="w-2 h-2 bg-[#00C49F] rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
