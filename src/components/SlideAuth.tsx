import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Facebook, Mail, Linkedin, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl min-h-[600px] grid lg:grid-cols-2 overflow-hidden relative">
        
        {/* Sign Up Form Panel */}
        <div className={`relative transition-all duration-700 ease-in-out ${
          isSignUp ? 'translate-x-0 opacity-100' : 'lg:translate-x-full opacity-0 lg:opacity-100'
        } ${!isSignUp ? 'hidden lg:block' : ''}`}>
          <div className="p-8 lg:p-12 h-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('Google')}
              >
                <Mail className="w-5 h-5 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
              </Button>
            </div>
            
            <p className="text-gray-600 text-center text-sm mb-6">or use your email for registration</p>
            
            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleSignUp}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Creating Account...' : 'SIGN UP'}
            </Button>
          </div>
        </div>

        {/* Sign In Form Panel */}
        <div className={`relative transition-all duration-700 ease-in-out ${
          !isSignUp ? 'translate-x-0 opacity-100' : 'lg:-translate-x-full opacity-0 lg:opacity-100'
        } ${isSignUp ? 'hidden lg:block' : ''}`}>
          <div className="p-8 lg:p-12 h-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign in</h1>
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('Google')}
              >
                <Mail className="w-5 h-5 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50"
                onClick={() => handleSocialLogin('LinkedIn')}
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
              </Button>
            </div>
            
            <p className="text-gray-600 text-center text-sm mb-6">or use your account</p>
            
            <div className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-gray-600 hover:text-pink-500">
                Forgot your password?
              </a>
            </div>
            
            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Signing In...' : 'SIGN IN'}
            </Button>
          </div>
        </div>

        {/* Overlay Panel */}
        <div className={`absolute inset-y-0 right-0 w-full lg:w-1/2 bg-gradient-to-br from-pink-500 to-red-500 transition-transform duration-700 ease-in-out transform ${
          isSignUp ? 'lg:-translate-x-full' : 'lg:translate-x-0'
        } ${isSignUp ? 'hidden lg:block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-center h-full p-8 lg:p-12 text-white">
            <div className="text-center">
              {!isSignUp ? (
                <div>
                  <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                  <p className="text-lg mb-8 opacity-90">
                    Enter your personal details and start journey with us
                  </p>
                  <Button
                    onClick={() => setIsSignUp(true)}
                    variant="ghost"
                    className="border-2 border-white text-white hover:bg-white hover:text-pink-500 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    SIGN UP
                  </Button>
                </div>
              ) : (
                <div>
                  <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                  <p className="text-lg mb-8 opacity-90">
                    To keep connected with us please login with your personal info
                  </p>
                  <Button
                    onClick={() => setIsSignUp(false)}
                    variant="ghost"
                    className="border-2 border-white text-white hover:bg-white hover:text-pink-500 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    SIGN IN
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="lg:hidden absolute top-4 left-4 right-4 z-10">
          <div className="flex bg-white rounded-full p-1 shadow-lg">
            <Button
              onClick={() => setIsSignUp(false)}
              variant={!isSignUp ? "default" : "ghost"}
              className={`flex-1 rounded-full ${
                !isSignUp 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setIsSignUp(true)}
              variant={isSignUp ? "default" : "ghost"}
              className={`flex-1 rounded-full ${
                isSignUp 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}