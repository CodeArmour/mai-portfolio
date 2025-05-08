import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mai-portfolio-eta.vercel.app/"), // <-- Replace with your actual domain
  title: "Mai Al Moqayad – Full-Stack Developer",
  description: "Creating beautiful and performant web applications with Laravel & React.",
  generator: "Next.js",
  applicationName: "mai portfolio",
  icons: {
    icon: "/mailogoprbg.png",
    shortcut: "/mailogorbg.png",
    apple: "/mailogoprbg.png",
  },
  openGraph: {
    title: "Mai Al Moqayad – Full-Stack Developer",
    description: "Creating beautiful and performant web applications with Laravel & React.",
    url: "https://mai-portfolio-eta.vercel.app/",
    images: [
      {
        url: "/mailogoprbg.png",
        width: 1200,
        height: 630,
        alt: "Mai Portfolio Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
