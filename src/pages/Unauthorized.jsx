// src/pages/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold text-red-500">Access Denied</h2>
      <p className="text-sm mt-2">You don’t have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
