
import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select, .hover-target')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select, .hover-target')) {
        setIsHovering(false)
      }
    }

    // Hide default cursor
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      // Restore default cursor
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
      
      // Remove event listeners
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  const isDark = theme === 'dark'

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
        isClicking ? 'scale-90' : isHovering ? 'scale-110' : 'scale-100'
      }`}
      style={{
        transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-200 ${
          isHovering ? 'drop-shadow-lg' : 'drop-shadow-md'
        }`}
      >
        {/* Main triangular arrow - sleek black design */}
        <path
          d="M3 3C3 1.89543 3.89543 1 5 1C5.55228 1 6.05228 1.22386 6.4 1.6L20.4 15.6C21.2 16.4 21.2 17.6 20.4 18.4L18.4 20.4C17.6 21.2 16.4 21.2 15.6 20.4L1.6 6.4C1.22386 6.05228 1 5.55228 1 5C1 3.89543 1.89543 3 3 3Z"
          fill={isDark ? "#FFFFFF" : "#000000"}
          className={`transition-all duration-200 ${
            isClicking ? 'opacity-80' : 'opacity-95'
          }`}
        />
        
        {/* Subtle inner highlight */}
        <path
          d="M4 4C4 3.44772 4.44772 3 5 3C5.27614 3 5.52386 3.11193 5.7 3.3L17.7 15.3C18.1 15.7 18.1 16.3 17.7 16.7L16.7 17.7C16.3 18.1 15.7 18.1 15.3 17.7L3.3 5.7C3.11193 5.52386 3 5.27614 3 5C3 4.44772 3.44772 4 4 4Z"
          fill={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"}
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-60' : 'opacity-30'
          }`}
        />
      </svg>

      {/* Hover glow effect */}
      {isHovering && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, transparent 70%)',
            transform: 'translate(-4px, -4px)',
            width: '32px',
            height: '32px',
          }}
        />
      )}
    </div>
  )
}
