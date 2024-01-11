import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Message Recipe',
  openGraph: {
    type: "website",
    // url: "https://///",　ToDo
    title: "Home | Message Recipe",
    description: "Message Recipeは、簡単かつ直感的な方法でgit commitメッセージのフォーマットを作成するためのオンラインサービスです。HTMLのフォームに文章を入力するだけで、AngularやConventional Commitsのフォーマットに合わせたメッセージが生成されます。シンプルで分かりやすいインターフェースが、開発者にとって効率的なコミットメッセージの作成をサポートします。開発プロジェクトを効果的に進め、整理された履歴を維持するために、Message Recipeをお試しください。",
    siteName: "Message Recipe ",
    images: [{
      url: "/logo2.png",
      width: 216,
      height: 216
    }, {
      url: '/logo3.png',
      width: 298,
      height: 157
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
