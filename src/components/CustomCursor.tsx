
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

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
        isClicking ? 'scale-90' : isHovering ? 'scale-110' : 'scale-100'
      }`}
      style={{
        transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-200 ${
          isHovering ? 'drop-shadow-lg' : 'drop-shadow-md'
        }`}
        style={{
          filter: `drop-shadow(0 4px 12px rgba(0, 196, 159, 0.4))`,
        }}
      >
        {/* Main cursor body - smooth rounded triangular arrow */}
        <path
          d="M6 6C6 4.89543 6.89543 4 8 4C8.55228 4 9.05228 4.22386 9.4 4.6L24.4 19.6C25.2 20.4 25.2 21.6 24.4 22.4C23.6 23.2 22.4 23.2 21.6 22.4L16 16.8V24C16 25.1046 15.1046 26 14 26H8C6.89543 26 6 25.1046 6 24V6Z"
          fill="#00C49F"
          className={`transition-all duration-200 ${
            isClicking ? 'opacity-80' : 'opacity-100'
          }`}
        />
        
        {/* Inner highlight for depth */}
        <path
          d="M8 6C8 5.44772 8.44772 5 9 5C9.27614 5 9.52386 5.11193 9.7 5.3L22.7 18.3C23.1 18.7 23.1 19.3 22.7 19.7C22.3 20.1 21.7 20.1 21.3 19.7L17 15.4V23C17 23.5523 16.5523 24 16 24H9C8.44772 24 8 23.5523 8 23V6Z"
          fill="rgba(255, 255, 255, 0.25)"
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-40' : 'opacity-25'
          }`}
        />
      </svg>

      {/* Hover glow effect */}
      {isHovering && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, rgba(0, 196, 159, 0.3) 0%, transparent 70%)',
            transform: 'translate(-4px, -4px)',
            width: '40px',
            height: '40px',
          }}
        />
      )}
    </div>
  )
}
