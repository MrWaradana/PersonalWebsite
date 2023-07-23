import { getAllPostsMeta } from '@/lib/posts'
import getFormattedDate from '@/lib/getFormattedDate'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 10

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

type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getAllPostsMeta()

    if (!posts) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map(tag => ({ tag }))
}

export async function generateMetadata({ params: { tag } }: Props) {

    return {
        title: `Posts about ${tag} ' ~ mrwaradana'`,
    }
}

export default async function Page({ params: { tag } }: Props) {
    const posts = await getAllPostsMeta();

    if (!posts) return <p className='mt-12 text-center'>There&apos;s no projects available.</p>

    const tagPosts = posts.filter(post => post.tags?.includes(tag))
    return (
        <section className='pt-4 lg:pt-12 layout'>
            <h2 className='text-3xl font-bold'>Result for tags: {tag}</h2>
            <div className='grid grid-flow-row mt-6 lg:grid-cols-3 place-items-center'>
                {tagPosts.map((post: any, i: number) => (
                    <div key={i} className='px-4 pt-3 pb-6 transition duration-300 ease-in-out border rounded-lg border-neutral-600 hover:border-blue-400 '>
                        <Link
                            href={`/projects/${post.slug}`}
                            key={post?.title}
                            className='block p-3 rounded-md shadow-md group'
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
                            {post.tags?.map((tagName: string, i: number) => {
                                const IconComponent = tagIconMap[tagName];
                                return (
                                    <Link href={`/projects/tags/${tagName}`} key={i}>
                                        <li key={i} className={`flex items-center gap-1 px-2 py-1 m-1 font-semibold transition duration-300 ease-linear rounded-md lg:text-xs text-neutral-800 bg-neutral-200 hover:-translate-y-1 ${tag === tagName ? `opacity-100` : `opacity-50`}`}>
                                            {IconComponent && <IconComponent className='text-lg transition duration-300 ease-in-out group-hover:-translate-y-1 lg:text-xs' />}
                                            <span className='hidden lg:inline-block text-neutral-800'>
                                                {tagName.charAt(0).toUpperCase() + tagName.slice(1) || ''}
                                            </span>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <div className='flex pt-24 pb-6'>
                <Link href="/projects" className='flex items-center gap-6 text-xl text-neutral-300 hover:text-neutral-100 group'><BsFillArrowLeftSquareFill className='text-xl transition duration-300 ease-in-out group-hover:-translate-x-1' /> All Projects</Link>
            </div>
        </section >
    )
};
