import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meter Surgicals | Saving Lives",
  description:
    "Meter Surgicals is a surgical-disposables manufacturer incorporated in 2010, serving healthcare providers in India and internationally. Surgical drapes, procedure packs, gowns, bed sheets, wrapping sheets, and other non-woven disposables. +91 89254 99953, +91 93449 91323, metersurgicals@gmail.com. No 3. 2/151, Brindhavan Street, Balaya Garden, Madipakkam, Chennai – 600 091.",
  keywords: ["Meter Surgicals", "Saving Lives", "surgical drapes", "procedure packs", "sterilization wrapping sheets", "surgical disposables", "Chennai"],
  openGraph: {
    title: "Meter Surgicals | Saving Lives",
    description:
      "Surgical drapes, procedure packs, and non-woven disposables for hospitals and operating theatres. Contact Meter Surgicals: metersurgicals@gmail.com.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://framerusercontent.com" crossOrigin="anonymous" />
        <link rel="modulepreload" fetchPriority="low" href="https://framerusercontent.com/sites/nVV46fDkHk3B3c2VNhhDp/script_main.COZzt3Di.mjs" />
      </head>
      <body>{children}</body>
    </html>
  );
}
