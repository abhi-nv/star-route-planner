import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Globe, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentDistance, setCurrentDistance] = useState({ moon: 0.384, mars: 120, europa: 628 });
  
  useEffect(() => {
    // Simulate real-time distance updates
    const interval = setInterval(() => {
      setCurrentDistance(prev => ({
        moon: prev.moon + (Math.random() - 0.5) * 0.001,
        mars: prev.mars + (Math.random() - 0.5) * 0.5,
        europa: prev.europa + (Math.random() - 0.5) * 1
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse-glow" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-foreground/80">Now booking for 2025 departures</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 leading-tight">
            <span className="text-gradient-aurora">Your Journey</span>
            <br />
            <span className="text-foreground">Beyond Earth Begins</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto">
            Book your interplanetary adventure with SPACEOUT. From the Moon to Mars and beyond, 
            space travel is now as simple as booking a flight.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="aurora" 
              size="xl" 
              className="group"
              onClick={() => window.location.href = '/auth'}
            >
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="space" 
              size="xl"
              onClick={() => window.location.href = '/auth'}
            >
              <Calendar className="mr-2" />
              View Launch Windows
            </Button>
          </div>
          
          {/* Live distance tracker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="glass px-4 py-3 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Moon</span>
              </div>
              <p className="text-lg font-bold font-orbitron text-primary">
                {currentDistance.moon.toFixed(3)} pkm
              </p>
            </div>
            <div className="glass px-4 py-3 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Globe className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Mars</span>
              </div>
              <p className="text-lg font-bold font-orbitron text-secondary">
                {currentDistance.mars.toFixed(1)} pkm
              </p>
            </div>
            <div className="glass px-4 py-3 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Europa</span>
              </div>
              <p className="text-lg font-bold font-orbitron text-accent">
                {currentDistance.europa.toFixed(0)} pkm
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Hero;