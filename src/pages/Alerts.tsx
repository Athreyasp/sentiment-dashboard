
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bell, Settings, Trash2, Plus, Zap, Shield, Target, Mail } from 'lucide-react'

const activeAlerts = [
  {
    id: 1,
    ticker: 'AAPL',
    type: 'Sentiment Drop',
    condition: 'Below 50',
    current: 75,
    active: true,
    lastTriggered: null
  },
  {
    id: 2,
    ticker: 'TSLA',
    type: 'High Impact News',
    condition: 'Impact > 80%',
    current: 92,
    active: true,
    lastTriggered: '2 hours ago'
  },
  {
    id: 3,
    ticker: 'MSFT',
    type: 'Sentiment Spike',
    condition: 'Above 85',
    current: 68,
    active: false,
    lastTriggered: null
  }
]

export default function Alerts() {
  const [telegramHandle, setTelegramHandle] = useState('@yourhandle')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [alerts, setAlerts] = useState(activeAlerts)

  const toggleAlert = (id: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    )
  }

  const deleteAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-amber-100 dark:border-slate-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-amber-800 to-orange-800 dark:from-white dark:via-amber-200 dark:to-orange-200 bg-clip-text text-transparent">
                  Alerts & Settings
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Configure intelligent notifications and alert conditions
                </p>
              </div>
            </div>
            
            <Button className="h-12 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              New Alert
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Notification Settings */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/20 border-2 border-blue-100 dark:border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="telegram" className="text-sm font-semibold">Telegram Handle</Label>
              <Input
                id="telegram"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                placeholder="@yourhandle"
                className="h-12 bg-white/70 dark:bg-slate-700/50"
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <Label className="font-semibold">Email Notifications</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Receive alerts via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <div>
                    <Label className="font-semibold">Push Notifications</Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Browser push notifications
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Alert Summary</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Alerts</span>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {alerts.filter(a => a.active).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Alerts</span>
                  <Badge variant="outline">{alerts.length}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Active Alerts */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/20 border-2 border-purple-100 dark:border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>Your Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-6 bg-gradient-to-r from-white/80 to-slate-50/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border border-white/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{alert.ticker}</span>
                      </div>
                      <div>
                        <span className="font-bold text-lg">{alert.type}</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            className={alert.active 
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                              : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
                            }
                          >
                            {alert.active ? '🟢 Active' : '🔴 Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={alert.active}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                        className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-600 dark:text-slate-400">Condition:</span>
                      <span className="font-semibold">{alert.condition}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-400">Current:</span>
                      <span className="font-semibold">{alert.current}</span>
                    </div>
                  </div>

                  {alert.lastTriggered && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <span className="text-sm text-amber-700 dark:text-amber-400">
                        ⚡ Last triggered: {alert.lastTriggered}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {alerts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No alerts configured yet</h3>
                  <p className="text-slate-600 dark:text-slate-400">Create your first alert to get started with intelligent notifications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
