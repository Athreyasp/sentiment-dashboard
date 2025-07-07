
import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

export default function ModernToggleAuth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-2xl"></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Header with toggle buttons */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to Sentinel
            </h1>
          </div>
          <p className="text-slate-600 text-lg mb-8">Your journey to better trading starts here</p>
          
          {/* Toggle buttons */}
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/50">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form container with sliding animation */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="flex lg:min-h-[600px]">
            {/* Left side - Welcome content for desktop, hidden on mobile when signup */}
            <div className={`lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden transition-all duration-500 ${!isLogin && 'hidden lg:flex'}`}>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    {isLogin ? <Lock className="w-8 h-8" /> : <User className="w-8 h-8" />}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {isLogin ? 'Welcome Back!' : 'Join Our Community'}
                  </h2>
                  <p className="text-lg text-purple-100 mb-8">
                    {isLogin 
                      ? 'Sign in to access your personalized trading dashboard and continue your investment journey.'
                      : 'Create your account and start your journey to smarter investing with our AI-powered platform.'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">Real-time market insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">AI-powered analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-purple-100">Secure & trusted platform</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/10 rounded-full"></div>
            </div>

            {/* Right side - Forms */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Mobile header - only visible on mobile */}
                <div className="lg:hidden text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-600">
                    {isLogin ? 'Sign in to your account' : 'Join thousands of smart investors'}
                  </p>
                </div>

                {/* Form container with slide animation */}
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${isLogin ? '0%' : '-100%'})` }}
                  >
                    {/* Login Form */}
                    <div className="w-full flex-shrink-0">
                      <div className="hidden lg:block mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Sign In</h3>
                        <p className="text-slate-600">Access your account</p>
                      </div>
                      
                      <SignIn 
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "bg-transparent border-0 shadow-none p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: `
                              w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 
                              text-slate-700 font-medium transition-all duration-200 py-4 
                              rounded-xl mb-4 shadow-sm hover:shadow-md
                            `,
                            socialButtonsBlockButtonText: "font-medium text-sm",
                            formButtonPrimary: `
                              w-full bg-gradient-to-r from-purple-600 to-blue-600 
                              hover:from-purple-700 hover:to-blue-700 text-white 
                              font-semibold py-4 rounded-xl transition-all duration-200 
                              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                            `,
                            footerActionLink: `
                              text-purple-600 hover:text-purple-700 font-medium 
                              transition-colors duration-200 text-sm
                            `,
                            formFieldInput: `
                              w-full border border-slate-200 bg-slate-50 text-slate-800 
                              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                              rounded-xl py-4 px-4 transition-all duration-200
                            `,
                            formFieldLabel: "text-slate-700 font-medium text-sm mb-2",
                            dividerLine: "bg-slate-200",
                            dividerText: "text-slate-500 text-sm bg-white px-4",
                          }
                        }}
                        redirectUrl="/dashboard"
                      />
                      
                      <div className="mt-6 text-center">
                        <p className="text-slate-600 text-sm">
                          New to Sentinel?{' '}
                          <button 
                            onClick={() => setIsLogin(false)}
                            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                          >
                            Create an account
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Signup Form */}
                    <div className="w-full flex-shrink-0">
                      <div className="hidden lg:block mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h3>
                        <p className="text-slate-600">Start your investment journey</p>
                      </div>
                      
                      <SignUp 
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "bg-transparent border-0 shadow-none p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: `
                              w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 
                              text-slate-700 font-medium transition-all duration-200 py-4 
                              rounded-xl mb-4 shadow-sm hover:shadow-md
                            `,
                            socialButtonsBlockButtonText: "font-medium text-sm",
                            formButtonPrimary: `
                              w-full bg-gradient-to-r from-purple-600 to-blue-600 
                              hover:from-purple-700 hover:to-blue-700 text-white 
                              font-semibold py-4 rounded-xl transition-all duration-200 
                              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                            `,
                            footerActionLink: `
                              text-purple-600 hover:text-purple-700 font-medium 
                              transition-colors duration-200 text-sm
                            `,
                            formFieldInput: `
                              w-full border border-slate-200 bg-slate-50 text-slate-800 
                              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                              rounded-xl py-4 px-4 transition-all duration-200
                            `,
                            formFieldLabel: "text-slate-700 font-medium text-sm mb-2",
                            dividerLine: "bg-slate-200",
                            dividerText: "text-slate-500 text-sm bg-white px-4",
                          }
                        }}
                        redirectUrl="/dashboard"
                      />
                      
                      <div className="mt-6 text-center">
                        <p className="text-slate-600 text-sm">
                          Already have an account?{' '}
                          <button 
                            onClick={() => setIsLogin(true)}
                            className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
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

          {/* Bottom decorative bar */}
          <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex justify-center items-center space-x-8 text-slate-500 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Bank-grade security</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Real-time data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>AI-powered insights</span>
          </div>
        </div>
      </div>
    </div>
  )
}
