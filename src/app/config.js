const config = {
    baseAPIUrl: process.env.NEXT_PUBLIC_BASE_API_URL || "https://api.pla-ra.xyz",
    mainUrl: process.env.NEXT_PUBLIC_MAIN_URL || "https://pla-ra.xyz",
    avatarUrl: process.env.NEXT_PUBLIC_AVATAR_URL || "https://a.pla-ra.xyz",
    discordInviteLink: process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || "https://discord.com/invite/FANdkPJZZT",
    githubLink: process.env.NEXT_PUBLIC_GITHUB_LINK || "https://github.com/osu-somtum",
    twitterLink: process.env.NEXT_PUBLIC_TWITTER_LINK || "https://twitter.com/idk",
    youtubeLink: process.env.NEXT_PUBLIC_YOUTUBE_LINK || "https://www.youtube.com/yt",
    logoLink: process.env.NEXT_PUBLIC_LOGO_LINK || "/assets/somtum.png",
    backgroundImage: process.env.NEXT_PUBLIC_BACKGROUND_IMAGE || "/assets/background.jpg",

    discordSVG: process.env.NEXT_PUBLIC_DISCORD_SVG || "/assets/discord-mark-white.svg",
    twitterSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/twitter.svg",
    youtubeSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/youtube.svg",
    githubSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/github-mark.svg",

    brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "osu!somtum - Development Envionment",
    brandDescription: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION || "osu!somtum - Private osu! Server!",
  };
  
export default config;
  