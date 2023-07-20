// import { FiChevronRight } from 'react-icons/fi'
// import Link from 'next/link'
import SocialLink from '../components/SocialLink'
import SvgAnimation from '../components/SvgAnimation'
import Image from 'next/image'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import { getAllPostsMeta } from '../lib/posts'
import getFormattedDate from '../lib/getFormattedDate'
import Link from 'next/link'

export const revalidate = 86400 // 24 hours

type TagIconMap = {
  [key: string]: IconType | React.ComponentType<any>;
};

const tagIconMap: TagIconMap = {
  'Bootstrap': FaBootstrap,
  'Jquery': BiLogoJquery,
  'Laravel': FaLaravel,
  'Code-Igniter': DiCodeigniter,
  'Next-Js': SiNextdotjs,
  'Typescript': BiLogoTypescript,
  'Tailwind-CSS': BiLogoTailwindCss,
  'Alpine-Js': SiAlpinedotjs,
};

export default async function Home() {
  const posts = await getAllPostsMeta()
  return (
    <main className="min-h-screen layout">

      {/* Hero/Introduction */}
      <section className='relative min-h-[95dvh]' id="hero">
        <div className='relative z-50'>
          <h1 className='mt-24 text-5xl font-bold text-neutral-300'>Hi, I'm <a href='/about' className='underline transition duration-300 ease-in-out hover:text-blue-400'>Ridho</a>!</h1>
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
      <section className='pb-12 lg:pb-24' id='featured-projects'>
        <h2 className='text-3xl font-bold transition duration-300 ease-in-out text-neutral-200 hover:text-blue-400'>Featured Projects</h2>
        <div className='grid grid-flow-row mt-6 lg:grid-cols-3 place-items-center'>
          {posts && posts?.sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          ).slice(0, 3).map((post: any, i: number) => {
            return (
              <div key={i} className='px-4 pb-6 transition duration-300 ease-in-out border-2 border-transparent rounded-lg hover:border-blue-400 '>
                <Link
                  href={`projects/${post.slug}`}
                  key={post?.title}
                  className='p-3 rounded-md shadow-md group'
                >
                  <div className='overflow-hidden rounded-md w-[300px] h-[200px]'>
                    <Image src={`${post.imageDesc}`}
                      // <Image src={`https://source.unsplash.com/300x200?${post.imageDesc}`}
                      alt={post.imageDesc}
                      // fill
                      width={300}
                      height={200}
                      className='mb-2 transition duration-300 ease-in-out rounded-md group-hover:scale-105'
                    />
                  </div>
                  <h3 className='text-xl font-semibold'>{post.title}</h3>
                  <time className='text-[12px] text-gray-400'>
                    {getFormattedDate(post.date)}
                  </time>
                </Link>
                <ul className='flex flex-row'>
                  {post.tags?.map((tag: string, i: number) => {
                    const IconComponent = tagIconMap[tag];
                    return (
                      <Link href={`/projects/tags/${tag}`}>
                        <li key={i} className='flex items-center gap-1 px-2 py-1 mt-2 mr-2 text-xs font-semibold transition duration-300 ease-linear rounded-md text-neutral-800 bg-neutral-200 hover:-translate-y-1 '>
                          {IconComponent && <IconComponent className='transition duration-300 ease-in-out group-hover:-translate-y-1' />}
                          {tag.charAt(0).toUpperCase() + tag.slice(1) || ''}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

    </main >
  )
}
