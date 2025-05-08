import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mai portfolio",
  description: "creating beautiful and performant web applications",
  icons: {
    icon: "/mailogoprbg.png",
    shortcut: "/mailogorbg.png",
    apple: "/mailogorbg.png",
  },
  generator: "Next.js",
  applicationName: "mai portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="icon" href="/mailogoprbg.png" type="image/png" />
        <link rel="apple-touch-icon" href="/mailogoprbg.png" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Mai Al Moqayad – Full-Stack Developer"
        />
        <meta
          property="og:description"
          content="Creating beautiful and performant web applications with Laravel & React."
        />
        <meta property="og:image" content="/mailogo_og_1200x630.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mai Al Moqayad – Full-Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Creating beautiful and performant web applications with Laravel & React."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
