import React from "react";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 bg-zinc-800 h-[400px] rounded-lg"></div>
        <div className="flex-1 space-y-5">
          <div className="h-8 bg-zinc-800 rounded w-3/4"></div>
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
          <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
          <div className="flex gap-3 mt-4">
            <div className="h-6 w-16 bg-zinc-800 rounded"></div>
            <div className="h-6 w-10 bg-zinc-800 rounded"></div>
            <div className="h-6 w-20 bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
