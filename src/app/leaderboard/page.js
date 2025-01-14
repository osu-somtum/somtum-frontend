'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import config from "../config";

export default function Home() {
  const { baseAPIUrl, avatarUrl, osuLogo, osuTaikoLogo, osuManiaLogo, osuCatchLogo } = config;
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultParams = {
    mode: "std",
    mods: "vn",
    sort: "pp",
    page: "1"
  };

  useEffect(() => {
    // Create a new URLSearchParams object to manage parameters
    const params = new URLSearchParams();
    let needsUpdate = false;

    // Check and set default parameters if needed
    Object.entries(defaultParams).forEach(([key, defaultValue]) => {
      const paramValue = searchParams.get(key);
      if (!paramValue) {
        params.set(key, defaultValue);
        needsUpdate = true;
      } else {
        params.set(key, paramValue);
      }
    });

    // If we need to update the URL with default parameters
    if (needsUpdate) {
      router.push(`?${params.toString()}`);
    } else {
      // If parameters are already set, fetch the leaderboard
      fetchLeaderboard(params.toString());
    }
  }, [searchParams]); // Depend on searchParams instead of router.isReady

  const fetchLeaderboard = async (queryParams) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.pla-ra.xyz/v1/get_leaderboard?mode=0&sort=pp&limit=50&offset=0`);
      
      if (!response.ok) {
        throw new Error(`Error fetching leaderboard: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.status === "success") {
        setLeaderboard(data.leaderboard.slice(0, 50));
      } else {
        throw new Error("API returned an unsuccessful status.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="h-full w-full border rounded-lg shadow bg-gray-800/50 border-gray-700/50">
          <div className="p-5">
            <h5 className="sm:text-center mb-8 mt-8 text-4xl font-bold tracking-tight text-white">
              Leaderboard
            </h5>
            <div className="flex items-center justify-center">
                <ul className="flex items-center sm:items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
                    <li className="mb-6flex items-center">
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
              {isLoading ? (
                <p className="text-center text-white">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-gray-700/50 text-gray-400 text-center">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">PP</th>
                      <th className="px-4 py-2">Accuracy</th>
                      <th className="px-4 py-2">Playcount</th>
                      <th className="px-4 py-2">Max Combo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((player, index) => (
                      <tr key={player.player_id} className="text-sm border-b bg-gray-800/50 border-gray-700/50 text-white">
                        <td className="px-4 py-2">#{index + 1}</td>
                        <td className="">
                          <img src={`/assets/flags/${player.country.toUpperCase()}.png`} alt="flag" className="w-auto h-6 mr-2 inline-block"/>
                        </td>
                        <td className="px-4 py-3">
                            <img src={`${avatarUrl}/${player.player_id}`} className="sm:items-left w-8 h-8 rounded-full mr-4 inline-block" />
                            <a href="/u/${player.player_id}">{player.name}</a>
                        </td>
                        <td className="px-4 py-2">{player.pp}</td>
                        <td className="px-4 py-2">{player.acc.toFixed(2)}%</td>
                        <td className="px-4 py-2">{player.plays}</td>
                        <td className="px-4 py-2">{player.max_combo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
