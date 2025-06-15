
import { useState, useEffect } from 'react'

interface UsePreloaderOptions {
  minLoadTime?: number
  onComplete?: () => void
}

export function usePreloader({ minLoadTime = 5000, onComplete }: UsePreloaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start exit animation
      setIsExiting(true)
      
      // Complete loading after exit animation
      setTimeout(() => {
        setIsLoading(false)
        onComplete?.()
      }, 800) // Allow time for fade-out animation
      
    }, minLoadTime)

    return () => clearTimeout(timer)
  }, [minLoadTime, onComplete])

  return { isLoading, isExiting }
}
