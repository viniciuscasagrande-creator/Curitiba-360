import { useState, useEffect, useCallback } from "react";
import { getHomeData, searchPlaces, toggleFavoritePlace } from "../services/homeService";

export function useHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    banners: [],
    places: [],
    sections: {
      featured: [],
      events: [],
      restaurants: [],
      hotels: [],
      tours: [],
      services: [],
      officialPartners: [],
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHomeData();
      setData(res);
      setSearchResults(res.places);

      // sync favorite ids
      const currentFavs = JSON.parse(localStorage.getItem("curitiba360:favorites") || "[]");
      setFavoritesList(currentFavs);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao carregar dados da Home.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Search Input
  useEffect(() => {
    if (!data.places.length) return;
    const filtered = searchPlaces(data.places, searchQuery);
    setSearchResults(filtered);
  }, [searchQuery, data.places]);

  const toggleFavorite = useCallback((placeId) => {
    const updatedFavs = toggleFavoritePlace(placeId);
    setFavoritesList(updatedFavs);
    
    // Update active memory
    setData(prev => {
      const updatedPlaces = prev.places.map(p => ({
        ...p,
        favorite: updatedFavs.includes(p.id)
      }));
      return {
        ...prev,
        places: updatedPlaces,
        sections: {
          featured: updatedPlaces.filter(p => p.featured),
          events: updatedPlaces.filter(p => p.type === "event"),
          restaurants: updatedPlaces.filter(p => p.type === "restaurant"),
          hotels: updatedPlaces.filter(p => p.type === "hotel"),
          tours: updatedPlaces.filter(p => p.type === "tour"),
          services: updatedPlaces.filter(p => p.type === "service"),
          officialPartners: updatedPlaces.filter(p => p.partner),
        }
      };
    });
  }, []);

  return {
    loading,
    error,
    banners: data.banners,
    places: data.places,
    sections: data.sections,
    searchQuery,
    setSearchQuery,
    searchResults,
    favoritesList,
    toggleFavorite,
    reload: loadData,
  };
}
