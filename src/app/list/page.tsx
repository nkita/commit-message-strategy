'use client'
import { Card } from "@/components/card"
import list from '@/recipes/list.json'

export default function Home() {

    return (
        <>
            <main className="flex py-10 px-16 justify-center h-full">
                <div className='w-[1280px]'>
                    <h1 className="font-semibold text-3xl py-8">Recipes</h1>
                    <section className="grid grid-cols-1 gap-8 pt-4 px-2  xl:grid-cols-4 md:grid-cols-3">
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
                                        href={"#"}
                                    />
                                )
                            })
                        }
                    </section>
                </div>
            </main >
        </>
    )
}
