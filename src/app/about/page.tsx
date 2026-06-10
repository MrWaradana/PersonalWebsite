'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SocialLink from "../../components/SocialLink"
import Image from "next/image"
import myImg from "../../../public/ridho-pas-foto.png"
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi'
import { SiTensorflow, SiNextdotjs, SiTailwindcss, SiLaravel, SiPrisma, SiEthereum } from 'react-icons/si'
import { FaCode, FaBrain } from 'react-icons/fa'

const ChevronDown = FiChevronDown as any
const ChevronUp = FiChevronUp as any
const ExternalLink = FiExternalLink as any
const TF = SiTensorflow as any
const Next = SiNextdotjs as any
const Tailwind = SiTailwindcss as any
const Laravel = SiLaravel as any
const Prisma = SiPrisma as any
const ETH = SiEthereum as any
const Brain = FaBrain as any

const currentSummary = `A tech-savvy Information Systems Master's graduate from Sepuluh Nopember Institute of Technology (ITS) and a Certified TensorFlow Developer. Driven by a lifelong passion for science and technology, I am pursuing a Software Engineer career path specializing in AI, Digital Twins, and Data Architecture. I combine robust full-stack web development skills with leadership experience in campus organizations as a developer and project manager — a dedicated professional and lifelong learner committed to building intelligent, scalable systems.`

const oldSummary = `Hi, I'm an Information Systems student currently specializing in modern web engineering and applied machine learning. My passion for web design began in high school with pure HTML & CSS, and expanded into complex JavaScript engineering during my time at Institut Teknologi Sepuluh Nopember (ITS).

My early experience with backend frameworks centered on Laravel. Despite minimal PHP background at the time, I dove straight in and appreciated the clarity of MVC patterns. Working with frameworks accelerated my understanding of system designs and routing architectures.

As I transitioned into frontend development, I adopted React and Next.js, immediately falling in love with Next.js's server-side rendering, metadata control, and optimization pipelines, which form the base of my online portfolio.

Participating in Google's Bangkit 2023 MSIB program introduced me to the world of machine learning using Python and TensorFlow. I am continuously fascinated by training patterns and data predictions. Today, I am focused on bridging the gap between web development and artificial intelligence, researching GraphRAG frameworks and publishing studies on developer productivity toolings.`

const skills = [
  { label: 'Next.js', icon: <Next className="text-base" /> },
  { label: 'Tailwind CSS', icon: <Tailwind className="text-base text-cyan-400" /> },
  { label: 'Laravel', icon: <Laravel className="text-base text-red-400" /> },
  { label: 'TensorFlow', icon: <TF className="text-base text-orange-400" /> },
  { label: 'Prisma', icon: <Prisma className="text-base text-teal-400" /> },
  { label: 'Web3 / Ethereum', icon: <ETH className="text-base text-violet-400" /> },
  { label: 'GraphRAG', icon: <Brain className="text-base text-indigo-400" /> },
]

const highlights = [
  { label: 'Master\'s GPA', value: '3.90 / 4.00' },
  { label: 'Bachelor\'s GPA', value: '3.72 / 4.00' },
  { label: 'Honor', value: 'Magna Cumlaude' },
  { label: 'Certification', value: 'TensorFlow Developer' },
]

export default function About() {
  const [showOld, setShowOld] = useState(false)

  return (
    <main className="min-h-screen py-16 md:py-24 layout">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gradient font-heading mb-4">
          About me.
        </h1>
        <p className="text-zinc-500 text-sm mb-12">
          Muhammad Ridho Waradana · AI Engineer · Surabaya, Indonesia
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Text side */}
          <div className="md:col-span-2 space-y-6">

            {/* Current summary */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-zinc-300 leading-relaxed text-sm md:text-base text-justify"
              >
                {currentSummary}
              </motion.p>
            </div>

            {/* Toggle old summary */}
            <div>
              <button
                onClick={() => setShowOld(v => !v)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-indigo-400 transition-colors duration-200 border border-zinc-800 hover:border-zinc-700 rounded-full px-3.5 py-1.5 group"
              >
                {showOld ? (
                  <><ChevronUp className="text-sm" /> Hide older version</>
                ) : (
                  <><ChevronDown className="text-sm" /> Show older summary</>
                )}
              </button>

              <AnimatePresence>
                {showOld && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-5 rounded-xl border border-zinc-800/60 bg-zinc-900/20 space-y-3">
                      <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-600 mb-3">
                        — Older version (archived)
                      </p>
                      {oldSummary.split('\n\n').map((para, i) => (
                        <p key={i} className="text-sm text-zinc-500 leading-relaxed text-justify">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stat highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60"
                >
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">{h.label}</p>
                  <p className="text-sm font-bold text-zinc-200 mt-0.5">{h.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-3">Core Stack & Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white transition">
                    {s.icon}
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* IEEE link */}
            <a
              href="https://ieeexplore.ieee.org/author/708142160979346"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:border-indigo-700/50 rounded-full px-4 py-2 transition mt-2"
            >
              <ExternalLink className="text-sm" />
              IEEE Publications
            </a>
          </div>

          {/* Photo side */}
          <div className="md:col-span-1 flex flex-col items-center gap-6">
            <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 max-w-[280px] w-full">
              <Image
                className="rounded-xl transition duration-500 ease-in-out group-hover:scale-102 object-cover"
                src={myImg}
                width={280}
                height={280}
                alt="Muhammad Ridho Waradana"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>
            {/* Mini info card */}
            <div className="w-full max-w-[280px] p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span className="font-mono">Location</span>
                <span className="text-zinc-300">Surabaya, Indonesia</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span className="font-mono">Role</span>
                <span className="text-zinc-300">AI Engineer</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span className="font-mono">Degree</span>
                <span className="text-zinc-300">Master's, ITS</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span className="font-mono">Status</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-16 pt-8 border-t border-zinc-800/40">
          <h2 className="text-lg font-bold text-zinc-200 font-heading mb-6">Contact &amp; Socials</h2>
          <SocialLink />
        </div>
      </div>
    </main>
  )
}
