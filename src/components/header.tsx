"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { M_PLUS_1_Code } from 'next/font/google'

const titleFont = M_PLUS_1_Code({ subsets: ["latin"] })

export const Header = ({ isBorder = true }: { isBorder?: boolean }) => {

    const [isOpen, setOpen] = useState(false)
    return (
        <nav className={`flex justify-center px-16 py-3 bg-white ${isBorder ? "border" : ""}`}  >
            <div className="flex flex-wrap items-center justify-between w-[1280px]">
                <div className="flex items-center ">
                    <div className="pr-4">
                        <Image src="/logo.png" alt="layout" width={57 * 0.45} height={55 * 0.45} ></Image>
                    </div>
                    <a href="/" className="flex items-center">
                        <span className={`self-center text-gray-600 text-xl whitespace-nowrap ${titleFont.className}`}>Message Recipe</span>
                    </a>
                </div>
                <button data-collapse-toggle="navbar-default" onClick={() => setOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 border-blue-100 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    {isOpen ? "Close" : "Menu"}
                </button>
                <div className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="text-md flex flex-col p-4 md:p-0 mt-4 border border-blue-100 rounded-lg md:bg-opacity-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <ExLink href={"/list"} value={"Recipes"} />
                        </li>
                        <li>
                            <ExLink href={"/terms"} value={"Terms"} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

const ExLink = ({ href, value }: { href: string, value: string }) => {

    return (
        <Link href={href} className="block py-2 px-1 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-800">
            {value}
        </Link>
    )
}