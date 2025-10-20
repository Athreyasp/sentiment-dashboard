import { useState } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ModernAuth from './ModernAuth'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 border-0 bg-transparent overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 p-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
        >
          <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
        
        <ModernAuth defaultView={isSignUp ? 'signup' : 'login'} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
