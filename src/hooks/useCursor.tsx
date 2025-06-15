
import { useEffect, useState } from 'react'

export function useCursor() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop devices
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLargeScreen = window.innerWidth >= 768
      setIsDesktop(!hasTouch && isLargeScreen)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return { showCustomCursor: isDesktop }
}
