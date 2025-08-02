import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { OfficialSentinelLogo } from '@/components/OfficialSentinelLogo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, Zap, Brain, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-auto">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-400">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgb(34,197,94)' fill-opacity='0.1'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <OfficialSentinelLogo size="xl" showText={true} className="justify-center mb-6" />
              </div>
              
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
                AI-Powered Financial Intelligence
              </h1>
              
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                Transform market noise into actionable insights with advanced sentiment analysis and real-time market intelligence.
              </p>
              
              {/* Features */}
              <div className="space-y-6 text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Real-Time Data</h3>
                    <p className="text-sm text-slate-400">Live market sentiment tracking</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Analysis</h3>
                    <p className="text-sm text-slate-400">Advanced ML-powered insights</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Secure Platform</h3>
                    <p className="text-sm text-slate-400">Enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom indicators */}
            <div className="absolute bottom-8 left-8 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">NSE Live Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-slate-400">AI Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 lg:bg-slate-900/50 lg:backdrop-blur-sm">
          <div className="w-full max-w-sm mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <OfficialSentinelLogo size="lg" showText={true} className="justify-center mb-4" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome to Sentinel
              </h1>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-white">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 lg:text-slate-300">
                {isSignUp 
                  ? 'Join thousands of traders using AI-powered insights' 
                  : 'Access your financial intelligence dashboard'
                }
              </p>
            </div>

            {/* Clerk Auth Components */}
            <div className="space-y-6">
              {isSignUp ? (
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent border-0 shadow-none p-0 w-full",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: `
                        w-full bg-white dark:bg-slate-700 lg:bg-slate-800/50 border-2 border-slate-200 
                        dark:border-slate-600 lg:border-slate-600 hover:border-emerald-400 
                        dark:hover:border-emerald-400 lg:hover:border-emerald-400 text-slate-900 
                        dark:text-white lg:text-white font-medium transition-all duration-200 py-3 
                        rounded-lg mb-3 hover:shadow-lg
                      `,
                      socialButtonsBlockButtonText: "font-medium text-sm",
                      formButtonPrimary: `
                        w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 
                        hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 
                        shadow-lg hover:shadow-xl hover:scale-[1.02] font-semibold
                      `,
                      footerActionLink: `
                        text-emerald-600 hover:text-emerald-500 font-medium transition-colors 
                        duration-200 text-sm underline-offset-4 hover:underline
                      `,
                      formFieldInput: `
                        w-full border-2 border-slate-200 dark:border-slate-600 lg:border-slate-600 
                        bg-white dark:bg-slate-700 lg:bg-slate-800/50 text-slate-900 dark:text-white 
                        lg:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                        rounded-lg py-3 px-4 transition-all duration-200
                      `,
                      formFieldLabel: "text-slate-700 dark:text-slate-300 lg:text-slate-200 font-medium text-sm mb-2",
                      dividerLine: "bg-slate-300 dark:bg-slate-600 lg:bg-slate-600",
                      dividerText: "text-slate-500 dark:text-slate-400 lg:text-slate-400 text-sm bg-white dark:bg-slate-800 lg:bg-slate-900 px-4",
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
                        w-full bg-white dark:bg-slate-700 lg:bg-slate-800/50 border-2 border-slate-200 
                        dark:border-slate-600 lg:border-slate-600 hover:border-emerald-400 
                        dark:hover:border-emerald-400 lg:hover:border-emerald-400 text-slate-900 
                        dark:text-white lg:text-white font-medium transition-all duration-200 py-3 
                        rounded-lg mb-3 hover:shadow-lg
                      `,
                      socialButtonsBlockButtonText: "font-medium text-sm",
                      formButtonPrimary: `
                        w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 
                        hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 
                        shadow-lg hover:shadow-xl hover:scale-[1.02] font-semibold
                      `,
                      footerActionLink: `
                        text-emerald-600 hover:text-emerald-500 font-medium transition-colors 
                        duration-200 text-sm underline-offset-4 hover:underline
                      `,
                      formFieldInput: `
                        w-full border-2 border-slate-200 dark:border-slate-600 lg:border-slate-600 
                        bg-white dark:bg-slate-700 lg:bg-slate-800/50 text-slate-900 dark:text-white 
                        lg:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                        rounded-lg py-3 px-4 transition-all duration-200
                      `,
                      formFieldLabel: "text-slate-700 dark:text-slate-300 lg:text-slate-200 font-medium text-sm mb-2",
                      dividerLine: "bg-slate-300 dark:bg-slate-600 lg:bg-slate-600",
                      dividerText: "text-slate-500 dark:text-slate-400 lg:text-slate-400 text-sm bg-white dark:bg-slate-800 lg:bg-slate-900 px-4",
                      footerAction: "hidden"
                    }
                  }}
                  redirectUrl="/dashboard"
                />
              )}
            </div>

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 lg:text-slate-300">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Button 
                  variant="link" 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-emerald-600 hover:text-emerald-500 font-semibold p-0 h-auto"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 lg:text-slate-400 leading-relaxed">
                By continuing, you agree to our{' '}
                <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}