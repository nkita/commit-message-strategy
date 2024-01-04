import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer addClass={"fixed bottom-0  w-screen bg-white/30 text-gray-500 text-sm  backdrop-blur-md"} />
    </>
  )
}
