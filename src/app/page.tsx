'use client'

import Image from "next/image"
import { Header } from '@/components/header';
import { Card } from '@/components/';

export default function Home() {

  return (
    <>
      <Header isBorder={false} />
      <div className="fixed top-13 left-1/3 text-9xl text-blue-300 blur-3xl whitespace-nowrap">
        Message Recipe
      </div>
      <section className="pt-28 px-8 pb-28">
        <h1 className="text-center text-3xl pb-3 font-extrabold">複雑なコミットメッセージを簡単に美しく。</h1>
        <h1 className="text-center text-3xl font-extrabold">あなたのためのコミットメッセージ作成をサポートします。</h1>
        <div className="flex justify-center items-center pt-10 px-8">
          <div className="border rounded-lg shadow-md">
            <Image src="/image.png" alt="layout" width={2226 * 0.35} height={1202 * 0.35}></Image>
          </div>
        </div>
      </section>

      <section className="py-28 bg-orange-50">
        <h1 className="font-bold text-xl px-8 ">使い方</h1>
        <h2 className="font-semibold text-lg px-8 ">1st</h2>
        <h2 className="font-semibold text-lg px-8 ">2nd</h2>
        <h2 className="font-semibold text-lg px-8 ">3rd</h2>
      </section>
      <section className="py-28">
        <h1 className="font-bold text-xl py-4 px-8 ">よく使われるテンプレート</h1>
        <section className="flex gap-8 px-8 py-4 w-full overflow-x-auto">
          <Card
            emoji="🤗"
            title="Conventional Commits 1.0.0-beta.4 Conventional Commits 1.0.0-beta.4 Conventional Commits 1.0.0-beta.4"
            description="The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages."
            updateAt="2023-12-11 12:11:00"
            isCompact={true}
          />
          <Card
            emoji="👍"
            title="Contributing to Angular Commit Message Format"
            description="This specification is inspired by and supersedes the AngularJS commit message format. We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history."
            updateAt="2023-12-11 12:11:00"
            isCompact={true}
          />
          <Card
            emoji="🤗"
            title="Semantic Commit Messages"
            description="See how a minor change to your commit message style can make you a better programmer."
            updateAt="2023-12-11 12:11:00"
            isCompact={true}
          />
          <Card
            emoji="🤩"
            title="Original My Commit Messages "
            description="This format is Original"
            updateAt="2023-12-11 12:11:00"
            isCompact={true}
          />
        </section>
      </section>
      <footer className="h-[150px] bg-gray-800 text-gray-50 text-sm p-4">
        <span> Copyright © 2023 nkita.</span>
      </footer>
    </>
  )
}
