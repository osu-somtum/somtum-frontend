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
                <p className="mb-4 mt-8 font-normal text-white text-center">You are currently viewing osu! category.</p>
                <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700/50 text-gray-400 text-center">
                            <tr>
                                <th scope="col" className="px-4 py-2">
                                    
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    PP
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Accuracy
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Playcount
                                </th>
                                <th scope="col" className="px-4 py-2">
                                    Max Combo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b bg-gray-800/50 border-gray-700/50 text-white whitespace-nowrap font-medium">
                                <td className="px-4 py-2">
                                    #1
                                </td>
                                <td className="px-4 py-2">
                                    <img src="/assets/flags/Thailand.png" className="w-auto h-6 mr-2 inline-block"/>
                                </td>
                                <th scope="row" className="px-4 py-2">
                                    223.207.246.70
                                </th>
                                <td className="px-4 py-2">
                                    69420pp
                                </td>
                                <td className="px-4 py-2">
                                    727%
                                </td>
                                <td className="px-4 py-2">
                                    69420
                                </td>
                                <td className="px-4 py-2">
                                    696969
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}