import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meter Surgicals | Surgical Drapes & Disposables",
  description:
    "CE-certified surgical disposables manufacturer incorporated in 2010. Explore surgical drapes, procedure packs, sterilization wrapping sheets and more.",
  openGraph: {
    title: "Meter Surgicals | Saving Lives",
    description:
      "Surgical drapes, procedure packs and non-woven disposables for healthcare providers.",
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
