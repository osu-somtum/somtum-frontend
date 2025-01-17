"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import config from '../config';

const NavBar = () => {
  const { baseAPIUrl, avatarUrl, logoLink } = config;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const docsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (docsRef.current && !docsRef.current.contains(event.target)) {
        setIsDocsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data.result)) {
              setSearchResults(data.result);
            } else {
              setSearchResults([]);
            }
          })
          .catch(() => {
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

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Top Plays', href: '/top-plays' },
    { name: 'Guilds', href: '/guilds' },
    { name: 'Donation', href: '/donation' },
  ];

  return (
    <nav suppressHydrationWarning className="transition-colors rounded-lg shadow bg-gray-900/50 m-4 fixed top-0 left-0 right-0 border-gray-600 font-[family-name:var(--font-mali)]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a href="/">
            <img src={logoLink} className="h-8" alt="Logo" />
          </a>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`block py-2 px-3 text-white rounded md:p-0 ${pathname === item.href ? 'md:text-emerald-300' : 'md:hover:text-emerald-300 hover:bg-transparent'}`}>
                  {item.name}
                </a>
              </li>
            ))}
              <li className="relative" ref={docsRef}>
              <a onClick={() => setIsDocsOpen(!isDocsOpen)} 
                className="block py-2 px-3 text-white rounded md:p-0 md:hover:text-emerald-300 hover:bg-transparent cursor-pointer">
                Docs
                <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <ul className={`absolute ${isDocsOpen ? 'block' : 'hidden'} bg-gray-700/50 text-white rounded-lg shadow-lg mt-4 w-48 min-w-[200px]`}>
                <li><a href="/docs/rules" className="block px-4 py-2 hover:bg-gray-200/20">Rules</a></li>
                <li><a href="/docs/connect" className="block px-4 py-2 hover:bg-gray-200/20">How to connect</a></li>
                <li><a href="/docs/api" className="block px-4 py-2 hover:bg-gray-200/20">API</a></li>
                <li><a href="/docs/faq" className="block px-4 py-2 hover:bg-gray-200/20">FAQ</a></li>
              </ul>
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
              className="block w-full p-2 ps-10 text-sm border border-gray-600 rounded-lg bg-gray-700/70 placeholder-gray-400 text-white focus:border-blue-500"
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
                  <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-gray-700/50 hover:scrollbar-thumb-gray-300 py-1">
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
          <a href="/register" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-base px-4 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2 transition-colors">Sign Up</a>
          <a href="/login" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-base px-4 py-2 text-center bg-emerald-500 hover:bg-emerald-600 transition-colors">Log in</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;