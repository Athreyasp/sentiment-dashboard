
import { SignIn } from '@clerk/clerk-react'
import { LoginHeader } from '@/components/LoginHeader'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-20 left-20 md:top-40 md:left-40 w-30 h-30 md:w-60 md:h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-10 right-10 md:top-20 md:right-20 w-20 h-20 md:w-40 md:h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-10 animate-pulse ${
              i % 3 === 0 ? 'w-2 h-2 md:w-3 md:h-3 bg-cyan-400' : 
              i % 3 === 1 ? 'w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400' : 
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

      <div className="w-full max-w-sm md:max-w-lg relative z-10">
        {/* Login Header */}
        <LoginHeader />

        {/* Enhanced login form container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-1.5 md:p-2 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="bg-gradient-to-b from-white/5 to-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-xl md:rounded-2xl"></div>
            
            <div className="relative z-10">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden w-full",
                    headerTitle: "text-slate-800 text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent",
                    headerSubtitle: "text-slate-600 text-sm md:text-base",
                    socialButtonsBlockButton: "bg-white/90 border border-slate-200 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white text-slate-700 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-slate-300 text-sm md:text-base py-2 md:py-3",
                    socialButtonsBlockButtonText: "font-medium text-sm md:text-base",
                    formButtonPrimary: "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 md:py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm md:text-base",
                    footerActionLink: "text-cyan-600 hover:text-purple-600 font-semibold transition-colors duration-200 text-sm md:text-base",
                    identityPreviewText: "text-slate-600 text-sm md:text-base",
                    identityPreviewEditButton: "text-cyan-600 hover:text-purple-600 text-sm md:text-base",
                    formFieldInput: "border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-200 text-sm md:text-base py-2 md:py-3",
                    formFieldLabel: "text-slate-700 font-medium text-sm md:text-base",
                    dividerLine: "bg-slate-200",
                    dividerText: "text-slate-500 text-sm md:text-base",
                    formHeaderTitle: "text-slate-800 font-bold text-lg md:text-xl",
                    formHeaderSubtitle: "text-slate-600 text-sm md:text-base"
                  }
                }}
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>

        {/* Enhanced bottom CTA */}
        <div className="text-center mt-6 md:mt-10 space-y-4 md:space-y-6 px-4">
          <div className="flex items-center justify-center space-x-3 md:space-x-6 text-slate-400 text-xs md:text-sm flex-wrap gap-2 md:gap-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="font-medium">Secure</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: '0.3s' }}></div>
              <span className="font-medium">Encrypted</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.6s' }}></div>
              <span className="font-medium">AI-Powered</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs md:text-sm font-medium">
            Trusted by thousands of traders worldwide
          </p>
        </div>
      </div>
    </div>
  )
}
