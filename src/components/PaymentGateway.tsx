import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Rocket, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentGatewayProps {
  amount: number;
  onSuccess?: () => void;
}

export default function PaymentGateway({ amount, onSuccess }: PaymentGatewayProps) {
  const [showQR, setShowQR] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowQR(true);
    }, 1500);
  };

  const handleQRClick = () => {
    // Rick Roll!
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    
    // Simulate successful payment after rickroll
    setTimeout(() => {
      toast({
        title: "Payment Successful! 🚀",
        description: "Your space journey has been confirmed.",
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 backdrop-blur border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment Gateway
        </CardTitle>
        <CardDescription>
          Complete your payment to confirm your space journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-secondary/20 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(amount)}</p>
        </div>

        {!showQR ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Payment Methods</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" disabled>
                  UPI
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Credit Card
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Debit Card
                </Button>
                <Button variant="outline" size="sm" className="border-primary">
                  QR Code
                </Button>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Pay with QR Code
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Scan QR code to complete payment
            </p>
            
            <div 
              className="relative p-8 bg-white rounded-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={handleQRClick}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg animate-pulse" />
              <div className="relative bg-white p-4 rounded">
                <QrCode className="w-full h-full text-black" size={200} />
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Click on QR code to open payment app
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}