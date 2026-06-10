'use client'

import { motion } from 'framer-motion'
import {
  FaGraduationCap, FaCode, FaBrain, FaRobot,
  FaLink, FaSchool
} from 'react-icons/fa'
import { SiEthereum } from 'react-icons/si'
import { MdWork } from 'react-icons/md'

const GraduationCap = FaGraduationCap as any
const Code = FaCode as any
const Brain = FaBrain as any
const Robot = FaRobot as any
const Link = FaLink as any
const School = FaSchool as any
const Ethereum = SiEthereum as any
const Work = MdWork as any

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  type: 'work' | 'education' | 'research';
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: 'Aug 2024 – Present',
    title: 'AI Engineer Programmer',
    company: 'PT Total Asset Management · Surabaya',
    description: 'Developing and deploying a web-based Digital Twins application for real-time asset visualization and monitoring at PLTU Tanjung Jati B — one of Indonesia\'s largest coal-fired power plants. Integrated predictive maintenance models using high-volume sensor data to anticipate equipment failure and optimize maintenance schedules.',
    icon: <Robot className="text-sm text-violet-400" />,
    tags: ['Digital Twin', 'AI Engineering', 'Predictive Maintenance', 'IoT', 'Python'],
    type: 'work',
  },
  {
    year: 'Sep 2024 – May 2026',
    title: 'Master of Computer Science',
    company: 'Institut Teknologi Sepuluh Nopember (ITS) · GPA 3.90 · Magna Cumlaude',
    description: 'Graduated Magna Cumlaude. Thesis: "Optimization of Indonesian Halal Culinary Recommendation System with Fuzzy Multi-Attribute Decision Making and GraphRAG Integration." Published IEEE conference paper.',
    icon: <GraduationCap className="text-sm text-indigo-400" />,
    tags: ['GraphRAG', 'Fuzzy MADM', 'IEEE Publication', 'AI Research'],
    type: 'education',
    link: 'https://ieeexplore.ieee.org/author/708142160979346',
  },
  {
    year: 'Aug 2023 – Dec 2024',
    title: 'Blockchain / Web3 Developer',
    company: 'Ditjen Dikti, Kemendikbudristek · Jakarta (Internship)',
    description: 'Developed, integrated, and maintained a Web3 application for secure, decentralized storage of university student records using Ethereum blockchain. Performed web application vulnerability testing and collaborated with metaverse and AI developers to create immersive interactive experiences.',
    icon: <Ethereum className="text-sm text-teal-400" />,
    tags: ['Web3', 'Ethereum', 'Blockchain', 'Security Testing', 'Metaverse'],
    type: 'work',
  },
  {
    year: 'Jan 2023 – Jul 2023',
    title: 'Senior Front-end Web Developer',
    company: 'TEDxITS 2023 · Surabaya',
    description: 'Collaborated with Visual Designers to develop and implement the TEDxITS landing page from design to production. Led front-end architecture decisions and ensured pixel-perfect responsiveness across all devices.',
    icon: <Code className="text-sm text-amber-400" />,
    tags: ['Next.js', 'Express.js', 'Tailwind CSS', 'TypeScript'],
    type: 'work',
  },
  {
    year: 'Oct 2022 – Jul 2023',
    title: 'Front-End Web Developer',
    company: 'Petrolida 2023 · Surabaya',
    description: 'Collaborated with UI Designers using Figma and developed front-end components for the Petrolida platform — a sustainable energy innovation initiative.',
    icon: <Code className="text-sm text-amber-400" />,
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Figma'],
    type: 'work',
  },
  {
    year: 'Feb 2022 – Dec 2022',
    title: 'Head of Web Development Division',
    company: 'ISE! ITS 2022 · Surabaya',
    description: 'Planned and managed the full Web App of ISE! 2022 (landing pages, registration forms, dashboards, quiz systems) using Trello for team collaboration across UI/UX, Back-end, and Front-end developers.',
    icon: <Work className="text-sm text-orange-400" />,
    tags: ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS', 'TALL Stack'],
    type: 'work',
  },
  {
    year: 'Sep 2020 – Sep 2024',
    title: 'Bachelor of Computer Science',
    company: 'Institut Teknologi Sepuluh Nopember (ITS) · GPA 3.72 · Cumlaude',
    description: 'Graduated Cumlaude. Undergraduate thesis: HalalWave — a Halal Culinary Recommendation System based on Fuzzy MADM. Served as Assistant Lecturer for Computer Network Design and Management (Cisco Packet Tracer).',
    icon: <GraduationCap className="text-sm text-indigo-400" />,
    tags: ['Web Engineering', 'Database Design', 'Machine Learning', 'Cisco Packet Tracer'],
    type: 'education',
    link: 'https://halalwave.vercel.app/',
  },
  {
    year: 'Jun 2017 – May 2020',
    title: 'High School Diploma · Natural Science',
    company: 'SMAN 71 Jakarta · Jakarta',
    description: 'Graduated in Natural Science track. Participated in a student exchange program with Unity Grammar School in Sydney, Australia — building early international exposure and cross-cultural communication skills.',
    icon: <School className="text-sm text-zinc-400" />,
    tags: ['Student Exchange', 'Sydney Australia', 'Natural Science'],
    type: 'education',
  },
];

const typeColors: Record<string, string> = {
  work: 'text-violet-400 border-violet-800/50 bg-violet-950/30',
  education: 'text-indigo-400 border-indigo-800/50 bg-indigo-950/30',
  research: 'text-teal-400 border-teal-800/50 bg-teal-950/30',
}

export default function ExperienceTimeline() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <div className="relative py-12">
      {/* Centered timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-10"
      >
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-stretch ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center -translate-x-1/2 z-10 shadow-lg shadow-indigo-500/5">
                {item.icon}
              </div>

              {/* Empty spacing box for desktop layout symmetry */}
              <div className="hidden md:block w-1/2 px-12" />

              {/* Timeline Card */}
              <div className="w-full md:w-1/2 pl-12 pr-4 md:px-12">
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/60 transition duration-300 backdrop-blur-sm shadow-sm hover:shadow-indigo-500/5 group">
                  <div className="flex items-start justify-between gap-4 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-indigo-400">
                      {item.year}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition duration-200 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-3 mt-0.5">{item.company}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed text-justify">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-[11px] text-indigo-400 hover:text-indigo-300 transition"
                    >
                      <Link className="text-xs" /> View work
                    </a>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 text-[10px] font-medium font-mono rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
