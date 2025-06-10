// components/MovieCard.tsx
import React from 'react';

type Props = {
  movie: {
    id: string;
    title: string;
    year: number;
    genres: string[];
    rating: number;
  };
  isActive?: boolean;
  onClick?: () => void;
};

const MovieCard: React.FC<Props> = ({ movie, isActive = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex-shrink-0 w-64 rounded-xl overflow-hidden transition-all duration-300 ${
        isActive ? 'ring-4 ring-red-500 scale-105' : 'bg-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2'
      }`}
    >
      <div className="h-40 bg-gradient-to-r from-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center px-4">
          <h3 className="font-bold text-lg">{movie.title}</h3>
          <p className="text-yellow-400 mt-2">{movie.year}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
            {movie.rating}/10
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre, i) => (
            <span key={i} className="text-xs bg-red-900/80 px-2 py-1 rounded-full">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
