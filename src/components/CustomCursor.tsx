
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

  // Get theme-aware colors
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const fillColor = '#00C49F' // Brand accent color
  const strokeColor = isDarkMode ? '#ffffff' : '#000000'

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150 ease-out ${
        isClicking ? 'scale-90' : isHovering ? 'scale-110' : 'scale-100'
      }`}
      style={{
        transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px)`,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-200 ${
          isHovering ? 'drop-shadow-lg' : 'drop-shadow-md'
        }`}
        style={{
          filter: `drop-shadow(0 4px 8px rgba(0, 196, 159, 0.3))`,
        }}
      >
        <defs>
          <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop offset="100%" stopColor="#00A085" />
          </linearGradient>
        </defs>
        
        <path
          d="M4 4L20 12L13 13L12 20L4 4Z"
          fill="url(#cursor-gradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-200 ${
            isClicking ? 'opacity-80' : 'opacity-100'
          }`}
        />
        
        {/* Add subtle inner highlight */}
        <path
          d="M6 6L16 11.5L12 12L11.5 16L6 6Z"
          fill="rgba(255, 255, 255, 0.2)"
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-60' : 'opacity-30'
          }`}
        />
      </svg>

      {/* Hover indicator ring */}
      {isHovering && (
        <div 
          className="absolute inset-0 w-8 h-8 rounded-full border border-[#00C49F]/40 animate-ping"
          style={{
            transform: 'translate(-4px, -4px)',
          }}
        />
      )}
    </div>
  )
}
