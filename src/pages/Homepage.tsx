import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SentinelLogo } from '@/components/SentinelLogo'
import { LoginModal } from '@/components/LoginModal'
import { Preloader } from '@/components/Preloader'
import { usePreloader } from '@/hooks/usePreloader'
import { useTheme } from '@/hooks/useTheme'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X, 
  Search, 
  Brain, 
  TrendingUp, 
  ArrowRight,
  Play,
  Newspaper,
  Briefcase,
  Bell,
  Eye,
  BarChart3,
  Target,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react'

export default function Homepage() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  
  const { isLoading, isExiting } = usePreloader({
    minLoadTime: 5000,
    onComplete: () => setPageLoaded(true)
  })

  // Show preloader during initial load
  if (isLoading) {
    return (
      <div className={`transition-all duration-800 ease-in-out ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        <Preloader />
      </div>
    )
  }

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      title: "Real-Time Ticker Sentiment",
      description: "Monitor sentiment changes across thousands of stocks in real-time with AI-powered analysis.",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: <Newspaper className="w-8 h-8 text-blue-500" />,
      title: "News Feed with Color Tags",
      description: "Get instant visual cues on market-moving news with sentiment-based color coding.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      title: "CSV Portfolio Upload",
      description: "Upload your portfolio and get personalized sentiment insights for your holdings.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Bell className="w-8 h-8 text-amber-500" />,
      title: "Telegram Alerts",
      description: "Receive instant notifications when significant sentiment shifts occur in your watchlist.",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-500" />,
      title: "Explainable AI",
      description: "Understand exactly why our AI made specific predictions with transparent explanations.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
      title: "Sector Heatmaps & Backtesting",
      description: "Visualize market sentiment across sectors and backtest strategies with historical data.",
      gradient: "from-rose-500 to-red-600"
    }
  ]

  const workSteps = [
    {
      icon: <Search className="w-16 h-16 text-emerald-500" />,
      title: "Crawl News",
      description: "Pull headlines from trusted financial sources in real-time using advanced web scraping.",
      number: "01"
    },
    {
      icon: <Brain className="w-16 h-16 text-blue-500" />,
      title: "Analyze Sentiment",
      description: "Use FinBERT AI models to detect sentiment polarity and impact on market movements.",
      number: "02"
    },
    {
      icon: <Target className="w-16 h-16 text-purple-500" />,
      title: "Predict Outcomes",
      description: "Generate actionable insights and highlight market movements before they happen.",
      number: "03"
    }
  ]

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 overflow-x-hidden transition-all duration-1000 ease-out ${pageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header */}
        <header className={`sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-900/5 transition-all duration-800 ${pageLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18">
              {/* Logo */}
              <div className="flex items-center animate-fade-in">
                <SentinelLogo size="sm" showText={true} variant="minimal" />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all duration-300 relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all duration-300 relative group">
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all duration-300 relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <div className="flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-1.5 shadow-inner">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-lg scale-105' : 'hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'}`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-lg scale-105' : 'hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'}`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-lg scale-105' : 'hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    className="font-medium hover:scale-105 transition-transform duration-200"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Get Started
                    <Sparkles className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                <nav className="flex flex-col space-y-4">
                  <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium transition-colors duration-200">Features</a>
                  <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium transition-colors duration-200">How It Works</a>
                  <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium transition-colors duration-200">Contact</a>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Get Started
                      <Sparkles className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section with enhanced entrance animations */}
        <section className={`py-20 lg:py-32 relative transition-all duration-1000 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 mb-6">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered Intelligence</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  Turn Real-Time News Into{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Market Insight
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                  AI-powered financial sentiment platform that transforms market noise into actionable insights for smarter investment decisions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold px-8 py-4 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time Data</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {/* Enhanced dashboard mockup */}
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-emerald-500" />
                        <span>Live Market Sentiment</span>
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-500">Live</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { ticker: 'AAPL', value: '+0.85', color: 'green', bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-500' },
                        { ticker: 'TSLA', value: '-0.32', color: 'red', bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-500' },
                        { ticker: 'MSFT', value: '+0.12', color: 'blue', bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-500' },
                        { ticker: 'GOOGL', value: '+0.67', color: 'green', bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-500' }
                      ].map((stock, index) => (
                        <div 
                          key={stock.ticker} 
                          className={`flex items-center justify-between p-4 ${stock.bg} rounded-xl border-l-4 ${stock.border} hover:scale-105 transition-all duration-300 cursor-pointer`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{stock.ticker.slice(0, 2)}</span>
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">{stock.ticker}</span>
                          </div>
                          <div className="text-right">
                            <span className={`text-${stock.color}-600 dark:text-${stock.color}-400 font-bold text-lg`}>
                              {stock.value}
                            </span>
                            <div className="text-xs text-slate-500">Sentiment</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating indicators */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Sentinel Works */}
        <section id="how-it-works" className={`py-20 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-1000 delay-500 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">How It Works</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Three Steps to Market Mastery
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Our sophisticated AI pipeline transforms raw financial news into actionable market insights through advanced machine learning.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {workSteps.map((step, index) => (
                <Card 
                  key={index} 
                  className="relative hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200 dark:hover:border-emerald-800 group hover:scale-105 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8 text-center relative">
                    {/* Step number */}
                    <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                    
                    <div className="flex justify-center mb-8 mt-6">
                      <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                    
                    {/* Connecting line */}
                    {index < workSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-blue-300"></div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={`py-20 transition-all duration-1000 delay-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powerful Features</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Everything You Need to Win
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Comprehensive tools and insights designed to give you the competitive edge in today's fast-moving markets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200 dark:hover:border-emerald-800 group hover:scale-105 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="flex items-start space-x-4 relative z-10">
                      <div className="flex-shrink-0 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`py-20 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 relative overflow-hidden transition-all duration-1000 delay-900 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are already making smarter decisions with AI-powered market insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-emerald-50 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={() => setLoginModalOpen(true)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2 text-white/80">
                <Shield className="w-4 h-4" />
                <span className="text-sm">No credit card required</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`bg-slate-900 dark:bg-slate-950 text-white py-20 relative overflow-hidden transition-all duration-1000 delay-1000 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <SentinelLogo size="sm" showText={true} variant="minimal" className="text-white" />
                </div>
                <p className="text-slate-300 mb-6 text-lg">
                  AI-powered insights for the next generation of investors.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-400">System Status: Operational</span>
                  </div>
                </div>
                <div className="text-sm text-slate-400 mt-4">
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                    v2.0 Beta
                  </span>
                </div>
              </div>
              
              <div className="md:text-right">
                <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-8 mb-8">
                  {['About', 'Contact', 'Terms', 'Privacy'].map((item) => (
                    <a 
                      key={item}
                      href="#" 
                      className="text-slate-300 hover:text-white transition-colors duration-200 relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800">
              <div className="text-center text-slate-400 text-sm">
                © 2024 Sentinel. All rights reserved. Built with ❤️ for smarter investing.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  )
}
