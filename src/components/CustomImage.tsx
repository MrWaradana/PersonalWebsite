import Image from "next/image"

type Props = {
    src?: any,
    alt?: string,
    width?: number | string,
    height?: number | string,
    priority?: string | boolean,
}

export default function CustomImage({ src, alt, width = 1250, height = 750, priority }: Props) {
    if (!src) return null;
    if (typeof src === 'string' && src.trim() === '') return null;

    const prty = Boolean(priority);

    // Normalize image src string if needed
    const imageSrc = typeof src === 'string' && !src.startsWith('/') && !src.startsWith('http')
        ? `/${src}`
        : src;

    const imgWidth = typeof width === 'string' ? parseInt(width, 10) || 1250 : width;
    const imgHeight = typeof height === 'string' ? parseInt(height, 10) || 750 : height;

    return (
        <div className="w-full my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-lg">
            <Image
                className="w-full h-auto rounded-xl object-cover transition-transform duration-500 ease-in-out hover:scale-102"
                src={imageSrc}
                alt={alt || "Project visual representation"}
                width={imgWidth}
                height={imgHeight}
                priority={prty}
                sizes="(max-width: 1200px) 100vw, 1250px"
                style={{ width: '100%', height: 'auto' }}
                {...(!prty ? { loading: "lazy" } : {})}
            />
        </div>
    )
};
