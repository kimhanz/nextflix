import { useEffect } from "react";
import { useMoviesStore } from "../store/movies";
import { MovieListDto } from "@/types/movie";
/*
  Hook: useMovies
  Fetch API (page)
  Zustand store state management
*/

export const useMovies = (page: number = 1) => {
  const {
    items,
    page: currentPage,
    totalPages,
    loading,
    error,
    fetchMovies,
  } = useMoviesStore();

  useEffect(() => {
    if (!items.length || currentPage !== page) {
      fetchMovies(page);
    }
  }, [page, currentPage, fetchMovies, items.length]);

  return { movies: items as MovieListDto[], loading, error, totalPages };
};
