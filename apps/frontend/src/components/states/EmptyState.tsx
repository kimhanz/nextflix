import React from "react";

const EmptyState = ({ message = "No movies found." }: { message?: string }) => {
  return (
    <div className="flex justify-center items-center w-full py-12">
      <p className="text-white/70 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
