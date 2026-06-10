'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface TagFilterBarProps {
  allTags: string[]
  activeTag: string
}

export default function TagFilterBar({ allTags, activeTag }: TagFilterBarProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Filter by technology</p>
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* "All" pill that links back to /projects */}
        <Link
          href="/projects"
          className={`relative inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
            activeTag === ''
              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/10'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
          }`}
        >
          All
        </Link>

        {allTags.map((tag) => {
          const isActive = tag === activeTag
          return (
            <Link
              key={tag}
              href={`/projects/tags/${tag}`}
              className={`relative inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTagPill"
                  className="absolute inset-0 rounded-full bg-indigo-600/10 border border-indigo-500/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">#{tag.replace(/-/g, ' ')}</span>
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}
