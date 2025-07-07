
import { useState, useEffect } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Apple, Facebook, Google, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModernAuthLayoutProps {
  defaultTab?: 'login' | 'signup'
}

export function ModernAuthLayout({ defaultTab = 'login' }: ModernAuthLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className={cn(
            "transform transition-all duration-1000 ease-out",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            {/* Illustration placeholder - can be replaced with actual image */}
            <div className="mb-8 relative">
              <div className="w-80 h-64 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30 shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-sm opacity-90">Happy Users</p>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Welcome to Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Next Big Experience
              </span>
            </h1>
            
            <p className="text-xl opacity-90 mb-8 max-w-md leading-relaxed">
              Join thousands of users who have already transformed their workflow with our innovative platform.
            </p>

            <div className="flex items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>10k+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={cn(
          "w-full max-w-md transform transition-all duration-700 ease-out",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        )}>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'login' ? 'Welcome Back!' : 'Get Started'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'login' 
                ? 'Sign in to access your account' 
                : 'Create your account in seconds'
              }
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-300",
                activeTab === 'login'
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-300",
                activeTab === 'signup'
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Auth Forms Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <Google className="w-5 h-5 mr-3 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
              
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                  <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                  <Apple className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Clerk Auth Components with Custom Styling */}
            <div className="space-y-1">
              {activeTab === 'login' ? (
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent border-0 shadow-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "hidden",
                      socialButtonsProviderIcon: "hidden",
                      dividerRow: "hidden",
                      formButtonPrimary: `
                        w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                        text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-0.5 text-base
                      `,
                      formFieldInput: `
                        w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 
                        focus:border-transparent transition-all duration-200 text-gray-900 bg-gray-50 focus:bg-white
                      `,
                      formFieldLabel: "text-gray-700 font-medium text-sm mb-2 block",
                      footerActionLink: "text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline transition-colors",
                      identityPreviewText: "text-gray-600 text-sm",
                      identityPreviewEditButton: "text-purple-600 hover:text-purple-700 font-medium text-sm",
                      formHeaderTitle: "text-2xl font-bold text-gray-900 mb-2",
                      formHeaderSubtitle: "text-gray-600 mb-6"
                    }
                  }}
                  redirectUrl="/dashboard"
                />
              ) : (
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent border-0 shadow-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "hidden",
                      socialButtonsProviderIcon: "hidden",
                      dividerRow: "hidden",
                      formButtonPrimary: `
                        w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                        text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-0.5 text-base
                      `,
                      formFieldInput: `
                        w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 
                        focus:border-transparent transition-all duration-200 text-gray-900 bg-gray-50 focus:bg-white
                      `,
                      formFieldLabel: "text-gray-700 font-medium text-sm mb-2 block",
                      footerActionLink: "text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline transition-colors",
                      identityPreviewText: "text-gray-600 text-sm",
                      identityPreviewEditButton: "text-purple-600 hover:text-purple-700 font-medium text-sm",
                      formHeaderTitle: "text-2xl font-bold text-gray-900 mb-2",
                      formHeaderSubtitle: "text-gray-600 mb-6"
                    }
                  }}
                  redirectUrl="/dashboard"
                />
              )}
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-3">
              {activeTab === 'login' && (
                <p className="text-sm text-gray-600">
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
                    Forgot your password?
                  </a>
                </p>
              )}
              
              <p className="text-sm text-gray-600">
                {activeTab === 'login' ? (
                  <>
                    New here?{' '}
                    <button 
                      onClick={() => setActiveTab('signup')}
                      className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                    >
                      Sign up in seconds
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button 
                      onClick={() => setActiveTab('login')}
                      className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                    >
                      Sign in here
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
        <h1 className="text-white text-xl font-bold text-center px-4">
          Welcome to Your Next Big Experience
        </h1>
      </div>
    </div>
  )
}
