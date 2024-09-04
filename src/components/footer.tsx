import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { ArrowUpRight } from 'tabler-icons-react';

const socialLinks = [
    {
        href: "https://x.com/ankit_189",
        label: "Twitter",
    },
    {
        href: "https://linkedin/in/yadavankit189",
        label: "LinkedIn",
    },
    {
        href: "https://github.com/BearerOP",
        label: "Github",
    },
    {
        href: "mailto:work.ankit189@gmail.com",
        label: "Mail",
    },
    {
        href: "https://dub.sh/hlcmMbf",
        label: "Resume",
    },
];

const Footer = () => {
    return (
        <footer className="max-w-7xl mx-auto px-4 py-8">
            <Separator className="my-4" />
            <div className="flex h-10 items-center justify-center space-x-8 text-lg">
                {socialLinks.map(({ href, label }, index) => (
                    <React.Fragment key={index}>
                        <Link
                            href={href}
                            target="_blank"
                            className="opacity-70 font-bold flex items-center gap-2 relative group transition-opacity hover:opacity-100"
                        >
                            <span className="relative transition-transform duration-500 ease-in-out group-hover:-translate-x-2">
                                {label}
                            </span>
                            <ArrowUpRight
                                size={48}
                                strokeWidth={1}
                                className="absolute h-[22px] -right-8 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:text-white text-black"
                            />
                        </Link>
                        {index < socialLinks.length - 1 && <Separator orientation="vertical" />}
                    </React.Fragment>
                ))}
            </div>
            <Separator className="my-4" />
        </footer>
    );
};

export default Footer;