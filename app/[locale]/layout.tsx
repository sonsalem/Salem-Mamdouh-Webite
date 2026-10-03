import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Cursor from "@/components/Cursor";
import IntroLoader from "@/components/IntroLoader";
import ScrollRefresh from "@/components/ScrollRefresh";
import QueryProvider from "@/config/QueryProvider";

export const metadata: Metadata = {
  title: "Salem Mamdouh",
  description: "WebSIte Of Salem Mamdouh",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch translations for the current locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: apply the saved theme, and flag whether motion is
            allowed (animated elements start hidden only under .motion). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark");if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion")}catch(e){}`,
          }}
        />
        {/* Preconnecting to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400..900&family=Instrument+Serif:ital@0;1&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased overflow-x-clip ${
          locale === "en" ? "en" : "ar"
        }`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <IntroLoader />
            <ScrollRefresh />
            <Cursor />
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <ScrollToTop />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
