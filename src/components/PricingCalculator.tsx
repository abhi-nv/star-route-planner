import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calculator, Rocket, Moon, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingBreakdown {
  baseTravel: number;
  lifeSupport: number;
  hibernation: number;
  subtotal: number;
  gst: number;
  spaceportFee: number;
  total: number;
}

const PricingCalculator: React.FC = () => {
  const [destination, setDestination] = useState('mars');
  const [travelClass, setTravelClass] = useState('comfort');
  const [hibernationDays, setHibernationDays] = useState([90]);
  const [cargoWeight, setCargoWeight] = useState([50]);
  const [pricing, setPricing] = useState<PricingBreakdown>({
    baseTravel: 0,
    lifeSupport: 0,
    hibernation: 0,
    subtotal: 0,
    gst: 0,
    spaceportFee: 150000,
    total: 0
  });

  const destinations = {
    moon: { distance: 0.384, duration: 3, name: 'Moon' },
    mars: { distance: 120, duration: 180, name: 'Mars' },
    europa: { distance: 628, duration: 550, name: 'Europa' }
  };

  const classMultipliers = {
    standard: { value: 1.0, name: 'Standard' },
    comfort: { value: 1.35, name: 'Comfort' },
    research: { value: 1.15, name: 'Research' },
    executive: { value: 1.8, name: 'Executive' }
  };

  useEffect(() => {
    calculatePrice();
  }, [destination, travelClass, hibernationDays, cargoWeight]);

  const calculatePrice = () => {
    const dest = destinations[destination as keyof typeof destinations];
    const classMultiplier = classMultipliers[travelClass as keyof typeof classMultipliers].value;
    
    const baseCostPerPkm = 2500;
    const lifeSupportPerDay = 15000;
    const hibernationPerDay = 7000;
    const cargoPerKg = 500;
    
    const baseTravel = baseCostPerPkm * dest.distance * classMultiplier * 1000; // Convert pkm to actual cost
    const lifeSupport = lifeSupportPerDay * dest.duration;
    const hibernation = hibernationPerDay * hibernationDays[0];
    const cargo = cargoPerKg * cargoWeight[0];
    
    const subtotal = baseTravel + lifeSupport + hibernation + cargo;
    const gst = subtotal * 0.18;
    const spaceportFee = 150000;
    const total = subtotal + gst + spaceportFee;
    
    setPricing({
      baseTravel,
      lifeSupport,
      hibernation: hibernation + cargo,
      subtotal,
      gst,
      spaceportFee,
      total
    });
  };

  const formatPrice = (amount: number) => {
    // Convert to Nitcoin (1 INR = 0.01 Nitcoin)
    const nitcoinValue = amount / 100;
    return `${nitcoinValue.toFixed(2)} NTC`;
  };

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
            Calculate Your <span className="text-gradient-aurora">Journey Cost</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant quote for your interplanetary adventure. All costs transparent and upfront.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Input */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span>Configure Your Journey</span>
              </CardTitle>
              <CardDescription>
                Customize your travel options to see real-time pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Destination Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moon">
                      <span className="flex items-center space-x-2">
                        <span>🌙</span>
                        <span>Moon (0.384 pkm)</span>
                      </span>
                    </SelectItem>
                    <SelectItem value="mars">
                      <span className="flex items-center space-x-2">
                        <span>🔴</span>
                        <span>Mars (120 pkm)</span>
                      </span>
                    </SelectItem>
                    <SelectItem value="europa">
                      <span className="flex items-center space-x-2">
                        <span>🧊</span>
                        <span>Europa (628 pkm)</span>
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Travel Class Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Class</label>
                <Select value={travelClass} onValueChange={setTravelClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (1.0x)</SelectItem>
                    <SelectItem value="comfort">Comfort (1.35x)</SelectItem>
                    <SelectItem value="research">Research (1.15x)</SelectItem>
                    <SelectItem value="executive">Executive (1.8x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Hibernation Days */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Hibernation Duration: {hibernationDays[0]} days
                </label>
                <Slider
                  value={hibernationDays}
                  onValueChange={setHibernationDays}
                  max={destinations[destination as keyof typeof destinations].duration}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Reduce travel perception and save on life support
                </p>
              </div>
              
              {/* Cargo Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Cargo Weight: {cargoWeight[0]} kg
                </label>
                <Slider
                  value={cargoWeight}
                  onValueChange={setCargoWeight}
                  max={200}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Personal belongings and equipment allowance
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Pricing Breakdown */}
          <Card variant="glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-primary" />
                <span>Price Breakdown</span>
              </CardTitle>
              <CardDescription>
                Your journey to {destinations[destination as keyof typeof destinations].name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Journey Details */}
                <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Distance</span>
                    <span className="font-orbitron font-bold">
                      {destinations[destination as keyof typeof destinations].distance} pkm
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span className="font-orbitron font-bold">
                      {destinations[destination as keyof typeof destinations].duration} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Class</span>
                    <span className="font-orbitron font-bold">
                      {classMultipliers[travelClass as keyof typeof classMultipliers].name}
                    </span>
                  </div>
                </div>
                
                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Travel Cost</span>
                    <span className="font-orbitron">{formatPrice(pricing.baseTravel)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Life Support</span>
                    <span className="font-orbitron">{formatPrice(pricing.lifeSupport)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hibernation & Cargo</span>
                    <span className="font-orbitron">{formatPrice(pricing.hibernation)}</span>
                  </div>
                  
                  <div className="border-t border-border/50 pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-orbitron">{formatPrice(pricing.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-orbitron">{formatPrice(pricing.gst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Spaceport Fee</span>
                      <span className="font-orbitron">{formatPrice(pricing.spaceportFee)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-primary pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Cost</span>
                      <span className="text-2xl font-bold font-orbitron text-primary">
                        {formatPrice(pricing.total)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button variant="aurora" className="w-full mt-6" size="lg">
                  Book This Journey
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  * Prices subject to launch window availability and market conditions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;