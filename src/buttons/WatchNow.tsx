import { useNavigate } from "react-router-dom";
import { PlayIcon } from "@heroicons/react/24/solid";

export const WatchNow = () => {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => navigate('/under-construction')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8
            rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2"
        >
            <PlayIcon className="w-5 h-5" />
            Watch Now
        </button>

    )
}
