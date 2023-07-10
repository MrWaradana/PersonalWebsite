import Link from 'next/link';
import { getAllPostsMeta } from '../../lib/posts';
import Image from 'next/image';
import 'highlight.js/styles/atom-one-dark.css'

export const revalidate = 86400 // 24 hours

export default async function Projects() {
    const posts = await getAllPostsMeta()

    if (!posts) return (
        <section className='py-12'>
            <div className='layout'>
                <h1 className='text-3xl font-bold'>There is no projects yet~</h1>
            </div>
        </section>
    )
    // console.log(posts)
    return (
        <section className='py-12'>
            <div className='layout'>
                <h1 className='text-3xl font-bold'>All Projects</h1>
                <div className='flex gap-6 mt-6'>
                    {posts?.map((post: any) => (
                        <Link
                            href={`projects/${post.slug}`}
                            key={post?.title}
                            className='p-3 rounded-md shadow-md'
                        >
                            <Image src={`https://source.unsplash.com/300x200?${post.imageDesc}`}
                                alt={post.imageDesc}
                                width={300}
                                height={200}
                                className='mb-2 rounded-md'
                            />
                            <h3 className='text-xl font-semibold'>{post.title}</h3>
                            <p className='mt-4 text-sm'>{post.tech}</p>
                            <time className='text-[12px] text-gray-400'>
                                {post.slug}
                            </time>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
};
