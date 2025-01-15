'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import config from "../config";

const LeftArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

export default function Home() {
  const { baseAPIUrl, avatarUrl, osuLogo, osuTaikoLogo, osuCatchLogo, osuManiaLogo } = config;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultParams = {
    mods: "vn",
    sort: "pp",
    page: "1"
  };

  const getModeFromMods = (mods, gameMode) => {
    switch (gameMode) {
      case "taiko":
        if (mods === "rx") return 5; // Taiko Relax
        return 1; // Taiko Vanilla
      case "catch":
        if (mods === "rx") return 6; // Catch Relax
        return 2; // Catch Vanilla
      case "mania":
        return 3; // Mania (no mods)
      default:
        if (mods === "rx") return 4; // Relax
        if (mods === "ap") return 8; // Autopilot
        return 0; // Vanilla (Standard)
    }
  };

  const handleGameModeChange = (newGameMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newGameMode);
    router.push(`?${params.toString()}`);
  };

  const getLeaderboardTitle = () => {
    const mods = searchParams.get("mods") || defaultParams.mods;
    if (mods === "rx") return "Relax Leaderboard";
    if (mods === "ap") return "Autopilot Leaderboard";
    return "Vanilla Leaderboard";
  };

  useEffect(() => {
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

    if (needsUpdate) {
      router.push(`?${params.toString()}`);
    } else {
      fetchLeaderboard();
    }
  }, [searchParams]); // Re-fetch leaderboard on parameter change

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const mods = searchParams.get("mods") || defaultParams.mods;
      const gameMode = searchParams.get("mode") || "standard";
      const mode = getModeFromMods(mods, gameMode);
      const page = parseInt(searchParams.get("page") || defaultParams.page, 10);
      const offset = (page - 1) * 50;

      const response = await fetch(
        `${baseAPIUrl}/v1/get_leaderboard?mode=${mode}&mods=${mods}&sort=pp&limit=50&offset=${offset}`
      );

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

  const handleModsChange = (newMods) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mods", newMods);
    router.push(`?${params.toString()}`);
  };

  const isButtonDisabled = (mods) => {
    const gameMode = searchParams.get("mode") || "standard";
    if (gameMode === "mania" && (mods === "rx" || mods === "ap")) return true;
    if ((gameMode === "taiko" || gameMode === "catch") && mods === "ap") return true;
    return false;
  };

  const handleNextPage = () => {
    const currentPage = parseInt(searchParams.get("page") || defaultParams.page, 10);
    const nextPage = currentPage + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    const currentPage = parseInt(searchParams.get("page") || defaultParams.page, 10);
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", previousPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-mali)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <div className="h-full w-[90%] lg:w-[80%] border rounded-lg shadow bg-gray-700/50 border-gray-700/50">
          <div className="p-5">
            <h5 className="sm:text-center mb-8 mt-8 text-4xl font-bold tracking-tight text-white">
              {getLeaderboardTitle()}
            </h5>
            <div className="flex items-center justify-center">
              <ul className="flex items-center sm:items-center mb-8 text-sm font-medium text-white">
                <li className="flex items-center">
                  <img src={osuLogo} alt="osu! logo" className="h-4 w-4 me-2" />
                  <a href="#" onClick={() => handleGameModeChange("standard")} className="hover:underline me-4 md:me-6">osu!</a>
                </li>
                <li className="flex items-center">
                  <img src={osuTaikoLogo} alt="osu!taiko logo" className="h-4 w-4 me-2" />
                  <a href="#" onClick={() => handleGameModeChange("taiko")} className="hover:underline me-4 md:me-6">osu!taiko</a>
                </li>
                <li className="flex items-center">
                  <img src={osuCatchLogo} alt="osu!catch logo" className="h-4 w-4 me-2" />
                  <a href="#" onClick={() => handleGameModeChange("catch")} className="hover:underline me-4 md:me-6">osu!catch</a>
                </li>
                <li className="flex items-center">
                  <img src={osuManiaLogo} alt="osu!mania logo" className="h-4 w-4 me-2" />
                  <a href="#" onClick={() => handleGameModeChange("mania")} className="hover:underline me-4 md:me-6">osu!mania</a>
                </li>
              </ul>
            </div>
            <div className="mb-5 flex items-center justify-center">
              <ul className="flex items-center sm:items-center mb-6 text-sm font-medium text-white sm:mb-0">
                <li>
                  <a href="#" onClick={() => handleModsChange("vn")} className={`hover:underline me-4 md:me-6 ${isButtonDisabled("vn") ? "text-gray-500 cursor-not-allowed" : ""}`} style={{ pointerEvents: isButtonDisabled("vn") ? "none" : "auto" }}>Vanilla</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleModsChange("rx")} className={`hover:underline me-4 md:me-6 ${isButtonDisabled("rx") ? "text-gray-500 cursor-not-allowed" : ""}`} style={{ pointerEvents: isButtonDisabled("rx") ? "none" : "auto" }}>Relax</a>
                </li>
                <li>
                  <a href="#" onClick={() => handleModsChange("ap")} className={`hover:underline me-4 md:me-6 ${isButtonDisabled("ap") ? "text-gray-500 cursor-not-allowed" : ""}`} style={{ pointerEvents: isButtonDisabled("ap") ? "none" : "auto" }}>Autopilot</a>
                </li>
              </ul>
            </div>
            <div className="relative overflow-x-auto rounded-lg">
              {isLoading ? (
                <p className="text-center text-white">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
              ) : (
                <>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700/50 text-gray-400 text-center">
                      <tr>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3">PP</th>
                        <th className="px-6 py-3">Accuracy</th>
                        <th className="px-6 py-3">Playcount</th>
                        <th className="px-6 py-3">Max Combo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((player, index) => (
                        <tr key={player.player_id} className="text-sm border-b bg-gray-800/50 border-gray-700/50 text-white">
                          <td className="px-6 py-3 w-10">#{(parseInt(searchParams.get("page") || defaultParams.page, 10) - 1) * 50 + index + 1}</td>
                          <td className="px-2 py-3 w-10">
                            <img src={`/assets/flags/${player.country.toUpperCase()}.png`} alt="flag" className="w-auto h-6 inline-block ml-0" />
                          </td>
                          <td className="px-6 py-3">
                            <img src={`${avatarUrl}/${player.player_id}`} className="sm:items-left w-8 h-8 rounded-full mr-4 inline-block" />
                            <a href={`/u/${player.player_id}`}>{player.name}</a>
                          </td>
                          <td className="px-6 py-3 text-center">{player.pp}pp</td>
                          <td className="px-6 py-3 text-center">{player.acc.toFixed(2)}%</td>
                          <td className="px-6 py-3 text-center">{player.plays}</td>
                          <td className="px-6 py-3 text-center">{player.max_combo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handlePreviousPage}
                      className={`px-4 py-2 bg-gray-500/50 text-white rounded-full hover:bg-gray-700/50 flex items-center justify-center ${parseInt(searchParams.get("page") || defaultParams.page, 10) === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={parseInt(searchParams.get("page") || defaultParams.page, 10) === 1}
                    >
                      <LeftArrowIcon />
                    </button>
                    <span className="px-4 py-2 text-white">{`Page ${searchParams.get("page") || defaultParams.page}`}</span>
                    <button
                      onClick={handleNextPage}
                      className={`px-4 py-2 bg-gray-500/50 text-white rounded-full hover:bg-gray-700/50 flex items-center justify-center ${leaderboard.length < 50 ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={leaderboard.length < 50}
                    >
                      <RightArrowIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
