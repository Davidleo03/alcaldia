import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Municipal Services Portal',
  description: 'Municipal Service Request Management System',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/alcaldia.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/alcaldia.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/alcaldia.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/alcaldia.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
