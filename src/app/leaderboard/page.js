'use client'

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import config from "../config";

export default function Home() {
  const { baseAPIUrl, mainUrl, discordInviteLink, logoLink, brandName, osuLogo, osuTaikoLogo, osuManiaLogo, osuCatchLogo } = config;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="h-full w-full border rounded-lg shadow bg-gray-800/50 border-gray-700/50">
            <div className="p-5">
                <h5 className="sm:text-center mb-8 mt-8 text-4xl font-bold tracking-tight text-white">Leaderboard</h5>
                <div className="flex items-center justify-center">
                    <ul className="flex items-center sm:items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
                        <li className="flex items-center">
                            <img src={osuLogo} alt="GitHub logo" className="h-4 w-4 me-2"/>
                            <a href="" className="hover:underline me-4 md:me-6">osu!</a>
                        </li>
                        <li className="flex items-center">
                            <img src={osuTaikoLogo} alt="GitHub logo" className="h-4 w-4 me-2"/>
                            <a href="" className="hover:underline me-4 md:me-6">osu!taiko</a>
                        </li>
                        <li className="flex items-center">
                            <img src={osuCatchLogo} alt="GitHub logo" className="h-4 w-4 me-2"/>
                            <a href="" className="hover:underline me-4 md:me-6">osu!catch</a>
                        </li>
                        <li className="flex items-center">
                            <img src={osuManiaLogo} alt="GitHub logo" className="h-4 w-4 me-2"/>
                            <a href="" className="hover:underline me-4 md:me-6">osu!mania</a>
                        </li>
                    </ul>
                </div>
                <p className="mt-8 font-normal text-gray-700 dark:text-gray-400">test.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    but t o n
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}