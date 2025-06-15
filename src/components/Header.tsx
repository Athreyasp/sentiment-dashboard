
import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/clerk-react'
import { SentinelLogo } from './SentinelLogo'
import { SearchResults } from './SearchResults'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on / or Cmd+K
      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault()
        inputRef.current?.focus()
        setShowResults(true)
      }
      // Close search on Escape
      if (e.key === 'Escape') {
        setShowResults(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle clicks outside search area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setShowResults(value.length >= 2)
  }

  const handleSearchFocus = () => {
    if (searchTerm.length >= 2) {
      setShowResults(true)
    }
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setSearchTerm('')
  }

  return (
    <header className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-700/50 backdrop-blur-sm flex items-center justify-between px-6 shadow-lg animate-fade-in">
      {/* Enhanced Search Bar with Live Results */}
      <div className="flex-1 max-w-2xl animate-slide-up" ref={searchRef}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[#00C49F] transition-all duration-300 group-focus-within:scale-110" />
          <Input
            ref={inputRef}
            placeholder="Search tickers, news, sectors..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            className="pl-12 pr-16 h-12 bg-slate-800/70 dark:bg-slate-900/70 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/20 transition-all duration-300 backdrop-blur-sm hover:bg-slate-800/80 dark:hover:bg-slate-900/80 rounded-lg font-medium"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-slate-600 bg-slate-700/80 px-2 font-mono text-xs font-medium text-slate-300 opacity-100 transition-opacity duration-200 group-focus-within:opacity-60">
              ⌘K
            </kbd>
          </div>
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00C49F]/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
          
          {/* Live Search Results */}
          <SearchResults 
            searchTerm={searchTerm}
            isVisible={showResults}
            onClose={handleCloseResults}
          />
        </div>
      </div>

      {/* Enhanced User Profile Section */}
      <div className="flex items-center animate-fade-in">
        {/* Enhanced User Profile */}
        <div className="relative animate-scale-in">
          {/* Online status indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C49F] rounded-full border-2 border-slate-900 z-10 animate-pulse">
            <div className="w-full h-full bg-[#00C49F] rounded-full animate-ping opacity-75"></div>
          </div>
          
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-12 h-12 ring-2 ring-[#00C49F]/30 hover:ring-[#00C49F]/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#00C49F]/20",
                userButtonPopoverCard: "bg-slate-800/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-600/50 animate-scale-in z-50"
              }
            }}
          />
          
          {/* Glowing ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00C49F]/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-md animate-pulse"></div>
        </div>
      </div>
    </header>
  )
}
