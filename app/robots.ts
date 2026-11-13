import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-content';

export default function robots(): MetadataRoute.Robots {
  return {
    /* every crawler, AI search and answer bots included: this is a marketing
       site and being found is the point. /api/ is only the chat and the
       caregiver form endpoints, nothing to index there. */
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/call/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
