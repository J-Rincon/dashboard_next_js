import type { Metadata } from "next";
import { montserrat } from "../ui/fonts";

import "../ui/globals.css"

export const metadata: Metadata = {
  title: {
    template: '%s | CPSOFT Dashboard',
    default: 'CPSOFT Dashboard',
  },
  description: 'CPSOFT Dashboard - Panel administrativo para la gestión de materiales de Conceptos Plasticos.',
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
