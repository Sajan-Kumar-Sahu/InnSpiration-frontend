import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: '#182524' }}
    >
      <img
        src="/assets/transparent logo.png"
        alt="Loading..."
        className="w-24 h-24 animate-pop"
      />
    </div>
  );
};

export default LoadingSpinner;