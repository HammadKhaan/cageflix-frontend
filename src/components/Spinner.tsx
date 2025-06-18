import React from 'react'

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center h-[100vh] bg-gray-900">
    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
