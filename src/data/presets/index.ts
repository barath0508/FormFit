import { ExamPortalPreset, ExamPortalPresetSchema } from '@/types/preset';
import { upscSscPresets } from './upsc-ssc';
import { bankingRailwaysPresets } from './banking-railways';
import { ntaEngineeringMedicalPresets } from './nta-engineering-medical';
import { govtIdStatePscPresets } from './govt-id-state-psc';

const rawPresets: ExamPortalPreset[] = [
  ...upscSscPresets,
  ...bankingRailwaysPresets,
  ...ntaEngineeringMedicalPresets,
  ...govtIdStatePscPresets,
];

// Validate all presets at module initialization
export const EXAM_PRESETS: ExamPortalPreset[] = rawPresets.map((p) => {
  const parsed = ExamPortalPresetSchema.safeParse(p);
  if (!parsed.success) {
    console.error(`Invalid preset schema for ${p.slug}:`, parsed.error.format());
    throw new Error(`PRESET_SCHEMA_VALIDATION_FAILED: ${p.slug}`);
  }
  return parsed.data;
});

export const PRESET_BY_SLUG: Record<string, ExamPortalPreset> = EXAM_PRESETS.reduce(
  (acc, preset) => {
    acc[preset.slug] = preset;
    return acc;
  },
  {} as Record<string, ExamPortalPreset>
);

const SLUG_ALIASES: Record<string, string> = {
  'upsc-photo-signature-resizer': 'upsc-cse-ias-photo-signature-resizer',
  'ssc-cgl-chsl-mts-resizer': 'ssc-cgl-chsl-mts-gd-resizer',
  'ibps-po-clerk-photo-resizer': 'ibps-po-clerk-so-rrb-resizer',
  'sbi-po-clerk-photo-resizer': 'sbi-po-clerk-photo-signature-resizer',
  'rrb-ntpc-group-d-photo-resizer': 'rrb-ntpc-group-d-alp-resizer',
  'nta-jee-main-photo-resizer': 'nta-jee-main-advanced-resizer',
  'nta-neet-ug-photo-resizer': 'nta-neet-ug-passport-postcard-resizer',
  'nta-cuet-ug-pg-resizer': 'nta-cuet-ugc-net-photo-resizer',
  'gate-photo-signature-resizer': 'gate-goaps-photo-signature-resizer',
  'nsdl-pan-card-photo-resizer': 'nsdl-protean-pan-card-resizer',
  'utiitsl-pan-card-photo-resizer': 'utiitsl-pan-card-photo-signature-resizer',
  'uidai-aadhaar-document-resizer': 'uidai-myaadhaar-document-pdf-resizer',
  'passport-seva-photo-resizer': 'passport-seva-voter-id-dl-resizer',
  'tnpsc-photo-resizer': 'tnpsc-group-1-2-4-photo-resizer',
  'uppsc-otr-photo-resizer': 'uppsc-upsssc-up-police-photo-resizer',
  'bpsc-photo-resizer': 'bpsc-bihar-police-tre-photo-resizer',
};

export function getPresetBySlug(slug: string): ExamPortalPreset | undefined {
  const canonical = SLUG_ALIASES[slug] || slug;
  return PRESET_BY_SLUG[canonical];
}

export function getAllPresetSlugs(): string[] {
  return EXAM_PRESETS.map((p) => p.slug);
}

export const CATEGORY_LABELS: Record<string, string> = {
  upsc: 'UPSC & Civil Services',
  ssc: 'SSC Staff Selection',
  banking: 'Banking & Insurance',
  nta: 'NTA & Engineering / Medical',
  railways_defence: 'Railways & Defence',
  govt_id: 'Government ID Cards',
  state_psc: 'State PSC Exams',
};
