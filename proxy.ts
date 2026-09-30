import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/lib/i18n-config";

// Next 16 renamed middleware to "proxy".
export default createMiddleware({
  // A list of all locales that are supported
  locales: [...locales],

  // Used when no locale matches
  defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
