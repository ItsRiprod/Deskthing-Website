interface NewsData {
  source: string;
  title: string;
  description: string;
  imgUrl: string;
  imgCredit: string;
  featured: boolean;
}

export const newsData: newsData[] = [
  {
      source: "The Verge",
      sourceUrl: "https://www.theverge.com/2024/12/9/24317379/spotify-car-thing-shut-down-refund-deadline",
      title: "Spotify shuts down Car Thing, and now owners have one last chance at a refunds",
      description: "Spotify’s Car Thing is displaying a final goodbye message for any remaining owners, although some have found new uses for the gadget.",
      imgUrl: "https://duet-cdn.vox-cdn.com/thumbor/40x28:1938x1163/640x427/filters:focal(1231x774:1232x775):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/22439537/acarman_20210412_4524_0003.jpg",
      imgCredit: "Ashley Carman",
      featured: true,
  },
  {
      source: "Tom's Guide",  
      sourceUrl: "https://www.tomsguide.com/audio/spotify-car-thing-is-dead-or-is-it-heres-how-to-hack-your-bricked-music-slab",
      title: "Spotify Car Thing is dead — or is it? Here's how to hack your bricked music slab",
      description: "Reanimate that which has left this mortal coil.",
      imgUrl: "https://cdn.mos.cms.futurecdn.net/LSqXu4yJ9hMh5MDt5ytCGQ-970-80.jpg.webp",
      imgCredit: "Dammit Jeff",
      featured: true,
  },
  {
      source: "Linus Tech Tips",
      sourceUrl: "https://youtu.be/MvJ7o7hwo5g?si=0LA97Dzz74QqwVqj",
      title: "With Modding, All Things Are Possible",
      description: "Several modders have developed custom firmware for the soon-to-be-bricked car thing.",
      imgUrl: "https://i.ytimg.com/vi/MvJ7o7hwo5g/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAXoGl6aKtEeS5MvP7WF5HK4gIfEQ",
      imgCredit: "LMG Clips",
      featured: true,
  },
  {
    source: "Adafruit Industries",
    sourceUrl: "https://youtu.be/MvJ7o7hwo5g?si=0LA97Dzz74QqwVqj",
    title: "What to do with the Spotify Car Thing",
    description: "You may have heard that Spotify’s car thing will stop operating after December 9.",
    imgUrl: "https://i.ytimg.com/vi_webp/vQVuGeoqyUc/mqdefault.webp",
    imgCredit: "Dammit Jeff",
    featured: true,
},
];
