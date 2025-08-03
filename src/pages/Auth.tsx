import { useState, useEffect, useRef } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { OfficialSentinelLogo } from '@/components/OfficialSentinelLogo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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
    
    const maxDistance = 6
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const clampedDistance = Math.min(distance, 80)
    
    const normalizedX = (deltaX / clampedDistance) * maxDistance
    const normalizedY = (deltaY / clampedDistance) * maxDistance
    
    return { x: normalizedX || 0, y: normalizedY || 0 }
  }

  const eyePosition = getRobotEyePosition()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Back to Home</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full"
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
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Panel - Robot */}
        <div className="hidden lg:flex lg:flex-1 flex-col justify-center items-center bg-muted/30 p-12">
          {/* Simple Robot */}
          <div ref={robotRef} className="mb-8">
            <div className="relative w-32 h-36">
              {/* Robot Head */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-18 bg-card border-2 border-border rounded-2xl shadow-lg">
                {/* Eyes */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <div className="relative w-6 h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute w-4 h-4 bg-primary rounded-full transition-transform duration-150 ease-out"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                    />
                  </div>
                  <div className="relative w-6 h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute w-4 h-4 bg-primary rounded-full transition-transform duration-150 ease-out"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                    />
                  </div>
                </div>
                
                {/* Antenna */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-border">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Robot Body */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-card border-2 border-border rounded-xl shadow-lg">
                {/* Chest Panel */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary/20 rounded-lg border border-primary/30">
                  <div className="absolute inset-1 bg-primary/10 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="text-center max-w-md">
            <OfficialSentinelLogo size="lg" showText={true} className="justify-center mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Welcome to Sentinel
            </h1>
            <p className="text-muted-foreground">
              Your AI-powered financial intelligence platform
            </p>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 lg:max-w-md flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <OfficialSentinelLogo size="md" showText={true} className="justify-center mb-4" />
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSignUp 
                  ? 'Join thousands of traders using AI insights' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </div>

            {/* Clerk Auth Components */}
            <div className="space-y-6">
              {isSignUp ? (
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent border-0 shadow-none p-0 w-full",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "w-full bg-background border border-border hover:bg-accent text-foreground font-medium py-3 rounded-lg mb-3 transition-colors",
                      socialButtonsBlockButtonText: "font-medium text-sm",
                      formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors",
                      footerActionLink: "text-primary hover:text-primary/80 font-medium text-sm",
                      formFieldInput: "w-full border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 transition-colors",
                      formFieldLabel: "text-foreground font-medium text-sm mb-2",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground text-sm bg-background px-4",
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
                      socialButtonsBlockButton: "w-full bg-background border border-border hover:bg-accent text-foreground font-medium py-3 rounded-lg mb-3 transition-colors",
                      socialButtonsBlockButtonText: "font-medium text-sm",
                      formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors",
                      footerActionLink: "text-primary hover:text-primary/80 font-medium text-sm",
                      formFieldInput: "w-full border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 transition-colors",
                      formFieldLabel: "text-foreground font-medium text-sm mb-2",
                      dividerLine: "bg-border",
                      dividerText: "text-muted-foreground text-sm bg-background px-4",
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

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Button 
                  variant="link" 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:text-primary/80 font-semibold p-0 h-auto text-sm"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </Button>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms</a> and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}