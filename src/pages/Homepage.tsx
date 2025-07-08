
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AttractivePremiumHeader } from '@/components/AttractivePremiumHeader'
import { LoginModal } from '@/components/LoginModal'
import { SimplePreloader } from '@/components/SimplePreloader'
import { SentinelLogo } from '@/components/SentinelLogo'
import { FinancialInsightCards } from '@/components/FinancialInsightCards'
import InfiniteMenu from '@/components/InfiniteMenu'
import { usePreloader } from '@/hooks/usePreloader'
import { 
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
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  
  const { isLoading } = usePreloader({
    minLoadTime: 3000,
    onComplete: () => setPageLoaded(true)
  })

  // Show preloader during initial load
  if (isLoading) {
    return <SimplePreloader onComplete={() => setPageLoaded(true)} />
  }

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      title: "Real-Time Ticker Sentiment",
      description: "Monitor sentiment changes across thousands of stocks in real-time with AI-powered analysis.",
      gradient: "from-emerald-500 to-green-600",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop"
    },
    {
      icon: <Newspaper className="w-8 h-8 text-blue-500" />,
      title: "News Feed with Color Tags",
      description: "Get instant visual cues on market-moving news with sentiment-based color coding.",
      gradient: "from-blue-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=400&fit=crop"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      title: "CSV Portfolio Upload",
      description: "Upload your portfolio and get personalized sentiment insights for your holdings.",
      gradient: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
    },
    {
      icon: <Bell className="w-8 h-8 text-amber-500" />,
      title: "Telegram Alerts",
      description: "Receive instant notifications when significant sentiment shifts occur in your watchlist.",
      gradient: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop"
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-500" />,
      title: "Explainable AI",
      description: "Understand exactly why our AI made specific predictions with transparent explanations.",
      gradient: "from-cyan-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
      title: "Sector Heatmaps & Backtesting",
      description: "Visualize market sentiment across sectors and backtest strategies with historical data.",
      gradient: "from-rose-500 to-red-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop"
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

        {/* New Attractive Header */}
        <AttractivePremiumHeader onAuthClick={() => setLoginModalOpen(true)} />

        {/* Hero Section with enhanced entrance animations - adjusted for fixed header */}
        <section className={`pt-32 pb-20 lg:pt-40 lg:pb-32 relative transition-all duration-1000 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                    <span className="text-xs text-slate-500">Real-time Data</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-in flex justify-center" style={{ animationDelay: '0.2s' }}>
                {/* Financial Card Swap Component */}
                <div className="relative">
                  <FinancialInsightCards />
                  
                  {/* Floating indicators around the cards */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-12 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping shadow-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
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

        {/* Features Grid with Interactive 3D Sphere */}
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
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
                Explore our comprehensive tools and insights in an interactive 3D experience. Click and drag to discover features designed to give you the competitive edge.
              </p>
            </div>
            
            {/* Interactive 3D Feature Sphere */}
            <div className="mb-16">
              <div style={{ height: '600px', position: 'relative' }} className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-200/20">
                <InfiniteMenu items={features} />
              </div>
            </div>

            {/* Traditional Grid as Fallback/Additional Info */}
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
