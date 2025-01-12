"use client";

import React, { useState, useEffect, useRef } from 'react';
import config from './config';

const NavBar = () => {
  const { baseAPIUrl, mainUrl, avatarUrl } = config;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
    } else {
      const timeoutId = setTimeout(() => {
        setIsLoading(true);
        setShowDropdown(true);

        fetch(`${baseAPIUrl}/v1/search_players?q=${searchQuery}`)
          .then(response => response.json())
          .then(data => {
            console.log('Search results:', data);
            if (Array.isArray(data.result)) {
              setSearchResults(data.result);
            } else {
              setSearchResults([]);
            }
          })
          .catch(error => {
            console.error('Search error:', error);
            setSearchResults([]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const shouldShowDropdown = showDropdown && (isLoading || searchResults.length > 0);

  return (
    <nav suppressHydrationWarning className="bg-white rounded-lg shadow bg-gray-900/50 m-4 fixed top-0 left-0 right-0 border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a href="/">
            <img src="https://pla-ra.xyz/static/images/somtum.png" className="h-8" alt="Logo" />
          </a>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-emerald-300 md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-emerald-300 md:p-0 hover:bg-transparent">Leaderboard</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-emerald-300 md:p-0 hover:bg-transparent">Top Plays</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-emerald-300 md:p-0 hover:bg-transparent">Guilds</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-emerald-300 md:p-0 hover:bg-transparent">Donation</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:hover:text-emerald-300 md:p-0 hover:bg-transparent">Docs</a>
            </li>
          </ul>
        </div>
        <div className="flex md:order-2">
          <div className="relative hidden md:block mr-2" ref={dropdownRef}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            {shouldShowDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-gray-800/50 border border-gray-600 rounded-lg shadow-lg">
                {isLoading && (
                  <div className="p-2 text-gray-400">Loading...</div>
                )}
                {!isLoading && searchResults.length > 0 && (
                  <ul className="max-h-60 overflow-y-auto py-1">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <a
                          href={`/u/${result.id}`}
                          className="block px-4 py-2 text-white hover:bg-gray-700/50 cursor-pointer"
                        >
                            <img src={`${avatarUrl}/${result.id}`} className="sm:items-left w-8 h-8 rounded-full mr-4 inline-block" />
                          {result.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {!isLoading && searchResults.length === 0 && searchQuery.length >= 2 && (
                  <div className="p-2 text-gray-400">No results found</div>
                )}
              </div>
            )}
          </div>
          <button type="button" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-base px-4 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2">Sign Up</button>
          <button type="button" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-base px-4 py-2 text-center bg-emerald-500 hover:bg-emerald-600">Log in</button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
