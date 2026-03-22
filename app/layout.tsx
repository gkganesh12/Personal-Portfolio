import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Chakra_Petch } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap'
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: '--font-chakra',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'GANESH.EXE | Developer Portfolio',
  description: 'Building AI + Cyber Systems. A classified digital system by Ganesh Khetawat.',
  keywords: ['developer', 'AI', 'cyber', 'portfolio', 'full-stack', 'engineer'],
  authors: [{ name: 'Ganesh Khetawat' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${chakraPetch.variable}`}>
      <body className="font-sans antialiased bg-black text-white overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
