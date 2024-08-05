import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google'
import "@/app/globals.css";
import Header from "@/components/Header";
import { getLocale } from "next-intl/server";

const roboto = Roboto_Mono({ weight: ['100', '400', '700'] ,subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Port Aventura Wait Times",
  description: "Check the wait times for all the rides in Port Aventura World",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={roboto.className}>
      <body className={`bg-[#F2EDF6] flex flex-col items-center justify-center w-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
