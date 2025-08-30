import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Microscope } from 'lucide-react';

interface TravelClass {
  name: string;
  icon: React.ReactNode;
  multiplier: string;
  description: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

const travelClasses: TravelClass[] = [
  {
    name: 'Standard',
    icon: <Star className="w-6 h-6" />,
    multiplier: '1.0x',
    description: 'Essential space travel with all safety features',
    features: [
      'Basic life support systems',
      'Shared common areas',
      'Standard meal packages',
      'Economy seating',
      'Basic entertainment'
    ]
  },
  {
    name: 'Comfort',
    icon: <Zap className="w-6 h-6" />,
    multiplier: '1.35x',
    description: 'Enhanced journey with premium amenities',
    features: [
      'Enhanced life support',
      'Semi-private quarters',
      'Premium meal selection',
      'Priority boarding',
      'Advanced entertainment suite',
      'Personal storage space'
    ],
    recommended: true,
    badge: 'Most Popular'
  },
  {
    name: 'Research',
    icon: <Microscope className="w-6 h-6" />,
    multiplier: '1.15x',
    description: 'For scientists and educational missions',
    features: [
      'Laboratory access',
      'Scientific equipment',
      'Research collaboration',
      'Educational programs',
      'Data collection tools',
      'Expert consultations'
    ]
  },
  {
    name: 'Executive',
    icon: <Crown className="w-6 h-6" />,
    multiplier: '1.8x',
    description: 'Ultimate luxury in interplanetary travel',
    features: [
      'Private quarters',
      'Personal concierge',
      'Gourmet dining',
      'Panoramic viewing deck',
      'Executive lounge access',
      'Premium hibernation pods',
      'Priority everything'
    ],
    badge: 'Premium'
  }
];

const TravelClasses: React.FC = () => {
  return (
    <section id="classes" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Travel in Style
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
            Choose Your <span className="text-gradient-aurora">Travel Class</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From essential to executive, select the perfect travel experience for your interplanetary journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelClasses.map((travelClass) => (
            <Card 
              key={travelClass.name} 
              variant={travelClass.recommended ? 'glow' : 'glass'}
              className="relative hover:scale-105 transition-all duration-300"
            >
              {travelClass.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant={travelClass.recommended ? 'default' : 'secondary'}>
                  {travelClass.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  travelClass.name === 'Executive' ? 'bg-accent/20 text-accent' :
                  travelClass.name === 'Comfort' ? 'bg-primary/20 text-primary' :
                  travelClass.name === 'Research' ? 'bg-secondary/20 text-secondary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {travelClass.icon}
                </div>
                <CardTitle className="text-xl font-orbitron">{travelClass.name}</CardTitle>
                <div className="text-2xl font-bold text-primary font-orbitron">
                  {travelClass.multiplier}
                </div>
                <CardDescription className="mt-2">
                  {travelClass.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {travelClass.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={travelClass.recommended ? 'glow' : 'space'} 
                  className="w-full mt-6"
                >
                  Select {travelClass.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelClasses;