import React, { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import image from '../src/assets/pig.jpg'
import GenreRow from './components/GenreRow';
import HeroSection from './components/HeroSection';
import TopPicks from './components/TopPicks';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { fetchMovies } from './utils/api';



function App() {

  type Movie = {
    id: string;
    title: string;
    year: number;
    genres: string[];
    rating: number;
  };

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHeroMovie, setSelectedHeroMovie] = useState<Movie | null>(null);
  const [heroMoviePosterUrl, setHeroMoviePosterUrl] = useState<string | null>(null);



  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };


  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  const heroMovie = useMemo(() => {
    if (selectedHeroMovie) {
      return selectedHeroMovie;
    }
    return movies.length
      ? movies.reduce((highest, movie) =>
        movie.rating > highest.rating ? movie : highest
      )
      : null;
  }, [movies, selectedHeroMovie]);

  useEffect(() => {
    if (heroMovie) {
      import('./utils/api').then(({ fetchPoster }) => {
        fetchPoster(heroMovie.id)
          .then((url) => setHeroMoviePosterUrl(url))
          .catch((err) => {
            console.error('Failed to fetch hero movie poster:', err);
            setHeroMoviePosterUrl('');
          });
      });
    }
  }, [heroMovie]);

  const handleMovieCardClick = (movie: Movie) => {
    console.log('Selected movie:', movie);
    setSelectedHeroMovie(movie);
  };

  const genreMap = useMemo(() => {
    const map: Record<string, Movie[]> = {};
    for (const movie of movies) {
      for (const genre of movie.genres) {
        if (!map[genre]) map[genre] = [];
        map[genre].push(movie);
      }
    }
    return map;
  }, [movies]);

  return (
    <>

      {heroMovie &&
        <div className="bg-gray-900 min-h-screen text-white">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

          <div
            className="relative h-[85vh] w-full bg-cover bg-center flex flex-col justify-between px-4 md:px-8 lg:px-16 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 30%, transparent 70%), url(${heroMoviePosterUrl})`,
              transition: 'background-image 0.6s ease-in-out',
            }}
          >
            <div className='flex-[0.5]'></div>
            <HeroSection heroMovie={heroMovie} backgroundImage={image} />

            <TopPicks
              movies={movies}
              heroMovieId={heroMovie?.id}
              onMovieClick={handleMovieCardClick}
            />

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent">
            </div>
          </div>

          {Object.entries(genreMap).map(([genre, genreMovies]) => (
            <GenreRow
              key={genre}
              title={genre}
              movies={genreMovies}
              heroMovieId={heroMovie?.id}
            />
          ))}
        </div>
      }
    </>
  );
}

export default App;