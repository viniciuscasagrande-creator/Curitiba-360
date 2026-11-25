-- =========================================================
-- CURITIBA 360 - BANCO DE DADOS POSTGRESQL / SUPABASE SCHEMA
-- =========================================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Synchronized with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'tourist' CHECK (role IN ('tourist', 'partner', 'agency', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Commercial Partners (Parceiros Comerciais)
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Travel Agencies (Agências de Viagens)
CREATE TABLE IF NOT EXISTS public.agencies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  agency_name TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  cadastur TEXT NOT NULL,
  phone TEXT NOT NULL,
  commission_rate NUMERIC(5, 2) DEFAULT 10.00,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tour Packages & Attractions (Pacotes Turísticos e Atrações)
CREATE TABLE IF NOT EXISTS public.attractions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  discount_tag TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  duration TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  is_free BOOLEAN DEFAULT false,
  payment_terms TEXT,
  latitude NUMERIC(10, 6),
  longitude NUMERIC(10, 6),
  main_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Ticket Types (Tipos de Ingressos)
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  attraction_id UUID REFERENCES public.attractions(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- ex: 'Adulto', 'Estudante / Meia', 'Infantil'
  price NUMERIC(10, 2) NOT NULL,
  active BOOLEAN DEFAULT true
);

-- 6. Orders (Pedidos de Ingressos/Pacotes)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('credit_card', 'pix', 'google_pay')),
  status TEXT DEFAULT 'paid' CHECK (status IN ('pending', 'paid', 'refunded', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Order Items (Itens do Pedido)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  attraction_id UUID REFERENCES public.attractions(id) ON DELETE SET NULL,
  ticket_name TEXT NOT NULL,
  quantity INT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL
);

-- 8. Vouchers / Digital Tickets (Ingressos Digitais com QR Code)
CREATE TABLE IF NOT EXISTS public.vouchers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE CASCADE,
  qr_code_hash TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled')),
  valid_until DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public attractions are visible to all users" 
  ON public.attractions FOR SELECT USING (active = true);

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own orders" 
  ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Trigger for Automatic Profile Creation on Signup (handle_new_user)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.email), 
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- POPULAR DADOS INICIAIS DA PLATAFORMA CURITIBA 360°
-- =========================================================

INSERT INTO public.attractions 
(title, subtitle, location, category, discount_tag, rating, reviews_count, duration, price, original_price, is_free, payment_terms, latitude, longitude, main_image, gallery, description, features)
VALUES
('Parque Jaime Lerner', 'Abranches • Curitiba', 'Abranches • Curitiba', 'parques', '33% OFF', 4.9, 210, '2 a 3 horas', 39.90, 59.90, false, 'Pague em até 3x', -25.3780, -49.2790, 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'], 'Um belíssimo parque no bairro Abranches celebrando o legado ecológico de Curitiba com lagos, ciclovias e mirantes sustentáveis em homenagem a Jaime Lerner.', ARRAY['Acessibilidade universal', 'Estação de bicicletas', 'Área pet friendly', 'Lanchonete sustentável']),
('Jardim Botânico de Curitiba', 'Jardim Botânico • Curitiba', 'Jardim Botânico • Curitiba', 'parques', NULL, 4.9, 3840, '2 a 3 horas', 0.00, NULL, true, 'Entrada Gratuita', -25.4431, -49.2398, 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80'], 'O cartão-postal mais famoso de Curitiba. Estufa de ferro e vidro inspirada no Palácio de Cristal de Londres e o Jardim das Sensações.', ARRAY['Estufa climatizada', 'Jardim das Sensações', 'Museu Botânico Nacional', 'Visitas guiadas gratuitas']),
('City Tour Linha Turismo Curitiba', 'Centro • Curitiba', 'Centro • Curitiba', 'pacotes', '25% OFF', 4.8, 1420, 'Dia todo (Validade 24h)', 50.00, 66.00, false, 'Pague em até 3x', -25.4284, -49.2733, 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80'], 'Ônibus panorâmico de andar duplo que percorre os 26 principais pontos turísticos de Curitiba.', ARRAY['Ônibus panorâmico', 'Áudio-guia em 3 idiomas', '26 paradas turísticas', 'Wi-Fi a bordo']),
('Passeio de Trem Serra Verde Express', 'Estação Ferroviária • Curitiba', 'Estação Ferroviária • Curitiba', 'pacotes', '27% OFF', 4.9, 4650, 'Dia todo', 219.00, 299.00, false, '12x Sem Juros', -25.4370, -49.2568, 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80'], 'Viagem de trem espetacular descendo a Reserva da Serra do Mar paranaense até Morretes com almoço de Barreado incluso.', ARRAY['Serviço de bordo', 'Almoço de Barreado típico', 'Guia turístico credenciado', 'Transfer de retorno em van']),
('Ópera de Arame & Vale da Música', 'Abranches • Curitiba', 'Abranches • Curitiba', 'shows', '36% OFF', 4.8, 530, '2 a 3 horas', 90.00, 140.00, false, 'Pague em até 6x', -25.3850, -49.2764, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'], 'Teatro tubular transparente sobre o lago de uma antiga pedreira, com palco flutuante e o festival Vale da Música.', ARRAY['Palco flutuante sobre o lago', 'Restaurante do Lago', 'Vale da Música', 'Arquitetura única']),
('Museu Oscar Niemeyer (MON)', 'Centro Cívico • Curitiba', 'Centro Cívico • Curitiba', 'conhecendo', '25% OFF', 4.9, 3100, '3 a 4 horas', 30.00, 40.00, false, 'Pague em até 2x', -25.4103, -49.2672, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'], 'Conhecido internacionalmente como o "Museu do Olho", com acervo de mais de 14 mil obras de arte e arquitetura.', ARRAY['Exposições internacionais', 'Café gourmet MON', 'Loja oficial de souvenirs', 'Parque de esculturas externas']),
('Rodízio Italiano Restaurante Madalosso', 'Santa Felicidade • Curitiba', 'Santa Felicidade • Curitiba', 'restaurantes', '17% OFF', 4.8, 1120, '3 horas', 99.90, 120.00, false, 'Pague em até 3x', -25.4055, -49.3300, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'], 'Maior restaurante das Américas em Santa Felicidade, com o melhor rodízio artesanal italiano da culinária paranaense.', ARRAY['Rodízio tradicional completo', 'Carta de vinhos própria', 'Espaço Kids gratuito', 'Estacamento para 900 carros']),
('Parque Tanguá & Mirante do Pôr do Sol', 'Pilarzinho • Curitiba', 'Pilarzinho • Curitiba', 'parques', NULL, 4.9, 2950, '2 horas', 0.00, NULL, true, 'Entrada Gratuita', -25.3789, -49.2818, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', ARRAY['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'], 'Parque espetacular sobre pedreiras desativadas com cascata de 45 metros, túnel na rocha e o pôr do sol mais bonito da cidade.', ARRAY['Mirante elevado de contemplação', 'Cascata artificial de 45m', 'Túnel de acesso entre lagos', 'Bistrô do parque'])
ON CONFLICT DO NOTHING;

