'use client'

import NavLink from "@/components/NavLink";
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Navbar() {
    return (
        <nav className="flex flex-col-reverse items-center justify-between lg:flex-row layout">
            <ul className="flex flex-row items-center justify-center gap-6 px-4 py-3 my-4 rounded-md lg:gap-16 lg:justify-start lg:px-12">
                <NavLink slug="/">
                    Home
                </NavLink>
                <NavLink slug="/projects" >
                    Projects
                </NavLink>
                <NavLink slug="/about" >
                    About
                </NavLink>
            </ul>
            <div className='flex gap-6 mt-4 lg:gap-12'>
                {/* github */}
                <a href="https://github.com/MrWaradana" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FaGithub className='translate-y-1 ease group-hover:-translate-y-[.5px]' /></a>
                {/* linkedin */}
                <a href="https://www.linkedin.com/in/mrwaradana/" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FaLinkedin className='translate-y-1 ease group-hover:-translate-y-[.5px] group-hover:text-[#0077b5] group-hover:bg-white rounded-sm' /></a>
                {/* email */}
                <a href="mailto:muhammadridhowaradanda@gmail.com" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FiMail className='translate-y-1 ease group-hover:-translate-y-[.5px]' /></a>
            </div>
        </nav >
    )
};
