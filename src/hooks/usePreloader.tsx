
import { useState, useEffect } from 'react'

export function usePreloader(minLoadTime: number = 5000): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadTime)

    return () => clearTimeout(timer)
  }, [minLoadTime])

  return isLoading
}
