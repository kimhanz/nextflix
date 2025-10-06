import { useEffect, useState } from "react";
import { MovieAPI } from "../lib/api";

interface MovieDetail {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

export const useMovieDetail = (id?: string | number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await MovieAPI.getById(id);
        if (isMounted) setMovie(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load movie detail");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovie();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, loading, error };
};
