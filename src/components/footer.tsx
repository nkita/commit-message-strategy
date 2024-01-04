import Link from "next/link"

import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = ({ addClass }: { addClass: any }) => {

    return (
        <footer className={`flex justify-center ${addClass}`}>
            <div className="flex items-center ">
                <div className="pr-8"> Copyright © 2023 nkita.</div>
                <ExLink href="#" value={"Contact"} />
                /
                <ExLink href="#" value={<FaGithub />} />
                /
                <ExLink href="#" value={<FaXTwitter />} />
            </div>
        </footer >
    )
}

const ExLink = ({ href, value }: { href: string, value: any }) => {

    return (
        <Link href={href} className="ms-2 me-2">
            <div className="flex items-center h-[30px] p-2 hover:bg-gray-100 rounded-lg">
                {value}
            </div>
        </Link>
    )
}