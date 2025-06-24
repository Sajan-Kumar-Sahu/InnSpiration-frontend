import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <img
        src="/assets/transparent logo.png"
        alt="Loading..."
        className="w-24 h-24 animate-pulse-logo"
      />
    </div>
  );
};

export default LoadingSpinner;