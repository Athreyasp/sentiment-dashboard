
import { SignIn } from '@clerk/clerk-react'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Hero section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-300 text-lg">
              Access your <span className="text-blue-400 font-semibold">Sentinel 2.0</span> dashboard
            </p>
          </div>
        </div>

        {/* Login form container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-1 shadow-2xl">
          <div className="bg-gradient-to-b from-white/5 to-white/10 rounded-xl p-6">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl",
                  headerTitle: "text-slate-800 text-2xl font-bold",
                  headerSubtitle: "text-slate-600",
                  socialButtonsBlockButton: "bg-white/90 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg",
                  socialButtonsBlockButtonText: "font-medium",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg",
                  footerActionLink: "text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200",
                  identityPreviewText: "text-slate-600",
                  identityPreviewEditButton: "text-blue-600 hover:text-purple-600",
                  formFieldInput: "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200",
                  formFieldLabel: "text-slate-700 font-medium",
                  dividerLine: "bg-slate-200",
                  dividerText: "text-slate-500",
                  formHeaderTitle: "text-slate-800 font-bold",
                  formHeaderSubtitle: "text-slate-600"
                }
              }}
              redirectUrl="/dashboard"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            Trusted by thousands of traders worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
