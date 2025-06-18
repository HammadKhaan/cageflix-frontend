import { useNavigate } from "react-router-dom";
import { FilmIcon } from "@heroicons/react/24/solid";

export const WatchTrailer = () => {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => navigate('/under-construction')}
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2"
        >
            <FilmIcon className="w-5 h-5" />
            Watch Trailer
        </button>

    )
}
