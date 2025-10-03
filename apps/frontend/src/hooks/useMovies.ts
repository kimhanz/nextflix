import { useEffect } from "react";
import { useMoviesStore } from "../store/movies";

export const useMovies = (page: number = 1) => {
  const { setMovies, items } = useMoviesStore();

  useEffect(() => {
    fetch(`http://localhost:3001/movies?page=${page}`)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [page, setMovies]);

  return items;
};
