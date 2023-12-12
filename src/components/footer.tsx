import Link from "next/link"

export const Footer = () => {

    return (
        <footer className="w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2023 nkita.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <ExLink href="#" value="About" />
                </li>
                <li>
                    <ExLink href="#" value="Terms" />
                </li>
                <li>
                    <ExLink href="#" value="Contact" />
                </li>
            </ul>
        </footer>
    )
}

const ExLink = ({ href, value }: { href: string, value: string }) => {

    return (
        <Link href={href} className="hover:underline me-4 md:me-6">
            {value}
        </Link>
    )
}