import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDetailBySlug,
} from "../services/detailService";

export function useDetail(slug) {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDetail =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getDetailBySlug(slug);

        setData(response);
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Não foi possível carregar os detalhes."
        );
      } finally {
        setLoading(false);
      }
    }, [slug]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  return {
    item: data?.item || null,
    relatedItems:
      data?.relatedItems || [],
    reviews: data?.reviews || [],
    openingStatus:
      data?.openingStatus || null,

    loading,
    error,

    notFound:
      !loading &&
      !error &&
      !data,

    reload: loadDetail,
  };
}
