
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { OfficialSentinelLogo } from './OfficialSentinelLogo'
import { useTheme } from '@/hooks/useTheme'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X, 
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  ChevronDown
} from 'lucide-react'

interface HeaderProps {
  onAuthClick: () => void
}

export function AttractivePremiumHeader({ onAuthClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10' 
        : 'bg-transparent'
    }`}>
      {/* Premium gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-4 group animate-fade-in">
            <div className="relative">
              <OfficialSentinelLogo size="sm" showText={true} variant="minimal" />
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-pixel">
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Features', href: '#features' },
              { name: 'How It Works', href: '#how-it-works' },
              { name: 'Pricing', href: '#pricing' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="relative text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-all duration-300 group py-2"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Premium Theme Toggle */}
            <div className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              <button
                onClick={() => setTheme('light')}
                className={`p-2.5 rounded-xl transition-all duration-300 group ${
                  theme === 'light' 
                    ? 'bg-white dark:bg-slate-600 shadow-lg scale-105 text-emerald-600' 
                    : 'hover:bg-white/50 dark:hover:bg-slate-600/50 hover:scale-105'
                }`}
              >
                <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2.5 rounded-xl transition-all duration-300 group ${
                  theme === 'dark' 
                    ? 'bg-white dark:bg-slate-600 shadow-lg scale-105 text-blue-500' 
                    : 'hover:bg-white/50 dark:hover:bg-slate-600/50 hover:scale-105'
                }`}
              >
                <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`p-2.5 rounded-xl transition-all duration-300 group ${
                  theme === 'system' 
                    ? 'bg-white dark:bg-slate-600 shadow-lg scale-105 text-purple-500' 
                    : 'hover:bg-white/50 dark:hover:bg-slate-600/50 hover:scale-105'
                }`}
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Premium Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-300 hover:scale-105 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                asChild
              >
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-blue-700 text-white font-bold shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group border-0"
                asChild
              >
                <Link to="/auth">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </Button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-4">
                {[
                  { name: 'Features', href: '#features' },
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-center space-x-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    theme === 'light' ? 'bg-white dark:bg-slate-600 shadow-lg scale-105' : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    theme === 'dark' ? 'bg-white dark:bg-slate-600 shadow-lg scale-105' : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    theme === 'system' ? 'bg-white dark:bg-slate-600 shadow-lg scale-105' : 'hover:bg-white/50 dark:hover:bg-slate-600/50'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center font-semibold border border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                    asChild
                  >
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Sparkles className="mr-2 w-4 h-4" />
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
