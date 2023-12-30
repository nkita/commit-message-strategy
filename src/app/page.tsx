'use client'

import Image from "next/image"
import { Header } from '@/components/header';

export default function Home() {

  return (
    <>
      <Header isBorder={false} />
      <div className="fixed top-13 left-1/3 text-9xl text-blue-300 blur-3xl whitespace-nowrap">
        Message Recipe
      </div>
      <section className="pt-28 px-8">
        <h1 className="text-center text-3xl pb-3 font-extrabold">複雑なコミットメッセージを簡単に美しく。</h1>
        <h1 className="text-center text-3xl font-extrabold">あなたのためのコミットメッセージ作成をサポートします。</h1>
        <div className="flex justify-center items-center pt-10 px-8">
          <div className="border rounded-lg shadow-md">
            <Image src="/image.png" alt="layout" width={2226 * 0.35} height={1202 * 0.35} layout="fixed" ></Image>
          </div>
        </div>
      </section>

      <section className="pt-28">
        使い方
        1st
        2nd
        3rd
      </section>
      <section className="pt-28">
        よく使われるテンプレート
      </section>
      <footer className="h-[150px] bg-gray-800 text-gray-50 text-sm p-4">
        <span> Copyright © 2023 nkita.</span>
      </footer>
    </>
  )
}