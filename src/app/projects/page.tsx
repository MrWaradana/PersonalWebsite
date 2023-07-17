import Link from 'next/link';
import { getAllPostsMeta } from '../../lib/posts';
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import Image from 'next/image';
import 'highlight.js/styles/atom-one-dark.css'
import getFormattedDate from '../../lib/getFormattedDate';

export const revalidate = 86400 // 24 hours

type TagIconMap = {
    [key: string]: IconType | React.ComponentType<any>;
};

const tagIconMap: TagIconMap = {
    'Bootstrap': FaBootstrap,
    'Jquery': BiLogoJquery,
    'Laravel': FaLaravel,
    'Code Igniter': DiCodeigniter,
    'Next Js': SiNextdotjs,
    'Typescript': BiLogoTypescript,
    'Tailwind CSS': BiLogoTailwindCss,
    'Alpine Js': SiAlpinedotjs,
};

export default async function Projects() {
    const posts = await getAllPostsMeta()

    if (!posts) return (
        <section className='py-12'>
            <div className='layout'>
                <h1 className='text-3xl font-bold'>There is no projects yet~</h1>
            </div>
        </section>
    )
    return (
        <section className='pt-4 pb-12 lg:py-12'>
            <div className='layout'>
                <h1 className='text-3xl font-bold'>All Projects</h1>
                <div className='grid grid-flow-row mt-6 lg:grid-cols-3 place-items-center'>
                    {posts && posts?.sort(
                        (a, b) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime(),
                    ).map((post: any, i: number) => {
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
                                            <li key={i} className='flex items-center gap-1 px-2 py-1 mt-2 mr-2 text-xs font-semibold transition duration-300 ease-linear rounded-md text-neutral-800 bg-neutral-200 hover:-translate-y-1 '>
                                                {IconComponent && <IconComponent className='transition duration-300 ease-in-out group-hover:-translate-y-1' />}
                                                {tag.charAt(0).toUpperCase() + tag.slice(1) || ''}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
};
