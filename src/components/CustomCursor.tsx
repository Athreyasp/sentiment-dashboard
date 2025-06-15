
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
      
      // Add trail effect with fewer particles for cleaner look
      setTrail(prev => {
        const newTrail = [...prev, { ...newPos, id: trailId++ }].slice(-5)
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
      {/* Trail particles with geometric shapes */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${point.x - 3}px, ${point.y - 3}px)`,
            opacity: (index + 1) / trail.length * 0.4,
          }}
        >
          <div 
            className="w-2 h-2 bg-[#00C49F] rotate-45 animate-pulse"
            style={{
              animationDelay: `${index * 100}ms`,
              transform: `scale(${(index + 1) / trail.length}) rotate(45deg)`,
            }}
          />
        </div>
      ))}

      {/* Main cursor container */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isClicking ? 'scale-90' : isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      >
        {/* Outer rotating ring */}
        <div 
          className={`absolute inset-0 w-10 h-10 rounded-full border-2 border-[#00C49F]/30 animate-spin transition-all duration-300 ${
            isHovering ? 'scale-150 border-[#00C49F]/60' : 'scale-100'
          }`}
          style={{ animationDuration: '4s' }}
        />

        {/* Middle pulsing ring */}
        <div 
          className={`absolute inset-2 w-6 h-6 rounded-full border border-[#00C49F]/50 animate-pulse transition-all duration-300 ${
            isHovering ? 'scale-125 border-[#00C49F]/80' : 'scale-100'
          }`}
        />

        {/* Main cursor - futuristic hexagon design */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Enhanced glow and shadow effects */}
          <defs>
            <filter id="futuristic-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
            
            <radialGradient id="hexagon-gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00E5B8" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#00C49F" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00A085" stopOpacity="0.5" />
            </radialGradient>

            <linearGradient id="inner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00E5B8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Main hexagonal cursor body */}
          <polygon
            points="20,8 28,14 28,26 20,32 12,26 12,14"
            fill="url(#hexagon-gradient)"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#futuristic-glow)"
            className={`transition-all duration-200 ${
              isClicking ? 'scale-95' : 'scale-100'
            }`}
          />
          
          {/* Inner hexagon with animated fill */}
          <polygon
            points="20,12 24,16 24,24 20,28 16,24 16,16"
            fill="url(#inner-gradient)"
            className={`transition-all duration-300 ${
              isHovering ? 'opacity-80 animate-pulse' : 'opacity-40'
            }`}
          />

          {/* Central targeting dot */}
          <circle
            cx="20"
            cy="20"
            r="2"
            fill="#ffffff"
            className={`transition-all duration-500 ${
              isHovering ? 'opacity-100 animate-ping' : 'opacity-60'
            }`}
          />

          {/* Corner accent lines */}
          <g className={`transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <line x1="16" y1="12" x2="18" y2="14" stroke="#00E5B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="12" x2="22" y2="14" stroke="#00E5B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="28" x2="18" y2="26" stroke="#00E5B8" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="28" x2="22" y2="26" stroke="#00E5B8" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Animated scanning lines */}
          {isHovering && (
            <g className="animate-pulse" style={{ animationDuration: '1.5s' }}>
              <line x1="12" y1="20" x2="28" y2="20" stroke="#00C49F" strokeWidth="0.5" opacity="0.7" />
              <line x1="20" y1="12" x2="20" y2="28" stroke="#00C49F" strokeWidth="0.5" opacity="0.7" />
            </g>
          )}
        </svg>

        {/* Floating particles around cursor on hover */}
        {isHovering && (
          <>
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-[#00C49F] rounded-full animate-ping"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(25px)`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </>
        )}

        {/* Energy field effect */}
        <div 
          className={`absolute inset-0 w-10 h-10 rounded-full transition-all duration-500 ${
            isHovering 
              ? 'bg-[#00C49F]/10 scale-200 animate-pulse' 
              : 'bg-[#00C49F]/5 scale-100'
          }`}
          style={{
            filter: 'blur(12px)',
          }}
        />
      </div>
    </>
  )
}
