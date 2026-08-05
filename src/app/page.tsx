import HeroSection from '../components/HeroSection'
import SvgAnimation from '../components/SvgAnimation'
import ProjectCard from '../components/ProjectCard'
import ExperienceTimeline from '../components/ExperienceTimeline'

export const revalidate = 86400 // 24 hours

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-between overflow-hidden py-12 md:py-24 layout"
        id="hero"
      >
        {/* Single subtle ambient glow */}
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Animated hero content (client component) */}
        <HeroSection />

        {/* Right: SVG animation */}
        <div className="hidden lg:block relative w-[420px] h-[420px] opacity-60 hover:opacity-90 transition-opacity duration-700 shrink-0">
          <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl" />
          <SvgAnimation />
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-zinc-900/50 layout" id="featured-projects">
        <ProjectCard title="Featured Projects" sliceNum={3} />
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-zinc-900/50 layout" id="timeline">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 font-heading">
            My Journey &amp; Milestones
          </h2>
          <p className="mt-4 text-sm text-zinc-400">
            A chronological timeline of my academic background, developer roles, and research achievements.
          </p>
        </div>
        <ExperienceTimeline />
      </section>
    </main>
  )
}
