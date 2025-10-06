import { useEffect, useState } from "react";
import { MovieAPI } from "../lib/api";
import { MovieListDto } from "@/types/movie";
import { useMoviesStore } from "../store/movies";

export const useHeroMovie = () => {
  const {
    heroMovie,
    heroLoading,
    heroError,
    setHeroMovie,
    setHeroLoading,
    setHeroError,
  } = useMoviesStore();

  useEffect(() => {
    let isMounted = true;

    const fetchMovie = async () => {
      try {
        setHeroLoading(true);
        setHeroError(null);

        const data: MovieListDto = await MovieAPI.getRandomHero();
        if (!isMounted) return;
        setHeroMovie(data);
      } catch (err: any) {
        if (isMounted)
          setHeroError(err.message || "Failed to fetch hero movie");
      } finally {
        if (isMounted) setHeroLoading(false);
      }
    };
    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, []);

  return { heroMovie, heroLoading, heroError };
};
