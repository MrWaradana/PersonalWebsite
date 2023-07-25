import Image from "next/image"

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {

    const prty = priority ? true : false

    return (
        <div className="w-full h-full">
            <Image
                className={`mx-auto rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-300/50`}
                src={src}
                alt={alt}
                width={1250}
                height={750}
                priority={prty}
                loading="lazy"
            />
        </div>
    )

};
