'use client'

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import config from "../config";

export default function Home() {
  const { BuyMeACoffeeLink, patreonLink, kofiLink, logoLink } = config;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
      <img src={logoLink} className="h-[10.5rem] w-auto" alt="Logo" />
        <ol className="text-bold mb-2 text-white text-xl text-sm text-center sm:text-center font-[family-name:var(--font-geist-sans)]">
          <li>If you wish to support me.</li>
          <li className="mb-10">Please consider supporting me on one of the following platforms:</li>
          <div className="flex gap-4 items-center flex-col sm:flex-row justify-center">
            <a href={patreonLink} className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2">Patreon</a>
            <a href={kofiLink} className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2">Ko-fi</a>
          </div>
        </ol>

      </main>
      <Footer />
    </div>
  );
}