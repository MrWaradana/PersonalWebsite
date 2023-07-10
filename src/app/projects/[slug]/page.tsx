import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'
import Image from 'next/image'
import getFormattedDate from '@/lib/getFormattedDate'

export const revalidate = 86400 // 24 hours

type Props = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = await getAllPostsMeta()

    if (!posts) return []

    return posts.map((post: any) => ({
        params: {
            slug: post.slug,
        },
    }))
}



export async function generateMetadata({ params: { slug } }: Props) {
    const post = await getPostBySlug(`${slug}.mdx`)

    if (!post) return {
        title: 'Projects not found!'
    }

    return {
        title: post.meta.title,
        description: post.meta.title,
    }
}

export default async function Page({ params: { slug } }: Props) {
    const post = await getPostBySlug(`${slug}.mdx`);
    const { meta, content }: any = post

    if (!post) return null
    return (
        <section className='mb-24 layout'>
            <Image src={`https://source.unsplash.com/1200x400?${meta.imageDesc}`}
                alt={meta.imageDesc}
                width={1200}
                height={400}
                className='my-8 rounded-md'
            />
            <article className="prose text-justify prose-invert">
                {content}
            </article>
        </section >
    )
};

