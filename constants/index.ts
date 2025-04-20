// Brand Name

export const BRAND_NAME = "SALEM";
export const BRAND_NAME_AR = "سَالم";

// NAVIGATION

export const NAV_LINKS = [
  { href: `/`, key: "home", label: "Home" },
  { href: `works`, key: "works", label: "Works" },
  { href: `about`, key: "about", label: "About" },
];

// Projects

type Project = {
  name: string;
  images: { src: string }[];
  techStack: string[];
  features: string;
  github?: string;
  liveDemo?: string;
  new?: boolean;
};

const projects: Project[] = [
  {
    name: "Crypto Tracker",
    images: [
      { src: "/7-0.jpg" },
      { src: "/7-1.jpg" },
      { src: "/7-2.jpg" },
      { src: "/7-3.jpg" },
      { src: "/7-4.jpg" },
      { src: "/7-5.jpg" },
      { src: "/7-6.jpg" },
    ],
    techStack: ["React", "TypeScript", "CSS", "MUI", "Chart.js"],
    features:
      "A crypto tracker app that allows you to track the price of your favorite cryptocurrencies in real-time.",
    github: "https://github.com/sonsalem/CryptoTrachker",
    liveDemo: "https://crypto-trachker.vercel.app/",
    new: true,
  },
  {
    name: "Fresh Cart",
    images: [
      { src: "/6-0.jpg" },
      { src: "/6-1.jpg" },
      { src: "/6-2.jpg" },
      { src: "/6-3.jpg" },
      { src: "/6-4.jpg" },
      { src: "/6-5.jpg" },
      { src: "/6-6.jpg" },
      { src: "/6-7.jpg" },
      { src: "/6-8.jpg" },
      { src: "/6-9.jpg" },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn",
      "Redux",
      "Zod",
      "React-hook-form",
    ],
    features:
      "Modern e-commerce platform with a smooth UI, state management, and efficient cart handling",
    github: "https://github.com/sonsalem/Freash_Cart",
    liveDemo: "https://freash-cart-indol.vercel.app",
  },
  {
    name: "School Dashboard",
    images: [
      { src: "/5-0.png" },
      { src: "/5-1.png" },
      { src: "/5-2.png" },
      { src: "/5-3.png" },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Hook Form",
      "Big Calendar",
      "recharts",
    ],
    features: "Dashboard For School has all sections you need",
    github: "https://github.com/sonsalem/School_Dashboard",
    liveDemo: "https://school-dashboard-lac.vercel.app/admin",
  },
  {
    name: "Live Docs",
    images: [
      { src: "/0-0.jpg" },
      { src: "/0-1.jpg" },
      { src: "/0-2.jpg" },
      { src: "/0-3.jpg" },
      { src: "/0-4.jpg" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Shadcn", "Clerk", "LiveBlocks"],
    features:
      "Real-time collaboration and document editing with multi-participant sharing.",
    github: "https://github.com/sonsalem/JSM_Live_Docs",
    liveDemo: "https://jsm-live-docs-chi.vercel.app",
  },
  {
    name: "Shop Nest",
    images: [
      { src: "/1-1.png" },
      { src: "/1-2.png" },
      { src: "/1-4.png" },
      { src: "/1-0.png" },
      { src: "/1-3.png" },
      { src: "/1-5.png" },
      { src: "/1-6.png" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn"],
    features: "Simplified product search and filter",
    github: "https://github.com/sonsalem/ShopNest",
    liveDemo: "https://shop-nest-six.vercel.app",
  },
  {
    name: "Lama (E-Commerce)",
    images: [
      { src: "/2-0.jpg" },
      { src: "/2-1.jpg" },
      { src: "/2-3.jpg" },
      { src: "/2-4.jpg" },
      { src: "/2-5.jpg" },
      { src: "/2-6.jpg" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Wix"],
    features: "Enhanced product search functionality.",
    github: "https://github.com/sonsalem/Lama-ecommerc",
  },
  {
    name: "Son Games",
    images: [
      { src: "/3-0.jpg" },
      { src: "/3-1.jpg" },
      { src: "/3-3.jpg" },
      { src: "/3-4.jpg" },
      { src: "/3-5.jpg" },
      { src: "/3-6.jpg" },
      { src: "/3-7.jpg" },
      { src: "/3-8.jpg" },
      { src: "/3-9.jpg" },
      { src: "/3-10.jpg" },
      { src: "/3-11.jpg" },
    ],
    techStack: ["HTML", "CSS", "JS"],
    features:
      "Search by brand, price range, compatibility, and product type, High-quality images, 360° product views, and videos.",
    github: "https://github.com/sonsalem/SonGames",
    liveDemo: "https://son-games.vercel.app",
  },
  {
    name: "Game Storm",
    images: [
      { src: "/4-0.jpg" },
      { src: "/4-1.jpg" },
      { src: "/4-3.jpg" },
      { src: "/4-4.jpg" },
      { src: "/4-5.jpg" },
      { src: "/4-6.jpg" },
      { src: "/4-7.jpg" },
      { src: "/4-8.jpg" },
    ],
    techStack: ["HTML", "CSS", "JS"],
    features: "High-quality images, 360° product views, and videos.",
    github: "https://github.com/sonsalem/GamesStrom",
    liveDemo: "https://games-strom.vercel.app/",
  },
];

export default projects;

export const skillsImgs = [
  { src: "/skill-1.png" },
  { src: "/skill-2.png" },
  { src: "/skill-10.png" },
  { src: "/skill-11.png" },
  { src: "/skill-12.png" },
  { src: "/skill-13.png" },
  { src: "/skill-3.png" },
  { src: "/skill-4.png" },
  { src: "/skill-5.png" },
  { src: "/skill-6.png" },
  { src: "/skill-7.png" },
  { src: "/skill-8.png" },
  { src: "/skill-9.png" },
];

export const SocilMedias = [
  {
    src: "/Facebook.png",
    href: "https://www.facebook.com/profile.php?id=61553863762148",
  },
  { src: "/Instagram.png", href: "https://www.instagram.com/_salem.mamdouh/" },
  {
    src: "/LinkedIn.png",
    href: "https://www.linkedin.com/in/salem-mamdouh-47b784266/",
  },
  { src: "/Whatsapp.png", href: "https://wa.me/201556617801" },
  {
    src: "/Tiktok.png",
    href: "https://www.tiktok.com/@_salem.mamdouh",
  },
  { src: "/Telegram.png", href: "https://t.me/sonsalem" },
  { src: "/google.png", href: "mailto:salemmamdouh77777@gmail.com" },
  { src: "/github.png", href: "https://github.com/sonsalem" },
];
