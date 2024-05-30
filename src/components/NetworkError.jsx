import React from 'react';

const NetworkError = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="text-center text-white">
        <h1 className="text-4xl mb-4">Network Error</h1>
        <p className="text-xl">Please check your internet connection and try again.</p>
      </div>
    </div>
  );
};

export default NetworkError;
