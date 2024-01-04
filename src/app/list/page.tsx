'use client'
import { Card } from "@/components/card"
import { useState } from "react"

export default function Home() {

    const [list, setList] = useState([])


    return (
        <>
            <main className="flex py-10 px-16 justify-center h-full">
                <div className='w-[1280px]'>
                    <h1 className="font-semibold text-3xl py-8">Recipes</h1>
                    <section className="grid grid-cols-1 gap-8 pt-4 px-2  xl:grid-cols-4 md:grid-cols-3">
                        <Card
                            emoji="🤗"
                            title="Conventional Commits 1.0.0-beta.4 Conventional Commits 1.0.0-beta.4 Conventional Commits 1.0.0-beta.4"
                            description="The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages."
                            updateAt="2023-12-11 12:11:00"
                        />
                        <Card
                            emoji="👍"
                            title="Contributing to Angular Commit Message Format"
                            description="This specification is inspired by and supersedes the AngularJS commit message format. We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history."
                            updateAt="2023-12-11 12:11:00"
                        />
                        <Card
                            emoji="🤗"
                            title="Semantic Commit Messages"
                            description="See how a minor change to your commit message style can make you a better programmer."
                            updateAt="2023-12-11 12:11:00"
                        />
                        <Card
                            emoji="🤩"
                            title="Original My Commit Messages "
                            description="This format is Original"
                            updateAt="2023-12-11 12:11:00"
                        />
                    </section>
                </div>
            </main >
        </>
    )
}
