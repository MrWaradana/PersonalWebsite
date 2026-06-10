import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

const Github = FaGithub as any;
const Linkedin = FaLinkedin as any;
const Mail = FiMail as any;

export default function SocialLink() {
    return (
        <div className='flex flex-wrap gap-x-8 gap-y-4'>
            <a 
                href="https://github.com/MrWaradana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='flex items-center gap-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group'
            >
                <Github className='text-lg transition-transform duration-200 group-hover:-translate-y-0.5' />
                <span>@MrWaradana</span>
            </a>
            
            <a 
                href="https://www.linkedin.com/in/mrwaradana/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='flex items-center gap-2.5 text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors duration-200 group'
            >
                <Linkedin className='text-lg transition-transform duration-200 group-hover:-translate-y-0.5' />
                <span>Muhammad Ridho Waradana</span>
            </a>

            <a 
                href="mailto:muhammadridhowaradanda@gmail.com" 
                className='flex items-center gap-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group'
            >
                <Mail className='text-lg transition-transform duration-200 group-hover:-translate-y-0.5' />
                <span>Email me</span>
            </a>
        </div>
    )
}
