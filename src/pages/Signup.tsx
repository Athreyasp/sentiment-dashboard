
import { SignUp } from '@clerk/clerk-react'

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
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
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-100 to-pink-200 bg-clip-text text-transparent mb-2">
              Join Sentinel 2.0
            </h1>
            <p className="text-slate-300 text-lg">
              Start your <span className="text-indigo-400 font-semibold">market analysis</span> journey today
            </p>
          </div>
          
          {/* Benefits showcase */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-indigo-400 text-2xl mb-1">🚀</div>
              <div className="text-white text-sm font-medium">Lightning Fast</div>
              <div className="text-slate-400 text-xs">Real-time analysis</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-purple-400 text-2xl mb-1">🔒</div>
              <div className="text-white text-sm font-medium">Secure</div>
              <div className="text-slate-400 text-xs">Bank-grade security</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-pink-400 text-2xl mb-1">📊</div>
              <div className="text-white text-sm font-medium">Advanced Analytics</div>
              <div className="text-slate-400 text-xs">AI-powered insights</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-yellow-400 text-2xl mb-1">💡</div>
              <div className="text-white text-sm font-medium">Smart Alerts</div>
              <div className="text-slate-400 text-xs">Never miss opportunities</div>
            </div>
          </div>
        </div>

        {/* Signup form container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-1 shadow-2xl">
          <div className="bg-gradient-to-b from-white/5 to-white/10 rounded-xl p-6">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl",
                  headerTitle: "text-slate-800 text-2xl font-bold",
                  headerSubtitle: "text-slate-600",
                  socialButtonsBlockButton: "bg-white/90 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg",
                  socialButtonsBlockButtonText: "font-medium",
                  formButtonPrimary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg",
                  footerActionLink: "text-indigo-600 hover:text-purple-600 font-semibold transition-colors duration-200",
                  identityPreviewText: "text-slate-600",
                  identityPreviewEditButton: "text-indigo-600 hover:text-purple-600",
                  formFieldInput: "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200",
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

        {/* Bottom testimonial */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            "The best trading platform I've ever used" - <span className="text-indigo-400">Sarah M.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
