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
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;
