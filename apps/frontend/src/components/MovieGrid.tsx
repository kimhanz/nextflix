"use client";

import React from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
  const movies = useMovies();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
