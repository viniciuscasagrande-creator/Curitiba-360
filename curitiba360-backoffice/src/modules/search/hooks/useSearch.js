import {
  useEffect,
  useState,
} from "react";

import {
  searchItems,
} from "../services/searchService";

export function useSearch({
  query,
  filters,
  sort,
  debounce = 300,
}) {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    const timeoutId =
      window.setTimeout(async () => {
        setLoading(true);
        setError("");

        try {
          const searchResults =
            await searchItems({
              query,
              filters,
              sort,
            });

          if (active) {
            setResults(searchResults);
          }
        } catch (requestError) {
          console.error(requestError);

          if (active) {
            setError(
              "Não foi possível carregar os resultados."
            );
            setResults([]);
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      }, debounce);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [
    debounce,
    filters,
    query,
    sort,
  ]);

  return {
    results,
    loading,
    error,
  };
}
