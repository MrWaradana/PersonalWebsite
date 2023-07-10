import { FaLinkedin, FaGithub } from 'react-icons/fa'

export default function SocialLink() {
    return (
        <div className='flex gap-12 mt-4'>
            {/* github */}
            <a href="https://github.com/MrWaradana" className='flex flex-row gap-2 text-sm font-semibold lg:text-lg group min-w-fit'><FaGithub className='translate-y-1 ease group-hover:-translate-y-[.5px]' />MrWaradana</a>
            {/* twitter */}
            <a href="https://github.com/MrWaradana" className='flex flex-row gap-2 text-sm font-semibold lg:text-lg group min-w-fit'><FaLinkedin className='translate-y-1 ease group-hover:-translate-y-[.5px] group-hover:text-[#0077b5] group-hover:bg-white rounded-sm' />Muhammad Ridho Waradana</a>
        </div>
    )
};