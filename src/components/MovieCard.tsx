import { useState } from "react";
import type { Movie } from "../types/Movie";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const [showPlot, setShowPlot] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => setShowPlot(!showPlot)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-600">
          {movie.year} • {movie.genre} • ⭐ {movie.imdbRating}
        </p>
        {showPlot && <p className="text-sm mt-2">{movie.plot}</p>}
      </div>
    </div>
  );
}
