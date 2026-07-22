import React from "react";
import {
  ArrowLeft,
} from "lucide-react";
import {
  Link,
  useParams,
} from "react-router-dom";

import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeSection from "../../home/components/HomeSection";
import HomeLayout from "../../home/layouts/HomeLayout";

import SearchResultCard from "../../search/components/SearchResultCard";

import DetailActions from "../components/DetailActions";
import DetailAmenities from "../components/DetailAmenities";
import DetailBookingCard from "../components/DetailBookingCard";
import DetailDescription from "../components/DetailDescription";
import DetailGallery from "../components/DetailGallery";
import DetailHeader from "../components/DetailHeader";
import DetailInfoGrid from "../components/DetailInfoGrid";
import DetailLoading from "../components/DetailLoading";
import DetailLocation from "../components/DetailLocation";
import DetailNotFound from "../components/DetailNotFound";
import DetailPartnerCard from "../components/DetailPartnerCard";
import DetailReviews from "../components/DetailReviews";
import DetailSchedule from "../components/DetailSchedule";

import {
  useDetail,
} from "../hooks/useDetail";

export default function DetailPage() {
  const { slug } = useParams();

  const {
    item,
    relatedItems,
    reviews,
    openingStatus,
    loading,
    error,
    notFound,
    reload,
  } = useDetail(slug);

  if (loading) {
    return (
      <HomeLayout
        header={<HomeHeader />}
        bottomNavigation={
          <BottomNavigation />
        }
      >
        <DetailLoading />
      </HomeLayout>
    );
  }

  if (notFound) {
    return (
      <HomeLayout
        header={<HomeHeader />}
        bottomNavigation={
          <BottomNavigation />
        }
      >
        <DetailNotFound />
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout
        header={<HomeHeader />}
        bottomNavigation={
          <BottomNavigation />
        }
      >
        <div className="mx-auto max-w-2xl px-4 py-20 text-center select-none">
          <h1 className="text-2xl font-bold text-slate-950 my-0">
            Não foi possível carregar
          </h1>

          <p className="mt-3 text-sm text-slate-600 my-0">
            {error}
          </p>

          <button
            type="button"
            onClick={reload}
            className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white cursor-pointer border-none"
          >
            Tentar novamente
          </button>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={
        <BottomNavigation />
      }
    >
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="text-left">
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 text-decoration-none"
          >
            <ArrowLeft size={17} />
            Voltar
          </Link>
        </div>

        <DetailGallery
          images={item.images}
          title={item.title}
        />

        <DetailHeader
          item={item}
          openingStatus={
            openingStatus
          }
        />

        <DetailActions
          item={item}
        />

        <DetailInfoGrid
          item={item}
        />

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-7">
            <DetailDescription
              description={
                item.description
              }
            />

            <DetailAmenities
              amenities={
                item.amenities
              }
            />

            <DetailSchedule
              schedule={
                item.schedule
              }
              openingStatus={
                openingStatus
              }
            />

            <DetailLocation
              item={item}
            />

            <DetailPartnerCard
              partner={
                item.partner
              }
            />

            <DetailReviews
              rating={item.rating}
              reviewsCount={
                item.reviewsCount
              }
              reviews={reviews}
            />
          </div>

          <div className="lg:relative">
            <div className="lg:sticky lg:top-24">
              <DetailBookingCard
                booking={
                  item.booking
                }
              />
            </div>
          </div>
        </div>

        {relatedItems.length > 0 && (
          <HomeSection
            title="Você também pode gostar"
            description="Outros lugares e experiências relacionados."
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map(
                (relatedItem) => (
                  <SearchResultCard
                    key={
                      relatedItem.id
                    }
                    item={
                      relatedItem
                    }
                  />
                )
              )}
            </div>
          </HomeSection>
        )}
      </div>
    </HomeLayout>
  );
}
