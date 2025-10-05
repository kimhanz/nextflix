import { useEffect } from "react";
import { useMoviesStore } from "../store/movies";

export const useMovies = (page: number = 1) => {
  const { setMovies, items, setLoading, setError, loading, error } =
    useMoviesStore();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:3001/movies?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setMovies({
          items: data.items || [],
          page: data.page || 1,
          totalPages: data.totalPages || 1,
        });
      } catch (err: any) {
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, setMovies, setLoading, setError]);

  return { movies: items, loading, error };
};
