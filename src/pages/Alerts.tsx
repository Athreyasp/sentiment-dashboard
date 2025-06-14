
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bell, Settings, Trash2, Plus } from 'lucide-react'

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Settings</h1>
          <p className="text-muted-foreground">
            Configure notifications and alert conditions
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram Handle</Label>
              <Input
                id="telegram"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                placeholder="@yourhandle"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>

            <Separator />

            <div className="pt-4">
              <h4 className="font-medium mb-2">Alert Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Alerts</span>
                  <span className="font-medium">{alerts.filter(a => a.active).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Alerts</span>
                  <span className="font-medium">{alerts.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {alert.ticker}
                      </Badge>
                      <span className="font-medium">{alert.type}</span>
                      <Badge 
                        className={alert.active 
                          ? "bg-positive/10 text-positive border-positive/20" 
                          : "bg-muted text-muted-foreground"
                        }
                      >
                        {alert.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={alert.active}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Condition: </span>
                      <span className="font-medium">{alert.condition}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-medium">{alert.current}</span>
                    </div>
                  </div>

                  {alert.lastTriggered && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Last triggered: {alert.lastTriggered}
                    </div>
                  )}
                </div>
              ))}

              {alerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No alerts configured yet</p>
                  <p className="text-sm">Create your first alert to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
