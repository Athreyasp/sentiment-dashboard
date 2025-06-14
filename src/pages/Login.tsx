
import { SignIn } from '@clerk/clerk-react'
import { LoginHeader } from '@/components/LoginHeader'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              i % 3 === 0 ? 'w-3 h-3 bg-cyan-400' : 
              i % 3 === 1 ? 'w-2 h-2 bg-purple-400' : 
              'w-1 h-1 bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Login Header */}
        <LoginHeader />

        {/* Enhanced login form container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-2 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="bg-gradient-to-b from-white/5 to-white/10 rounded-2xl p-8 relative overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden",
                    headerTitle: "text-slate-800 text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent",
                    headerSubtitle: "text-slate-600",
                    socialButtonsBlockButton: "bg-white/90 border border-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white text-slate-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-slate-300",
                    socialButtonsBlockButtonText: "font-medium",
                    formButtonPrimary: "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg",
                    footerActionLink: "text-cyan-600 hover:text-purple-600 font-semibold transition-colors duration-200",
                    identityPreviewText: "text-slate-600",
                    identityPreviewEditButton: "text-cyan-600 hover:text-purple-600",
                    formFieldInput: "border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200",
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
        </div>

        {/* Enhanced bottom CTA */}
        <div className="text-center mt-10 space-y-6">
          <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="font-medium">Secure</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.3s' }}></div>
              <span className="font-medium">Encrypted</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.6s' }}></div>
              <span className="font-medium">AI-Powered</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Trusted by thousands of traders worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
