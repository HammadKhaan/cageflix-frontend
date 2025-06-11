// pages/SearchResults.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../utils/api';

type Movie = {
    id: string;
    title: string;
    year: number;
    genres: string[];
    rating: number;
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
    const queryParam = useQuery().get("q") || "";
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

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

    const fuse = useMemo(() => {
        return new Fuse(movies, {
            keys: ['title', 'genres'],
            threshold: 0.4,
            ignoreLocation: true,
        });
    }, [movies]);

    const results = useMemo(() => {
        return queryParam.trim() ? fuse.search(queryParam).map(res => res.item) : [];
    }, [queryParam, fuse]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`, {
                replace: true,
            });
        }
    };


    if (loading) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />

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
