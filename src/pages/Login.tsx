
import { SignIn } from '@clerk/clerk-react'
import { LoginHeader } from '@/components/LoginHeader'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-60 h-60 md:w-96 md:h-96 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-60 h-60 md:w-96 md:h-96 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-56 md:h-56 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-pulse ${
              i % 4 === 0 ? 'w-3 h-3 md:w-4 md:h-4 bg-cyan-400' : 
              i % 4 === 1 ? 'w-2 h-2 md:w-3 md:h-3 bg-purple-400' : 
              i % 4 === 2 ? 'w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-blue-400' :
              'w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Main content container */}
      <div className="w-full max-w-sm md:max-w-lg relative z-10 animate-fade-in">
        {/* Login Header */}
        <LoginHeader />

        {/* Enhanced login form container with glass morphism */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl md:rounded-4xl p-2 md:p-3 shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-[1.02] transition-all duration-500 animate-scale-in">
          <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden">
            {/* Subtle animated background with multiple gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-2xl md:rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/5 via-transparent to-pink-500/5 rounded-2xl md:rounded-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            
            {/* Floating elements inside the form */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-4 w-4 h-4 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden w-full hover:shadow-cyan-500/20 transition-all duration-300",
                    headerTitle: "text-slate-800 text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent",
                    headerSubtitle: "text-slate-600 text-sm md:text-base font-medium",
                    socialButtonsBlockButton: "bg-gradient-to-r from-white/95 to-slate-50/95 border border-slate-200/80 hover:from-slate-50 hover:to-white text-slate-700 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-cyan-300/50 text-sm md:text-base py-3 md:py-4 rounded-xl",
                    socialButtonsBlockButtonText: "font-semibold text-sm md:text-base",
                    formButtonPrimary: "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-3 md:py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 text-sm md:text-base rounded-xl",
                    footerActionLink: "text-cyan-600 hover:text-purple-600 font-bold transition-all duration-300 hover:scale-105 text-sm md:text-base underline-offset-4 hover:underline",
                    identityPreviewText: "text-slate-600 text-sm md:text-base font-medium",
                    identityPreviewEditButton: "text-cyan-600 hover:text-purple-600 font-semibold text-sm md:text-base hover:scale-105 transition-all duration-200",
                    formFieldInput: "border-slate-200/80 focus:border-cyan-500 focus:ring-cyan-500/30 focus:ring-2 transition-all duration-300 text-sm md:text-base py-3 md:py-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white/90",
                    formFieldLabel: "text-slate-700 font-semibold text-sm md:text-base",
                    dividerLine: "bg-gradient-to-r from-transparent via-slate-300 to-transparent",
                    dividerText: "text-slate-500 font-medium text-sm md:text-base bg-white/80 px-4",
                    formHeaderTitle: "text-slate-800 font-bold text-lg md:text-xl",
                    formHeaderSubtitle: "text-slate-600 text-sm md:text-base font-medium"
                  }
                }}
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>

        {/* Enhanced bottom section with more visual appeal */}
        <div className="text-center mt-8 md:mt-12 space-y-6 md:space-y-8 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Trust indicators with enhanced styling */}
          <div className="flex items-center justify-center space-x-4 md:space-x-8 text-slate-300 text-xs md:text-sm flex-wrap gap-3 md:gap-0">
            <div className="flex items-center space-x-2 group hover:text-emerald-300 transition-all duration-300 cursor-pointer">
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-400/70"></div>
              <span className="font-semibold group-hover:scale-105 transition-transform duration-200">Bank-Grade Security</span>
            </div>
            <span className="hidden md:inline text-slate-500">•</span>
            <div className="flex items-center space-x-2 group hover:text-cyan-300 transition-all duration-300 cursor-pointer">
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70" style={{ animationDelay: '0.4s' }}></div>
              <span className="font-semibold group-hover:scale-105 transition-transform duration-200">256-bit Encryption</span>
            </div>
            <span className="hidden md:inline text-slate-500">•</span>
            <div className="flex items-center space-x-2 group hover:text-purple-300 transition-all duration-300 cursor-pointer">
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50 group-hover:shadow-purple-400/70" style={{ animationDelay: '0.8s' }}></div>
              <span className="font-semibold group-hover:scale-105 transition-transform duration-200">AI-Powered Insights</span>
            </div>
          </div>

          {/* Enhanced testimonial section */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <p className="text-slate-200 text-sm md:text-base font-medium mb-4 leading-relaxed">
              "Sentinel has transformed how I analyze market sentiment. The AI insights are incredibly accurate and have improved my trading decisions significantly."
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JM
              </div>
              <div className="text-left">
                <div className="text-slate-200 font-semibold text-sm">James Miller</div>
                <div className="text-slate-400 text-xs">Senior Portfolio Manager</div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8">
            <div className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">10K+</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-300 transition-colors duration-200">Active Traders</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">99.9%</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-300 transition-colors duration-200">Uptime</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-1">24/7</div>
              <div className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-300 transition-colors duration-200">Market Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
