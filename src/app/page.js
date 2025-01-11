import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
      <img src="https://pla-ra.xyz/static/images/somtum.png" className="h-[10.5rem] w-auto" alt="Logo" />
        <ol className="text-bold mb-2 text-white text-xl text-sm text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <li>Welcome to osu!somtum. i dont know what to put here</li>
          <li>Save and see your changes instantly.</li>
          <li>
            Join our <a className="bg-gradient-to-br from-[#5865F2] to-[#57F287] text-transparent bg-clip-text text-white" href="https://discord.gg/FANdkPJZZT">Discord Server</a>{" "}for the latest updates!
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button type="button" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-2 text-center bg-emerald-500 hover:bg-emerald-600 mb-2 md:mb-0 md:mr-2">Sign Up</button>
          <button type="button" className="text-white focus:ring-2 focus:outline-none focus:ring-teal-500 font-medium rounded-lg text-lg px-5 py-2 text-center bg-emerald-500 hover:bg-emerald-600">Log in</button>
        </div>

        {/* Featured Clips, Unused because there's no clip to show */}
        {/* <section className="flex flex-col gap-4 items-center">
          <h2 className="font-bold text-2xl text-white">Featured YouTube Clip</h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/0YOiluuZI7E" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>
        </section> */}

      </main>
      <Footer />
    </div>
  );
}

