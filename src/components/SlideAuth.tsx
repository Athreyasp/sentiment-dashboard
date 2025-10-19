import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Mail, Eye, EyeOff, Lock, RefreshCw, Github, Twitter } from 'lucide-react'
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
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' })
  
  const navigate = useNavigate()
  const { toast } = useToast()

  // Generate new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: '' })
  }

  useEffect(() => {
    generateCaptcha()
  }, [isSignUp])

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

    // Verify captcha
    const correctAnswer = captcha.num1 * captcha.num2
    if (parseInt(captcha.answer) !== correctAnswer) {
      toast({
        title: "Security Verification Failed",
        description: "Please solve the math problem correctly",
        variant: "destructive",
      })
      generateCaptcha()
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
        generateCaptcha()
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

    // Verify captcha
    const correctAnswer = captcha.num1 * captcha.num2
    if (parseInt(captcha.answer) !== correctAnswer) {
      toast({
        title: "Security Verification Failed",
        description: "Please solve the math problem correctly",
        variant: "destructive",
      })
      generateCaptcha()
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

      {/* Logo at top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
        <OfficialSentinelLogo size="md" variant="default" showText={true} />
      </div>

      <div className="w-full max-w-md relative z-10 mt-24">
        <div className="bg-slate-900/50 backdrop-blur-3xl rounded-3xl p-10 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          {/* Enhanced glassmorphism glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-teal-500/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-3 text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-slate-400 text-base">
                {isSignUp ? 'Start your trading journey' : 'Sign in to continue to your dashboard'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Security Verification */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <label className="text-sm font-semibold text-white">Security Verification</label>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-lg px-4 py-6 flex items-center justify-center">
                    <span className="text-white text-xl font-mono font-bold">
                      {captcha.num1} × {captcha.num2} = ?
                    </span>
                  </div>
                  <Button
                    type="button"
                    onClick={generateCaptcha}
                    variant="outline"
                    className="px-4 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-700/50 hover:border-cyan-500/30 text-slate-300 rounded-lg transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>
                <Input
                  type="number"
                  placeholder="Enter answer"
                  value={captcha.answer}
                  onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                  className="w-full px-4 py-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            <Button
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
              className="mt-8 w-full py-6 text-base bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    generateCaptcha()
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {/* Social Login at bottom */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <Button
                onClick={() => handleSocialLogin('Google')}
                variant="outline"
                className="w-full py-6 bg-white/5 backdrop-blur-xl border border-slate-700/50 hover:bg-white/10 hover:border-slate-600/50 text-white rounded-lg transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 mr-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                Continue with Google
              </Button>
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
  )
}