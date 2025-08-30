import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Rocket, MapPin, Navigation } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import PaymentGateway from "./PaymentGateway";

interface LaunchWindow {
  id: string;
  departure_date: string;
  arrival_date: string;
  distance: number;
  duration_days: number;
  status: string;
  availability_percentage: number;
  base_price: number;
  origin_planet: {
    name: string;
    code: string;
  };
  destination_planet: {
    name: string;
    code: string;
  };
  origin_station: {
    name: string;
    code: string;
    type: string;
  };
  destination_station: {
    name: string;
    code: string;
    type: string;
  };
}

export default function LaunchWindowsDB() {
  const [launchWindows, setLaunchWindows] = useState<LaunchWindow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWindow, setSelectedWindow] = useState<LaunchWindow | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLaunchWindows();
  }, []);

  const fetchLaunchWindows = async () => {
    try {
      const { data, error } = await supabase
        .from('launch_windows')
        .select(`
          *,
          origin_planet:planets!launch_windows_origin_planet_id_fkey(name, code),
          destination_planet:planets!launch_windows_destination_planet_id_fkey(name, code),
          origin_station:stations!launch_windows_origin_station_id_fkey(name, code, type),
          destination_station:stations!launch_windows_destination_station_id_fkey(name, code, type)
        `)
        .limit(3);

      if (error) throw error;
      setLaunchWindows(data || []);
    } catch (error) {
      console.error('Error fetching launch windows:', error);
      toast({
        title: "Error",
        description: "Failed to load launch windows",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      optimal: { variant: "default" as const, label: "Optimal" },
      suboptimal: { variant: "secondary" as const, label: "Sub-optimal" },
      available: { variant: "outline" as const, label: "Available" }
    };

    const config = variants[status as keyof typeof variants] || variants.available;
    
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleBooking = (window: LaunchWindow) => {
    setSelectedWindow(window);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedWindow(null);
    toast({
      title: "Booking Confirmed!",
      description: "Your space journey has been booked successfully.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <Rocket className="h-8 w-8 animate-pulse text-primary" />
        </div>
      </div>
    );
  }

  if (showPayment && selectedWindow) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => setShowPayment(false)}
          className="mb-6"
        >
          ← Back to Launch Windows
        </Button>
        <PaymentGateway 
          amount={selectedWindow.base_price} 
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Available Launch Windows
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your preferred departure date and route for your interplanetary journey
          </p>
        </div>

        <div className="grid gap-6">
          {launchWindows.map((window) => (
            <Card key={window.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-background/95 backdrop-blur border-border/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-primary" />
                      {window.origin_planet.name} → {window.destination_planet.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {window.origin_station.name} ({window.origin_station.code})
                        </span>
                        <span>→</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {window.destination_station.name} ({window.destination_station.code})
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  {getStatusBadge(window.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Departure
                    </p>
                    <p className="font-semibold">{format(new Date(window.departure_date), "MMM dd, yyyy")}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Arrival
                    </p>
                    <p className="font-semibold">{format(new Date(window.arrival_date), "MMM dd, yyyy")}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-semibold">{window.distance} pkm</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Duration
                    </p>
                    <p className="font-semibold">{window.duration_days} days</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className={`font-semibold ${getAvailabilityColor(window.availability_percentage)}`}>
                        {window.availability_percentage}% available
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(window.base_price)}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleBooking(window)}
                    size="lg"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}