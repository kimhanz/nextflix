"use client";

import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiPlayLargeFill } from "react-icons/ri";
import { useHeroMovie } from "../hooks/useHeroMovie";
import Link from "next/link.js";
import { MovieListDto } from "@/types/movie";

const Hero: React.FC = () => {
  const { heroMovie, heroLoading, heroError } = useHeroMovie();

  if (heroLoading || !heroMovie) {
    return (
      <section className="relative h-[56.25vw] bg-zinc-900 animate-pulse overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 opacity-60"></div>

        <div className="absolute top-[20%] ml-5 mt-9 md:ml-16 space-y-4">
          <div className="flex gap-x-3 items-center">
            <div className="w-10 h-4 bg-zinc-700 rounded"></div>
            <div className="w-20 h-4 bg-zinc-700 rounded"></div>
          </div>

          <div className="w-[60%] md:w-[40%] h-8 md:h-12 bg-zinc-700 rounded-lg ml-3 md:ml-9"></div>

          <div className="hidden md:block w-[70%] md:w-[100%] h-4 bg-zinc-700 rounded-md"></div>
          <div className="hidden md:block w-[100%] h-4 bg-zinc-700 rounded-md"></div>

          <div className="flex gap-x-2 mt-5">
            <div className="w-20 h-8 md:w-28 md:h-10 bg-zinc-700 rounded-md"></div>
            <div className="w-24 h-8 md:w-32 md:h-10 bg-zinc-700 rounded-md"></div>
          </div>
        </div>
      </section>
    );
  }

  if (heroError)
    return (
      <section className="h-[56.25vw] flex items-center justify-center bg-black text-red-400">
        Failed to load hero movie.
      </section>
    );

  return (
    <section className="relative h-[56.25vw] bg-black z-0">
      <img
        className="w-full h-full object-cover brightness-[60%]"
        src={heroMovie.backdrop}
        alt={heroMovie.title}
      />

      <div className="absolute top-[20%] ml-5 mt-9 md:ml-16">
        <div className="flex items-center justify-start w-full gap-x-1 md:gap-x-3">
          <img
            className="w-1.5 h-3 md:w-3.5 md:h-6 lg:w-5 lg:h-8"
            src="/images/logo-n.svg"
            alt="logo-netflix"
          />
          <img
            className="w-8 h-full md:w-18 lg:w-24"
            src="/images/series.svg"
            alt="series"
          />
        </div>
        <h1 className="text-white text-2xl ml-3 md:ml-9 md:text-5xl font-bold drop-shadow-lg w-full lg:w-[70%] transition">
          {heroMovie.title}
        </h1>

        <p className="text-white text-[10px] md:text-[14px] lg:text-lg mt-3 md:mt-6 w-[80%] md:w-[50%] lg:w-[45%] drop-shadow-xl hidden md:inline-block">
          {heroMovie.overview}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-6 gap-x-2">
          <button className="bg-white text-black rounded-sm py-1 md:py-2 px-3 md:px-5 w-auto text-[10px] md:text-lg font-semibold flex flex-row items-center hover:bg-white/80 transition hover:cursor-pointer">
            <RiPlayLargeFill className="mr-1 md:mr-2 w-4 md:w-8 h-full text-black" />
            Play
          </button>
          <Link
            href={`/movies/${heroMovie.id}`}
            className="bg-[#515451]/80 text-white rounded-sm py-1 md:py-2 px-3 md:px-5 w-auto text-[10px] md:text-lg font-semibold flex flex-row items-center hover:bg-[#515451]/50 transition hover:cursor-pointer"
          >
            <IoIosInformationCircleOutline className="mr-1 md:mr-2 w-4 md:w-8 h-full" />
            More Info
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
