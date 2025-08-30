import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Thermometer, Users, ArrowRight } from 'lucide-react';
import moonImage from '@/assets/moon-destination.jpg';
import marsImage from '@/assets/mars-destination.jpg';
import europaImage from '@/assets/europa-destination.jpg';

interface Destination {
  id: string;
  name: string;
  tagline: string;
  distance: string;
  duration: string;
  temperature: string;
  population: string;
  price: string;
  image: string;
  emoji: string;
  features: string[];
  nextLaunch: string;
}

const destinations: Destination[] = [
  {
    id: 'moon',
    name: 'Moon',
    tagline: 'Humanity\'s First Step',
    distance: '0.384 pkm',
    duration: '3 days',
    temperature: '-173°C to 127°C',
    population: '142 residents',
    price: '₹12,50,000',
    image: moonImage,
    emoji: '🌙',
    features: ['Low gravity sports', 'Earth viewing deck', 'Apollo heritage sites'],
    nextLaunch: 'Every 2 weeks'
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Red Frontier',
    distance: '120 pkm',
    duration: '180 days',
    temperature: '-143°C to 35°C',
    population: '2,847 colonists',
    price: '₹45,50,000',
    image: marsImage,
    emoji: '🔴',
    features: ['Olympus Mons expedition', 'Terraforming research', 'Martian sunset tours'],
    nextLaunch: 'Optimal window: July 2025'
  },
  {
    id: 'europa',
    name: 'Europa',
    tagline: 'Ocean World Mystery',
    distance: '628 pkm',
    duration: '550 days',
    temperature: '-220°C to -160°C',
    population: '78 researchers',
    price: '₹98,00,000',
    image: europaImage,
    emoji: '🧊',
    features: ['Subsurface ocean dive', 'Jupiter views', 'Astrobiology research'],
    nextLaunch: 'Optimal window: Dec 2025'
  }
];

const Destinations: React.FC = () => {
  return (
    <section id="destinations" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Explore the Solar System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
            Choose Your <span className="text-gradient-aurora">Destination</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three incredible worlds await. Each offers unique experiences and adventures beyond imagination.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} variant="glass" className="group hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-4xl">{destination.emoji}</div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron">{destination.name}</CardTitle>
                <CardDescription className="text-primary">{destination.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-bold font-orbitron">{destination.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Travel Time</p>
                    <p className="font-bold font-orbitron">{destination.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-sm font-medium">{destination.temperature}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Population</p>
                    <p className="text-sm font-medium">{destination.population}</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Top Experiences:</p>
                  <ul className="space-y-1">
                    {destination.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Next Launch */}
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-accent">{destination.nextLaunch}</span>
                </div>
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-bold font-orbitron text-primary">
                      {destination.price}
                    </p>
                  </div>
                  <Button variant="glow" className="group/btn">
                    Book Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;