'use client';

import { ReactNode } from 'react';
import { useSmoothScroll } from '@/lib/useSmoothScroll';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
