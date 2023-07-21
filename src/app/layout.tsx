import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'M Ridho Waradana',
  description: 'Muhammad Ridho Waradana Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" >
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html >
  )
}
