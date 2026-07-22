import React from "react";
import {
  Car,
  Heart,
  Hotel,
  Map,
  ShoppingBag,
  Ticket,
  Trees,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";

import BannerCarousel from "../components/BannerCarousel";
import BottomNavigation from "../components/BottomNavigation";
import HomeHeader from "../components/HomeHeader";
import HomeSearchBar from "../components/HomeSearchBar";
import HomeSection from "../components/HomeSection";
import PlaceCard from "../components/PlaceCard";
import HomeLayout from "../layouts/HomeLayout";

import {
  featuredPlaces,
  homeBanners,
  homeCategories,
} from "../mocks/homeMock";

const categoryIcons = {
  gastronomia: UtensilsCrossed,
  eventos: Ticket,
  turismo: Trees,
  compras: ShoppingBag,
  hoteis: Hotel,
  experiencias: Map,
  mobilidade: Car,
  favoritos: Heart,
};

export default function HomePage() {
  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <HomeSearchBar />

        <BannerCarousel
          banners={homeBanners}
        />

        <HomeSection
          title="Explore por categoria"
          description="Encontre rapidamente o que fazer em Curitiba."
        >
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {homeCategories.map(
              (category) => {
                const Icon =
                  categoryIcons[
                    category.id
                  ];

                return (
                  <Link
                    key={category.id}
                    to={category.href}
                    className="group flex flex-col items-center gap-2 text-center text-decoration-none"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition group-hover:-translate-y-1 group-hover:border-emerald-200 group-hover:text-emerald-700 group-hover:shadow-md">
                      <Icon
                        size={23}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="line-clamp-1 text-xs font-semibold text-slate-700">
                      {category.label}
                    </span>
                  </Link>
                );
              }
            )}
          </div>
        </HomeSection>

        <HomeSection
          title="Destaques de Curitiba"
          description="Lugares selecionados para você conhecer."
          href="/buscar?destaque=true"
        >
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 scrollbar-none snap-x">
            {featuredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
              />
            ))}
          </div>
        </HomeSection>

        <HomeSection
          title="Eventos próximos"
          description="Programação para aproveitar os próximos dias."
          href="/buscar?categoria=eventos"
        >
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center select-none">
            <p className="text-sm font-semibold text-slate-700 my-0">
              Seção preparada para receber os eventos.
            </p>

            <p className="mt-2 text-sm text-slate-500 my-0">
              No próximo passo adicionaremos os cards, datas, ingressos e filtros.
            </p>
          </div>
        </HomeSection>
      </div>
    </HomeLayout>
  );
}
