"use client";

import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  title: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ title }) => {
  const movies = useMovies();

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
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
