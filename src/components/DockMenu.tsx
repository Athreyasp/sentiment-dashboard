
import React, { useState, useRef, useEffect } from 'react'
import { Home, Archive, User, Settings, Search, Bell, Heart, Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DockItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  isActive?: boolean
}

interface DockMenuProps {
  items?: DockItem[]
  panelHeight?: number
  baseItemSize?: number
  magnification?: number
  className?: string
}

const defaultItems: DockItem[] = [
  {
    id: 'home',
    icon: Home,
    label: 'Home',
    onClick: () => console.log('Home clicked'),
    isActive: true
  },
  {
    id: 'search',
    icon: Search,
    label: 'Search',
    onClick: () => console.log('Search clicked')
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    onClick: () => console.log('Notifications clicked')
  },
  {
    id: 'favorites',
    icon: Heart,
    label: 'Favorites',
    onClick: () => console.log('Favorites clicked')
  },
  {
    id: 'bookmarks',
    icon: Bookmark,
    label: 'Bookmarks',
    onClick: () => console.log('Bookmarks clicked')
  },
  {
    id: 'archive',
    icon: Archive,
    label: 'Archive',
    onClick: () => console.log('Archive clicked')
  },
  {
    id: 'profile',
    icon: User,
    label: 'Profile',
    onClick: () => console.log('Profile clicked')
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings',
    onClick: () => console.log('Settings clicked')
  }
]

export function DockMenu({
  items = defaultItems,
  panelHeight = 80,
  baseItemSize = 48,
  magnification = 1.5,
  className
}: DockMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const dockRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const getItemScale = (index: number) => {
    if (hoveredIndex === null) return 1
    
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return magnification
    if (distance === 1) return 1 + (magnification - 1) * 0.5
    if (distance === 2) return 1 + (magnification - 1) * 0.25
    return 1
  }

  const getItemSize = (index: number) => {
    const scale = getItemScale(index)
    return baseItemSize * scale
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div
        ref={dockRef}
        className="relative flex items-end gap-2 px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl"
        style={{ height: panelHeight }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredIndex(null)
          setMousePosition({ x: 0, y: 0 })
        }}
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {items.map((item, index) => {
          const ItemIcon = item.icon
          const size = getItemSize(index)
          const scale = getItemScale(index)
          
          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={item.onClick}
              style={{
                transform: `scale(${scale})`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-white" />
                </div>
              </div>

              {/* Icon container */}
              <div
                className={cn(
                  "relative flex items-center justify-center rounded-xl transition-all duration-300",
                  "hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20",
                  item.isActive
                    ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                )}
                style={{
                  width: size,
                  height: size
                }}
              >
                {/* Active indicator */}
                {item.isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                )}
                
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <ItemIcon 
                  className={cn(
                    "transition-all duration-300",
                    scale > 1.2 ? "w-7 h-7" : "w-6 h-6"
                  )}
                />
              </div>

              {/* Reflection effect */}
              <div
                className={cn(
                  "absolute top-full mt-1 flex items-center justify-center rounded-xl opacity-30 blur-sm",
                  item.isActive
                    ? "bg-gradient-to-br from-purple-500 to-blue-500"
                    : "bg-slate-100 dark:bg-slate-700"
                )}
                style={{
                  width: size * 0.8,
                  height: size * 0.3,
                  transform: 'scaleY(-1)'
                }}
              >
                <ItemIcon 
                  className={cn(
                    "text-white opacity-50",
                    scale > 1.2 ? "w-5 h-5" : "w-4 h-4"
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
