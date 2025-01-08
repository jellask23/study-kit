import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/proivders";
import Navbar from "@/components/organisms/Navbar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Buddy",
  description: "Your AI study buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${nunito.variable} antialiased`}>
        <Providers>
          <Navbar />
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
