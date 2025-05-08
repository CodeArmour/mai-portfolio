import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'mai portfolio',
  description: 'creating beautiful and performant web applications',
  icons: {
    icon: '/mailogorbg.png',
    shortcut: '/mailogorbg.png',
    apple: '/mailogorbg.png',
  },
  generator: 'Next.js',
  applicationName: 'mai portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
