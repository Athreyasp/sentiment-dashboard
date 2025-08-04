import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AttractivePremiumHeader } from '@/components/AttractivePremiumHeader'
import { LoginModal } from '@/components/LoginModal'
import { SimplePreloader } from '@/components/SimplePreloader'
import { OfficialSentinelLogo } from '@/components/OfficialSentinelLogo'
import { FinancialInsightCards } from '@/components/FinancialInsightCards'
import { ChromaGrid } from '@/components/ChromaGrid'
import ScrollFloat from '@/components/ScrollFloat'
import RotatingText from '@/components/RotatingText'
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
  Shield,
  Users
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

        {/* New Attractive Header */}
        <AttractivePremiumHeader onAuthClick={() => setLoginModalOpen(true)} />

        {/* Hero Section with enhanced entrance animations - adjusted for fixed header */}
        <section className={`main-content pb-20 lg:pb-32 relative transition-all duration-1000 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <ScrollFloat direction="up" intensity={40} delay={0.2}>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 mb-6">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered Intelligence</span>
                  </div>
                </ScrollFloat>
                
                <ScrollFloat direction="left" intensity={60} delay={0.4}>
                  <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                    Turn Real-Time News Into{' '}
                    <RotatingText
                      texts={['Market Intelligence', 'Smart Insights', 'Trading Edge', 'Investment Power']}
                      mainClassName="inline-flex px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg shadow-lg"
                      staggerFrom="last"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-120%", opacity: 0 }}
                      staggerDuration={0.02}
                      splitLevelClassName="overflow-hidden"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={3000}
                    />
                  </h1>
                </ScrollFloat>
                
                <ScrollFloat direction="right" intensity={40} delay={0.6}>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                    AI-powered financial sentiment platform that transforms market noise into actionable insights for smarter investment decisions.
                  </p>
                </ScrollFloat>
                
                <ScrollFloat direction="up" intensity={30} delay={0.8}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link to="/auth">
                        Get Started Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="font-semibold px-8 py-4 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 transition-all duration-300">
                      <Play className="mr-2 w-5 h-5" />
                      Watch Demo
                    </Button>
                  </div>
                </ScrollFloat>
                
                <ScrollFloat direction="up" intensity={20} delay={1.0}>
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
                </ScrollFloat>
              </div>
              
              <ScrollFloat direction="right" intensity={80} delay={0.4}>
                <div className="relative animate-fade-in flex justify-end lg:justify-center xl:justify-end" style={{ animationDelay: '0.2s' }}>
                  {/* Financial Card Swap Component - moved more to the right */}
                  <div className="relative ml-8 lg:ml-12 xl:ml-16">
                    <FinancialInsightCards />
                  </div>
                </div>
              </ScrollFloat>
            </div>
          </div>
        </section>

        {/* How Sentinel Works */}
        <section id="how-it-works" className={`py-20 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-1000 delay-500 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <ScrollFloat direction="down" intensity={30} delay={0.2}>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">How It Works</span>
                </div>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={50} delay={0.4}>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Three Steps to Market Mastery
                </h2>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={30} delay={0.6}>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  Our sophisticated AI pipeline transforms raw financial news into actionable market insights through advanced machine learning.
                </p>
              </ScrollFloat>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {workSteps.map((step, index) => (
                <ScrollFloat 
                  key={index}
                  direction="up" 
                  intensity={40} 
                  delay={0.2 * index}
                  className="scroll-float-card"
                >
                  <Card 
                    className="relative hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200 dark:hover:border-emerald-800 group hover:scale-105 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
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
                </ScrollFloat>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section id="team" className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800 transition-all duration-1000 delay-600 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <ScrollFloat direction="down" intensity={30} delay={0.2}>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Our Team</span>
                </div>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={50} delay={0.4}>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Meet the Minds Behind Sentinel
                </h2>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={30} delay={0.6}>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  A passionate team of AI researchers, financial experts, and engineers dedicated to democratizing market intelligence.
                </p>
              </ScrollFloat>
            </div>
            
            {/* ChromaGrid Team Display */}
            <ScrollFloat direction="up" intensity={40} delay={0.8}>
              <div className="flex justify-center">
                <ChromaGrid 
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                  columns={3}
                  rows={1}
                />
              </div>
            </ScrollFloat>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={`py-20 transition-all duration-1000 delay-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <ScrollFloat direction="down" intensity={30} delay={0.2}>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powerful Features</span>
                </div>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={50} delay={0.4}>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Everything You Need to Win
                </h2>
              </ScrollFloat>
              
              <ScrollFloat direction="up" intensity={30} delay={0.6}>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  Comprehensive tools and insights designed to give you the competitive edge in today's fast-moving markets.
                </p>
              </ScrollFloat>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <ScrollFloat 
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"} 
                  intensity={40} 
                  delay={0.1 * index}
                  className="scroll-float-card"
                >
                  <Card 
                    className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-200 dark:hover:border-emerald-800 group hover:scale-105 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
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
                </ScrollFloat>
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
            <ScrollFloat direction="up" intensity={40} delay={0.3}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Trading?
              </h2>
            </ScrollFloat>
            
            <ScrollFloat direction="up" intensity={30} delay={0.5}>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Join thousands of investors who are already making smarter decisions with AI-powered market insights.
              </p>
            </ScrollFloat>
            
            <ScrollFloat direction="up" intensity={20} delay={0.7}>
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
            </ScrollFloat>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className={`bg-slate-900 dark:bg-slate-950 text-white py-20 relative overflow-hidden transition-all duration-1000 delay-1000 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollFloat direction="left" intensity={40} delay={0.2}>
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <OfficialSentinelLogo size="sm" showText={true} variant="minimal" className="text-white" />
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
              </ScrollFloat>
              
              <ScrollFloat direction="right" intensity={40} delay={0.4}>
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
              </ScrollFloat>
            </div>
            
            <ScrollFloat direction="up" intensity={20} delay={0.6}>
              <div className="pt-8 border-t border-slate-800">
                <div className="text-center text-slate-400 text-sm">
                  © 2024 Sentinel. All rights reserved. Built with ❤️ for smarter investing.
                </div>
              </div>
            </ScrollFloat>
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  )
}
