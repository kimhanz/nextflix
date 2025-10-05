import React from "react";

const ErrorState = ({
  message = "Something went wrong.",
}: {
  message?: string;
}) => {
  return (
    <div className="flex justify-center items-center w-full py-12">
      <p className="text-red-400 text-lg">{message}</p>
    </div>
  );
};

export default ErrorState;
