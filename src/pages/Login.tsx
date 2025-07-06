
import { SignIn } from '@clerk/clerk-react'
import { Shield, TrendingUp, Brain, Activity } from 'lucide-react'
import { ModernSentinelLogo } from '@/components/ModernSentinelLogo'
import { LoginHeader } from '@/components/LoginHeader'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pixel-green/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pixel-cyan/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pixel-purple/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgb(0,255,127)" fill-opacity="0.03"%3E%3Cpath d="M20 20h20v20H20V20zm-20 0h20v20H0V20z"/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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

      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8 animate-fade-in">
          <ModernSentinelLogo 
            size="lg" 
            variant="hero" 
            showText={true}
            className="mb-6"
          />
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold font-pixel bg-gradient-to-r from-white via-pixel-green to-pixel-cyan bg-clip-text text-transparent mb-3">
              WELCOME BACK
            </h1>
            <p className="text-slate-300 text-lg font-space">
              Access your <span className="text-pixel-green font-bold">Sentinel 2.0</span> dashboard
            </p>
            <div className="flex items-center justify-center space-x-3 mt-4">
              <div className="w-2 h-2 bg-pixel-green rounded-full animate-pulse shadow-lg shadow-pixel-green/50"></div>
              <span className="text-sm text-slate-400 font-pixel font-semibold">POWERED BY ADVANCED AI</span>
              <div className="w-2 h-2 bg-pixel-cyan rounded-full animate-pulse shadow-lg shadow-pixel-cyan/50" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="pixel-card rounded-lg shadow-2xl p-8 transition-all duration-300 border border-pixel-green/30">
          {/* Welcome text */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold font-pixel text-white mb-2">
              SYSTEM ACCESS
            </h2>
            <p className="text-sm text-slate-400 font-space">
              Enter your credentials to continue
            </p>
          </div>

          {/* Clerk SignIn component with custom styling */}
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: `
                  w-full bg-slate-800/50 border border-pixel-green/30 
                  hover:bg-slate-700/50 hover:border-pixel-green/50 text-white 
                  font-medium transition-all duration-200 py-3 rounded-lg mb-3 font-space
                `,
                socialButtonsBlockButtonText: "font-medium text-sm",
                formButtonPrimary: `
                  w-full bg-gradient-to-r from-pixel-green to-pixel-cyan hover:from-pixel-green/80 hover:to-pixel-cyan/80 
                  text-black font-bold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg 
                  font-pixel text-sm uppercase tracking-wide
                `,
                footerActionLink: `
                  text-pixel-green hover:text-pixel-cyan font-medium transition-colors 
                  duration-200 text-sm underline-offset-4 hover:underline font-space
                `,
                formFieldInput: `
                  w-full border border-slate-600 bg-slate-800/50 text-white 
                  focus:border-pixel-green focus:ring-1 focus:ring-pixel-green/50
                  rounded-lg py-3 px-4 transition-all duration-200 font-space
                `,
                formFieldLabel: "text-slate-300 font-medium text-sm mb-2 font-space",
                dividerLine: "bg-slate-600",
                dividerText: "text-slate-400 text-sm bg-slate-900 px-4 font-space",
                identityPreviewText: "text-slate-300 text-sm font-space",
                identityPreviewEditButton: "text-pixel-green hover:text-pixel-cyan font-medium text-sm font-space",
                formHeaderTitle: "text-white font-bold text-lg font-pixel",
                formHeaderSubtitle: "text-slate-400 text-sm font-space"
              }
            }}
            redirectUrl="/dashboard"
          />
        </div>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-400 font-space">
            Don't have access credentials?{' '}
            <a 
              href="/signup" 
              className="text-pixel-green hover:text-pixel-cyan font-medium transition-colors duration-200 underline-offset-4 hover:underline font-pixel"
            >
              REQUEST ACCESS
            </a>
          </p>
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-3 text-slate-500 text-xs font-pixel">
            <div className="w-2 h-2 bg-pixel-green rounded-full opacity-60 animate-pulse"></div>
            <span className="uppercase tracking-wide">SECURED WITH MILITARY-GRADE ENCRYPTION</span>
            <div className="w-2 h-2 bg-pixel-cyan rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
