'use client'

import NavLink from "@/components/NavLink";
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

const Github = FaGithub as any;
const Linkedin = FaLinkedin as any;
const Mail = FiMail as any;

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full py-4 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/40">
            <div className="flex items-center justify-between layout">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-8 h-8 flex items-center justify-center p-1.5 rounded-lg border border-zinc-850 bg-zinc-900 group-hover:border-zinc-700 transition">
                        <Image src="/logo.svg" alt="MRW Logo" width={22} height={22} className="brightness-150" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gradient font-heading">
                        mrwaradana.
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    <ul className="flex items-center gap-6">
                        <NavLink slug="/">
                            Home
                        </NavLink>
                        <NavLink slug="/projects">
                            Projects
                        </NavLink>
                        <NavLink slug="/about">
                            About
                        </NavLink>
                    </ul>
                    <div className="hidden sm:block h-4 w-[1px] bg-zinc-800" />
                    <div className="hidden sm:flex items-center gap-4">
                        {/* github */}
                        <a href="https://github.com/MrWaradana" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition duration-200">
                            <Github className="text-lg" />
                        </a>
                        {/* linkedin */}
                        <a href="https://www.linkedin.com/in/mrwaradana/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#0077b5] transition duration-200">
                            <Linkedin className="text-lg" />
                        </a>
                        {/* email */}
                        <a href="mailto:muhammadridhowaradanda@gmail.com" className="text-zinc-400 hover:text-zinc-100 transition duration-200">
                            <Mail className="text-lg" />
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}
