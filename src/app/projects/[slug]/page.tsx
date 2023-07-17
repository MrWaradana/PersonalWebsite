import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'
import Image from 'next/image'
import getFormattedDate from '@/lib/getFormattedDate'
import { IconType } from 'react-icons';
import { FaBootstrap, FaLaravel } from 'react-icons/fa'
import { BiLogoJquery, BiLogoTypescript, BiLogoTailwindCss } from 'react-icons/bi'
import { SiNextdotjs, SiAlpinedotjs } from 'react-icons/si'
import { DiCodeigniter } from 'react-icons/di'
import Link from 'next/link'

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
        title: post.meta.title + ' ~ mrwaradana',
        description: post.meta.title,
    }
}

export default async function Page({ params: { slug } }: Props) {
    const post = await getPostBySlug(`${slug}.mdx`);
    const { meta, content }: any = post
    const tags = meta.tags?.map((tag: string, i: number) => {
        const IconComponent = tagIconMap[tag];

        return (
            <Link
                key={i}
                href={`/projects/tags/${tag}`}
                className='flex items-center gap-2 p-2 transition duration-300 ease-in-out border-2 border-transparent rounded-lg group hover:border-blue-500'
            >
                {IconComponent && <IconComponent className='transition duration-300 ease-in-out group-hover:-translate-y-1' />}
                {tag.charAt(0).toUpperCase() + tag.slice(1) || ''}
            </Link>
        );
    });

    if (!post) return null
    return (
        <section className='mb-24 layout'>
            <Image src={`https://source.unsplash.com/1200x400?${meta.imageDesc}`}
                alt={meta.imageDesc}
                width={1200}
                height={400}
                className='my-4 rounded-md lg:my-8'
            />
            <div className='py-4 mb-6 border-t-2 border-b-2 border-gray-500'>
                <h1 className='mb-6 text-6xl font-bold'>
                    {meta.title}
                </h1>
                <div className='mb-4'>
                    <p className='flex flex-col lg:items-center lg:flex-row'> <span className='pe-4'>Tech Stack:</span>{tags}</p>
                </div>
                <p>
                    {getFormattedDate(meta.date)}
                </p>
            </div>

            <p>
                Table of contents
            </p>
            <article className="prose text-justify prose-invert prose-a:!no-underline relative prose-a:font-bold prose-ol:ml-auto prose-p:text-neutral-400 prose-h2:scroll-mt-8">
                {content}
            </article>
        </section >
    )
};

