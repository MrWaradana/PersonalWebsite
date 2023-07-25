// import { FiChevronRight } from 'react-icons/fi'
// import Link from 'next/link'
import SocialLink from '../components/SocialLink'
import SvgAnimation from '../components/SvgAnimation'
import ProjectCard from '../components/ProjectCard'

export const revalidate = 86400 // 24 hours

export default function Home() {

  return (
    <main className="min-h-screen layout">

      {/* Hero/Introduction */}
      <section className='relative min-h-[95dvh] overflow-hidden' id="hero">
        <div className='relative z-50'>
          <h1 className='mt-24 text-5xl font-bold text-neutral-300'>Hi, I&apos;m <a href='/about' className='underline transition duration-300 ease-in-out hover:text-blue-400'>Ridho</a>!</h1>
          <p className='mt-8 text-2xl font-semibold text-neutral-300'>
            I build websites using tools like Next Js, Tailwind CSS and Laravel. <br />
            Also into machine learning using tools like Python and Tensorflow.
          </p>
          <div className='mt-4'>
            <SocialLink />
          </div>
          {/* <div className='mt-4'>
          <Link href='/about' className='flex gap-2 px-4 py-2 text-xl font-semibold text-gray-700 bg-blue-100 rounded-full ease opacity-60 hover:opacity-95 max-w-fit'>More about me <FiChevronRight className='text-3xl -translate-y-[1px]' /></Link>
        </div> */}
        </div>
        <div className='absolute bottom-20 lg:top-0 lg:right-0 w-[32rem] h-[32rem]'>
          <SvgAnimation />
        </div>
      </section>

      {/* Projects */}
      <section className='pb-12 lg:pb-24' id='featured-projects'>
        <ProjectCard title={'Featured Projects'} />
      </section>

    </main >
  )
}
