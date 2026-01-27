"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  MapPin,
  Database,
  Key,
  Monitor,
  Smartphone,
  Mail,
  Volume2,
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    highPriority: true,
    newFir: true,
    zoneAlerts: true,
  })

  const [mapSettings, setMapSettings] = useState({
    autoRefresh: true,
    refreshInterval: 30,
    showHeatmap: true,
    showPatrols: true,
    clusterMarkers: true,
  })

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and system configuration</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Map Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your personal details and officer information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
                      Change Photo
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-foreground">Full Name</Label>
                    <Input defaultValue="Inspector Rajesh Shah" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Badge Number</Label>
                    <Input defaultValue="MH-4521" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Email</Label>
                    <Input defaultValue="r.shah@mumbaipolice.gov.in" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Phone</Label>
                    <Input defaultValue="+91 98765 43210" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Assigned Zone</Label>
                    <Select defaultValue="zone4">
                      <SelectTrigger className="bg-secondary border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="zone1" className="text-foreground focus:bg-secondary">Zone 1 - South</SelectItem>
                        <SelectItem value="zone2" className="text-foreground focus:bg-secondary">Zone 2 - Central</SelectItem>
                        <SelectItem value="zone3" className="text-foreground focus:bg-secondary">Zone 3 - West</SelectItem>
                        <SelectItem value="zone4" className="text-foreground focus:bg-secondary">Zone 4 - East</SelectItem>
                        <SelectItem value="zone5" className="text-foreground focus:bg-secondary">Zone 5 - North</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Rank</Label>
                    <Select defaultValue="inspector">
                      <SelectTrigger className="bg-secondary border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="constable" className="text-foreground focus:bg-secondary">Constable</SelectItem>
                        <SelectItem value="si" className="text-foreground focus:bg-secondary">Sub-Inspector</SelectItem>
                        <SelectItem value="inspector" className="text-foreground focus:bg-secondary">Inspector</SelectItem>
                        <SelectItem value="aci" className="text-foreground focus:bg-secondary">ACI</SelectItem>
                        <SelectItem value="dcp" className="text-foreground focus:bg-secondary">DCP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
                    Cancel
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose how and when you want to receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Channels */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-foreground">Notification Channels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Browser and mobile push alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">SMS Alerts</p>
                          <p className="text-sm text-muted-foreground">Critical alerts via text message</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Alert Types */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-foreground">Alert Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">High Priority Incidents</p>
                        <p className="text-sm text-muted-foreground">Immediate alerts for critical cases</p>
                      </div>
                      <Switch
                        checked={notifications.highPriority}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, highPriority: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">New FIR Submissions</p>
                        <p className="text-sm text-muted-foreground">Notify when new FIRs are filed</p>
                      </div>
                      <Switch
                        checked={notifications.newFir}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newFir: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Zone Activity Alerts</p>
                        <p className="text-sm text-muted-foreground">Updates from your assigned zone</p>
                      </div>
                      <Switch
                        checked={notifications.zoneAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, zoneAlerts: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Settings Tab */}
          <TabsContent value="map" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Map Configuration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Customize how the crime map displays information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auto Refresh */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto Refresh</p>
                    <p className="text-sm text-muted-foreground">Automatically update map data</p>
                  </div>
                  <Switch
                    checked={mapSettings.autoRefresh}
                    onCheckedChange={(checked) => setMapSettings({ ...mapSettings, autoRefresh: checked })}
                  />
                </div>

                {mapSettings.autoRefresh && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">Refresh Interval</Label>
                      <span className="text-sm text-muted-foreground">{mapSettings.refreshInterval} seconds</span>
                    </div>
                    <Slider
                      value={[mapSettings.refreshInterval]}
                      onValueChange={([value]) => setMapSettings({ ...mapSettings, refreshInterval: value })}
                      min={10}
                      max={120}
                      step={10}
                      className="w-full"
                    />
                  </div>
                )}

                <Separator className="bg-border" />

                {/* Display Options */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-foreground">Display Options</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Heatmap Layer</p>
                        <p className="text-sm text-muted-foreground">Display crime density overlay</p>
                      </div>
                      <Switch
                        checked={mapSettings.showHeatmap}
                        onCheckedChange={(checked) => setMapSettings({ ...mapSettings, showHeatmap: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Patrol Units</p>
                        <p className="text-sm text-muted-foreground">Display active patrol locations</p>
                      </div>
                      <Switch
                        checked={mapSettings.showPatrols}
                        onCheckedChange={(checked) => setMapSettings({ ...mapSettings, showPatrols: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Cluster Markers</p>
                        <p className="text-sm text-muted-foreground">Group nearby incidents together</p>
                      </div>
                      <Switch
                        checked={mapSettings.clusterMarkers}
                        onCheckedChange={(checked) => setMapSettings({ ...mapSettings, clusterMarkers: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Default View */}
                <div className="space-y-2">
                  <Label className="text-foreground">Default Map View</Label>
                  <Select defaultValue="zone">
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="city" className="text-foreground focus:bg-secondary">Full City View</SelectItem>
                      <SelectItem value="zone" className="text-foreground focus:bg-secondary">My Zone</SelectItem>
                      <SelectItem value="hotspots" className="text-foreground focus:bg-secondary">Active Hotspots</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Security Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Change Password</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-foreground">Current Password</Label>
                      <Input type="password" className="bg-secondary border-border text-foreground" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label className="text-foreground">New Password</Label>
                      <Input type="password" className="bg-secondary border-border text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-foreground">Confirm New Password</Label>
                      <Input type="password" className="bg-secondary border-border text-foreground" />
                    </div>
                  </div>
                  <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
                    Update Password
                  </Button>
                </div>

                <Separator className="bg-border" />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success/10 text-success border-success/30">Enabled</Badge>
                    <Button variant="outline" size="sm" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
                      Configure
                    </Button>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Active Sessions */}
                <div>
                  <h4 className="mb-4 text-sm font-medium text-foreground">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Desktop - Chrome</p>
                          <p className="text-sm text-muted-foreground">Mumbai, India - Current session</p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Mobile - Safari</p>
                          <p className="text-sm text-muted-foreground">Mumbai, India - 2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Appearance Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme */}
                <div className="space-y-3">
                  <Label className="text-foreground">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary bg-card p-4 transition-colors">
                      <div className="h-12 w-12 rounded-lg bg-[#0a0e1a]"></div>
                      <span className="text-sm font-medium text-foreground">Cyberpunk Dark</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50">
                      <div className="h-12 w-12 rounded-lg bg-[#1a1f2e]"></div>
                      <span className="text-sm font-medium text-foreground">Midnight</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50">
                      <div className="h-12 w-12 rounded-lg bg-slate-100"></div>
                      <span className="text-sm font-medium text-foreground">Light</span>
                    </button>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Accent Color */}
                <div className="space-y-3">
                  <Label className="text-foreground">Accent Color</Label>
                  <div className="flex gap-3">
                    <button className="h-10 w-10 rounded-full bg-[#00d9ff] ring-2 ring-foreground ring-offset-2 ring-offset-background"></button>
                    <button className="h-10 w-10 rounded-full bg-[#ff4081] hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background"></button>
                    <button className="h-10 w-10 rounded-full bg-[#00e676] hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background"></button>
                    <button className="h-10 w-10 rounded-full bg-[#ffd600] hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background"></button>
                    <button className="h-10 w-10 rounded-full bg-[#7c4dff] hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background"></button>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Font Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Font Size</Label>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={25} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Density */}
                <div className="space-y-2">
                  <Label className="text-foreground">Interface Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="compact" className="text-foreground focus:bg-secondary">Compact</SelectItem>
                      <SelectItem value="comfortable" className="text-foreground focus:bg-secondary">Comfortable</SelectItem>
                      <SelectItem value="spacious" className="text-foreground focus:bg-secondary">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
