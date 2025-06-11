import React, { useRef } from 'react';
import MovieCard from './MovieCard';

type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
};

type Props = {
  title: string;
  movies: Movie[];
  heroMovieId?: string;
};

const GenreRow: React.FC<Props> = ({ title, movies, heroMovieId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300; // adjust as needed
    if (direction === 'left') {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16 relative">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        {title}
        <span className="ml-4 text-gray-400 text-lg">({movies.length})</span>
      </h2>

      <button
        onClick={() => scroll('left')}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-gray-700 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label={`Scroll ${title} left`}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-gray-700 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label={`Scroll ${title} right`}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar"
      >
        <div className="flex space-x-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isActive={heroMovieId === movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreRow;
