import { MetadataRoute } from 'next';
import { EXAM_PRESETS } from '@/data/presets';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://formfit.in';

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/specs-directory`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/photo-signature-joiner`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/date-name-on-photo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/jpg-to-pdf-under-size`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Programmatic exam routes
  const examRoutes: MetadataRoute.Sitemap = EXAM_PRESETS.map((preset) => ({
    url: `${baseUrl}/resize/${preset.slug}`,
    lastModified: new Date(preset.lastVerifiedDate),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...examRoutes];
}
