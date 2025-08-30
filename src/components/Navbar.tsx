import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Menu, X, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "Come back soon!",
      });
      navigate('/auth');
    }
  };

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
            {user ? (
              <>
                <span className="text-foreground/70 text-sm">{user.email}</span>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="glow" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}
            <Button variant="aurora">Book Now</Button>
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
              {user ? (
                <>
                  <span className="text-foreground/70 text-sm text-center">{user.email}</span>
                  <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="glow" className="w-full" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
              <Button variant="aurora" className="w-full">Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;