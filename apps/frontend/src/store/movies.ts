import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

interface MoviesState {
  items: Movie[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  setMovies: (data: {
    items: Movie[];
    page: number;
    totalPages: number;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMoviesStore = create<MoviesState>((set) => ({
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  setMovies: (data) => set(data),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
