import React from "react";

const ErrorState = ({ message }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-white space-y-4">
      <p className="text-xl font-semibold text-red-500">❌ {message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 bg-red-600 hover:bg-red-500 transition rounded-md font-medium hover:cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
