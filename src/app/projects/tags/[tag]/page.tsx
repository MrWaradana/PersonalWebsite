import { getAllPostsMeta } from '@/lib/posts'
import getFormattedDate from '@/lib/getFormattedDate'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs'
const ArrowLeft = BsArrowLeft as any
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import Link from 'next/link'
import Image from 'next/image'
import TagFilterBar from '@/components/TagFilterBar'

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
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const posts = await getAllPostsMeta()

    if (!posts) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map(tag => ({ tag }))
}

export async function generateMetadata({ params }: Props) {
    const { tag } = await params
    return {
        title: `Projects tagged with ${tag} | mrwaradana`,
    }
}

export default async function Page({ params }: Props) {
    const { tag } = await params
    const posts = await getAllPostsMeta();

    if (!posts) return <p className='mt-12 text-center text-zinc-400'>There are no projects available.</p>

    const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])))
    const tagPosts = posts.filter(post => post.tags?.includes(tag))
    
    return (
        <section className='min-h-screen py-16 md:py-24 layout'>
            <div className="max-w-6xl mx-auto space-y-10">
                <div className="flex flex-col gap-2">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition mb-4">
                        <ArrowLeft className="text-sm" /> Back to all projects
                    </Link>
                    <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 font-heading'>
                        Projects
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base">
                        Showing {tagPosts.length} project{tagPosts.length !== 1 ? 's' : ''} tagged with <span className="text-indigo-400 font-medium">#{tag.replace(/-/g, ' ')}</span>.
                    </p>
                </div>

                {/* Tag filter bar */}
                <TagFilterBar allTags={allTags} activeTag={tag} />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4'>
                    {tagPosts && tagPosts
                        ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((post: any, i: number) => (
                            <article 
                                key={i} 
                                className='group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm transition duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-indigo-500/[0.02]'
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
                                    {post.tags?.map((tagName: string, idx: number) => {
                                        const IconComponent = tagIconMap[tagName] as any;
                                        return (
                                            <Link 
                                                href={`/projects/tags/${tagName}`} 
                                                key={idx}
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded transition ${
                                                    tag === tagName 
                                                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/40' 
                                                        : 'bg-zinc-800/50 text-zinc-300 border border-zinc-800 hover:bg-zinc-850'
                                                }`}
                                            >
                                                {IconComponent && <IconComponent className='text-xs' />}
                                                <span>{tagName.replace('-', ' ')}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </article>
                        ))}
                </div>
            </div>
        </section >
    )
};
