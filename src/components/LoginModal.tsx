
import { useState } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Shield } from 'lucide-react'
import { SignIn, SignUp } from '@clerk/clerk-react'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 border-0 bg-transparent overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel - Branding */}
          <div className="flex-1 bg-gradient-to-br from-[#00C49F] via-[#00B090] to-[#009980] dark:from-[#00C49F] dark:via-[#00A085] dark:to-[#008775] relative overflow-hidden flex flex-col justify-center items-center p-12 text-white min-h-[40vh] md:min-h-full">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
                Smarter, Safer
                <br />
                Investing.
              </h1>
              <p className="text-xl opacity-90 mb-12 max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
                AI-powered insights backed by real-time news analysis for smarter investment decisions.
              </p>
              
              {/* Features list */}
              <div className="space-y-4 text-left max-w-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">Real-time sentiment analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">AI-powered market insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">Portfolio tracking & alerts</span>
                </div>
              </div>
            </div>
            
            {/* Logo at bottom */}
            <div className="absolute bottom-8 left-8 flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Shield className="w-8 h-8 text-white" />
              <span className="text-xl font-bold">SENTINEL</span>
            </div>
          </div>

          {/* Right Panel - Authentication Form */}
          <div className="flex-1 bg-white dark:bg-slate-900 relative flex flex-col justify-center items-center p-12 min-h-[60vh] md:min-h-full">
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200 z-50"
            >
              <X className="w-5 h-5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" />
            </button>

            {/* Form content */}
            <div className="w-full max-w-sm space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {isSignUp ? 'Join Sentinel' : 'Welcome to Sentinel'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isSignUp ? 'Create your account to get started' : 'Sign in to access your dashboard'}
                </p>
              </div>

              {/* Clerk Authentication Component */}
              <div className="w-full">
                {isSignUp ? (
                  <SignUp 
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "bg-transparent border-0 shadow-none p-0 w-full",
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
                        dividerText: "text-slate-500 dark:text-slate-400 text-sm bg-white dark:bg-slate-900 px-4",
                        footerAction: "hidden"
                      }
                    }}
                    redirectUrl="/dashboard"
                  />
                ) : (
                  <SignIn 
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "bg-transparent border-0 shadow-none p-0 w-full",
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
                        dividerText: "text-slate-500 dark:text-slate-400 text-sm bg-white dark:bg-slate-900 px-4",
                        footerAction: "hidden"
                      }
                    }}
                    redirectUrl="/dashboard"
                  />
                )}
              </div>

              {/* Toggle between Sign In and Sign Up */}
              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[#00C49F] hover:text-[#00B090] font-medium transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              {/* Legal text */}
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                By continuing, you agree to our{' '}
                <a href="#" className="text-[#00C49F] hover:underline">Terms & Conditions</a>,{' '}
                <a href="#" className="text-[#00C49F] hover:underline">Privacy Policy</a>, and{' '}
                <a href="#" className="text-[#00C49F] hover:underline">Terms of Use</a>.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
