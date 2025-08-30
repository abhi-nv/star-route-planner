import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-darker">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Rocket className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold font-orbitron text-gradient-aurora">
              SPACEOUT
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#destinations" className="text-foreground/80 hover:text-foreground transition-colors">
              Destinations
            </a>
            <a href="#launch-windows" className="text-foreground/80 hover:text-foreground transition-colors">
              Launch Windows
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#classes" className="text-foreground/80 hover:text-foreground transition-colors">
              Travel Classes
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Login</Button>
            <Button variant="glow">Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/50">
            <a href="#destinations" className="block text-foreground/80 hover:text-foreground transition-colors">
              Destinations
            </a>
            <a href="#launch-windows" className="block text-foreground/80 hover:text-foreground transition-colors">
              Launch Windows
            </a>
            <a href="#pricing" className="block text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#classes" className="block text-foreground/80 hover:text-foreground transition-colors">
              Travel Classes
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="w-full">Login</Button>
              <Button variant="glow" className="w-full">Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;