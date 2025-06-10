import React from 'react';

type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
};

interface TopPicksProps {
  movies: Movie[];
  heroMovieId?: string;
  onMovieClick: (movie: Movie) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ movies, heroMovieId, onMovieClick }) => (
  <div className="relative z-20 ">
    <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90">
      Top Picks
    </h2>
    <div className="flex overflow-x-auto py-4 -mx-4 px-4 hide-scrollbar">
      <div className="flex space-x-4">
        {movies
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)
          .map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className={`cursor-pointer flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${heroMovieId === movie.id
                ? 'ring-2 ring-red-500 scale-105'
                : 'bg-gray-800/70 backdrop-blur-sm'
              }`}
            >
              <div className="min-h-[200px] bg-gradient-to-r from-indigo-900/80 to-purple-800/80 flex items-center justify-center">
                <div className="text-center px-3">
                  <h3 className="font-bold text-base md:text-lg line-clamp-1">{movie.title}</h3>
                  <p className="text-yellow-300/90 text-sm mt-1">{movie.year}</p>
                </div>
              </div>
              {/* <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-gray-700/80 px-2 py-1 rounded-full text-xs">
                    {movie.rating}/10
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.slice(0, 2).map((genre, i) => (
                    <span
                      key={i}
                      className="text-xs bg-red-900/80 px-2 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default TopPicks;