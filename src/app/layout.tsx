import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from "@/app/providers";


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
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
