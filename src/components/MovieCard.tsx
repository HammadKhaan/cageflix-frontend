import React from 'react';
import { fetchPoster } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../types/Movie';

type Props = {
  movie: Movie
  isActive?: boolean;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();

  const { data: posterUrl } = useQuery({
    queryKey: ['poster', movie.id],
    queryFn: () => fetchPoster(movie.id),
  });

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`, {
        state: {
          movie,
          posterUrl,
        }
      })} className="cursor-pointer flex-shrink-0 w-64 h-79 rounded-xl overflow-hidden transition-all duration-300"
    >
      {posterUrl ? (
        <div className="h-40 w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-r from-indigo-900/80 to-purple-800/80 text-center px-4 text-white text-sm flex items-center
        justify-center">Poster Unavailable</div>
      )}

      <div className="p-4 h-39 bg-gray-800">
        <h3 className="font-bold text-lg text-white mb-1"
          style={{ WebkitLineClamp: 1, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>{movie.title}</h3>
        <p className="text-yellow-400 text-sm mb-2">{movie.year}</p>

        <div className="flex justify-between items-center mb-3">
          <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white">
            ⭐ {movie.rating ? `${movie.rating}/10` : 'N/A'}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre, i) => (
            <span
              key={i}
              className="text-[0.73rem] bg-red-900/80 px-2 py-1 rounded-full text-white"
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
