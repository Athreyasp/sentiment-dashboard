
import { SignUp } from '@clerk/clerk-react'
import { Shield, TrendingUp, Brain, Activity, Target, Zap } from 'lucide-react'
import { ModernSentinelLogo } from '@/components/ModernSentinelLogo'

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Animated background elements - lower z-index */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pixel-green/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pixel-cyan/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pixel-purple/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pixel-orange/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Grid pattern overlay - lower z-index */}
      <div 
        className="absolute inset-0 opacity-30 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgb(0,255,127)' fill-opacity='0.03'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating elements - lower z-index */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pixel-green rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-20 my-8 max-h-screen overflow-y-auto">
        {/* Hero section */}
        <div className="text-center mb-8 animate-fade-in">
          <ModernSentinelLogo 
            size="lg" 
            variant="hero" 
            showText={true}
            className="mb-6"
          />
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold font-pixel bg-gradient-to-r from-white via-pixel-green to-pixel-cyan bg-clip-text text-transparent mb-3">
              JOIN SENTINEL 2.0
            </h1>
            <p className="text-slate-300 text-lg font-space">
              Start your <span className="text-pixel-green font-bold">AI-powered trading</span> journey
            </p>
            <div className="flex items-center justify-center space-x-3 mt-4">
              <div className="w-2 h-2 bg-pixel-green rounded-full animate-pulse shadow-lg shadow-pixel-green/50"></div>
              <span className="text-sm text-slate-400 font-pixel font-semibold">NEXT-GEN MARKET INTELLIGENCE</span>
              <div className="w-2 h-2 bg-pixel-cyan rounded-full animate-pulse shadow-lg shadow-pixel-cyan/50" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Benefits showcase */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="pixel-card p-4 border border-pixel-green/30 rounded-xl">
              <TrendingUp className="w-8 h-8 text-pixel-green mx-auto mb-2" />
              <div className="text-white text-sm font-pixel font-bold">REAL-TIME</div>
              <div className="text-slate-400 text-xs font-space">Live market data</div>
            </div>
            <div className="pixel-card p-4 border border-pixel-cyan/30 rounded-xl">
              <Shield className="w-8 h-8 text-pixel-cyan mx-auto mb-2" />
              <div className="text-white text-sm font-pixel font-bold">SECURE</div>
              <div className="text-slate-400 text-xs font-space">Bank-grade security</div>
            </div>
            <div className="pixel-card p-4 border border-pixel-purple/30 rounded-xl">
              <Brain className="w-8 h-8 text-pixel-purple mx-auto mb-2" />
              <div className="text-white text-sm font-pixel font-bold">AI-POWERED</div>
              <div className="text-slate-400 text-xs font-space">Smart insights</div>
            </div>
            <div className="pixel-card p-4 border border-pixel-orange/30 rounded-xl">
              <Target className="w-8 h-8 text-pixel-orange mx-auto mb-2" />
              <div className="text-white text-sm font-pixel font-bold">PRECISION</div>
              <div className="text-slate-400 text-xs font-space">Accurate predictions</div>
            </div>
          </div>
        </div>

        {/* Signup form container */}
        <div className="pixel-card rounded-lg shadow-2xl p-8 border border-pixel-green/30 relative z-30">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold font-pixel text-white mb-2">
              CREATE ACCOUNT
            </h2>
            <p className="text-sm text-slate-400 font-space">
              Get instant access to advanced market intelligence
            </p>
          </div>

          <div className="relative z-40">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full relative z-50",
                  card: "bg-transparent border-0 shadow-none p-0 relative z-50",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: `
                    w-full bg-slate-800/50 border border-pixel-green/30 
                    hover:bg-slate-700/50 hover:border-pixel-green/50 text-white 
                    font-medium transition-all duration-200 py-3 rounded-lg mb-3 font-space
                    relative z-50
                  `,
                  socialButtonsBlockButtonText: "font-medium text-sm",
                  formButtonPrimary: `
                    w-full bg-gradient-to-r from-pixel-green to-pixel-cyan hover:from-pixel-green/80 hover:to-pixel-cyan/80 
                    text-black font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg 
                    font-pixel text-sm uppercase tracking-wide relative z-50
                  `,
                  footerActionLink: `
                    text-pixel-green hover:text-pixel-cyan font-medium transition-colors 
                    duration-200 text-sm underline-offset-4 hover:underline font-space relative z-50
                  `,
                  formFieldInput: `
                    w-full border border-slate-600 bg-slate-800/50 text-white 
                    focus:border-pixel-green focus:ring-1 focus:ring-pixel-green/50
                    rounded-lg py-3 px-4 transition-all duration-200 font-space relative z-50
                  `,
                  formFieldLabel: "text-slate-300 font-medium text-sm mb-2 font-space relative z-50",
                  dividerLine: "bg-slate-600 relative z-50",
                  dividerText: "text-slate-400 text-sm bg-slate-900 px-4 font-space relative z-50",
                  identityPreviewText: "text-slate-300 text-sm font-space relative z-50",
                  identityPreviewEditButton: "text-pixel-green hover:text-pixel-cyan font-medium text-sm font-space relative z-50",
                  formHeaderTitle: "text-white font-bold text-lg font-pixel relative z-50",
                  formHeaderSubtitle: "text-slate-400 text-sm font-space relative z-50",
                  phoneInputBox: "relative z-50",
                  selectButton: "relative z-50 bg-slate-800/50 border border-slate-600",
                  selectSearchInput: "relative z-50 bg-slate-800/50 text-white",
                  selectOption: "relative z-50 bg-slate-800 text-white hover:bg-slate-700"
                }
              }}
              redirectUrl="/dashboard"
            />
          </div>
        </div>

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400 font-space">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-pixel-green hover:text-pixel-cyan font-medium transition-colors duration-200 underline-offset-4 hover:underline font-pixel"
            >
              SIGN IN
            </a>
          </p>
        </div>

        {/* Bottom testimonial */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-pixel-green rounded-full opacity-80"></div>
            ))}
          </div>
          <p className="text-slate-400 text-sm font-space">
            "The most advanced trading platform I've used" - <span className="text-pixel-green font-pixel">ALPHA TRADER</span>
          </p>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-pixel-green animate-pulse" />
            <span className="text-xs text-slate-400 font-pixel">LIVE</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-pixel-cyan animate-pulse" />
            <span className="text-xs text-slate-400 font-pixel">FAST</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-pixel-purple animate-pulse" />
            <span className="text-xs text-slate-400 font-pixel">SECURE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
