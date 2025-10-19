import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Mail, Eye, EyeOff, Sparkles, TrendingUp, Shield, Zap, ArrowRight, Github, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { OfficialSentinelLogo } from './OfficialSentinelLogo'

interface SlideAuthProps {
  defaultView?: 'login' | 'signup'
}

export default function SlideAuth({ defaultView = 'login' }: SlideAuthProps) {
  const [isSignUp, setIsSignUp] = useState(defaultView === 'signup')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      })

      if (error) {
        toast({
          title: "Sign Up Failed", 
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to verify your account",
        })
        setFormData({ name: '', email: '', password: '' })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter your email and password",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in",
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} authentication will be available soon`,
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-teal-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles with varied sizes and colors */}
        {[...Array(40)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const colors = ['bg-cyan-400/40', 'bg-teal-400/40', 'bg-blue-400/40', 'bg-purple-400/30'];
          return (
            <div
              key={i}
              className={`absolute rounded-full ${colors[i % colors.length]}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
      `}</style>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800/80 backdrop-blur-xl rounded-full p-1 shadow-2xl border border-cyan-500/20">
        <div className="flex gap-1">
          <Button
            onClick={() => setIsSignUp(false)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              !isSignUp 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' 
                : 'bg-transparent text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </Button>
          <Button
            onClick={() => setIsSignUp(true)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isSignUp 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                : 'bg-transparent text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl relative z-10 mt-16 lg:mt-0">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Panel - Branding & Info */}
          <div className={`transition-all duration-700 ${
            isSignUp ? 'lg:order-2' : 'lg:order-1'
          } ${isSignUp ? 'hidden lg:block' : 'hidden lg:block'}`}>
            <div className="bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-3xl rounded-3xl p-12 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              {/* Enhanced glassmorphism glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-purple-500/10"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <OfficialSentinelLogo size="lg" variant="default" showText={true} className="mb-8" />
                
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {!isSignUp ? 'Welcome Back to Sentinel' : 'Join Sentinel Today'}
                </h2>
                
                <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                  {!isSignUp 
                    ? 'Access powerful AI-driven market insights, real-time analytics, and advanced trading intelligence.' 
                    : 'Start your journey with cutting-edge market analysis and AI-powered predictions.'}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Real-Time Market Data</h3>
                      <p className="text-slate-400 text-sm">Live NSE & BSE stock prices with accurate tracking</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">AI-Powered Predictions</h3>
                      <p className="text-slate-400 text-sm">Advanced sentiment analysis and market forecasts</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Secure & Reliable</h3>
                      <p className="text-slate-400 text-sm">Bank-grade security for your data</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-cyan-500/20">
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <Zap className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">Powered by Advanced AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className={`transition-all duration-700 ${
            isSignUp ? 'lg:order-1' : 'lg:order-2'
          }`}>
            <div className="bg-slate-900/50 backdrop-blur-3xl rounded-3xl p-8 lg:p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
              {/* Enhanced glassmorphism glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-teal-500/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                {/* Logo for mobile */}
                <div className="lg:hidden mb-8 text-center">
                  <OfficialSentinelLogo size="md" variant="default" showText={true} />
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </h1>
                  <p className="text-slate-400">
                    {isSignUp ? 'Start your trading journey' : 'Welcome back, trader'}
                  </p>
                </div>

                {/* Social Login */}
                <div className="mb-8 space-y-3">
                  <Button
                    onClick={() => handleSocialLogin('Google')}
                    variant="outline"
                    className="w-full py-6 bg-slate-800/60 backdrop-blur-xl border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 text-white rounded-xl transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 mr-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                    Continue with Google
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleSocialLogin('GitHub')}
                      variant="outline"
                      className="py-6 bg-slate-800/60 backdrop-blur-xl border-slate-600/40 hover:bg-slate-700/50 hover:border-slate-500/60 hover:shadow-lg hover:shadow-slate-500/10 text-white rounded-xl transition-all duration-300 group"
                    >
                      <Github className="w-5 h-5 mr-2 text-slate-300 group-hover:scale-110 transition-transform" />
                      GitHub
                    </Button>
                    
                    <Button
                      onClick={() => handleSocialLogin('Twitter')}
                      variant="outline"
                      className="py-6 bg-slate-800/60 backdrop-blur-xl border-blue-500/40 hover:bg-blue-500/10 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/10 text-white rounded-xl transition-all duration-300 group"
                    >
                      <Twitter className="w-5 h-5 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                      Twitter
                    </Button>
                  </div>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900/60 text-slate-400">or continue with email</span>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {isSignUp && (
                    <div>
                      <label className="text-sm font-semibold text-slate-200 mb-2 block">Full Name</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-5 py-6 bg-slate-800/60 backdrop-blur-xl border-2 border-cyan-500/40 text-white placeholder:text-slate-400 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 transition-all font-medium shadow-lg shadow-cyan-500/5"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-slate-200 mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="trader@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-6 bg-slate-800/60 backdrop-blur-xl border-2 border-cyan-500/40 text-white placeholder:text-slate-400 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 transition-all font-medium shadow-lg shadow-cyan-500/5"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-200 mb-2 block">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-5 py-6 pr-12 bg-slate-800/60 backdrop-blur-xl border-2 border-cyan-500/40 text-white placeholder:text-slate-400 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 transition-all font-medium shadow-lg shadow-cyan-500/5"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>

                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                        Remember me
                      </label>
                      <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>

                <Button
                  onClick={isSignUp ? handleSignUp : handleSignIn}
                  disabled={loading}
                  className="mt-8 w-full py-7 text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/40 group relative overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>

                <div className="mt-8 text-center">
                  <p className="text-slate-400 text-sm">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>

                {isSignUp && (
                  <p className="mt-6 text-center text-xs text-slate-500">
                    By signing up, you agree to our{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms</a>
                    {' '}and{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}