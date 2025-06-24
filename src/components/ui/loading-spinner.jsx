import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black dark:bg-gray-900">
       <div className="animate-pop">
        <img
          src="/assets/transparent logo.png"
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;