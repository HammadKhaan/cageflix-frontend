import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMoviesByGenre } from '../utils/api';
import MovieCard from './MovieCard';

type Props = {
    genre: string;
};

const GenreRow: React.FC<Props> = ({ genre }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['moviesByGenre', genre],
        queryFn: ({ pageParam = 0 }) => fetchMoviesByGenre(genre, pageParam, 10),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.flatMap(p => p.results).length;
            return totalFetched < lastPage.total ? totalFetched : undefined;
        },
    });

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 300;
        container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });

        const { scrollLeft, clientWidth, scrollWidth } = container;
        if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 300 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const movies = data?.pages.flatMap(p => p.results) ?? [];

    return (
        <div className="py-10 px-4 md:px-8 lg:px-16 relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                {genre}
            </h2>

            <button
                onClick={() => scroll('left')}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-gray-700 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
                aria-label={`Scroll ${genre} left`}
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-gray-700 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
                aria-label={`Scroll ${genre} right`}
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar"
            >
                <div className="flex space-x-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                    {isFetchingNextPage && (
                        <div className="text-white flex items-center justify-center w-40 h-60 bg-gray-800 rounded-md">
                            Loading...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenreRow;
