import type { Metadata } from 'next';
import type { ExamPortalPreset } from '@/types/preset';
import type { KbTarget } from '@/data/kb-targets';
import type { DimensionTarget } from '@/data/dimension-targets';
import type { EditorialGuide } from '@/data/guides';

export function buildExamPageMetadata(preset: ExamPortalPreset): Metadata {
  const photo = preset.assets.find((a) => a.assetType === 'photo') ?? preset.assets[0]!;
  const sign = preset.assets.find((a) => a.assetType === 'signature');

  const title = sign
    ? `${preset.shortName} Photo (${photo.widthPx}x${photo.heightPx}) & Signature (${sign.minKB}-${sign.maxKB}KB) Resizer`
    : `${preset.shortName} Photo & Document Resizer (${photo.minKB}KB–${photo.maxKB}KB, ${photo.dpi} DPI)`;

  const description = sign
    ? `Resize ${preset.shortName} photo to ${photo.widthPx}x${photo.heightPx} px (${photo.minKB}–${photo.maxKB} KB) & signature to ${sign.widthPx}x${sign.heightPx} px (${sign.minKB}–${sign.maxKB} KB) at ${photo.dpi} DPI. Free, 100% private in-browser tool with Name & Date option.`
    : `Free online ${preset.shortName} photo and PDF resizer (${photo.widthPx}x${photo.heightPx} px, ${photo.minKB}–${photo.maxKB} KB, ${photo.dpi} DPI). 100% client-side privacy—files never leave your phone or PC.`;

  const canonicalUrl = `https://formfit.in/resize/${preset.slug}`;

  return {
    title,
    description,
    keywords: preset.searchKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'FormFit — Official Exam Spec Photo & Signature Resizer',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildKbPageMetadata(target: KbTarget): Metadata {
  const canonicalUrl = `https://formfit.in/kb/${target.slug}`;
  return {
    title: target.metaTitle,
    description: target.metaDescription,
    keywords: target.searchKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: target.metaTitle,
      description: target.metaDescription,
      url: canonicalUrl,
      siteName: 'FormFit — Official Exam Spec Photo & Signature Resizer',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: target.metaTitle,
      description: target.metaDescription,
    },
  };
}

export function buildDimensionPageMetadata(target: DimensionTarget): Metadata {
  const canonicalUrl = `https://formfit.in/dimensions/${target.slug}`;
  return {
    title: target.metaTitle,
    description: target.metaDescription,
    keywords: target.searchKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: target.metaTitle,
      description: target.metaDescription,
      url: canonicalUrl,
      siteName: 'FormFit — Official Exam Spec Photo & Signature Resizer',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: target.metaTitle,
      description: target.metaDescription,
    },
  };
}

export function buildGuidePageMetadata(guide: EditorialGuide): Metadata {
  const canonicalUrl = `https://formfit.in/guides/${guide.slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.searchKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: canonicalUrl,
      siteName: 'FormFit — Official Exam Spec Photo & Signature Resizer',
      locale: 'en_IN',
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.lastUpdatedDate,
      authors: [guide.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}
