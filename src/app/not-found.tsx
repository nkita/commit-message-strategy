
'use client'

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {

    return (
        <>
            <Header isBorder={false} />
            <div className='flex justify-center content-center items-center h-[calc(100vh-100px)] text-gray-600'>
                <div className='text-center'>
                    <h1 className='text-2xl'>
                        <span className='font-bold '>404</span> | This page could not be found.
                    </h1>
                    <span className='leading-10 text-xl'>ページが見つかりません。</span>
                </div>
            </div>
            <Footer addClass={"fixed bottom-0 w-screen bg-white/30 text-gray-500 text-sm backdrop-blur-md"} />
        </>
    )
}