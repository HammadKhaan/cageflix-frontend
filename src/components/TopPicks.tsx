import React from 'react';
import { fetchPoster } from '../utils/api';
import type { Movie } from '../types/Movie';
import { useQueries } from '@tanstack/react-query';

interface TopPicksProps {
  movies: Movie[];
  heroMovieId?: string;
  onMovieClick: (movie: Movie) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ movies, heroMovieId, onMovieClick }) => {

  const posterQueries = useQueries({
    queries: movies.slice(0, 5).map((movie) => ({
      queryKey: ['poster', movie.id],
      queryFn: () => fetchPoster(movie.id),
    })),
  });

  const posters = posterQueries.reduce<Record<string, string>>((acc, query, index) => {
    const movieId = movies[index]?.id;
    if (movieId && query.data) {
      acc[movieId] = query.data;
    }
    return acc;
  }, {});

  return (
    <div className="relative z-20">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90">Top Picks</h2>
      <div className="flex overflow-x-auto py-4 -mx-4 px-4">
        <div className="flex space-x-4">
          {movies
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((movie) => (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie)}
                className={`cursor-pointer flex-shrink-0 w-32 md:w-40 h-48 md:h-60 rounded-lg overflow-hidden shadow-md
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${heroMovieId === movie.id ? 'ring-2 ring-red-500 scale-105' : ''
                  }`}
              >
                {
                  posters[movie.id] ? (
                    <img
                      src={posters[movie.id]}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="cursor-pointer flex-shrink-0 w-32 md:w-40 h-48 md:h-60 rounded-lg overflow-hidden shadow-md
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-r from-indigo-900/80 to-purple-800/80 flex
                    items-center justify-center">
                      <div className="text-center px-3">
                        <h3 className="font-bold text-base md:text-lg line-clamp-1">{movie.title}</h3>
                        <p className="text-yellow-300/90 text-sm mt-1">{movie.year}</p>
                      </div>
                    </div>
                  )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
