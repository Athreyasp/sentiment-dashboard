
import { SignUp } from '@clerk/clerk-react'

export default function Signup() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Join Sentinel 2.0
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start analyzing market sentiment
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border shadow-lg",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "bg-background border hover:bg-accent",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              footerActionLink: "text-primary hover:text-primary/80"
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
