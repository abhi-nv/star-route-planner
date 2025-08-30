import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface LaunchWindow {
  destination: string;
  date: string;
  distance: string;
  duration: string;
  status: 'optimal' | 'suboptimal' | 'available';
  availability: number;
  price: string;
}

const launchWindows: LaunchWindow[] = [
  {
    destination: 'Moon',
    date: 'Dec 15, 2025',
    distance: '0.384 pkm',
    duration: '3 days',
    status: 'optimal',
    availability: 85,
    price: '₹12.5L'
  },
  {
    destination: 'Moon',
    date: 'Dec 29, 2025',
    distance: '0.386 pkm',
    duration: '3 days',
    status: 'available',
    availability: 92,
    price: '₹13.2L'
  },
  {
    destination: 'Mars',
    date: 'Jul 15, 2025',
    distance: '120 pkm',
    duration: '180 days',
    status: 'optimal',
    availability: 67,
    price: '₹45.5L'
  },
  {
    destination: 'Mars',
    date: 'Sep 20, 2025',
    distance: '145 pkm',
    duration: '210 days',
    status: 'suboptimal',
    availability: 88,
    price: '₹52.3L'
  },
  {
    destination: 'Europa',
    date: 'Dec 01, 2025',
    distance: '628 pkm',
    duration: '550 days',
    status: 'optimal',
    availability: 45,
    price: '₹98.0L'
  },
  {
    destination: 'Europa',
    date: 'Feb 15, 2026',
    distance: '672 pkm',
    duration: '580 days',
    status: 'available',
    availability: 78,
    price: '₹105.5L'
  }
];

const LaunchWindows: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Optimal</Badge>;
      case 'suboptimal':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Sub-optimal</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const getAvailabilityColor = (availability: number) => {
    if (availability < 50) return 'text-red-400';
    if (availability < 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <section id="launch-windows" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Launch Schedule
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
            Upcoming <span className="text-gradient-aurora">Launch Windows</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect departure date based on planetary alignment and your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {launchWindows.map((window, index) => (
            <Card 
              key={index} 
              variant={window.status === 'optimal' ? 'glow' : 'glass'}
              className="hover:scale-105 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-orbitron">
                    {window.destination}
                  </CardTitle>
                  {getStatusBadge(window.status)}
                </div>
                <CardDescription className="flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4" />
                  <span className="font-semibold">{window.date}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Journey Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-orbitron font-bold">{window.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-orbitron font-bold">{window.duration}</p>
                  </div>
                </div>
                
                {/* Availability */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className={`font-bold ${getAvailabilityColor(window.availability)}`}>
                      {window.availability}%
                    </span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        window.availability < 50 ? 'bg-red-400' :
                        window.availability < 75 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${window.availability}%` }}
                    />
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-muted-foreground">Starting from</span>
                  <span className="text-xl font-bold font-orbitron text-primary">
                    {window.price}
                  </span>
                </div>
                
                {window.availability < 50 && (
                  <div className="flex items-center space-x-2 text-xs text-yellow-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>Limited seats remaining</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Optimal windows offer the shortest distance and best conditions for travel
          </p>
          <Badge variant="outline" className="text-sm">
            <Clock className="w-3 h-3 mr-2" />
            Windows update every 24 hours based on celestial mechanics
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default LaunchWindows;