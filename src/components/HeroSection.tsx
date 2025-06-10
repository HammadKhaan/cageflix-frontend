import React from 'react';

type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
};

interface HeroSectionProps {
  heroMovie: Movie;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroMovie, backgroundImage }) => (
    <>
    {/* Main Hero Content */}
    <div className="relative z-10 max-w-2xl mt-16">
      <div className="flex gap-4 text-gray-300 mb-4">
        <span>{heroMovie.year}</span>
        <span>|</span>
        <span>{heroMovie.genres.join(', ')}</span>
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 drop-shadow-2xl">
        {heroMovie.title}
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <div className="bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-md">
          {heroMovie.rating}/10
        </div>
        <p className="text-lg text-yellow-300">IMDb Rating</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
          Watch Now
        </button>
        <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
          Watch Trailer
        </button>
      </div>
    </div>
    {/* Gradient overlay for bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </>
);

export default HeroSection;