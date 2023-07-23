import getFormattedDate from '../lib/getFormattedDate'
import Link from 'next/link'
import Image from 'next/image'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import { getAllPostsMeta } from '../lib/posts'

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


export default async function ProjectCard({ sliceNum = 3 }: { sliceNum?: number}) {
    const posts = await getAllPostsMeta()
    return (
        <>
            <h2 className='text-3xl font-bold transition duration-300 ease-in-out text-neutral-200 hover:text-blue-400'>Featured Projects</h2>
            <div className='grid grid-flow-row mt-6 gap-y-6 lg:grid-cols-3 place-items-center'>
                {posts && posts?.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                ).slice(0, sliceNum).map((post: any, i: number) => {
                    return (
                        <div key={i} className='px-4 pt-3 pb-6 transition duration-300 ease-in-out border rounded-lg border-neutral-600 hover:border-blue-400 '>
                            <Link
                                href={`projects/${post.slug}`}
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
                                {post.tags?.map((tag: string, i: number) => {
                                    const IconComponent = tagIconMap[tag];
                                    return (
                                        <Link href={`/projects/tags/${tag}`} key={i}>
                                            <li key={i} className='flex items-center gap-1 px-2 py-1 m-1 font-semibold transition duration-300 ease-linear rounded-md lg:text-xs text-neutral-800 bg-neutral-200 hover:-translate-y-1 '>
                                                {IconComponent && <IconComponent className='text-lg transition duration-300 ease-in-out group-hover:-translate-y-1 lg:text-xs' />}
                                                <span className='hidden lg:inline-block text-neutral-800'>
                                                    {tag.charAt(0).toUpperCase() + tag.slice(1) || ''}
                                                </span>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
};
