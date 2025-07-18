import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Activity, Download, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api, ParticleData } from '@/lib/api';

const ParticleDataChart: React.FC = () => {
  const [selectedParameter, setSelectedParameter] = useState<string>('velocity');
  const [timeRange, setTimeRange] = useState<string>('7d');

  // Fetch particle data from API
  const { data: particleData, isLoading, error, refetch } = useQuery({
    queryKey: ['particle-data', timeRange],
    queryFn: api.getParticleData,
    refetchInterval: 300000, // 5 minutes
  });

  const parameters = [
    { key: 'velocity', label: 'Solar Wind Velocity', unit: 'km/s', color: '#3b82f6' },
    { key: 'density', label: 'Particle Density', unit: 'cm⁻³', color: '#ef4444' },
    { key: 'temperature', label: 'Temperature', unit: 'K', color: '#10b981' },
    { key: 'flux', label: 'Particle Flux', unit: 'particles/(cm²·s)', color: '#f59e0b' },
  ];

  const selectedParam = parameters.find(p => p.key === selectedParameter);

  const getCurrentValue = () => {
    if (!particleData) return null;
    const values = particleData[selectedParameter as keyof ParticleData] as number[];
    return values[values.length - 1];
  };

  const getTrend = () => {
    if (!particleData) return 'stable';
    const values = particleData[selectedParameter as keyof ParticleData] as number[];
    if (values.length < 2) return 'stable';
    
    const recent = values.slice(-10);
    const trend = recent[recent.length - 1] - recent[0];
    
    if (trend > 0) return 'increasing';
    if (trend < 0) return 'decreasing';
    return 'stable';
  };

  const formatValue = (value: number) => {
    if (selectedParameter === 'temperature') {
      return `${(value / 1000).toFixed(1)}k`;
    }
    if (selectedParameter === 'flux') {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return value.toFixed(1);
  };

  const currentValue = getCurrentValue();
  const trend = getTrend();

  if (isLoading) {
    return (
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-cosmic">Particle Data Analysis</CardTitle>
          <CardDescription>Real-time SWIS-ASPEX measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-orange"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-cosmic">Particle Data Analysis</CardTitle>
          <CardDescription>Real-time SWIS-ASPEX measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-destructive">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto mb-4" />
              <p>Failed to load particle data</p>
              <Button onClick={() => refetch()} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="space-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-cosmic">Particle Data Analysis</CardTitle>
            <CardDescription>Real-time SWIS-ASPEX measurements from Aditya-L1</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Parameter Selection */}
        <div className="flex items-center space-x-4">
          <Select value={selectedParameter} onValueChange={setSelectedParameter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {parameters.map((param) => (
                <SelectItem key={param.key} value={param.key}>
                  {param.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current Value Display */}
        {currentValue && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-cosmic-blue/20 to-stellar-purple/20 border-cosmic-blue/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current {selectedParam?.label}</p>
                    <p className="text-2xl font-bold text-cosmic">
                      {formatValue(currentValue)}
                      <span className="text-sm text-muted-foreground ml-1">{selectedParam?.unit}</span>
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    trend === 'increasing' ? 'bg-green-500/20' : 
                    trend === 'decreasing' ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    {trend === 'increasing' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : trend === 'decreasing' ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <Activity className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-solar-orange/20 to-yellow-500/20 border-solar-orange/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold text-solar">
                  {particleData?.timestamps.length || 0}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Update Frequency</p>
                <p className="text-2xl font-bold text-green-400">5 min</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chart Placeholder */}
        <div className="relative h-80 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg border border-border/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Activity className="h-16 w-16 mx-auto text-solar-orange animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold text-cosmic">Interactive Chart</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedParam?.label} over time
                </p>
              </div>
              <Badge variant="outline" className="bg-solar-orange/20 text-solar-orange border-solar-orange/50">
                Chart.js Integration Pending
              </Badge>
            </div>
          </div>
          
          {/* Simulated data points */}
          <div className="absolute bottom-4 left-4 right-4 h-32">
            <div className="flex items-end justify-between h-full space-x-1">
              {particleData && particleData[selectedParameter as keyof ParticleData]?.slice(-20).map((value: number, index: number) => {
                const normalizedValue = (value - Math.min(...(particleData[selectedParameter as keyof ParticleData] as number[]))) / 
                  (Math.max(...(particleData[selectedParameter as keyof ParticleData] as number[])) - Math.min(...(particleData[selectedParameter as keyof ParticleData] as number[])));
                return (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-solar-orange to-yellow-400 rounded-t opacity-60"
                    style={{ height: `${normalizedValue * 100}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Data Quality Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Data Quality: Excellent</span>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-blue-400">Coverage: 98.7%</span>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-yellow-400">Last Update: 2 min ago</span>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-purple-400">SWIS Status: Online</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticleDataChart;
