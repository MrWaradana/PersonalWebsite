'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SocialLink from './SocialLink'
import { FiArrowRight } from 'react-icons/fi'

const ArrowRight = FiArrowRight as any

const rotatingPhrases = [
  'ships solutions to complex problems.',
  'turns real-world challenges into software.',
  'builds systems that make things work better.',
  'solves hard problems with elegant code.',
  'ships full-stack products end to end.',
  'builds digital twins with AI.',
  'goes from idea to production, fast.',
]

const aiStack = ['Antigravity', 'Hermes Agent', 'Gemma', 'Qwen']

export default function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const phrase = rotatingPhrases[phraseIndex]
    let t: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex < phrase.length) {
      t = setTimeout(() => setCharIndex(i => i + 1), 48)
    } else if (!isDeleting && charIndex === phrase.length) {
      t = setTimeout(() => setIsDeleting(true), 2600)
    } else if (isDeleting && charIndex > 0) {
      t = setTimeout(() => setCharIndex(i => i - 1), 22)
    } else {
      setIsDeleting(false)
      setPhraseIndex(i => (i + 1) % rotatingPhrases.length)
    }

    setDisplayed(phrase.slice(0, charIndex))
    return () => clearTimeout(t)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <div className="relative z-10 w-full max-w-3xl">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="w-16 h-16 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center shadow-lg shadow-black/30">
          <Image src="/logo.svg" alt="MRW" width={36} height={36} className="brightness-125" />
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        className="mb-5 text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Software Engineer · AI Builder · Indonesia
      </motion.p>

      {/* Headline */}
      <motion.h1
        className="text-5xl sm:text-7xl font-extrabold font-heading leading-[1.05] tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="text-zinc-100">Hi, I&apos;m </span>
        <a
          href="/about"
          className="relative inline-block group"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Ridho
          </span>
          {/* Underline that expands on hover */}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-violet-400 group-hover:w-full transition-all duration-500 ease-out" />
        </a>
        <span className="text-zinc-400">.</span>
      </motion.h1>

      {/* Typewriter */}
      <motion.div
        className="mt-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p className="text-xl sm:text-2xl text-zinc-300 font-medium leading-snug">
          A Software Engineer who{' '}
          <br className="hidden sm:block" />
          <span className="text-zinc-100 font-semibold">
            {displayed}
            <span className="inline-block w-[2px] h-[1.1em] bg-indigo-400 align-middle ml-1 animate-pulse rounded-full" />
          </span>
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        I build full-stack systems and research AI applications, accelerated by{' '}
        {aiStack.map((name, i) => (
          <span key={name}>
            <span className="text-zinc-200 font-medium">{name}</span>
            {i < aiStack.length - 1 ? ', ' : ' '}
          </span>
        ))}
        — to go from idea to production faster.
      </motion.p>

      {/* Stats + divider */}
      <motion.div
        className="mt-10 flex items-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        {[
          { value: '3.90', label: 'GPA · Magna Cum Laude' },
          { value: 'IEEE', label: 'Published Researcher' },
          { value: '5+', label: 'Years of Experience' },
        ].map((s, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xl font-bold font-mono text-zinc-100">{s.value}</span>
            <span className="text-[11px] text-zinc-400 mt-0.5 tracking-wide">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Thin divider */}
      <motion.div
        className="mt-8 w-16 h-[1px] bg-gradient-to-r from-zinc-700 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* CTAs */}
      <motion.div
        className="mt-8 flex flex-wrap items-center gap-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <SocialLink />
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition-colors duration-200 group"
        >
          View projects
          <ArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>
    </div>
  )
}
