
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
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
        transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
      }}
    >
      {/* Custom SVG Arrow Cursor */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${
          isHovering ? 'drop-shadow-lg' : 'drop-shadow-sm'
        }`}
      >
        {/* Outer glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main arrow shape */}
        <path
          d="M4 4 L4 20 L10 14 L14 18 L18 14 L10 10 L16 4 Z"
          fill="#00C49F"
          stroke="#ffffff"
          strokeWidth="1"
          filter="url(#glow)"
          className="transition-all duration-200"
        />
        
        {/* Inner highlight for futuristic effect */}
        <path
          d="M6 6 L6 16 L9 13 L12 16 L15 13 L9 9 L14 6 Z"
          fill="rgba(255, 255, 255, 0.2)"
          className={`transition-opacity duration-200 ${
            isHovering ? 'opacity-40' : 'opacity-20'
          }`}
        />
      </svg>
      
      {/* Animated trailing dots */}
      <div
        className={`absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
          isHovering 
            ? 'bg-[#00C49F]/40 scale-150 animate-pulse' 
            : 'bg-[#00C49F]/20 scale-100'
        }`}
        style={{
          animationDelay: '0ms'
        }}
      />
      
      <div
        className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${
          isHovering 
            ? 'bg-[#00C49F]/30 scale-125' 
            : 'bg-[#00C49F]/15 scale-75'
        }`}
        style={{
          transform: `translate(calc(-50% - 8px), calc(-50% - 8px)) scale(${isHovering ? 1.25 : 0.75})`,
          animationDelay: '100ms'
        }}
      />
    </div>
  )
}
