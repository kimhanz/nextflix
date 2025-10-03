import React from "react";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  releaseDate,
  rating,
}) => {
  return <div className="group bg-zinc-900 col-span relative h-[12vw]"></div>;
};

export default MovieCard;
