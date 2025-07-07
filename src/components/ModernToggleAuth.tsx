
import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Sparkles, ArrowRight, Shield, TrendingUp, Users } from 'lucide-react'

interface ModernToggleAuthProps {
  defaultView?: 'login' | 'signup'
}

export default function ModernToggleAuth({ defaultView = 'login' }: ModernToggleAuthProps) {
  const [isLogin, setIsLogin] = useState(defaultView === 'login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 font-sans">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sentinel
            </h1>
          </div>
          <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
            Join thousands of smart investors using AI-powered trading insights
          </p>
          
          {/* Toggle buttons */}
          <div className="inline-flex bg-white/70 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl border border-white/60">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-white/50'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Main content container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="flex min-h-[600px]">
            {/* Left side - Info panel (hidden on mobile when showing signup) */}
            <div className={`lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden transition-all duration-500 ${!isLogin && 'hidden lg:flex'}`}>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    {isLogin ? <Shield className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
                  </h2>
                  <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                    {isLogin 
                      ? 'Access your personalized dashboard and continue making smarter investment decisions with AI insights.'
                      : 'Join our community of successful traders and unlock the power of AI-driven market analysis.'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">Real-time market data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">AI-powered predictions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">Portfolio optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">Risk assessment tools</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-300" />
                    <span className="font-semibold text-sm">SUCCESS RATE</span>
                  </div>
                  <div className="text-2xl font-bold">94.7%</div>
                  <div className="text-xs text-purple-200">Average portfolio growth</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-24 h-24 bg-white/5 rounded-full"></div>
            </div>

            {/* Right side - Forms */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-50/50 to-white/50">
              <div className="max-w-md mx-auto w-full">
                {/* Mobile header */}
                <div className="lg:hidden text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-slate-600">
                    {isLogin ? 'Welcome back to Sentinel' : 'Start your investment journey'}
                  </p>
                </div>

                {/* Form container with sliding animation */}
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-all duration-500 ease-in-out"
                    style={{ transform: `translateX(${isLogin ? '0%' : '-100%'})` }}
                  >
                    {/* Login Form */}
                    <div className="w-full flex-shrink-0 space-y-6">
                      <div className="hidden lg:block mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Sign In</h3>
                        <p className="text-slate-600">Welcome back to your dashboard</p>
                      </div>
                      
                      <SignIn 
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "bg-transparent border-0 shadow-none p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: `
                              w-full bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 
                              hover:border-purple-300 hover:shadow-lg text-slate-700 font-semibold 
                              transition-all duration-300 py-4 rounded-2xl mb-4 shadow-sm
                            `,
                            socialButtonsBlockButtonText: "font-semibold text-sm",
                            formButtonPrimary: `
                              w-full bg-gradient-to-r from-purple-600 to-blue-600 
                              hover:from-purple-700 hover:to-blue-700 text-white 
                              font-bold py-4 rounded-2xl transition-all duration-300 
                              shadow-xl hover:shadow-2xl transform hover:-translate-y-1
                            `,
                            footerActionLink: `
                              text-purple-600 hover:text-purple-700 font-semibold 
                              transition-colors duration-200 text-sm
                            `,
                            formFieldInput: `
                              w-full border-2 border-slate-200 bg-white/80 text-slate-800 
                              focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20
                              rounded-2xl py-4 px-4 transition-all duration-300 font-medium
                            `,
                            formFieldLabel: "text-slate-700 font-semibold text-sm mb-2",
                            dividerLine: "bg-slate-200",
                            dividerText: "text-slate-500 text-sm bg-white px-4 font-medium",
                          }
                        }}
                        redirectUrl="/dashboard"
                      />
                      
                      <div className="mt-6 text-center">
                        <p className="text-slate-600 text-sm">
                          New to Sentinel?{' '}
                          <button 
                            onClick={() => setIsLogin(false)}
                            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 hover:underline"
                          >
                            Create account
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Signup Form */}
                    <div className="w-full flex-shrink-0 space-y-6">
                      <div className="hidden lg:block mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h3>
                        <p className="text-slate-600">Join thousands of successful traders</p>
                      </div>
                      
                      <SignUp 
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "bg-transparent border-0 shadow-none p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: `
                              w-full bg-gradient-to-r from-slate-50 to-white border-2 border-slate-200 
                              hover:border-purple-300 hover:shadow-lg text-slate-700 font-semibold 
                              transition-all duration-300 py-4 rounded-2xl mb-4 shadow-sm
                            `,
                            socialButtonsBlockButtonText: "font-semibold text-sm",
                            formButtonPrimary: `
                              w-full bg-gradient-to-r from-purple-600 to-blue-600 
                              hover:from-purple-700 hover:to-blue-700 text-white 
                              font-bold py-4 rounded-2xl transition-all duration-300 
                              shadow-xl hover:shadow-2xl transform hover:-translate-y-1
                            `,
                            footerActionLink: `
                              text-purple-600 hover:text-purple-700 font-semibold 
                              transition-colors duration-200 text-sm
                            `,
                            formFieldInput: `
                              w-full border-2 border-slate-200 bg-white/80 text-slate-800 
                              focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20
                              rounded-2xl py-4 px-4 transition-all duration-300 font-medium
                            `,
                            formFieldLabel: "text-slate-700 font-semibold text-sm mb-2",
                            dividerLine: "bg-slate-200",
                            dividerText: "text-slate-500 text-sm bg-white px-4 font-medium",
                          }
                        }}
                        redirectUrl="/dashboard"
                      />
                      
                      <div className="mt-6 text-center">
                        <p className="text-slate-600 text-sm">
                          Already have an account?{' '}
                          <button 
                            onClick={() => setIsLogin(true)}
                            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 hover:underline"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex justify-center items-center space-x-8 text-slate-500 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">256-bit encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span className="font-medium">Real-time data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span className="font-medium">GDPR compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
