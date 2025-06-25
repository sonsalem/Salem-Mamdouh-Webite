import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fqaciwqylmwewpvddcjd.supabase.co"],
  },
};
export default withNextIntl(nextConfig);
