"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiPlayLargeFill } from "react-icons/ri";
import { BsBadgeHd } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TiThumbsUp } from "react-icons/ti";
import { IoChevronDownSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import Portal from "./Portal";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate?: string;
  rating?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster, backdrop }) => {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      setRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    }
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      className="group bg-zinc-900 relative w-[15vw] min-w-[200px] aspect-video"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* thumbnail */}
      <img
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md w-full h-full"
        src={backdrop || poster}
        alt={title}
      />

      {/* hover popup → render ผ่าน Portal */}
      <Portal>
        <AnimatePresence>
          {hovered && rect && (
            <motion.div
              className="fixed z-[99999] rounded-md shadow-2xl bg-zinc-900"
              style={{
                top: rect.top - 60,
                left: rect.left - (rect.width * 1.3 - rect.width) / 2,
                width: rect.width * 1.3,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.7, ease: "anticipate" }}
            >
              <img
                className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full h-full relative"
                src={backdrop}
                alt={title}
              />
              <div className="z-10 bg-zinc-900 p-2 lg:px-5 lg:py-3 absolute left-0 right-0 transition shadow-md rounded-b-md w-full">
                <p className="text-white/80 tracking-wider py-2">{title}</p>
                <div className="flex justify-between items-center gap-3 mb-6 mt-1 w-full">
                  <div className="flex flex-3 gap-x-2 justify-start">
                    <div
                      className="cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                      onClick={() => {}}
                    >
                      <RiPlayLargeFill className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div
                      className="cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-2 border-white/30 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                      onClick={() => {}}
                    >
                      <AiOutlinePlus className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div
                      className="cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-2 border-white/30 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                      onClick={() => {}}
                    >
                      <TiThumbsUp className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end">
                    <div
                      className="cursor-pointer w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-2 border-white/30 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                      onClick={() => {}}
                    >
                      <IoChevronDownSharp className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-start w-full items-center gap-x-2 gap-y-0 mb-5">
                  <p className="border-1 border-white/80 text-white/80 tracking-wider px-2 py-0">
                    16+
                  </p>
                  <p className="text-white/80 tracking-wider">1h 47m</p>
                  <BsBadgeHd size={18} className="text-white" />
                </div>
                <div className="w-full flex justify-start items-center pb-2">
                  <p className="text-white/80 tracking-wide px-1 py-0">Slick</p>
                  <GoDotFill size={10} className="text-white/30" />
                  <p className=" text-white/80  tracking-wide px-1 py-0">
                    Scary
                  </p>
                  <GoDotFill size={10} className="text-white/30" />
                  <p className=" text-white/80  tracking-wide px-1 py-0">
                    Action Thriller
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
};

export default MovieCard;
