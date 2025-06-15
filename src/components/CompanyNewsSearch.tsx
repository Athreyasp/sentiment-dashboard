
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Building2, X } from 'lucide-react'

interface CompanyNewsSearchProps {
  onSearch: (query: string) => void
  currentSearch: string
}

export function CompanyNewsSearch({ onSearch, currentSearch }: CompanyNewsSearchProps) {
  const [searchInput, setSearchInput] = useState(currentSearch)

  const popularCompanies = [
    'Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Meta', 'Netflix', 'NVIDIA',
    'JPMorgan', 'Berkshire', 'Johnson', 'Visa', 'Procter', 'Mastercard',
    'Toyota', 'Samsung', 'ASML', 'Taiwan Semi', 'Renesas', 'Sony'
  ]

  const handleSearch = () => {
    onSearch(searchInput)
  }

  const handleCompanyClick = (company: string) => {
    setSearchInput(company)
    onSearch(company)
  }

  const clearSearch = () => {
    setSearchInput('')
    onSearch('')
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-600">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Search Company News
            </h3>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search for company news (e.g., Renesas, Apple, Tesla)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-10"
              />
              {searchInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>

          {currentSearch && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Showing news for:
              </span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                {currentSearch}
              </Badge>
              <Button onClick={clearSearch} variant="ghost" size="sm">
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Popular Companies:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularCompanies.map((company) => (
                <Badge
                  key={company}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-100 hover:border-blue-300 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => handleCompanyClick(company)}
                >
                  {company}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
