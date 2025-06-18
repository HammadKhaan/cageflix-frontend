import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPoster } from '../utils/api';
import TopPicks from './TopPicks';
import type { Movie } from '../types/Movie';
import { WatchNow } from '../buttons/WatchNow';
import { WatchTrailer } from '../buttons/WatchTrailer';

interface TopRatedBannerProps {
    movies: Movie[];
}

const TopRatedBanner: React.FC<TopRatedBannerProps> = ({ movies }) => {

    const [selectedHeroMovie, setSelectedHeroMovie] = useState<Movie | null>(null);

    const heroMovie = useMemo(() => {
        if (selectedHeroMovie) {
            return selectedHeroMovie;
        }
        return movies?.length
            ? movies?.reduce((highest, movie) =>
                movie.rating > highest.rating ? movie : highest
            )
            : null;
    }, [movies, selectedHeroMovie]);

    const { data: heroMoviePosterUrl } = useQuery({
        queryKey: ['poster', heroMovie?.id],
        queryFn: () => fetchPoster(heroMovie?.id || ''),
    });

    const handleMovieCardClick = (movie: Movie) => {
        setSelectedHeroMovie(movie);
    };


    return (
        <>
            <div
                className="relative h-[85vh] w-full bg-cover bg-center flex flex-col justify-between px-4
                md:px-8 lg:px-16 transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 30%, transparent 70%), url(${heroMoviePosterUrl})`,
                    transition: 'background-image 0.6s ease-in-out',
                }}
            >
                <div className='flex-[0.5]'></div>
                <div className="relative z-10 max-w-2xl mt-16">
                    <div className="flex gap-4 text-gray-300 mb-4">
                        <span>{heroMovie?.year}</span>
                        <span>|</span>
                        <span>{heroMovie?.genres.join(', ')}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 drop-shadow-2xl">
                        {heroMovie?.title}
                    </h1>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-md">
                            {heroMovie?.rating}/10
                        </div>
                        <p className="text-lg text-yellow-300">IMDb Rating</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <WatchNow />
                        <WatchTrailer />
                    </div>
                </div>
                <TopPicks
                    movies={movies || []}
                    heroMovieId={heroMovie?.id}
                    onMovieClick={handleMovieCardClick}
                />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
        </>
    );
};

export default TopRatedBanner;
