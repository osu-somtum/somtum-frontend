import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import InternalError from "@/app/error/InternalError";

export default async function UserProfile({ params }) {
  
  try {
    await fetch('https://api.pla-ra.xyz/v1/status', { method: 'HEAD' });
  } catch (error) {
    return InternalError();
  }
  const { userid } = await params;

  let userData;

  try {
    const res = await fetch(`https://api.pla-ra.xyz/v2/players/${userid}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      InternalError();
    }

    userData = await res.json();

    if (userData.status === 'error') {
      return notFound();
    }
  } catch (error) {
    return InternalError();
  }

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="max-w-sm border rounded-lg shadow bg-gray-800/80 border-gray-700/50">
            <div className="p-8">
                <div className="flex items-center">
                    <img src={`https://a.pla-ra.xyz/${userid}`} alt={`${userData?.data?.name}'s profile`} className="sm:items-left w-32 h-32 rounded-full mr-4 inline-block" />
                    <a>
                    <h className="mb-2 text-2xl font-bold tracking-tight text-white">{userData?.data?.name || 'Loading...'}</h>
                    <h className="mb-2 text-sm tracking-tight text-gray-400">Previous Name: <a className="text-white">{userData?.data?.old_name || 'Loading...'}</a></h>
                    </a>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">bio test</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    test button
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

