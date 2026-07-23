import React from 'react';
import HeroBanner from '../components/HeroBanner';
import QuickActions from '../components/QuickActions';
import EventsCarousel from '../components/EventsCarousel';
import TourismCarousel from '../components/TourismCarousel';
import RestaurantsCarousel from '../components/RestaurantsCarousel';
import BenefitsCarousel from '../components/BenefitsCarousel';
import PartnersSection from '../components/PartnersSection';

export function HomePage() {
  return (
    <div className="space-y-10 pb-12 max-w-7xl mx-auto">
      {/* 1. Banner Principal */}
      <HeroBanner />

      {/* 2. Acesso Rápido */}
      <QuickActions />

      {/* 3. Eventos em Destaque */}
      <EventsCarousel />

      {/* 4. Explore Curitiba (Turismo) */}
      <TourismCarousel />

      {/* 5. Gastronomia */}
      <RestaurantsCarousel />

      {/* 6. Benefícios e Cashback Municipal */}
      <BenefitsCarousel />

      {/* 7. Parceiros Oficiais */}
      <PartnersSection />
    </div>
  );
}
export default HomePage;
