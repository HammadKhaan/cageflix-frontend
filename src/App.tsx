import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import Header from './components/Header';
import TopRatedBanner from './components/TopRatedBanner';
import GenreRow from './components/GenreRow';
import { fetchMovies } from './utils/api';
import type { Movie } from './types/Movie';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';



function App() {

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })

  const genreMap = useMemo(() => {
    const map: Record<string, Movie[]> = {};
    for (const movie of movies || []) {
      for (const genre of movie.genres) {
        if (!map[genre]) map[genre] = [];
        map[genre].push(movie);
      }
    }
    return map;
  }, [movies]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message='Failed to load movies' />;


  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <Header />

        <TopRatedBanner movies={movies || []} />

        {Object.keys(genreMap).map((genre) => (
          <GenreRow key={genre} genre={genre} />
        ))}
      </div>
    </>
  );
}

export default App;