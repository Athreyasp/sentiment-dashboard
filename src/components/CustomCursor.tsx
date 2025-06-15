
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
        isClicking ? 'scale-90' : isHovering ? 'scale-125' : 'scale-100'
      }`}
      style={{
        transform: `translate(${mousePosition.x - 14}px, ${mousePosition.y - 14}px)`,
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-200 ${
          isHovering ? 'drop-shadow-xl' : 'drop-shadow-lg'
        }`}
        style={{
          filter: `drop-shadow(0 6px 20px rgba(0, 196, 159, 0.5))`,
        }}
      >
        {/* Main triangular arrow body - rounded and smooth */}
        <path
          d="M4 4C4 2.34315 5.34315 1 7 1C7.89443 1 8.68393 1.44772 9.12132 2.12132L24.8787 17.8787C25.6839 18.6839 25.6016 19.9645 24.7071 20.7071L20.7071 24.7071C19.9645 25.6016 18.6839 25.6839 17.8787 24.8787L2.12132 9.12132C1.44772 8.68393 1 7.89443 1 7V7C1 5.34315 2.34315 4 4 4Z"
          fill="#00C49F"
          className={`transition-all duration-200 ${
            isClicking ? 'opacity-80' : 'opacity-100'
          }`}
        />
        
        {/* Inner highlight for depth and dimension */}
        <path
          d="M6 5C6 4.44772 6.44772 4 7 4C7.36819 4 7.69238 4.19861 7.86603 4.5L21.5 18.1340C21.8478 18.4819 21.8478 19.0181 21.5 19.3660L19.3660 21.5C19.0181 21.8478 18.4819 21.8478 18.1340 21.5L4.5 7.86603C4.19861 7.69238 4 7.36819 4 7C4 6.44772 4.44772 6 5 6H6Z"
          fill="rgba(255, 255, 255, 0.2)"
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-40' : 'opacity-20'
          }`}
        />
      </svg>

      {/* Enhanced hover glow effect */}
      {isHovering && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, rgba(0, 196, 159, 0.4) 0%, transparent 70%)',
            transform: 'translate(-6px, -6px)',
            width: '40px',
            height: '40px',
          }}
        />
      )}
    </div>
  )
}
