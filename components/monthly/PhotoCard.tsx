import Image from 'next/image';
import { cn } from '@/lib/cn';

/* A rounded photo card for the monthly page. */
export function PhotoCard({
  src,
  alt,
  className,
  imgClassName,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-[28px] bg-white', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imgClassName)}
      />
    </div>
  );
}
