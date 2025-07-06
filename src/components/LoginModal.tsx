
import { useState } from 'react'
import { X, Shield, TrendingUp, Brain, Activity } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { ModernSentinelLogo } from '@/components/ModernSentinelLogo'

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
          <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col justify-center items-center p-12 text-white min-h-[40vh] md:min-h-full">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pixel-green/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pixel-cyan/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgb(0,255,127)' fill-opacity='0.05'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <ModernSentinelLogo 
                size="lg" 
                variant="default" 
                showText={true}
                className="mb-8"
              />
              
              <h1 className="text-4xl lg:text-5xl font-bold font-pixel mb-6 animate-fade-in bg-gradient-to-r from-white via-pixel-green to-pixel-cyan bg-clip-text text-transparent">
                NEXT-GEN TRADING
              </h1>
              <p className="text-xl opacity-90 mb-12 max-w-md animate-fade-in font-space" style={{ animationDelay: '0.2s' }}>
                AI-powered insights backed by real-time market analysis for smarter investment decisions.
              </p>
              
              {/* Features list */}
              <div className="space-y-4 text-left max-w-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pixel-green rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90 font-space">Real-time sentiment analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pixel-cyan rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90 font-space">AI-powered market insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pixel-purple rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-90 font-space">Portfolio tracking & alerts</span>
                </div>
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="absolute bottom-8 left-8 flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-pixel-green animate-pulse" />
                <span className="text-sm font-pixel">LIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-pixel-cyan animate-pulse" />
                <span className="text-sm font-pixel">AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-pixel-purple animate-pulse" />
                <span className="text-sm font-pixel">SECURE</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Authentication Form */}
          <div className="flex-1 pixel-card relative flex flex-col justify-center items-center p-12 min-h-[60vh] md:min-h-full border-l border-pixel-green/30">
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-800/50 rounded-full transition-colors duration-200 z-50 border border-pixel-green/30"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-white" />
            </button>

            {/* Form content */}
            <div className="w-full max-w-sm space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold font-pixel text-white mb-2">
                  {isSignUp ? 'CREATE ACCOUNT' : 'SYSTEM ACCESS'}
                </h2>
                <p className="text-sm text-slate-400 font-space">
                  {isSignUp ? 'Join the next generation of traders' : 'Enter your credentials to continue'}
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
                          w-full bg-slate-800/50 border border-pixel-green/30 
                          hover:bg-slate-700/50 hover:border-pixel-green/50 text-white 
                          font-medium transition-all duration-200 py-3 rounded-lg mb-3 font-space
                        `,
                        socialButtonsBlockButtonText: "font-medium text-sm",
                        formButtonPrimary: `
                          w-full bg-gradient-to-r from-pixel-green to-pixel-cyan hover:from-pixel-green/80 hover:to-pixel-cyan/80 
                          text-black font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg 
                          font-pixel text-sm uppercase tracking-wide
                        `,
                        footerActionLink: `
                          text-pixel-green hover:text-pixel-cyan font-medium transition-colors 
                          duration-200 text-sm underline-offset-4 hover:underline font-space
                        `,
                        formFieldInput: `
                          w-full border border-slate-600 bg-slate-800/50 text-white 
                          focus:border-pixel-green focus:ring-1 focus:ring-pixel-green/50
                          rounded-lg py-3 px-4 transition-all duration-200 font-space
                        `,
                        formFieldLabel: "text-slate-300 font-medium text-sm mb-2 font-space",
                        dividerLine: "bg-slate-600",
                        dividerText: "text-slate-400 text-sm bg-slate-900 px-4 font-space",
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
                          w-full bg-slate-800/50 border border-pixel-green/30 
                          hover:bg-slate-700/50 hover:border-pixel-green/50 text-white 
                          font-medium transition-all duration-200 py-3 rounded-lg mb-3 font-space
                        `,
                        socialButtonsBlockButtonText: "font-medium text-sm",
                        formButtonPrimary: `
                          w-full bg-gradient-to-r from-pixel-green to-pixel-cyan hover:from-pixel-green/80 hover:to-pixel-cyan/80 
                          text-black font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg 
                          font-pixel text-sm uppercase tracking-wide
                        `,
                        footerActionLink: `
                          text-pixel-green hover:text-pixel-cyan font-medium transition-colors 
                          duration-200 text-sm underline-offset-4 hover:underline font-space
                        `,
                        formFieldInput: `
                          w-full border border-slate-600 bg-slate-800/50 text-white 
                          focus:border-pixel-green focus:ring-1 focus:ring-pixel-green/50
                          rounded-lg py-3 px-4 transition-all duration-200 font-space
                        `,
                        formFieldLabel: "text-slate-300 font-medium text-sm mb-2 font-space",
                        dividerLine: "bg-slate-600",
                        dividerText: "text-slate-400 text-sm bg-slate-900 px-4 font-space",
                        footerAction: "hidden"
                      }
                    }}
                    redirectUrl="/dashboard"
                  />
                )}
              </div>

              {/* Toggle between Sign In and Sign Up */}
              <div className="text-center">
                <p className="text-sm text-slate-400 font-space">
                  {isSignUp ? 'Already have access?' : "Need access credentials?"}{' '}
                  <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-pixel-green hover:text-pixel-cyan font-medium transition-colors duration-200 underline-offset-4 hover:underline font-pixel"
                  >
                    {isSignUp ? 'SIGN IN' : 'CREATE ACCOUNT'}
                  </button>
                </p>
              </div>

              {/* Legal text */}
              <p className="text-xs text-slate-500 text-center leading-relaxed font-space">
                By continuing, you agree to our{' '}
                <a href="#" className="text-pixel-green hover:underline">Terms & Conditions</a>,{' '}
                <a href="#" className="text-pixel-green hover:underline">Privacy Policy</a>, and{' '}
                <a href="#" className="text-pixel-green hover:underline">Terms of Use</a>.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
