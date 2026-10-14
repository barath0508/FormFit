import React from 'react';
import { ExamPortalPreset } from '@/types/preset';

interface JsonLdProps {
  preset: ExamPortalPreset;
}

export function buildExamSchemaGraph(preset: ExamPortalPreset) {
  const photo = preset.assets[0]!;
  const pageUrl = `https://formfit.in/resize/${preset.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formfit.in' },
          { '@type': 'ListItem', position: 2, name: 'Exam Resizers', item: 'https://formfit.in/specs-directory' },
          { '@type': 'ListItem', position: 3, name: `${preset.shortName} Resizer`, item: pageUrl },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#app`,
        name: `${preset.shortName} Photo, Signature & PDF Resizer`,
        url: pageUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Android, iOS, Windows, macOS, Linux (All HTML5 Browsers)',
        browserRequirements: 'Requires HTML5 Canvas and JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        featureList: preset.assets.map(
          (a) => `${a.label}: Exact ${a.widthPx}x${a.heightPx} px (${a.widthCm}x${a.heightCm} cm), ${a.minKB}–${a.maxKB} KB, ${a.dpi} DPI JFIF header`
        ),
        author: {
          '@type': 'Organization',
          name: 'FormFit Document Compliance Lab',
          url: 'https://formfit.in/about',
        },
      },
      {
        '@type': 'HowTo',
        name: `How to Resize Photo and Signature for ${preset.shortName}`,
        description: `Step-by-step guide to formatting your candidate photograph and signature to exact ${preset.shortName} portal dimensions and KB limits.`,
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: `Select the ${preset.shortName} Asset Type`,
            text: `Choose whether you are formatting your ${preset.assets.map((a) => a.label).join(', ')}.`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Your Photo or Signature File',
            text: 'Pick your photo from your smartphone gallery or PC. The image is decoded 100% locally in your browser memory.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Align Face/Signature & Optional Name-Date Slate',
            text: `Use the locked ${photo.widthPx}:${photo.heightPx} aspect-ratio guide to center your face or signature. Toggle the Name & Date plaque if required by the ${preset.shortName} notification.`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Verify 5-Point Compliance & Download',
            text: `Confirm green PASS badges for ${photo.widthPx}x${photo.heightPx} px dimensions, ${photo.minKB}–${photo.maxKB} KB file size, and ${photo.dpi} DPI header, then click Download.`,
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
}

export function JsonLd({ preset }: JsonLdProps) {
  const structuredData = buildExamSchemaGraph(preset);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
