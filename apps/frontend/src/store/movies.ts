import { create } from "zustand";
import { MovieListDto, MovieListResponse } from "@/types/movie";
import { MovieAPI } from "@/lib/api";

interface MoviesState {
  items: MovieListDto[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  // Hero movie
  heroMovie: MovieListDto | null;
  heroLoading: boolean;
  heroError: string | null;

  // Actions
  setMovies: (data: MovieListResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetMovies: () => void;

  setHeroMovie: (movie: MovieListDto | null) => void;
  setHeroLoading: (loading: boolean) => void;
  setHeroError: (error: string | null) => void;

  // Async actions
  fetchMovies: (page?: number) => Promise<void>;
}

// Zustand store
export const useMoviesStore = create<MoviesState>((set) => ({
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,

  heroMovie: null,
  heroLoading: false,
  heroError: null,

  // Merge state
  setMovies: (data) =>
    set((state) => ({
      ...state,
      items: data.items,
      page: data.page,
      totalPages: data.totalPages,
      loading: false,
      error: null,
    })),

  // Start Loading
  setLoading: (loading) => set((state) => ({ ...state, loading })),

  // Fetch Error
  setError: (error) => set((state) => ({ ...state, error, loading: false })),

  // Change Page/Category
  resetMovies: () =>
    set({
      items: [],
      page: 1,
      totalPages: 1,
      loading: false,
      error: null,
    }),

  // --- Hero Movie ---
  setHeroMovie: (movie) => set({ heroMovie: movie }),
  setHeroLoading: (loading) => set({ heroLoading: loading }),
  setHeroError: (error) => set({ heroError: error }),

  // --- Async: Fetch movies from API ---
  fetchMovies: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const data: MovieListResponse = await MovieAPI.getAll(page);
      set({
        items: data.items,
        page: data.page,
        totalPages: data.totalPages,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error("Error fetching movies:", err);
      set({ error: err.message || "Unknown error", loading: false });
    }
  },
}));
