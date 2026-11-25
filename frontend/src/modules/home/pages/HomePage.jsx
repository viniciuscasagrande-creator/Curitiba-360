import React from 'react';

import BenefitsCarousel from '../components/BenefitsCarousel';
import EventsCarousel from '../components/EventsCarousel';
import HeroBanner from '../components/HeroBanner';
import PartnersSection from '../components/PartnersSection';
import QuickActions from '../components/QuickActions';
import RestaurantsCarousel from '../components/RestaurantsCarousel';
import TourismCarousel from '../components/TourismCarousel';

export function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px] space-y-12 sm:space-y-14">
      <HeroBanner />

      <QuickActions />

      <EventsCarousel />

      <TourismCarousel />

      <RestaurantsCarousel />

      <BenefitsCarousel />

      <PartnersSection />
    </div>
  );
}

export default HomePage;
