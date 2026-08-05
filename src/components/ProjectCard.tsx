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

export default async function ProjectCard({ sliceNum = 3, title }: { sliceNum?: number, title: string }) {
    const posts = await getAllPostsMeta()
    
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-zinc-800/40 pb-4 mb-8">
                <h2 className='text-xl md:text-2xl font-bold tracking-tight text-zinc-100 font-heading'>{title}</h2>
                {sliceNum === 3 && posts && posts.length > 3 && (
                    <Link href="/projects" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition mt-2 md:mt-0">
                        View all projects →
                    </Link>
                )}
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts && posts
                    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, sliceNum)
                    .map((post: any, i: number) => {
                        return (
                            <article 
                                key={i} 
                                className='group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/60 hover:shadow-lg hover:shadow-indigo-500/[0.02]'
                            >
                                <Link
                                    href={`/projects/${post.slug}`}
                                    className='block p-4'
                                >
                                    {post.imageDesc && (typeof post.imageDesc === 'string' ? post.imageDesc.trim() !== '' : true) && (
                                        <div className='relative w-full h-48 overflow-hidden rounded-lg bg-zinc-950 mb-4 border border-zinc-800/50'>
                                            <Image 
                                                src={post.imageDesc}
                                                alt={post.title || 'Project thumbnail'}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className='object-cover transition duration-500 ease-in-out group-hover:scale-102 group-hover:brightness-110'
                                                loading='lazy'
                                            />
                                        </div>
                                    )}
                                    <span className="text-[10px] font-mono text-zinc-500">
                                        {getFormattedDate(post.date)}
                                    </span>
                                    <h3 className='text-lg font-bold text-zinc-200 mt-1 mb-2 group-hover:text-white transition font-heading'>
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                        {post.description}
                                    </p>
                                </Link>
                                
                                <div className='px-4 pb-4 pt-2 border-t border-zinc-850/40 flex flex-wrap gap-1.5'>
                                    {post.tags?.map((tag: string, idx: number) => {
                                        const IconComponent = tagIconMap[tag] as any;
                                        return (
                                            <Link 
                                                href={`/projects/tags/${tag}`} 
                                                key={idx}
                                                className='inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded bg-zinc-800/50 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 transition duration-150'
                                            >
                                                {IconComponent && <IconComponent className='text-xs' />}
                                                <span>{tag.replace('-', ' ')}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </article>
                        )
                    })}
            </div>
        </div>
    )
};
