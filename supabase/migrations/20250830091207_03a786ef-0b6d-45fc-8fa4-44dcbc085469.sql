-- Fix security warning by setting search_path for the function
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger for user_budgets timestamp update
CREATE TRIGGER update_user_budgets_updated_at
BEFORE UPDATE ON public.user_budgets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();