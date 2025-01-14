import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
      <img src="https://pla-ra.xyz/static/images/somtum.png" className="h-[10.5rem] w-auto" alt="Logo" />
        <ol className="text-bold mb-2 text-white text-xl text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Oops, 404 Page not found </li>
          <li>You are looking for a page that does not exist</li>
          <li>- Check that the URL you entered is correct.</li>
          <li>- Make sure that the place you are visiting isn't under maintenance!</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a href="/" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2">Go Back to Home Page</a>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}

