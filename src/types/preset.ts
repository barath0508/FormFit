import { z } from 'zod';

export const AssetSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  assetType: z.enum(['photo', 'signature', 'thumb', 'document_pdf']),
  widthPx: z.number().int().positive(),
  heightPx: z.number().int().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
  minKB: z.number().positive(),
  maxKB: z.number().positive(),
  dpi: z.number().int().min(72).max(600),
  allowedFormats: z.array(z.enum(['jpg', 'jpeg', 'png', 'pdf'])),
  backgroundRule: z.string(),
  requiresNameAndDate: z.enum(['mandatory', 'recommended', 'not_required']),
  inkColorRule: z.string().optional(),
  notes: z.array(z.string()),
});

export const TroubleshootingItemSchema = z.object({
  portalMessage: z.string(),
  cause: z.string(),
  solution: z.string(),
});

export const ExamPortalPresetSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  shortName: z.string(),
  fullName: z.string(),
  category: z.enum([
    'upsc',
    'ssc',
    'banking',
    'nta',
    'railways_defence',
    'state_psc',
    'govt_id',
  ]),
  conductingBody: z.string(),
  officialWebsiteUrl: z.string().url(),
  notificationReference: z.string(),
  lastVerifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  liveCaptureAdvisory: z.string().optional(),
  searchKeywords: z.array(z.string()),
  assets: z.array(AssetSpecSchema).min(1),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  troubleshooting: z.array(TroubleshootingItemSchema).optional(),
  captureTips: z.array(z.string()).optional(),
});

export type AssetSpec = z.infer<typeof AssetSpecSchema>;
export type TroubleshootingItem = z.infer<typeof TroubleshootingItemSchema>;
export type ExamPortalPreset = z.infer<typeof ExamPortalPresetSchema>;
