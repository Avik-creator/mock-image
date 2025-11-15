import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Snipp - Turn Code into Beautiful Images',
  description: 'A clean and minimal tool for turning your code into beautiful, shareable images',
  openGraph: {
    title: 'Snipp - Turn Code into Beautiful Images',
    description: 'A clean and minimal tool for turning your code into beautiful, shareable images',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Snipp - Turn Code into Beautiful Images',
      },
    ],
    url: 'https://snippet.avikmukherjee.me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snipp - Turn Code into Beautiful Images',
    description: 'A clean and minimal tool for turning your code into beautiful, shareable images',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
