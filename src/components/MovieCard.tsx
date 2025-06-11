import React, { useEffect, useState } from 'react';
import { fetchPoster } from '../utils/api';

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
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPoster(movie.id)
      .then(url => setPosterUrl(url))
      .catch(err => console.error('Error fetching poster:', err));
  }, [movie.id]);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex-shrink-0 w-64 rounded-xl overflow-hidden transition-all duration-300 ${
        isActive
          ? 'ring-4 ring-red-500 scale-105'
          : 'bg-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2'
      }`}
    >
      {/* Poster or Fallback */}
      <div className="h-40 w-full bg-black flex items-center justify-center overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-4 text-white text-sm">Poster Unavailable</div>
        )}
      </div>

      <div className="p-4 bg-gray-800">
        <h3 className="font-bold text-lg text-white mb-1">{movie.title}</h3>
        <p className="text-yellow-400 text-sm mb-2">{movie.year}</p>

        <div className="flex justify-between items-center mb-3">
          <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white">
            ⭐ {movie.rating}/10
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre, i) => (
            <span
              key={i}
              className="text-xs bg-red-900/80 px-2 py-1 rounded-full text-white"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
