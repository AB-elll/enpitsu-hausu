import Image from 'next/image';

interface CategoryBannerProps {
  title: string;
  description: string;
  color: string;
  icon: string;
  image?: string;
}

export default function CategoryBanner({ title, description, color, icon, image }: CategoryBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-8 py-12 sm:py-16 text-white"
      style={{ backgroundColor: color }}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
      )}
      {!image && (
        <div className="absolute top-0 right-0 text-[12rem] opacity-10 leading-none -mt-8 -mr-4">
          {icon}
        </div>
      )}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-lg opacity-90">{description}</p>
      </div>
    </div>
  );
}
