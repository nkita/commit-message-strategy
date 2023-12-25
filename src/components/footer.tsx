import Link from "next/link"

export const Footer = () => {

    return (
        <footer className="flex justify-center w-screen px-16 py-3 bg-gray-600 border-gray-200">
            <div className="flex justify-center">
                <ul className="flex flex-wrap items-center text-sm font-medium text-gray-50 sm:mt-0">
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
                <div className="text-sm text-gray-50 sm:text-center">Copyright © 2023 nkita.</div>
            </div>
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