"use client";

import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  title: string;
}

const MovieSkeleton: React.FC = () => (
  <div className="w-[15vw] min-w-[200px] aspect-video bg-zinc-800 rounded-md overflow-hidden animate-pulse">
    <div className="w-full h-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
  </div>
);

const MovieGrid: React.FC<MovieGridProps> = ({ title }) => {
  const { movies, loading, error } = useMovies();

  // Error State
  if (error)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-lg">Failed to fetch movies: {error}</p>
      </div>
    );

  // Empty state
  if (!loading && (!movies || movies.length === 0))
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-white/60 text-lg">No movies found.</p>
      </div>
    );

  return (
    <div className="px-4 py-4 md:px-12 space-y-8 relative z-30">
      {/* Section Title */}
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-3">
        {title}
      </p>

      {/* Scrollable Row */}
      <div
        className="
          flex gap-3 overflow-x-auto overflow-y-visible 
          scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8
        "
      >
        {loading
          ? // Skeleton loading cards
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="snap-start">
                <MovieSkeleton />
              </div>
            ))
          : // Actual movies
            movies.map((movie) => (
              <div key={movie.id} className="snap-start">
                <MovieCard {...movie} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default MovieGrid;
