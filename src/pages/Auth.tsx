import { useState, useEffect, useRef } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { OfficialSentinelLogo } from '@/components/OfficialSentinelLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Shield, Zap, Brain, Activity, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const robotRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  // Track mouse movement for robot eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate robot eye position based on mouse
  const getRobotEyePosition = () => {
    if (!robotRef.current) return { x: 0, y: 0 }
    
    const rect = robotRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = mousePosition.x - centerX
    const deltaY = mousePosition.y - centerY
    
    const maxDistance = 8
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const clampedDistance = Math.min(distance, 100)
    
    const normalizedX = (deltaX / clampedDistance) * maxDistance
    const normalizedY = (deltaY / clampedDistance) * maxDistance
    
    return { x: normalizedX || 0, y: normalizedY || 0 }
  }

  const eyePosition = getRobotEyePosition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaVerified) return
    // Handle form submission
    console.log('Form submitted:', { email, password, fullName, isSignUp })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 overflow-auto relative">
      {/* Ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 dark:bg-cyan-300/50 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-full bg-background/50 backdrop-blur-sm hover:bg-accent/50"
              >
                {theme === 'dark' ? 
                  <Sun className="w-4 h-4 text-yellow-400" /> : 
                  <Moon className="w-4 h-4 text-slate-600" />
                }
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                <span className="text-xs text-muted-foreground font-medium">AI ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Robot & Branding */}
        <div className="lg:flex-1 relative overflow-hidden flex flex-col justify-center items-center p-8 lg:p-12">
          {/* Robot Character */}
          <div ref={robotRef} className="relative mb-8 lg:mb-12">
            <div className="relative w-32 h-40 lg:w-48 lg:h-60">
              {/* Robot Body */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 lg:w-32 lg:h-36 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded-2xl border-2 border-slate-400 dark:border-slate-600 shadow-xl">
                {/* Chest Panel */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-inner animate-pulse">
                  <div className="absolute inset-1 bg-cyan-300/50 rounded-md animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                {/* Status Lights */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
              
              {/* Robot Head */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-20 lg:w-36 lg:h-28 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-2xl border-2 border-slate-400 dark:border-slate-500 shadow-xl">
                {/* Eyes */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-4 lg:space-x-6">
                  <div className="relative w-6 h-6 lg:w-8 lg:h-8 bg-slate-800 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 transition-transform duration-150 ease-out"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                    >
                      <div className="absolute inset-1 bg-cyan-200 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="relative w-6 h-6 lg:w-8 lg:h-8 bg-slate-800 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 transition-transform duration-150 ease-out"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                    >
                      <div className="absolute inset-1 bg-cyan-200 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Antenna */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-slate-400 dark:bg-slate-500">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="text-center max-w-md">
            <div className="mb-6">
              <OfficialSentinelLogo size="lg" showText={true} className="justify-center mb-4" />
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Next-Gen AI Authentication
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Secure access powered by advanced AI with biometric-level security and real-time threat detection.
            </p>
            
            {/* Features */}
            <div className="hidden lg:block space-y-4 text-left">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Real-Time Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Advanced threat detection</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI-Powered Security</h3>
                  <p className="text-sm text-muted-foreground">Machine learning authentication</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Zero-Trust Architecture</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="lg:max-w-md xl:max-w-lg flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
          {/* Glassmorphism Container */}
          <div className="relative backdrop-blur-xl bg-background/40 dark:bg-slate-900/40 border border-border/50 rounded-3xl p-8 shadow-2xl">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 dark:from-cyan-400/10 dark:to-purple-400/10 rounded-3xl -z-10" />
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {isSignUp ? 'Join Sentinel' : 'Welcome Back'}
              </h2>
              <p className="text-muted-foreground">
                {isSignUp 
                  ? 'Create your AI-secured account' 
                  : 'Access your secure dashboard'
                }
              </p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-12 h-12 bg-background/50 dark:bg-slate-800/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-background/50 dark:bg-slate-800/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300 rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-background/50 dark:bg-slate-800/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300 rounded-xl"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 hover:bg-transparent"
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /> : 
                    <Eye className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  }
                </Button>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {isSignUp && (
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 h-12 bg-background/50 dark:bg-slate-800/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:bg-background/70 transition-all duration-300 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              )}

              {/* AI CAPTCHA */}
              <div className="relative group">
                <div className="p-4 bg-background/30 dark:bg-slate-800/30 backdrop-blur-sm border border-border/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded border-2 border-emerald-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                           onClick={() => setCaptchaVerified(!captchaVerified)}>
                        {captchaVerified && <div className="w-3 h-3 bg-white rounded-sm" />}
                      </div>
                      <span className="text-sm text-foreground">I'm not a robot</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">AI CAPTCHA</div>
                        <div className="text-xs text-primary">Sentinel Secure</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!captchaVerified}
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="mr-2">{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <Zap className="w-4 h-4" />
              </Button>
            </form>

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Button 
                  variant="link" 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:text-primary/80 font-semibold p-0 h-auto underline-offset-4 hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Protected by AI-powered security. By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms</a> and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}