import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';

import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { fetchSearchedMovies } from '../utils/api';
import Spinner from '../components/Spinner';
import type { Movie } from '../types/Movie';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../components/ErrorMessage';

function useQueryForSearch() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
    const queryParam = useQueryForSearch().get("q") || "";

    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ['searchedMovies'],
        queryFn: fetchSearchedMovies,
    });

    const fuse = useMemo(() => {
        return new Fuse(movies, {
            keys: ['title', 'genres'],
            threshold: 0.4,
            ignoreLocation: true,
        });
    }, [movies]);

    const results = useMemo<Movie[]>(() => {
        return queryParam.trim() ? fuse.search(queryParam).map(res => res.item as Movie) : [];
    }, [queryParam, fuse]);


    if (isLoading) return <div className="text-white p-6"><Spinner /></div>;
    if (isError) return <div className="text-red-500 p-6"><ErrorMessage message='Failed to load search results' /></div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header />

            <main className="pt-24 px-6">
                {queryParam && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">
                            Results for: <span className="text-red-400">"{queryParam}"</span>
                        </h1>

                        {results.length === 0 ? (
                            <p className="text-gray-400">No results found.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {results.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default SearchResults;
