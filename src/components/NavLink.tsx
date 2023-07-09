'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// This *client* component will be imported into a blog layout
export default function NavLink({
    slug,
    children,
}: {
    slug: string
    children: React.ReactNode
}) {
    // Navigating to `/blog/hello-world` will return 'hello-world'
    // for the selected layout segment
    const path = usePathname()
    const isActive = path === slug || path.startsWith(`${slug}/`);

    return (
        <Link
            href={`${slug}`}
            // Change style depending on whether the link is active
            className={`text-lg font-semibold leading-8 ${isActive ? 'text-neutral-100' : 'text-neutral-400'}`}

        >
            {children}
        </Link>
    )
}