import { useState, useEffect, useRef } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { OfficialSentinelLogo } from '@/components/OfficialSentinelLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Moon, Sun, Mail, Lock, User, Shield, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [captcha, setCaptcha] = useState({ question: '', answer: 0, userAnswer: '' })
  const [captchaValid, setCaptchaValid] = useState(false)
  const { theme, setTheme } = useTheme()

  // Generate CAPTCHA
  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operators = ['+', '-', '*']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    
    let answer = 0
    let question = ''
    
    switch (operator) {
      case '+':
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case '-':
        answer = num1 - num2
        question = `${num1} - ${num2}`
        break
      case '*':
        answer = num1 * num2
        question = `${num1} × ${num2}`
        break
    }
    
    setCaptcha({ question, answer, userAnswer: '' })
    setCaptchaValid(false)
  }

  const validateCaptcha = (value: string) => {
    const isValid = parseInt(value) === captcha.answer
    setCaptchaValid(isValid)
    setCaptcha(prev => ({ ...prev, userAnswer: value }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full hover:bg-accent/50 transition-all duration-300"
            >
              {theme === 'dark' ? 
                <Sun className="w-4 h-4" /> : 
                <Moon className="w-4 h-4" />
              }
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)]">
        {/* Left Panel - Logo & Branding */}
        <div className="hidden lg:flex lg:flex-1 flex-col justify-center items-center p-12 relative">
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-bounce opacity-70" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-secondary rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>

          {/* Main Logo Section */}
          <div className="text-center max-w-lg animate-fade-in">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 animate-pulse"></div>
              <OfficialSentinelLogo size="lg" showText={true} className="relative justify-center mb-6" />
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Welcome to Sentinel
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Your AI-powered financial intelligence platform for smarter trading decisions
            </p>
            
            {/* Features */}
            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Real-time market analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>AI-powered insights</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Advanced portfolio tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 animate-fade-in">
              <OfficialSentinelLogo size="md" showText={true} className="justify-center mb-4" />
            </div>

            {/* Auth Card */}
            <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl animate-scale-in">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-muted-foreground">
                  {isSignUp 
                    ? 'Join thousands of traders using AI insights' 
                    : 'Sign in to continue to your dashboard'
                  }
                </p>
              </div>

              {/* Custom Form */}
              <div className="space-y-6">
                {/* Name Fields for Sign Up */}
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary focus:bg-background/80 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary focus:bg-background/80 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary focus:bg-background/80 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary focus:bg-background/80 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1 h-8 w-8 hover:bg-accent/50"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Security Verification</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-muted/50 border border-border/50 rounded-lg p-3 text-center font-mono text-lg">
                      {captcha.question} = ?
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateCaptcha}
                      className="p-2 hover:bg-accent/50"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter answer"
                      value={captcha.userAnswer}
                      onChange={(e) => validateCaptcha(e.target.value)}
                      className={`bg-background/50 border-border/50 focus:bg-background/80 transition-all duration-300 ${
                        captcha.userAnswer && (captchaValid ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500')
                      }`}
                    />
                    {captcha.userAnswer && (
                      <div className={`absolute right-3 top-3 w-4 h-4 rounded-full ${captchaValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    )}
                  </div>
                </div>

                {/* Clerk Auth Integration */}
                <div className="space-y-4">
                  {isSignUp ? (
                    <SignUp 
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent border-0 shadow-none p-0 w-full",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton: "w-full bg-background/50 border border-border/50 hover:bg-accent/50 text-foreground font-medium py-3 rounded-lg mb-3 transition-all duration-300 backdrop-blur-sm",
                          socialButtonsBlockButtonText: "font-medium text-sm",
                          formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl",
                          footerActionLink: "text-primary hover:text-primary/80 font-medium text-sm",
                          formFieldInput: "w-full border border-border/50 bg-background/50 text-foreground focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 transition-all duration-300 backdrop-blur-sm",
                          formFieldLabel: "text-foreground font-medium text-sm mb-2",
                          dividerLine: "bg-border/50",
                          dividerText: "text-muted-foreground text-sm bg-background/80 px-4 backdrop-blur-sm",
                          footerAction: "hidden",
                          formFieldErrorText: "text-destructive text-sm mt-1",
                          identityPreviewText: "text-muted-foreground text-sm",
                          identityPreviewEditButton: "text-primary hover:text-primary/80 text-sm",
                          formResendCodeLink: "text-primary hover:text-primary/80 text-sm"
                        }
                      }}
                      fallbackRedirectUrl="/dashboard"
                      signInFallbackRedirectUrl="/dashboard"
                    />
                  ) : (
                    <SignIn 
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent border-0 shadow-none p-0 w-full",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton: "w-full bg-background/50 border border-border/50 hover:bg-accent/50 text-foreground font-medium py-3 rounded-lg mb-3 transition-all duration-300 backdrop-blur-sm",
                          socialButtonsBlockButtonText: "font-medium text-sm",
                          formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl",
                          footerActionLink: "text-primary hover:text-primary/80 font-medium text-sm",
                          formFieldInput: "w-full border border-border/50 bg-background/50 text-foreground focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 transition-all duration-300 backdrop-blur-sm",
                          formFieldLabel: "text-foreground font-medium text-sm mb-2",
                          dividerLine: "bg-border/50",
                          dividerText: "text-muted-foreground text-sm bg-background/80 px-4 backdrop-blur-sm",
                          footerAction: "hidden",
                          formFieldErrorText: "text-destructive text-sm mt-1",
                          forgotPasswordLink: "text-primary hover:text-primary/80 text-sm"
                        }
                      }}
                      fallbackRedirectUrl="/dashboard"
                      signUpFallbackRedirectUrl="/dashboard"
                    />
                  )}
                </div>
              </div>

              {/* Toggle Sign In / Sign Up */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <Button 
                    variant="link" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-primary hover:text-primary/80 font-semibold p-0 h-auto text-sm underline-offset-4 hover:underline"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </Button>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline underline-offset-4">Terms</a> and{' '}
                  <a href="#" className="text-primary hover:underline underline-offset-4">Privacy Policy</a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}