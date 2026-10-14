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

export function getPresetBySlug(slug: string): ExamPortalPreset | undefined {
  return PRESET_BY_SLUG[slug];
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
