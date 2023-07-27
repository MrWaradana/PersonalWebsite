import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mrwaradana.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://mrwaradana.vercel.app/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://mrwaradana.vercel.app/about',
      lastModified: new Date(),
    },
  ]
}