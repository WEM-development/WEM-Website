import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  index: number;
  title: string;
  description?: string;
  image: string;
  href: string;
}

export default function ServiceCard({ index, title, description, image, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-5 flex items-start gap-4">
        <span className="pt-1 text-sm font-semibold tabular-nums text-neutral-400">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
            {title}
          </h3>
          {description && <p className="mt-2 leading-relaxed text-neutral-600">{description}</p>}
        </div>
        <span
          aria-hidden="true"
          className="pt-0.5 text-xl transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}
