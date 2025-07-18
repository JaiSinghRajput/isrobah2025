
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Satellite, Activity, Database, Settings, BarChart3, AlertTriangle, Zap } from 'lucide-react';
import ParticleDataChart from '@/components/ParticleDataChart';
import CMEDetectionPanel from '@/components/CMEDetectionPanel';
import ThresholdConfiguration from '@/components/ThresholdConfiguration';
import DataImportExport from '@/components/DataImportExport';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-slate-900 to-deep-space">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Satellite className="h-8 w-8 text-solar-orange animate-slow-rotate" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cosmic">Aditya-L1 CME Detection System</h1>
                <p className="text-sm text-muted-foreground">SWIS-ASPEX Payload Data Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                L1 Position Active
              </Badge>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                SWIS Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="space-card glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active CME Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar">3</div>
              <p className="text-xs text-muted-foreground">
                +2 from last 24h
              </p>
            </CardContent>
          </Card>

          <Card className="space-card glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Particle Flux</CardTitle>
              <Activity className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cosmic">2.4M</div>
              <p className="text-xs text-muted-foreground">
                particles/cm²/s
              </p>
            </CardContent>
          </Card>

          <Card className="space-card glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solar Wind Speed</CardTitle>
              <Zap className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-stellar-purple">450</div>
              <p className="text-xs text-muted-foreground">
                km/s
              </p>
            </CardContent>
          </Card>

          <Card className="space-card glow-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Coverage</CardTitle>
              <Database className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">98.7%</div>
              <p className="text-xs text-muted-foreground">
                Since Aug 2024
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-md">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="particle-data" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Particle Data</span>
            </TabsTrigger>
            <TabsTrigger value="cme-detection" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">CME Detection</span>
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Thresholds</span>
            </TabsTrigger>
            <TabsTrigger value="data-management" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle className="text-cosmic">Mission Overview</CardTitle>
                  <CardDescription>
                    Aditya-L1 Solar Observatory at Lagrange Point 1
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative p-6 rounded-lg bg-gradient-to-br from-cosmic-blue/20 to-stellar-purple/20">
                    <div className="text-center space-y-4">
                      <Satellite className="h-16 w-16 mx-auto text-solar-orange animate-float" />
                      <div>
                        <h3 className="text-lg font-semibold text-solar">Aditya-L1 Spacecraft</h3>
                        <p className="text-sm text-muted-foreground">Solar Wind Ion Spectrometer (SWIS)</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-cyan-400">Launch Date</p>
                      <p className="text-muted-foreground">Sept 2, 2023</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400">L1 Arrival</p>
                      <p className="text-muted-foreground">Jan 6, 2024</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400">Distance from Earth</p>
                      <p className="text-muted-foreground">1.5 million km</p>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400">Orbital Period</p>
                      <p className="text-muted-foreground">178 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="space-card">
                <CardHeader>
                  <CardTitle className="text-cosmic">Recent CME Activity</CardTitle>
                  <CardDescription>
                    Halo CME events detected in the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '2024-12-25', magnitude: 'X2.1', speed: '1200 km/s', type: 'Full Halo' },
                      { date: '2024-12-23', magnitude: 'M8.4', speed: '950 km/s', type: 'Partial Halo' },
                      { date: '2024-12-20', magnitude: 'M5.2', speed: '750 km/s', type: 'Full Halo' },
                    ].map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div>
                          <p className="font-semibold text-solar">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-destructive">{event.magnitude}</p>
                          <p className="text-sm text-muted-foreground">{event.speed}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="particle-data">
            <ParticleDataChart />
          </TabsContent>

          <TabsContent value="cme-detection">
            <CMEDetectionPanel />
          </TabsContent>

          <TabsContent value="thresholds">
            <ThresholdConfiguration />
          </TabsContent>

          <TabsContent value="data-management">
            <DataImportExport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
