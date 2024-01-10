
'use client'

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {

    return (
        <>
            <Header isBorder={false} />
            <div className='flex justify-center content-center items-center h-[calc(100vh-100px)]'>
                <h1 className='text-2xl'>
                    This page could not be found.
                </h1>
                <span></span>
            </div>
            <Footer addClass={"fixed bottom-0 w-screen bg-white/30 text-gray-500 text-sm backdrop-blur-md"} />
        </>
    )
}