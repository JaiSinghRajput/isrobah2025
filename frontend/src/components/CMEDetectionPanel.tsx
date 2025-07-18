import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Play, Pause, Settings, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, AnalysisRequest, CMEEvent, AnalysisResult } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const CMEDetectionPanel: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-08-01');
  const [endDate, setEndDate] = useState<string>('2024-12-31');
  const [analysisType, setAnalysisType] = useState<'full' | 'quick' | 'threshold_only'>('full');

  // CME Analysis mutation
  const analyzeMutation = useMutation({
    mutationFn: (request: AnalysisRequest) => api.analyzeCMEEvents(request),
    onSuccess: (data: AnalysisResult) => {
      toast({
        title: "Analysis Complete",
        description: `Found ${data.cme_events.length} CME events in the specified date range.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze CME events",
        variant: "destructive",
      });
    },
  });

  // Get latest analysis results
  const { data: analysisResult } = useQuery({
    queryKey: ['analysis-result'],
    queryFn: () => api.analyzeCMEEvents({ start_date: startDate, end_date: endDate, analysis_type: analysisType }),
    enabled: false, // Only run when explicitly triggered
  });

  const handleAnalyze = () => {
    const request: AnalysisRequest = {
      start_date: startDate,
      end_date: endDate,
      analysis_type: analysisType,
    };
    analyzeMutation.mutate(request);
  };

  const getCMESeverity = (speed: number) => {
    if (speed >= 1000) return { level: 'High', color: 'destructive', bg: 'bg-red-500/20' };
    if (speed >= 600) return { level: 'Medium', color: 'warning', bg: 'bg-yellow-500/20' };
    return { level: 'Low', color: 'default', bg: 'bg-green-500/20' };
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-cosmic">CME Detection Analysis</CardTitle>
          <CardDescription>
            Configure and run halo CME detection analysis using SWIS-ASPEX data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-card/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-card/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="analysis-type">Analysis Type</Label>
              <select
                id="analysis-type"
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value as any)}
                className="w-full px-3 py-2 bg-card/50 border border-border/50 rounded-md text-sm"
              >
                <option value="full">Full Analysis</option>
                <option value="quick">Quick Scan</option>
                <option value="threshold_only">Threshold Only</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleAnalyze}
              disabled={analyzeMutation.isPending}
              className="bg-solar-orange hover:bg-solar-orange/90 text-white"
            >
              {analyzeMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
            
            <Button variant="outline" className="border-border/50">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
            
            <Button variant="outline" className="border-border/50">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detection Status */}
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-cosmic">Detection Status</CardTitle>
          <CardDescription>Current system status and recent detections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-400">System Status</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Clock className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-blue-400">Last Scan</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-yellow-400">Active Alerts</p>
                <p className="text-xs text-muted-foreground">2 CME events</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <AlertCircle className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm font-medium text-purple-400">Confidence</p>
                <p className="text-xs text-muted-foreground">92.5%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CME Events List */}
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-cosmic">Detected CME Events</CardTitle>
          <CardDescription>
            Halo CME events identified in the analysis period
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyzeMutation.isPending ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-orange mx-auto"></div>
                <p className="text-muted-foreground">Analyzing SWIS data for CME signatures...</p>
              </div>
            </div>
          ) : analysisResult?.cme_events && analysisResult.cme_events.length > 0 ? (
            <div className="space-y-4">
              {analysisResult.cme_events.map((event: CMEEvent, index: number) => {
                const severity = getCMESeverity(event.speed);
                return (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-card/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className={`${severity.bg} border-${severity.color}/50 text-${severity.color}`}>
                          {severity.level} Severity
                        </Badge>
                        <Badge variant="outline" className="bg-cosmic-blue/20 text-cosmic-blue border-cosmic-blue/50">
                          {event.angular_width}° Halo
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="text-lg font-semibold text-cosmic">{(event.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Detection Time</p>
                        <p className="font-medium text-cosmic">{formatDateTime(event.datetime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Speed</p>
                        <p className="font-medium text-solar">{event.speed.toFixed(0)} km/s</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Source Location</p>
                        <p className="font-medium text-stellar-purple">{event.source_location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                        <p className="font-medium text-cyan-400">{formatDateTime(event.estimated_arrival)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No CME events detected in the specified date range</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting the date range or analysis parameters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      {analysisResult?.performance_metrics && (
        <Card className="space-card">
          <CardHeader>
            <CardTitle className="text-cosmic">Detection Performance</CardTitle>
            <CardDescription>Analysis accuracy and reliability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(analysisResult.performance_metrics).map(([metric, value]) => (
                <div key={metric} className="p-4 rounded-lg bg-gradient-to-br from-cosmic-blue/20 to-stellar-purple/20 border border-cosmic-blue/30">
                  <p className="text-sm text-muted-foreground capitalize">
                    {metric.replace(/_/g, ' ')}
                  </p>
                  <p className="text-2xl font-bold text-cosmic">
                    {(value * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Threshold Configuration */}
      {analysisResult?.thresholds && (
        <Card className="space-card">
          <CardHeader>
            <CardTitle className="text-cosmic">Optimal Thresholds</CardTitle>
            <CardDescription>Automatically determined detection thresholds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(analysisResult.thresholds).map(([threshold, value]) => (
                <div key={threshold} className="p-4 rounded-lg bg-gradient-to-br from-solar-orange/20 to-yellow-500/20 border border-solar-orange/30">
                  <p className="text-sm text-muted-foreground capitalize">
                    {threshold.replace(/_/g, ' ')}
                  </p>
                  <p className="text-2xl font-bold text-solar">
                    {value.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CMEDetectionPanel;
