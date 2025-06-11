import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WrenchScrewdriverIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const UnderConstruction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-6 text-center">
      <WrenchScrewdriverIcon className="h-20 w-20 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        We're working on this feature! Please check back later.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Go Back
      </button>
    </div>
  );
};

export default UnderConstruction;
