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
  const [selectedHeroMovie, setSelectedHeroMovie] = useState<Movie | null>(null); // New state for selected hero movie



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

  // Find highest rated movie for hero section initially, or use the selectedHeroMovie
  const heroMovie = useMemo(() => {
    if (selectedHeroMovie) {
      return selectedHeroMovie;
    }
    return movies.length
      ? movies.reduce((highest, movie) =>
        movie.rating > highest.rating ? movie : highest
      )
      : null;
  }, [movies, selectedHeroMovie]); // Add selectedHeroMovie to the dependency array

  // Handler for clicking a movie card in Top Picks
  const handleMovieCardClick = (movie: Movie) => {
    setSelectedHeroMovie(movie);
  };

  // Group movies by genre
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
  const genreEntries = Object.entries(genreMap);

  // Lazy loading more genre rows on scroll
  // useEffect(() => {
  //   function onScroll() {
  //     console.log('hereeeee');
  //     const scrollTop = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const fullHeight = document.documentElement.scrollHeight;

  //     // If user scrolled near bottom (within 300px), load more genres
  //     if (scrollTop + windowHeight > fullHeight - 300) {
  //       setVisibleCount((count) => Math.min(count + 2, genreEntries.length));
  //     }
  //   }

  //   window.addEventListener('scroll', onScroll);
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, [genreEntries.length]);

  return (
    <>

      {heroMovie &&
        <div className="bg-gray-900 min-h-screen text-white">
          {/* Header with Search Bar */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

          {/* Hero Section with Top Picks integrated */}
          <div
            className="relative h-[85vh] w-full bg-cover bg-center flex flex-col justify-between px-4 md:px-8 lg:px-16"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 30%, transparent 70%), url(${image})`,
            }}
          >
            <div className='flex-[0.5]'></div>
            {/* Main Hero Content */}
            <HeroSection heroMovie={heroMovie} backgroundImage={image} />

            {/* Top Picks Section integrated at bottom */}
            <TopPicks
              movies={movies}
              heroMovieId={heroMovie?.id}
              onMovieClick={handleMovieCardClick}
            />

            {/* Gradient overlay for bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent">
            </div>
          </div>

          {/* Additional content sections would go here */}
          {Object.entries(genreMap).map(([genre, genreMovies]) => (
            <GenreRow
              key={genre}
              title={genre}
              movies={genreMovies.slice(0, 1)}
              heroMovieId={heroMovie?.id}
            />
          ))}
        </div>
      }
    </>
  );
}

export default App;