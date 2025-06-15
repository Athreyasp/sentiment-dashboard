
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Shield } from 'lucide-react'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [email, setEmail] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 border-0 bg-transparent overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Branding */}
          <div className="flex-1 bg-gradient-to-br from-[#00C49F] via-[#00B090] to-[#009980] dark:from-[#00C49F] dark:via-[#00A085] dark:to-[#008775] relative overflow-hidden flex flex-col justify-center items-center p-12 text-white">
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

          {/* Right Panel - Login Form */}
          <div className="flex-1 bg-white dark:bg-slate-900 relative flex flex-col justify-center items-center p-12">
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" />
            </button>

            {/* Form content */}
            <div className="w-full max-w-sm space-y-6 animate-fade-in">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome to Sentinel
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sign in to access your dashboard
                </p>
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full py-3 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or</span>
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-slate-300 dark:border-slate-600 focus:border-[#00C49F] focus:ring-[#00C49F]"
                  autoFocus
                />
              </div>

              {/* Continue button */}
              <Button className="w-full h-12 bg-[#00C49F] hover:bg-[#00B090] text-white font-semibold">
                Continue
              </Button>

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

        {/* Mobile responsive - stack vertically */}
        <style jsx>{`
          @media (max-width: 768px) {
            .flex {
              flex-direction: column;
            }
            .flex-1:first-child {
              min-height: 40vh;
            }
            .flex-1:last-child {
              min-height: 60vh;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
