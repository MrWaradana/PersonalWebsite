import { getAllPostsMeta } from '../../lib/posts';
import 'highlight.js/styles/atom-one-dark.css'
import ProjectCard from '../../components/ProjectCard';
import Link from 'next/link';

export const revalidate = 86400 // 24 hours

export default async function Projects() {
    const posts = await getAllPostsMeta()

    if (!posts || posts.length === 0) return (
        <section className='py-16 md:py-24 layout'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-3xl font-extrabold tracking-tight font-heading'>No projects yet.</h1>
                <p className='mt-4 text-zinc-400'>Check back later for new updates!</p>
            </div>
        </section>
    )

    const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])))

    return (
        <main className='min-h-screen py-16 md:py-24 layout'>
            <div className='max-w-6xl mx-auto space-y-12'>
                <div className="space-y-4">
                    <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight text-gradient font-heading pb-4'>All Projects.</h1>
                    <p className='text-zinc-400 text-sm md:text-base max-w-2xl'>
                        An archive of systems, routing applications, research publications, and web development <br/> I have engineered.
                    </p>
                </div>

                {/* Tag Cloud filter list */}
                <div className="flex flex-wrap gap-2 pt-2 pb-4">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider self-center mr-2">Filter by tech:</span>
                    {allTags.map((tag, i) => (
                        <Link 
                            key={i}
                            href={`/projects/tags/${tag}`}
                            className="px-3 py-1 text-xs font-semibold rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition"
                        >
                            #{tag.replace('-', ' ')}
                        </Link>
                    ))}
                </div>

                <div className='pt-4'>
                    <ProjectCard sliceNum={posts.length} title={'Project Showcase'}/>
                </div>
            </div>
        </main>
    )
};
