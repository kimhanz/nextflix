import {
  MovieListResponse,
  MovieDetailResponse,
  MovieDetailDto,
} from "@/types/movie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const MovieAPI = {
  async getAll(page: number = 1): Promise<MovieListResponse> {
    const res = await fetch(`${BASE_URL}/movies?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  },

  async getById(id: string | number): Promise<MovieDetailResponse> {
    const res = await fetch(`${BASE_URL}/movies/${id}`);
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
  },

  async getRandomHero(): Promise<MovieDetailDto> {
    const res = await fetch(`${BASE_URL}/movies`);
    if (!res.ok) throw new Error("Failed to fetch hero movie");

    const data: MovieListResponse = await res.json();
    if (!data.items?.length) throw new Error("No movies found");

    const randomIndex = Math.floor(Math.random() * data.items.length);
    return data.items[randomIndex];
  },
};
