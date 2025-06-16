
import { useState, useEffect } from 'react'

interface UsePreloaderOptions {
  minLoadTime?: number
  onComplete?: () => void
}

export function usePreloader({ minLoadTime = 3000, onComplete }: UsePreloaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      onComplete?.()
    }, minLoadTime)

    return () => clearTimeout(timer)
  }, [minLoadTime, onComplete])

  return { isLoading }
}
