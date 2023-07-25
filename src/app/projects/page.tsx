import { getAllPostsMeta } from '../../lib/posts';
import 'highlight.js/styles/atom-one-dark.css'
import ProjectCard from '../../components/ProjectCard';

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
    return (
        <section className='pt-4 pb-12 lg:py-12'>
            <div className='layout'>
                <ProjectCard sliceNum={posts.length} title={'All Projects'}/>
            </div>
        </section>
    )
};
