'use client'

import Image from "next/image"
import Link from "next/link";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/';
import list from '@/recipes/list.json'
import { Metadata } from "next";

export default function Home() {

  return (
    <>
      <Header isBorder={false} />
      <section className="pt-28 px-8 pb-28">
        <div className="absolute top-13 right-1/3 text-9xl text-blue-300 blur-3xl whitespace-nowrap -z-10">
          <h1>Message Recipe</h1>
        </div>
        <h1 className="text-center text-3xl pb-3 font-extrabold">複雑なコミットメッセージを簡単に美しく。</h1>
        <h1 className="text-center text-3xl font-extrabold">あなたのためのコミットメッセージ作成をサポートします。</h1>
        <div className="flex items-center justify-center max-full">
          <p className="text-center text-base  text-gray-600 pt-8 max-w-3xl ">
            HTMLのフォームに文章を入力するだけで、AngularやConventional Commitsのフォーマットに合わせたコミットメッセージが生成されます。
            開発プロジェクトを効果的に進め、整理された履歴を維持するために、ぜひMessage Recipeをお試しください。
          </p>
        </div>
        <div className="flex justify-center items-center pt-16">
          <div className="border rounded-lg shadow-md ">
            <Image src="/image.png" alt="layout" width={2226 * 0.35} height={1202 * 0.35} className=" ease-in duration-300" ></Image>
          </div>
        </div>
        <div className="flex justify-center pt-28">
          <Link href="recipe/cc100" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 text-center shadow-md border border-gray-100 hover:bg-gradient-to-bl hover:border-blue-300 hover:ring-4 hover:ring-blue-100 hover:cursor-pointer font-medium rounded-xl text-xl px-5 py-2.5 ease-in duration-200">
            Conventional Commits 1.0.0で試してみる
          </Link>
        </div>
      </section>

      <section className="flex py-28 bg-sky-50 justify-center items-center">
        <h1 className="font-bold text-xl px-8 ">使い方</h1>
        <h2 className="font-semibold text-lg px-8 ">1st</h2>
        <h2 className="font-semibold text-lg px-8 ">2nd</h2>
        <h2 className="font-semibold text-lg px-8 ">3rd</h2>
      </section>

      <section className="flex py-28 items-center flex-col justify-center">
        <h1 className="font-bold text-xl py-4 px-8 ">メッセージを書く</h1>
        <section className="pt-8 px-8 flex align-middle bg-gray-50 rounded-lg border overflow-y-auto overflow-x-hidden h-[400px] max-w-[500px] xl:max-w-[1265px] md:h-[400px] md:max-w-[700px] md:overflow-x-auto md:overflow-y-hidden md:pt-0">
          <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-none md:flex ">
            {
              list.map((l) => {
                return (
                  <Card
                    key={l.id}
                    emoji={l.emoji}
                    icon={l.icon}
                    title={l.title}
                    description={l.description}
                    updateAt={l.updateAt}
                    isCompact={true}
                    href={"#"}
                  />
                )
              })
            }
          </div>
        </section>
      </section>
      <Footer addClass={"text-sm md:text-base leading-10 text-gray-800"} />
    </>
  )
}