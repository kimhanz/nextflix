import React from "react";

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center w-full py-12">
      <p className="text-white/70 text-lg animate-pulse">Loading movies...</p>
    </div>
  );
};

export default LoadingState;
