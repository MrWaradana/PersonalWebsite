import { FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Footer() {
    return (
        <footer className='py-6 border-t lg:px-0 px-12 text-center border-neutral-500 lg:mx-[12dvw]'>
            <div className='flex flex-col items-center justify-center'>
                <p className='pb-6 text-neutral-200'>
                    Feel free to contact through my social media or email me!
                </p>
                <div className='flex gap-6 pb-10 lg:gap-12'>
                    {/* github */}
                    <a href="https://github.com/MrWaradana" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FaGithub className='translate-y-1 ease group-hover:-translate-y-[.5px]' /></a>
                    {/* linkedin */}
                    <a href="https://www.linkedin.com/in/mrwaradana/" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FaLinkedin className='translate-y-1 ease group-hover:-translate-y-[.5px] group-hover:text-[#0077b5] group-hover:bg-white rounded-sm' /></a>
                    {/* email */}
                    <a href="mailto:muhammadridhowaradanda@gmail.com" className='flex flex-row gap-2 text-lg font-semibold lg:text-3xl group min-w-fit'><FiMail className='translate-y-1 ease group-hover:-translate-y-[.5px]' /></a>
                </div>
                <div className='flex flex-col items-center justify-center w-full pb-4'>
                    <p className='font-medium text-neutral-300 group'>Made with <FaHeart className='inline mx-1 -translate-y-[2px] group-hover:-translate-y-1 group-hover:text-red-500 transition duration-300 ease-in-out' /> by <a href='#' className='hover:text-blue-400 hover:underline'>MrWaradana</a></p>
                    <p className='font-medium text-neutral-300'>© 2023</p>
                </div>
            </div>
        </footer>
    )
};
