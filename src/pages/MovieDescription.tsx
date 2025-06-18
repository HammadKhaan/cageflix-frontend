import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, FilmIcon, PlayIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';

const MovieDescription: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div
            key={state.movie.id}
            className="relative h-screen w-full bg-cover bg-center text-white"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${state.posterUrl})`,
            }}
        >
            <Header />
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back
                </button>
            </div>

            <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{state.movie.title}</h1>
                <div className="flex gap-4 text-lg text-white/80 mb-2">
                    <span>{state.movie.year}</span>
                    <span>|</span>
                    <span>{state.movie.genres.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md">
                        {state.movie.rating}/10
                    </div>
                    <span className="text-yellow-300">IMDb Rating</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button
                        onClick={() => navigate('/under-construction')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <PlayIcon className="w-5 h-5" />
                        Watch Now
                    </button>
                    <button
                        onClick={() => navigate('/under-construction')}
                        className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <FilmIcon className="w-5 h-5" />
                        Watch Trailer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDescription;
