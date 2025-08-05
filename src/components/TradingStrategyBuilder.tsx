import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2, Play, Save, Settings, TrendingUp, Brain, AlertTriangle } from 'lucide-react'

interface Condition {
  id: string
  metric: string
  operator: string
  value: string
  logic?: 'AND' | 'OR'
}

interface TradingStrategy {
  id: string
  name: string
  conditions: Condition[]
  action: 'BUY' | 'SELL' | 'HOLD'
  isActive: boolean
}

const METRICS = [
  { value: 'price', label: 'Current Price' },
  { value: 'sentiment_score', label: 'Sentiment Score' },
  { value: 'volume', label: 'Trading Volume' },
  { value: 'change_percent', label: 'Price Change %' },
  { value: 'rsi', label: 'RSI' },
  { value: 'moving_avg_20', label: '20-Day Moving Average' },
  { value: 'moving_avg_50', label: '50-Day Moving Average' },
  { value: 'market_cap', label: 'Market Cap' },
  { value: 'news_impact', label: 'News Impact Score' }
]

const OPERATORS = [
  { value: 'gt', label: 'Greater than (>)' },
  { value: 'gte', label: 'Greater than or equal (>=)' },
  { value: 'lt', label: 'Less than (<)' },
  { value: 'lte', label: 'Less than or equal (<=)' },
  { value: 'eq', label: 'Equal to (=)' },
  { value: 'ne', label: 'Not equal to (!=)' }
]

export function TradingStrategyBuilder() {
  const [strategies, setStrategies] = useState<TradingStrategy[]>([
    {
      id: '1',
      name: 'Bullish Momentum',
      conditions: [
        { id: '1', metric: 'sentiment_score', operator: 'gte', value: '75', logic: 'AND' },
        { id: '2', metric: 'change_percent', operator: 'gt', value: '2' }
      ],
      action: 'BUY',
      isActive: true
    }
  ])
  
  const [currentStrategy, setCurrentStrategy] = useState<TradingStrategy>({
    id: '',
    name: '',
    conditions: [{ id: '1', metric: '', operator: '', value: '' }],
    action: 'BUY',
    isActive: false
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const addCondition = () => {
    const newId = Date.now().toString()
    setCurrentStrategy(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { id: newId, metric: '', operator: '', value: '', logic: 'AND' }
      ]
    }))
  }

  const removeCondition = (conditionId: string) => {
    setCurrentStrategy(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== conditionId)
    }))
  }

  const updateCondition = (conditionId: string, field: keyof Condition, value: string) => {
    setCurrentStrategy(prev => ({
      ...prev,
      conditions: prev.conditions.map(c => 
        c.id === conditionId ? { ...c, [field]: value } : c
      )
    }))
  }

  const saveStrategy = () => {
    if (!currentStrategy.name.trim()) {
      alert('Please enter a strategy name')
      return
    }

    if (currentStrategy.conditions.some(c => !c.metric || !c.operator || !c.value)) {
      alert('Please complete all conditions')
      return
    }

    const strategyToSave = {
      ...currentStrategy,
      id: currentStrategy.id || Date.now().toString(),
      isActive: false
    }

    if (isEditing) {
      setStrategies(prev => prev.map(s => s.id === strategyToSave.id ? strategyToSave : s))
      setIsEditing(false)
    } else {
      setStrategies(prev => [...prev, strategyToSave])
    }

    // Reset form
    setCurrentStrategy({
      id: '',
      name: '',
      conditions: [{ id: '1', metric: '', operator: '', value: '' }],
      action: 'BUY',
      isActive: false
    })
  }

  const editStrategy = (strategy: TradingStrategy) => {
    setCurrentStrategy(strategy)
    setIsEditing(true)
  }

  const deleteStrategy = (strategyId: string) => {
    setStrategies(prev => prev.filter(s => s.id !== strategyId))
  }

  const toggleStrategy = (strategyId: string) => {
    setStrategies(prev => prev.map(s => 
      s.id === strategyId ? { ...s, isActive: !s.isActive } : s
    ))
  }

  const testStrategy = () => {
    // Mock testing logic
    const mockResults = {
      backtestPeriod: '30 days',
      totalTrades: 12,
      successfulTrades: 8,
      successRate: 66.7,
      totalReturn: 8.5,
      maxDrawdown: -2.3,
      sharpeRatio: 1.45
    }
    setTestResults(mockResults)
  }

  const generateConditionText = (condition: Condition) => {
    const metric = METRICS.find(m => m.value === condition.metric)?.label || condition.metric
    const operator = OPERATORS.find(o => o.value === condition.operator)?.label || condition.operator
    return `${metric} ${operator} ${condition.value}`
  }

  return (
    <div className="space-y-6">
      {/* Strategy Builder */}
      <Card className="pixel-card shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-xl font-pixel">
            <div className="p-2 bg-gradient-to-r from-pixel-green/20 to-pixel-cyan/20 rounded-lg">
              <Settings className="w-5 h-5 text-pixel-green" />
            </div>
            <span className="gradient-text">
              {isEditing ? 'EDIT STRATEGY' : 'CREATE NEW STRATEGY'}
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Strategy Name and Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold font-pixel text-foreground mb-2 block">
                STRATEGY NAME
              </label>
              <Input
                placeholder="Enter strategy name..."
                value={currentStrategy.name}
                onChange={(e) => setCurrentStrategy(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold font-pixel text-foreground mb-2 block">
                ACTION
              </label>
              <Select 
                value={currentStrategy.action} 
                onValueChange={(value: 'BUY' | 'SELL' | 'HOLD') => 
                  setCurrentStrategy(prev => ({ ...prev, action: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                  <SelectItem value="HOLD">HOLD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold font-pixel text-foreground">
                CONDITIONS
              </label>
              <Button onClick={addCondition} size="sm" variant="outline" className="pixel-button">
                <Plus className="w-4 h-4 mr-2" />
                ADD CONDITION
              </Button>
            </div>

            <div className="space-y-4">
              {currentStrategy.conditions.map((condition, index) => (
                <div key={condition.id} className="border rounded-lg p-4 space-y-4">
                  {index > 0 && (
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={condition.logic || 'AND'} 
                        onValueChange={(value: 'AND' | 'OR') => 
                          updateCondition(condition.id, 'logic', value)
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AND">AND</SelectItem>
                          <SelectItem value="OR">OR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select 
                      value={condition.metric} 
                      onValueChange={(value) => updateCondition(condition.id, 'metric', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        {METRICS.map(metric => (
                          <SelectItem key={metric.value} value={metric.value}>
                            {metric.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={condition.operator} 
                      onValueChange={(value) => updateCondition(condition.id, 'operator', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPERATORS.map(op => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                    />

                    <Button
                      onClick={() => removeCondition(condition.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      disabled={currentStrategy.conditions.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {currentStrategy.name && currentStrategy.conditions.every(c => c.metric && c.operator && c.value) && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-semibold font-pixel text-foreground mb-2">STRATEGY PREVIEW:</p>
              <div className="text-sm font-space">
                <span className="font-semibold">{currentStrategy.name}</span>: 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-pixel ${
                  currentStrategy.action === 'BUY' ? 'bg-green-100 text-green-800' :
                  currentStrategy.action === 'SELL' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {currentStrategy.action}
                </span>
                <br />
                <span className="text-muted-foreground">
                  When {currentStrategy.conditions.map((condition, index) => (
                    <span key={condition.id}>
                      {index > 0 && ` ${condition.logic} `}
                      {generateConditionText(condition)}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Button onClick={saveStrategy} className="pixel-button">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'UPDATE STRATEGY' : 'SAVE STRATEGY'}
            </Button>
            
            <Button onClick={testStrategy} variant="outline" className="pixel-button">
              <Play className="w-4 h-4 mr-2" />
              TEST STRATEGY
            </Button>

            {isEditing && (
              <Button 
                onClick={() => {
                  setCurrentStrategy({
                    id: '',
                    name: '',
                    conditions: [{ id: '1', metric: '', operator: '', value: '' }],
                    action: 'BUY',
                    isActive: false
                  })
                  setIsEditing(false)
                }}
                variant="outline"
              >
                CANCEL
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults && (
        <Card className="pixel-card shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl font-pixel">
              <div className="p-2 bg-gradient-to-r from-pixel-orange/20 to-pixel-pink/20 rounded-lg">
                <Brain className="w-5 h-5 text-pixel-orange" />
              </div>
              <span className="gradient-text">BACKTEST RESULTS</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold font-pixel text-foreground">{testResults.successRate}%</div>
                <div className="text-sm text-muted-foreground font-space">Success Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold font-pixel text-pixel-green">+{testResults.totalReturn}%</div>
                <div className="text-sm text-muted-foreground font-space">Total Return</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold font-pixel text-foreground">{testResults.totalTrades}</div>
                <div className="text-sm text-muted-foreground font-space">Total Trades</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold font-pixel text-foreground">{testResults.sharpeRatio}</div>
                <div className="text-sm text-muted-foreground font-space">Sharpe Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Strategies */}
      <Card className="pixel-card shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-xl font-pixel">
            <div className="p-2 bg-gradient-to-r from-pixel-purple/20 to-pixel-pink/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-pixel-purple" />
            </div>
            <span className="gradient-text">SAVED STRATEGIES ({strategies.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map(strategy => (
              <div key={strategy.id} className="border rounded-lg p-4 hover:pixel-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold font-pixel text-foreground">{strategy.name}</h3>
                    <Badge 
                      className={`font-pixel text-xs ${
                        strategy.action === 'BUY' ? 'bg-green-100 text-green-800' :
                        strategy.action === 'SELL' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {strategy.action}
                    </Badge>
                    <Badge 
                      variant={strategy.isActive ? 'default' : 'secondary'}
                      className="font-pixel text-xs"
                    >
                      {strategy.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => toggleStrategy(strategy.id)}
                      variant="outline" 
                      size="sm"
                      className={`pixel-button text-xs ${
                        strategy.isActive ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                      }`}
                    >
                      {strategy.isActive ? 'DEACTIVATE' : 'ACTIVATE'}
                    </Button>
                    <Button 
                      onClick={() => editStrategy(strategy)}
                      variant="outline" 
                      size="sm"
                      className="pixel-button text-xs"
                    >
                      EDIT
                    </Button>
                    <Button 
                      onClick={() => deleteStrategy(strategy.id)}
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground font-space">
                  {strategy.conditions.map((condition, index) => (
                    <span key={condition.id}>
                      {index > 0 && ` ${condition.logic} `}
                      {generateConditionText(condition)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {strategies.length === 0 && (
              <div className="text-center p-8">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-pixel text-muted-foreground">NO STRATEGIES SAVED</p>
                <p className="text-sm text-muted-foreground font-space">Create your first trading strategy above</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}