
import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Check, AlertCircle } from 'lucide-react'

interface TickerUploadProps {
  onTickersAdded: (tickers: string[]) => void
}

export function TickerUpload({ onTickersAdded }: TickerUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [manualTicker, setManualTicker] = useState('')
  const [validationMessage, setValidationMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setValidationMessage({ type: 'error', text: 'Please upload a valid CSV file' })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target?.result as string
      const lines = csv.split('\n')
      const tickers = lines
        .map(line => line.trim().toUpperCase())
        .filter(ticker => ticker && /^[A-Z]{1,5}$/.test(ticker))
      
      if (tickers.length === 0) {
        setValidationMessage({ type: 'error', text: 'No valid ticker symbols found in CSV' })
      } else {
        onTickersAdded(tickers)
        setValidationMessage({ type: 'success', text: `Added ${tickers.length} ticker(s) successfully` })
      }
    }
    reader.readAsText(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const validateTicker = (ticker: string): boolean => {
    return /^[A-Z]{1,5}$/.test(ticker.toUpperCase())
  }

  const handleManualAdd = () => {
    const ticker = manualTicker.trim().toUpperCase()
    if (!validateTicker(ticker)) {
      setValidationMessage({ type: 'error', text: 'Please enter a valid ticker symbol (1-5 letters)' })
      return
    }
    
    onTickersAdded([ticker])
    setManualTicker('')
    setValidationMessage({ type: 'success', text: `Added ${ticker} successfully` })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualAdd()
    }
  }

  return (
    <div className="space-y-6">
      {/* CSV Upload Area */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#00C49F] dark:hover:border-[#00C49F] transition-colors">
        <CardContent className="p-8">
          <div
            className={`relative text-center transition-colors ${
              dragActive 
                ? 'bg-[#00C49F]/10 border-[#00C49F] rounded-lg p-6' 
                : 'p-6'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Upload CSV File
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Drag and drop your CSV file here, or click to browse
            </p>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="border-[#00C49F] text-[#00C49F] hover:bg-[#00C49F] hover:text-white"
            >
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />
            <p className="text-xs text-slate-400 mt-2">
              Expected format: One ticker symbol per line (e.g., AAPL, TSLA, GOOGL)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Manual Input */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
            Add Ticker Manually
          </h3>
          <div className="flex space-x-3">
            <Input
              placeholder="Enter ticker symbol (e.g., AAPL)"
              value={manualTicker}
              onChange={(e) => setManualTicker(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleManualAdd}
              className="bg-[#00C49F] hover:bg-[#00C49F]/90 text-white"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation Message */}
      {validationMessage && (
        <Card className={`${
          validationMessage.type === 'success' 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {validationMessage.type === 'success' ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                validationMessage.type === 'success' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
              }`}>
                {validationMessage.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setValidationMessage(null)}
                className="ml-auto p-1 h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
