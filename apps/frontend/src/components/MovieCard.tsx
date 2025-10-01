import React from "react";

interface Props {
  id: number;
  title: string;
  poster: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

const MovieCard = ({ title, poster, releaseDate, rating }: Props) => {
  return (
    <div className="rounded-xl shadow hover:shadow-lg overflow-hidden transition">
      {poster ? (
        <img src={poster} alt={title} className="w-full h-80 object-cover" />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
          No image
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500">
          {releaseDate} {rating && `• ⭐ ${rating.toFixed(1)}`}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
