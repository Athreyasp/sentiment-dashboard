
import { useAuth, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import { ModernSentinelLogo } from '@/components/ModernSentinelLogo'
import { LoginModal } from '@/components/LoginModal'
import { Button } from '@/components/ui/button'
import { BarChart3, Brain, Shield, Zap, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  // If user is signed in, redirect to dashboard
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze market sentiment and predict trends with unprecedented accuracy."
    },
    {
      icon: BarChart3,
      title: "Real-Time Insights",
      description: "Get instant access to market data, sentiment analysis, and trading signals as they happen."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade encryption and security protocols."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience millisecond response times with our optimized infrastructure and edge computing."
    }
  ]

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "10M+", label: "Data Points Analyzed Daily" },
    { number: "500+", label: "Active Traders" },
    { number: "24/7", label: "Market Monitoring" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 lg:p-8">
        <ModernSentinelLogo size="sm" variant="hero" showText={true} />
        
        <SignedOut>
          <Button 
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Sign In
          </Button>
        </SignedOut>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="gradient-text">AI-Powered</span>
            <br />
            Financial Intelligence
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Harness the power of artificial intelligence to make smarter investment decisions with real-time sentiment analysis and market insights.
          </p>
          
          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={() => setShowLogin(true)}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <SignedOut>
          <div className="text-center bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-12 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are already using Sentinel to make data-driven investment decisions.
            </p>
            <Button 
              onClick={() => setShowLogin(true)}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Your Free Trial
            </Button>
          </div>
        </SignedOut>
      </main>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </div>
  )
}

export default Index
