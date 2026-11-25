import {
  fetchHomeBannersRepository,
  fetchHomePlacesRepository,
} from "../repositories/homeRepository";

export async function getHomeData() {
  const [banners, places] = await Promise.all([
    fetchHomeBannersRepository(),
    fetchHomePlacesRepository(),
  ]);

  // Section divisions:
  const featured = places.filter(p => p.featured);
  const events = places.filter(p => p.type === "event");
  const restaurants = places.filter(p => p.type === "restaurant");
  const hotels = places.filter(p => p.type === "hotel");
  const tours = places.filter(p => p.type === "tour");
  const services = places.filter(p => p.type === "service");
  
  // Premium / Official Partners
  const officialPartners = places.filter(p => p.partner);

  return {
    banners,
    places,
    sections: {
      featured,
      events,
      restaurants,
      hotels,
      tours,
      services,
      officialPartners,
    }
  };
}

export function searchPlaces(places, query = "") {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return places;

  return places.filter(place => {
    return (
      place.title.toLowerCase().includes(normalizedQuery) ||
      place.subtitle.toLowerCase().includes(normalizedQuery) ||
      place.description.toLowerCase().includes(normalizedQuery) ||
      place.category.toLowerCase().includes(normalizedQuery) ||
      place.neighborhood.toLowerCase().includes(normalizedQuery) ||
      place.city.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function toggleFavoritePlace(placeId) {
  const favorites = JSON.parse(localStorage.getItem("curitiba360:favorites") || "[]");
  let updatedFavorites;

  if (favorites.includes(placeId)) {
    updatedFavorites = favorites.filter(id => id !== placeId);
  } else {
    updatedFavorites = [...favorites, placeId];
  }

  localStorage.setItem("curitiba360:favorites", JSON.stringify(updatedFavorites));
  return updatedFavorites;
}
