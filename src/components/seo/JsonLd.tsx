import React from 'react';
import { ExamPortalPreset } from '@/types/preset';

interface JsonLdProps {
  preset: ExamPortalPreset;
}

export function JsonLd({ preset }: JsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${preset.shortName} Photo & Signature Resizer — FormFit India`,
        url: `https://formfit.in/resize/${preset.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (Browser-Based HTML5)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        featureList: preset.assets.map(
          (a) => `${a.label}: ${a.widthPx}x${a.heightPx} px, ${a.minKB}-${a.maxKB} KB, ${a.dpi} DPI`
        ),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://formfit.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Exam Resizers',
            item: 'https://formfit.in/specs-directory',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${preset.shortName} Resizer`,
            item: `https://formfit.in/resize/${preset.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: preset.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
