import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

// Images are served from the Supabase project's public storage.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined;

const nextConfig: NextConfig = {
  // There's a stray package-lock.json in the parent folder; keep Turbopack
  // anchored to this project.
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
};

export default withNextIntl(nextConfig);
