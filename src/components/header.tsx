"use client"
import Link from "next/link"
import { useState } from "react"
export const Header = () => {

    const [isOpen, setOpen] = useState(false)
    return (
        <nav className="bg-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                    <span className="self-center text-gray-600 text-xl font-semibold whitespace-nowrap">CM Recipe</span>
                </a>
                <button data-collapse-toggle="navbar-default" onClick={() => setOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    {isOpen ? "Close" : "Menu"}
                </button>
                <div className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:bg-opacity-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <ExLink href={"/"} value={"Home"} />
                        </li>
                        <li>
                            <ExLink href={"#"} value={"List"} />
                        </li>
                        <li>
                            <ExLink href={"#"} value={"Login"} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

const ExLink = ({ href, value }: { href: string, value: string }) => {

    return (
        <Link href={href} className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:underline md:border-0 md:hover:text-gray-900 md:p-0">
            {value}
        </Link>
    )
}