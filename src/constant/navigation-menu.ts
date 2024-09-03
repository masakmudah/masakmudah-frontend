export const navigationMenu = [
  {
    label: "Resep",
    href: "/recipes",
  },
  {
    label: "About",
    href: "/about",
  },
  // {
  //   label: "Cerita Masakan",
  //   href: "/cerita-masakan",
  // },
  // {
  //   label: "Juara Masakan",
  //   href: "/juara-masakan",
  // },
];

export const socialMediaIcons = [
  {
    icon: "/images/social-media/facebook.svg",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`,
  },
  // {
  //   icon: "/images/social-media/instagram.svg",
  //   href: "https://www.instagram.com/",
  // },
  {
    icon: "/images/social-media/x.svg",
    href: `https://x.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`,
  },
];
