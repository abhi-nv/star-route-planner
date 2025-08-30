-- Create planets table
CREATE TABLE public.planets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  distance_from_earth INTEGER NOT NULL, -- in pkm
  description TEXT,
  climate TEXT,
  gravity TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stations table for boarding/deboarding points
CREATE TABLE public.stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planet_id UUID NOT NULL REFERENCES public.planets(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('spaceport', 'orbital', 'surface')),
  latitude DECIMAL,
  longitude DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_budgets table
CREATE TABLE public.user_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  budget_amount DECIMAL NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create launch_windows table
CREATE TABLE public.launch_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_planet_id UUID NOT NULL REFERENCES public.planets(id),
  destination_planet_id UUID NOT NULL REFERENCES public.planets(id),
  origin_station_id UUID NOT NULL REFERENCES public.stations(id),
  destination_station_id UUID NOT NULL REFERENCES public.stations(id),
  departure_date DATE NOT NULL,
  arrival_date DATE NOT NULL,
  distance INTEGER NOT NULL, -- in pkm
  duration_days INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('optimal', 'suboptimal', 'available')),
  availability_percentage INTEGER NOT NULL,
  base_price DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.planets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.launch_windows ENABLE ROW LEVEL SECURITY;

-- Create policies for planets (public read)
CREATE POLICY "Planets are viewable by everyone" 
ON public.planets FOR SELECT 
USING (true);

-- Create policies for stations (public read)
CREATE POLICY "Stations are viewable by everyone" 
ON public.stations FOR SELECT 
USING (true);

-- Create policies for user_budgets
CREATE POLICY "Users can view their own budget" 
ON public.user_budgets FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own budget" 
ON public.user_budgets FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budget" 
ON public.user_budgets FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for launch_windows (public read)
CREATE POLICY "Launch windows are viewable by everyone" 
ON public.launch_windows FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user_budgets timestamp update
CREATE TRIGGER update_user_budgets_updated_at
BEFORE UPDATE ON public.user_budgets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample planets data
INSERT INTO public.planets (name, code, distance_from_earth, description, climate, gravity) VALUES
('Earth', 'EARTH', 0, 'Our home planet', 'Temperate', '1.0g'),
('Moon', 'MOON', 0, 'Earth''s natural satellite', 'No atmosphere', '0.166g'),
('Mars', 'MARS', 78, 'The Red Planet', 'Cold desert', '0.376g'),
('Europa', 'EUROPA', 628, 'Jupiter''s icy moon', 'Frozen surface', '0.134g'),
('Titan', 'TITAN', 1272, 'Saturn''s largest moon', 'Dense atmosphere', '0.14g'),
('Venus', 'VENUS', 41, 'Earth''s twin', 'Extreme greenhouse', '0.904g');

-- Insert sample stations data
INSERT INTO public.stations (planet_id, name, code, type) VALUES
((SELECT id FROM public.planets WHERE code = 'EARTH'), 'Kennedy Space Center', 'KSC', 'spaceport'),
((SELECT id FROM public.planets WHERE code = 'EARTH'), 'Baikonur Cosmodrome', 'BAI', 'spaceport'),
((SELECT id FROM public.planets WHERE code = 'EARTH'), 'SpaceX Starbase', 'STB', 'spaceport'),
((SELECT id FROM public.planets WHERE code = 'MOON'), 'Tranquility Base', 'TRQ', 'surface'),
((SELECT id FROM public.planets WHERE code = 'MOON'), 'Shackleton Crater', 'SHK', 'surface'),
((SELECT id FROM public.planets WHERE code = 'MARS'), 'Olympus Mons Station', 'OLY', 'surface'),
((SELECT id FROM public.planets WHERE code = 'MARS'), 'Valles Marineris Port', 'VMP', 'surface'),
((SELECT id FROM public.planets WHERE code = 'EUROPA'), 'Europa Orbital Hub', 'EOH', 'orbital'),
((SELECT id FROM public.planets WHERE code = 'EUROPA'), 'Pwyll Crater Base', 'PWL', 'surface'),
((SELECT id FROM public.planets WHERE code = 'TITAN'), 'Titan Orbital Station', 'TOS', 'orbital'),
((SELECT id FROM public.planets WHERE code = 'VENUS'), 'Venus Cloud City', 'VCC', 'orbital');

-- Insert sample launch windows
INSERT INTO public.launch_windows (
  origin_planet_id, destination_planet_id, 
  origin_station_id, destination_station_id,
  departure_date, arrival_date, 
  distance, duration_days, status, 
  availability_percentage, base_price
) VALUES
(
  (SELECT id FROM public.planets WHERE code = 'EARTH'),
  (SELECT id FROM public.planets WHERE code = 'MARS'),
  (SELECT id FROM public.stations WHERE code = 'KSC'),
  (SELECT id FROM public.stations WHERE code = 'OLY'),
  '2025-09-15', '2026-03-12',
  78, 178, 'optimal',
  85, 4500000
),
(
  (SELECT id FROM public.planets WHERE code = 'EARTH'),
  (SELECT id FROM public.planets WHERE code = 'MOON'),
  (SELECT id FROM public.stations WHERE code = 'STB'),
  (SELECT id FROM public.stations WHERE code = 'TRQ'),
  '2025-09-01', '2025-09-04',
  0, 3, 'available',
  95, 250000
),
(
  (SELECT id FROM public.planets WHERE code = 'EARTH'),
  (SELECT id FROM public.planets WHERE code = 'EUROPA'),
  (SELECT id FROM public.stations WHERE code = 'BAI'),
  (SELECT id FROM public.stations WHERE code = 'EOH'),
  '2025-10-20', '2027-08-15',
  628, 664, 'suboptimal',
  60, 12000000
);