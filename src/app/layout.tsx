import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from "@/app/providers";
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'commit message strategy',
  description: 'commit message strategy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
