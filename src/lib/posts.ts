import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogPost, Meta } from '../../types'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
import Video from '@/components/Video'
import CustomImage from '@/components/CustomImage'


const rootDirectory = path.join(process.cwd(), 'src', 'contents')

export const getPostBySlug = async (slug : string): Promise<BlogPost | undefined> => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content } = await compileMDX<{title: string, description: string, tech: string[], slug: string, imageDesc:string, date: string}>({
    source: fileContent,
    components: {
      Video,
      CustomImage
    },
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
           }],
        ],
      },
    }
  })

  return { meta: { ...frontmatter, slug: realSlug }, content }
}

export async function getAllPostsMeta(): Promise<Meta[] | undefined> {
  const files = fs.readdirSync(rootDirectory)

  const posts: Meta[] = []

  for (const file of files) {
    const post = await getPostBySlug(file)
    const { meta } : any = post
    posts.push(meta)
  }

  return posts
}