'use client'

import NavLink from "@/components/NavLink";


export default function Navbar() {
    return (
        <nav className="layout">
            <ul className="flex flex-row gap-16 px-4 py-3 my-4 rounded-md lg:px-12">
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
        </nav >
    )
};
