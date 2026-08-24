import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://loganpeterson.org';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlEntry = (path: string, lastModified?: Date) => {
  const location = new URL(path, SITE_URL).href;
  const lastmod = lastModified
    ? `\n    <lastmod>${lastModified.toISOString().slice(0, 10)}</lastmod>`
    : '';

  return `  <url>\n    <loc>${escapeXml(location)}</loc>${lastmod}\n  </url>`;
};

export const GET: APIRoute = async () => {
  const posts = await getCollection(
    'blog',
    ({ data }) => data.isDraft !== true && data.lang === 'en'
  );
  const staticPages = ['/', '/about/', '/blog/', '/contact/'];
  const postEntries = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) =>
      urlEntry(`/blog/${post.id}/`, post.data.updatedDate ?? post.data.pubDate)
    );
  const urls = [...staticPages.map((path) => urlEntry(path)), ...postEntries];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
