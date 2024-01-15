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
      <Footer addClass={"text-sm md:text-base leading-10 text-gray-800"} />
    </>
  )
}
