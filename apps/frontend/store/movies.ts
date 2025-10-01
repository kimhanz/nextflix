import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  poster: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

interface MoviesState {
  items: Movie[];
  page: number;
  totalPages: number;
  setMovies: (data: {
    items: Movie[];
    page: number;
    totalPages: number;
  }) => void;
}

export const useMoviesStore = create<MoviesState>((set) => ({
  items: [],
  page: 1,
  totalPages: 1,
  setMovies: (data) => set(data),
}));
