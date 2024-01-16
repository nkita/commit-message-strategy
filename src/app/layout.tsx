import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://message-recipe.nkitao.com'),
  title: 'Message Recipe',
  openGraph: {
    type: "website",
    // url: "https://///",　ToDo
    title: " Message Recipe",
    description: "HTMLのフォームに文章を入力するだけで、AngularやConventional Commitsのルールに従ったコミットメッセージが生成されます。開発プロジェクトを効果的に進め、整理された履歴を維持するために、ぜひメッセージテンプレートサービスMessage Recipeをお試しください。",
    siteName: "Message Recipe ",
    images: [
      {
        url: '/logo3.png',
        width: 1200,
        height: 630
      }],
  }
}

export const viewport = {
  themeColor: '#3b82f6'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-sky-50/20`}>
        {children}
      </body>
    </html>
  )
}
