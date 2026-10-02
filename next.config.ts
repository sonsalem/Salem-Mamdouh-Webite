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
  // The CV keeps one URL; make browsers revalidate it so a new PDF isn't
  // hidden behind a cached copy.
  async headers() {
    return [{ source: "/Salem-Mamdouh-CV.pdf", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] }];
  },
  // Old CV link (already shared around) → new one.
  async redirects() {
    return [{ source: "/Salem%20Mamdouh%20Salem%20CV.pdf", destination: "/Salem-Mamdouh-CV.pdf", permanent: true }];
  },
};

export default withNextIntl(nextConfig);
