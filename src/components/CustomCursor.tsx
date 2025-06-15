
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let trailId = 0

    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePosition(newPos)
      
      // Add trail effect
      setTrail(prev => {
        const newTrail = [...prev, { ...newPos, id: trailId++ }].slice(-8)
        return newTrail
      })
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
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${point.x - 2}px, ${point.y - 2}px)`,
            opacity: (index + 1) / trail.length * 0.6,
          }}
        >
          <div 
            className="w-1 h-1 rounded-full bg-[#00C49F] animate-pulse"
            style={{
              animationDelay: `${index * 50}ms`,
              transform: `scale(${(index + 1) / trail.length})`,
            }}
          />
        </div>
      ))}

      {/* Main cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
        }}
      >
        {/* Outer glow ring */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovering 
              ? 'bg-[#00C49F]/20 scale-150 animate-pulse' 
              : 'bg-[#00C49F]/10 scale-100'
          }`}
          style={{
            width: '32px',
            height: '32px',
            filter: 'blur(8px)',
          }}
        />

        {/* Custom SVG Arrow Cursor */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`relative z-10 transition-all duration-200 ${
            isHovering ? 'drop-shadow-2xl' : 'drop-shadow-lg'
          }`}
        >
          {/* Enhanced glow effect */}
          <defs>
            <filter id="enhanced-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feColorMatrix
                in="coloredBlur"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0.769
                        0 0 0 0 0.624
                        0 0 0 1 0"
              />
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5B8" />
              <stop offset="50%" stopColor="#00C49F" />
              <stop offset="100%" stopColor="#00A085" />
            </linearGradient>
          </defs>
          
          {/* Main arrow shape with gradient */}
          <path
            d="M6 6 L6 22 L12 16 L16 20 L20 16 L12 12 L18 6 Z"
            fill="url(#arrow-gradient)"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#enhanced-glow)"
            className={`transition-all duration-200 ${
              isClicking ? 'scale-90' : 'scale-100'
            }`}
          />
          
          {/* Inner highlight with animation */}
          <path
            d="M8 8 L8 18 L11 15 L14 18 L17 15 L11 11 L16 8 Z"
            fill="rgba(255, 255, 255, 0.3)"
            className={`transition-all duration-300 ${
              isHovering ? 'opacity-60 animate-pulse' : 'opacity-30'
            }`}
          />

          {/* Dynamic accent dots */}
          <circle
            cx="10"
            cy="10"
            r="1"
            fill="#ffffff"
            className={`transition-all duration-500 ${
              isHovering ? 'opacity-80 animate-ping' : 'opacity-40'
            }`}
          />
          
          <circle
            cx="14"
            cy="14"
            r="0.8"
            fill="#00E5B8"
            className={`transition-all duration-700 ${
              isHovering ? 'opacity-70 animate-pulse' : 'opacity-30'
            }`}
            style={{ animationDelay: '200ms' }}
          />
        </svg>

        {/* Orbiting particles */}
        {isHovering && (
          <>
            <div 
              className="absolute w-1 h-1 bg-[#00C49F] rounded-full animate-spin"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: 'translate(-50%, -50%) rotate(0deg) translateX(20px)',
                animationDuration: '2s',
              }}
            />
            <div 
              className="absolute w-0.5 h-0.5 bg-[#00E5B8] rounded-full animate-spin"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: 'translate(-50%, -50%) rotate(120deg) translateX(16px)',
                animationDuration: '3s',
                animationDirection: 'reverse',
              }}
            />
          </>
        )}
      </div>
    </>
  )
}
