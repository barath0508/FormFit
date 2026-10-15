import { MetadataRoute } from 'next';
import { EXAM_PRESETS } from '@/data/presets';
import { KB_TARGETS } from '@/data/kb-targets';
import { DIMENSION_TARGETS } from '@/data/dimension-targets';
import { GUIDES } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://formfit-rust.vercel.app';
  const now = new Date();

  // 1. Static core & legal routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/specs-directory`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/photo-signature-joiner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/date-name-on-photo`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/jpg-to-pdf-under-size`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. Programmatic exam routes (/resize/*)
  const examRoutes: MetadataRoute.Sitemap = EXAM_PRESETS.map((preset) => ({
    url: `${baseUrl}/resize/${preset.slug}`,
    lastModified: new Date(preset.lastVerifiedDate),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Exact-KB routes (/kb/*)
  const kbRoutes: MetadataRoute.Sitemap = KB_TARGETS.map((target) => ({
    url: `${baseUrl}/kb/${target.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Exact-Dimension routes (/dimensions/*)
  const dimRoutes: MetadataRoute.Sitemap = DIMENSION_TARGETS.map((target) => ({
    url: `${baseUrl}/dimensions/${target.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Pillar Guide routes (/guides/*)
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdatedDate),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...examRoutes,
    ...kbRoutes,
    ...dimRoutes,
    ...guideRoutes,
  ];
}
