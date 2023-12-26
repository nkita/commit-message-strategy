import Link from "next/link"

export const Footer = () => {

    return (
        <footer className="fixed bottom-0 flex justify-center w-screen bg-white/30 text-gray-400 text-center gap-2 text-sm  backdrop-blur-md">
            <span> Copyright © 2023 nkita.</span><ExLink href="#" value="Contact" />
        </footer >
    )
}

const ExLink = ({ href, value }: { href: string, value: string }) => {

    return (
        <Link href={href} className="hover:underline me-4 md:me-6">
            {value}
        </Link>
    )
}