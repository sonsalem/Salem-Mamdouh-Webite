import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwitchTheme from "@/components/SwitchTheme";
import Cursor from "@/components/Cursor";
import ClientAOS from "@/components/ClientAOS";
import QueryProvider from "@/config/QueryProvider";

export const metadata: Metadata = {
  title: "Salem Mamdouh",
  description: "WebSIte Of Salem Mamdouh",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Fetch translations for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <head>
        {/* Preconnecting to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased dark:bg-dark-300 dark:text-dark-text overflow-x-clip ${
          locale === "en" ? "en" : "ar"
        }`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ClientAOS />
            <Cursor />
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <SwitchTheme />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
