import '@/styles/globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mrwaradana.vercel.app/'),
  title: 'M Ridho Waradana',
  description: 'Muhammad Ridho Waradana Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans bg-bg-dark text-text-primary antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html >
  )
}
