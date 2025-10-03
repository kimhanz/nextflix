import { useEffect, useState } from "react";

interface HeroMovie {
  id: number;
  title: string;
  backdrop: string;
  overview: string;
}

export const useHeroMovie = () => {
  const [movie, setMovie] = useState<HeroMovie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch("http://localhost:3001/movies");
        const data = await res.json();

        // First Movie is Hero
        if (data.items?.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.items.length);
          setMovie(data.items[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      }
    };
    fetchMovie();
  }, []);

  return movie;
};
