
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
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150 ease-out ${
        isHovering ? 'scale-150' : 'scale-100'
      } ${isClicking ? 'scale-75' : ''}`}
      style={{
        transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px) scale(${
          isHovering ? 1.5 : 1
        }) ${isClicking ? 'scale(0.75)' : ''}`,
      }}
    >
      <div
        className={`w-6 h-6 transition-all duration-200 ${
          isHovering 
            ? 'opacity-80 drop-shadow-lg' 
            : 'opacity-100'
        }`}
      >
        <img
          src="/lovable-uploads/12a2755a-a895-48cd-8135-3acfd44e1c64.png"
          alt="Custom Cursor"
          className="w-full h-full object-contain filter drop-shadow-sm"
          draggable={false}
        />
      </div>
      
      {/* Trailing effect */}
      <div
        className={`absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isHovering 
            ? 'bg-[#00C49F]/30 scale-150' 
            : 'bg-[#00C49F]/20 scale-100'
        }`}
      />
    </div>
  )
}
