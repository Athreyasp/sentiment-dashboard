
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
        transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px) ${
          isClicking ? 'scale(0.9)' : isHovering ? 'scale(1.25)' : 'scale(1)'
        }`,
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
        style={{
          filter: `drop-shadow(0 4px 8px rgba(0, 196, 159, 0.4))`,
        }}
      >
        <path
          d="M5 7.5C5 6.11929 6.11929 5 7.5 5H16.5C17.3284 5 18 5.67157 18 6.5C18 7.32843 17.3284 8 16.5 8H10L16.5 14.5C17.3284 14.5 18 15.1716 18 16C18 16.8284 17.3284 17.5 16.5 17.5H7.5C6.11929 17.5 5 16.3807 5 15V7.5Z"
          fill="#00C49F"
          className={`transition-all duration-200 ${
            isClicking ? 'opacity-80' : 'opacity-100'
          }`}
        />
        
        {/* Subtle highlight for depth */}
        <path
          d="M7 8C7 7.44772 7.44772 7 8 7H15C15.2761 7 15.5 7.22386 15.5 7.5C15.5 7.77614 15.2761 8 15 8H9.5L15 13.5C15.2761 13.5 15.5 13.7239 15.5 14C15.5 14.2761 15.2761 14.5 15 14.5H8C7.44772 14.5 7 14.0523 7 13.5V8Z"
          fill="rgba(255, 255, 255, 0.3)"
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-40' : 'opacity-20'
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
            width: '32px',
            height: '32px',
          }}
        />
      )}
    </div>
  )
}
