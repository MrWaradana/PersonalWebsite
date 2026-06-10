import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'
import Image from 'next/image'
import getFormattedDate from '@/lib/getFormattedDate'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel, FaLink } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { HiArrowLeft } from 'react-icons/hi2'
const ArrowLeft = HiArrowLeft as any
import Link from 'next/link'
import { DiCodeigniter } from 'react-icons/di'
const LinkIcon = FaLink as any

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

type Props = {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = await getAllPostsMeta()

    if (!posts) return []

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) return {
        title: 'Project Not Found | mrwaradana'
    }

    return {
        title: `${post.meta.title} | mrwaradana`,
        description: post.meta.description,
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params
    const post = await getPostBySlug(slug);
    
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center layout">
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-heading">Project not found.</h1>
                    <Link href="/projects" className="text-indigo-400 hover:underline mt-4 inline-block">
                        Back to projects
                    </Link>
                </div>
            </div>
        )
    }

    const { meta, content } = post

    const tags = meta.tags?.map((tag: string, i: number) => {
        const IconComponent = tagIconMap[tag] as any;

        return (
            <Link
                key={i}
                href={`/projects/tags/${tag}`}
                className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition'
            >
                {IconComponent && <IconComponent className='text-xs' />}
                {tag.replace('-', ' ')}
            </Link>
        );
    });

    return (
        <main className='min-h-screen py-12 md:py-20 layout'>
            <article className="max-w-4xl mx-auto space-y-8">
                {/* Back button */}
                <Link href="/projects" className='inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition duration-200 group'>
                    <ArrowLeft className='text-sm transition-transform duration-200 group-hover:-translate-x-0.5' /> 
                    <span>Back to all projects</span>
                </Link>

                {/* Hero Header */}
                <div className='space-y-4 border-b border-zinc-850 pb-8'>
                    <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 font-heading leading-tight'>
                        {meta.title}
                    </h1>
                    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono'>
                        <span>{getFormattedDate(meta.date)}</span>
                        {meta.site && (
                            <>
                                <span>•</span>
                                <a 
                                    href={meta.site} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 hover:underline transition"
                                >
                                    <LinkIcon className="text-[10px]" />
                                    <span>Live Website</span>
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Detail image */}
                {meta.imageDesc && (
                    <div className='relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950'>
                        <Image 
                            src={meta.imageDesc}
                            alt={meta.title}
                            fill
                            priority
                            className='object-cover'
                        />
                    </div>
                )}

                {/* Tech Stack section */}
                <div className='flex flex-wrap items-center gap-2 bg-zinc-900/10 border border-zinc-900/50 p-4 rounded-lg'>
                    <span className='text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mr-2'>Tech Stack:</span>
                    <div className="flex flex-wrap gap-2">
                        {tags}
                    </div>
                </div>

                {/* Main Content Markdown Render */}
                <div className="pt-6">
                    <div className="prose prose-invert max-w-none text-zinc-300 prose-headings:font-heading prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-a:no-underline hover:prose-a:underline prose-lead:text-zinc-400 prose-blockquote:border-zinc-800 prose-hr:border-zinc-800/80 leading-relaxed text-justify">
                        {content}
                    </div>
                </div>

                {/* Footer Back navigation */}
                <div className='pt-16 border-t border-zinc-900/50 flex justify-between items-center'>
                    <Link href="/projects" className='inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-zinc-100 transition duration-200 group'>
                        <ArrowLeft className='text-sm transition-transform duration-200 group-hover:-translate-x-0.5' /> 
                        <span>View all projects</span>
                    </Link>
                </div>
            </article>
        </main >
    )
};
