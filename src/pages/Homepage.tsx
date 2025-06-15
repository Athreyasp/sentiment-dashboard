
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SentinelLogo } from '@/components/SentinelLogo'
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
  Target
} from 'lucide-react'

export default function Homepage() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      title: "Real-Time Ticker Sentiment",
      description: "Monitor sentiment changes across thousands of stocks in real-time with AI-powered analysis."
    },
    {
      icon: <Newspaper className="w-8 h-8 text-blue-500" />,
      title: "News Feed with Color Tags",
      description: "Get instant visual cues on market-moving news with sentiment-based color coding."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      title: "CSV Portfolio Upload",
      description: "Upload your portfolio and get personalized sentiment insights for your holdings."
    },
    {
      icon: <Bell className="w-8 h-8 text-amber-500" />,
      title: "Telegram Alerts",
      description: "Receive instant notifications when significant sentiment shifts occur in your watchlist."
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-500" />,
      title: "Explainable AI",
      description: "Understand exactly why our AI made specific predictions with transparent explanations."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
      title: "Sector Heatmaps & Backtesting",
      description: "Visualize market sentiment across sectors and backtest strategies with historical data."
    }
  ]

  const workSteps = [
    {
      icon: <Search className="w-12 h-12 text-emerald-500" />,
      title: "Crawl News",
      description: "Pull headlines from trusted financial sources in real-time."
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-500" />,
      title: "Analyze Sentiment",
      description: "Use FinBERT to detect polarity & impact on market movements."
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: "Predict Outcomes",
      description: "Highlight market movements before they happen."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <SentinelLogo size="sm" showText={true} variant="minimal" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">How It Works</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Contact</a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`p-2 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium">Features</a>
                <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium">How It Works</a>
                <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-medium">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">Log In</Button>
                  </Link>
                  <Link to="/login">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Turn Real-Time News Into{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Market Insight
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                AI-powered financial sentiment platform for smarter decisions. Stay ahead of market movements with real-time analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="font-semibold px-8 py-3 text-lg border-2">
                  <Play className="mr-2 w-5 h-5" />
                  View Demo
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in animate-stagger-1">
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Market Sentiment</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                      <span className="font-medium text-slate-900 dark:text-white">AAPL</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">+0.85</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                      <span className="font-medium text-slate-900 dark:text-white">TSLA</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">-0.32</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                      <span className="font-medium text-slate-900 dark:text-white">MSFT</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">+0.12</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-bounce shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Sentinel Works */}
      <section id="how-it-works" className="py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How Sentinel Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our AI-powered platform transforms raw financial news into actionable market insights through a sophisticated three-step process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {workSteps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow duration-300 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to make informed investment decisions with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Start decoding the market with Sentinel today.
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already making smarter decisions with AI-powered market insights.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <SentinelLogo size="sm" showText={true} variant="minimal" className="text-white" />
              </div>
              <p className="text-slate-300 mb-4">
                AI-powered insights for modern investors.
              </p>
              <div className="text-sm text-slate-400">
                vBeta
              </div>
            </div>
            <div className="md:text-right">
              <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800">
            <div className="text-center text-slate-400 text-sm">
              © 2024 Sentinel. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
