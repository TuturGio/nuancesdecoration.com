import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = 'https://nuancesdecoration.com';

export default function Seo({ title, description, path }: SeoProps) {
  const fullUrl = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', fullUrl, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'canonical';
      newLink.href = fullUrl;
      document.head.appendChild(newLink);
    } else {
      link.href = fullUrl;
    }
  }, [title, description, fullUrl]);

  return null;
}
