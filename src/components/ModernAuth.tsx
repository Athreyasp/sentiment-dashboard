import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { OfficialSentinelLogo } from './OfficialSentinelLogo'

interface ModernAuthProps {
  defaultView?: 'login' | 'signup'
  onClose?: () => void
}

export default function ModernAuth({ defaultView = 'login', onClose }: ModernAuthProps) {
  const [isSignUp, setIsSignUp] = useState(defaultView === 'signup')
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

  const handleGoogleLogin = async () => {
    toast({
      title: "Coming Soon",
      description: "Google authentication will be available soon",
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
          data: { name: formData.name },
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-teal-400/30 to-purple-500/30 dark:from-teal-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating cards animation */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
            style={{
              width: `${80 + Math.random() * 100}px`,
              height: `${80 + Math.random() * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
        
        {/* Floating dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 dark:from-cyan-400/30 dark:to-blue-400/30"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.5; 
          }
          33% { 
            transform: translateY(-30px) translateX(20px) rotate(120deg); 
            opacity: 0.8; 
          }
          66% { 
            transform: translateY(-15px) translateX(-20px) rotate(240deg); 
            opacity: 0.6; 
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .auth-card {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Auth Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="auth-card bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-slate-200/50 dark:border-cyan-500/20 shadow-2xl shadow-slate-900/10 dark:shadow-cyan-500/10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <OfficialSentinelLogo size="md" variant="default" showText={true} />
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {isSignUp ? 'Start your trading journey today' : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full py-6 mb-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group"
          >
            <Mail className="w-5 h-5 mr-3 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">or</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-12 pr-4 py-6 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-500 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 pr-4 py-6 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-500 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 pr-4 py-6 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-500 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            disabled={loading}
            className="mt-6 w-full py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Terms */}
          {isSignUp && (
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-500">
              By signing up, you agree to our{' '}
              <a href="#" className="text-cyan-500 hover:text-cyan-600">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-cyan-500 hover:text-cyan-600">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
