import { getPostBySlug } from '@/lib/mdx'
import Image from 'next/image'
import { Metadata } from 'next'

const getPageContent = async (slug: string) => {
    const { meta, content } = await getPostBySlug(slug)
    return { meta, content }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { meta } = await getPageContent(params.slug)
    return {
        title: meta.title,
        description: meta.title,
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { meta, content } = await getPageContent(params.slug);
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
        </section>
    )
};

