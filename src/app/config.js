const config = {
    /* this is really important, do not remove unless ur fuckin gay */
    baseAPIUrl: process.env.NEXT_PUBLIC_BASE_API_URL || "https://api.pla-ra.xyz",
    mainUrl: process.env.NEXT_PUBLIC_MAIN_URL || "https://pla-ra.xyz",
    avatarUrl: process.env.NEXT_PUBLIC_AVATAR_URL || "https://a.pla-ra.xyz",
    /* links */
    discordInviteLink: process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK || "https://discord.com/invite/FANdkPJZZT",
    githubLink: process.env.NEXT_PUBLIC_GITHUB_LINK || "https://github.com/osu-somtum",
    twitterLink: process.env.NEXT_PUBLIC_TWITTER_LINK || "https://twitter.com/idk",
    youtubeLink: process.env.NEXT_PUBLIC_YOUTUBE_LINK || "https://www.youtube.com/yt",
    /* it existed for no reason */
    logoLink: process.env.NEXT_PUBLIC_LOGO_LINK || "/assets/somtum.png",
    backgroundImage: process.env.NEXT_PUBLIC_BACKGROUND_IMAGE || "/assets/background.jpg",
    /* svgs */
    discordSVG: process.env.NEXT_PUBLIC_DISCORD_SVG || "/assets/discord-mark-white.svg",
    twitterSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/twitter.svg",
    youtubeSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/youtube.svg",
    githubSVG: process.env.NEXT_PUBLIC_TWITTER_SVF || "/assets/github-mark.svg",
    /* branding embed thing i dont know */
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "osu!somtum - Development Envionment",
    brandDescription: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION || "osu!somtum - Private osu! Server!",
    brandImage: process.env.NEXT_PUBLIC_BRAND_IMAGE || "/assets/somtum.png", /* dont ask why this is duplicated here, it's because we might change them if we want to */
    /* more svg */
    osuLogo: process.env.NEXT_PUBLIC_OSU_LOGO || "/assets/modes/osu!.svg",
    osuTaikoLogo: process.env.NEXT_PUBLIC_OSU_TAIKO_LOGO || "/assets/modes/osu!taiko.svg",
    osuCatchLogo: process.env.NEXT_PUBLIC_OSU_CATCH_LOGO || "/assets/modes/osu!catch.svg",
    osuManiaLogo: process.env.NEXT_PUBLIC_OSU_MANIA_LOGO || "/assets/modes/osu!mania.svg",
    /* donation */
    kofiLink: process.env.NEXT_PUBLIC_KOFI_LINK || "https://ko-fi.com/blueskychan_",
    patreonLink: process.env.NEXT_PUBLIC_PATREON_LINK || "https://patreon.com/idk",
    /* captcha key thingy i do not care if i didnt remove it because i dont give a single shit  and it's not prod*/
    cloudflareCaptchaKey: process.env.GOOGLE_CAPTCHA_SITE_KEY || "0x4AAAAAAA5YgONz13byvpGB"
  };
  
export default config;
  