"use client";

import { useParams } from "next/navigation.js";
import { useMovieDetail } from "../../../hooks/useMovieDetail";
import LoadingState from "../../../components/states/LoadingState";
import ErrorState from "../../../components/states/ErrorState";

const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = Array.isArray(id) ? id[0] : id;
  const { movie, loading, error } = useMovieDetail(movieId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load movie details." />;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-white/70 text-lg">{movie.overview}</p>

          <div className="flex gap-4 flex-wrap text-sm md:text-lg text-white/60">
            {movie.releaseDate && <span>{movie.releaseDate}</span>}
            {movie.rating && <span>⭐ {movie.rating.toFixed(1)}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
