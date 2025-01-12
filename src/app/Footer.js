import config from "./config";

export default function Footer() {
  const { baseAPIUrl, mainUrl, discordInviteLink, githubLink, twitterLink, youtubeLink, brandName } = config;
  return (
    <footer className="rounded-lg shadow bg-gray-900/50 m-4 fixed bottom-0 left-0 right-0  border-gray-600">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">{brandName}</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li className="flex items-center">
              <img
                src="/github-mark.svg"
                alt="GitHub logo"
                className="h-4 w-4 me-2 filter invert"
              />
              <a href={githubLink} className="hover:underline me-4 md:me-6">
                Github
              </a>
            </li>
            <li className="flex items-center">
              <img
                src="/discord-mark-white.svg"
                alt="Discord logo"
                className="h-4 w-4 me-2 filter"
              />
              <a href={discordInviteLink} className="hover:underline me-4 md:me-6">
                Discord
              </a>
            </li>
            <li className="flex items-center">
              <img
                src="/youtube.svg"
                alt="Youtube logo"
                className="h-4 w-4 me-2"
              />
              <a href={youtubeLink} className="hover:underline me-4 md:me-6">
                YouTube
              </a>
            </li>
            <li className="flex items-center">
              <img
                src="/twitter.svg"
                alt="Twitter logo"
                className="h-4 w-4 me-2"
              />
              <a href={twitterLink} className="hover:underline me-4 md:me-6">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

