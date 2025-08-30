import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useBudget() {
  const [budget, setBudget] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_budgets')
        .select('budget_amount')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setBudget(Number(data.budget_amount));
      } else {
        // Create initial budget for new user
        await createInitialBudget(user.id, user.email || '');
      }
    } catch (error) {
      console.error('Error fetching budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInitialBudget = async (userId: string, email: string) => {
    try {
      const initialBudget = 10000000; // ₹1 Crore initial budget
      const { data, error } = await supabase
        .from('user_budgets')
        .insert({
          user_id: userId,
          email: email,
          budget_amount: initialBudget
        })
        .select('budget_amount')
        .single();

      if (error) throw error;
      
      if (data) {
        setBudget(Number(data.budget_amount));
        toast({
          title: "Welcome to SpaceOut!",
          description: `Your travel budget of ${(initialBudget/100).toFixed(0)} Nitcoin has been allocated.`,
        });
      }
    } catch (error) {
      console.error('Error creating initial budget:', error);
    }
  };

  const updateBudget = async (newAmount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_budgets')
        .update({ budget_amount: newAmount })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setBudget(newAmount);
      return true;
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        title: "Error",
        description: "Failed to update budget",
        variant: "destructive"
      });
      return false;
    }
  };

  const deductFromBudget = async (amount: number) => {
    if (budget < amount) {
      toast({
        title: "Insufficient Budget",
        description: "You don't have enough budget for this booking.",
        variant: "destructive"
      });
      return false;
    }

    return await updateBudget(budget - amount);
  };

  return { budget, loading, updateBudget, deductFromBudget, refetchBudget: fetchBudget };
}