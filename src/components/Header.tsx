import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <header className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm py-4 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col md:flex-row md:justify-between md:items-center gap-2 sm:flex-row sm:justify-between sm:items-center sm:gap-0 text-center sm:text-left">
      <div className="text-2xl font-bold text-red-600">CAGEFLIX</div>

      <div className="text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-white/80 px-2">
        <span>All Nicolas Cage movies and shows in one place!</span>
      </div>

      <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-gray-800 text-white py-2 pl-10 pr-4 rounded-full w-full sm:w-40 md:w-56 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>
    </header>
  );
};

export default Header;