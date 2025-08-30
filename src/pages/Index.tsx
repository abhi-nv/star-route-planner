import React from 'react';
import Starfield from '@/components/Starfield';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import LaunchWindows from '@/components/LaunchWindows';
import TravelClasses from '@/components/TravelClasses';
import PricingCalculator from '@/components/PricingCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Starfield />
      <Navbar />
      <Hero />
      <Destinations />
      <LaunchWindows />
      <TravelClasses />
      <PricingCalculator />
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              © 2025 SPACEOUT. Democratizing interplanetary travel.
            </p>
            <p className="text-sm text-muted-foreground">
              NeuroPass authentication pending integration • Safety protocols certified by ISA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;