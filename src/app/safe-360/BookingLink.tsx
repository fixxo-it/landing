'use client';

import type { ReactNode } from 'react';
import { useStoreUrl } from '@/lib/useStoreUrl';

type BookingLinkProps = {
  className: string;
  children: ReactNode;
};

export default function BookingLink({ className, children }: BookingLinkProps) {
  const storeUrl = useStoreUrl();

  return (
    <a className={className} href={storeUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
