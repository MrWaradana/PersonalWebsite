import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'

export const revalidate = 10

type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getAllPostsMeta()

    if (!posts) return []

    const tags = new Set(posts.map(post => post.tech).flat())

    return Array.from(tags).map(tag => ({ tag }))
}

export async function generateMetadata({ params: { tag } }: Props) {

    return {
        title: `Posts about ${tag}`,
    }
}

export default async function Page({ params: { tag } }: Props) {
    const post = await getAllPostsMeta();

    if (!post) return null

    const tagPosts = post.filter(post => post.tech.includes(tag))

    return (
        <section className='mb-24 layout'>
            <article className="prose text-justify prose-invert">
                {tagPosts.map((post: any) => (
                    <Link
                        href={`/projects/${post.slug}`}
                        key={post?.title}
                        className='p-3 rounded-md shadow-md'
                    />
                ))}
            </article>
        </section >
    )
};
