import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import GlobalStyle from "@/styles/global-styled";

import { HeaderFooter } from "@/components/Header&Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DiagnosticMachine",
  description: "Site que irá te auxiliar com problemas do seu veículo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalStyle />
        <HeaderFooter>
        <div className="main-content">
            {children}
        </div>
        </HeaderFooter>
      </body>
    </html>
  );
}
