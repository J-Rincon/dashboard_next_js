import type { Metadata } from "next";
import { montserrat } from "../ui/fonts";

import "../ui/globals.css"

export const metadata: Metadata = {
  title: {
    template: '%s | Next Dashboard',
    default: 'Next Dashboard',
  },
  description: 'Next Dashboard - Panel administrativo para la gestión.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
        <footer>
          Powered by <a href="https://github.com/J-Rincon" target="_blank" rel="noopener noreferrer"><span className="text-blue-500">J-Rincon</span></a>
        </footer>
      </body>
    </html>
  );
}
