
import { useAuth, UserButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Sentinel 2.0</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
