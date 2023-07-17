// import { FiChevronRight } from 'react-icons/fi'
// import Link from 'next/link'
import SocialLink from '../components/SocialLink'
import SvgAnimation from '../components/SvgAnimation'


export default function Home() {
  return (
    <main className="min-h-screen layout">

      {/* Hero/Introduction */}
      <section className='relative' id="hero">
        <div className='relative'>
          <h1 className='mt-24 text-5xl font-bold text-neutral-300'>Hi, I'm <span className='underline'>Ridho</span>!</h1>
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
        <div className='absolute top-0 right-0 w-[32rem] h-[32rem]'>
          <SvgAnimation />
        </div>
      </section>

      {/* Projects */}
      <section>

      </section>

    </main >
  )
}
