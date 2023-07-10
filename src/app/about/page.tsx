import SocialLink from "../../components/SocialLink"
import Image from "next/image"
import myImg from "/public/ridho-pas-foto.png"

export default function About() {
    return (
        <div className="mb-24 layout">
            <h1 className="mt-16 text-3xl font-semibold ">About me,</h1>
            <div className="grid grid-cols-1 mt-4 lg:grid-cols-3">
                <div className="text-justify  lg:col-span-2">
                    <p className="mb-4 text-lg font-medium leading-8">
                        Hi, I'm an Information Systems student currently learning web development and machine learning. I started an interest in web development during high school and only with basic HTML, CSS and Javascript. Then, developed more skills in web development during my college years at Institut Teknologi Sepuluh Nopember. I also have a passion for machine learning and data science. I am currently learning more about machine learning and data science through online courses and projects.
                    </p>
                    <p className="mb-4 text-lg font-medium leading-8">
                        My first experience with frameworks was Bootstrap and Laravel. Despite having little knowledge of PHP, I decided to dive straight into Laravel. I found it to be a great opportunity to learn a framework directly, rather than starting from scratch with the underlying programming language. I worked on several projects with Laravel and appreciated its simplicity.
                    </p>
                    <p className="mb-4 text-lg font-medium leading-8">
                        As I delved deeper into web development, I discovered more JavaScript frameworks and libraries, such as React and Next.js. I instantly fell in love with Next.js due to its rendering capabilities and SEO features.
                    </p>
                    <p className="mb-4 text-lg font-medium leading-8">
                        With me joining Bangkit 2023, I also got into machine learning using tools like python and tensorflow. Amazed by the results that the computer gave after it learns with our given datasets. Now, I’m trying to write and document projects that I’ve been doing and done before in this website.
                    </p>
                </div>
                <div className="lg:col-span-1">
                    <Image src={myImg} width={360} height={360} alt="my photo" />
                </div>
            </div>
            <SocialLink />

        </div>
    )
};
