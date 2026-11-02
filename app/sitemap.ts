import type { MetadataRoute } from 'next';
import { PAGES, SITE_URL } from '@/lib/site-content';

/* No lastModified: a date that isn't kept accurate teaches search engines to
   ignore it, and Google ignores changeFrequency and priority anyway. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
  }));
}
