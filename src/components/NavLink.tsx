'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
    slug,
    children,
}: {
    slug: string
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isActive = slug === '/' ? pathname === '/' : pathname.startsWith(slug)

    return (
        <Link
            href={slug}
            className={`text-sm font-medium transition duration-200 hover:text-text-primary ${isActive ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}
        >
            {children}
        </Link>
    )
}