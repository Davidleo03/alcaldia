import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/providers/AuthProvider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Alcaldía Zamora',
  description: 'City Hall Inventory and Request Management System',
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
        url: '/favicon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
