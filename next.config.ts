import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  // There's a stray package-lock.json in the parent folder; keep Turbopack
  // anchored to this project.
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fqaciwqylmwewpvddcjd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
