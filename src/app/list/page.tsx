'use client'
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function Home() {

    const [list, setList] = useState([])


    return (
        <>
            <main className="flex pt-10 px-16 justify-center">
                <div className='w-[1280px]'>
                    <h1 className="font-semibold text-3xl">Other Recipes</h1>
                    <section className="grid grid-cols-1 gap-4 pt-4 px2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </section>
                </div>
            </main >
            <Footer />
        </>
    )
}


const Card = () => {

    return (
        <a className="p-8  min-w-[100px] h-[320px] shadow-md rounded-md border border-gray-100 overflow-hidden hover:bg-blue-50 hover:border-blue-300 hover:cursor-pointer">
            <h1>title</h1>
            <div>
                asfasf
            </div>
        </a>
    )
}