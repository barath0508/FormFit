import { describe, it, expect } from 'vitest';
import { EXAM_PRESETS, getPresetBySlug } from '@/data/presets';
import { ExamPortalPresetSchema } from '@/types/preset';

describe('Exam Preset Database Integrity', () => {
  it('contains at least 15 verified Indian exam and ID portal presets', () => {
    expect(EXAM_PRESETS.length).toBeGreaterThanOrEqual(15);
  });

  it('validates every preset against the strict Zod schema', () => {
    for (const preset of EXAM_PRESETS) {
      const validation = ExamPortalPresetSchema.safeParse(preset);
      expect(validation.success, `Preset ${preset.slug} failed schema validation`).toBe(true);
    }
  });

  it('ensures all slugs are unique', () => {
    const slugs = EXAM_PRESETS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('ensures every asset has minKB < maxKB and positive dimensions', () => {
    for (const preset of EXAM_PRESETS) {
      for (const asset of preset.assets) {
        expect(asset.minKB).toBeLessThan(asset.maxKB);
        expect(asset.widthPx).toBeGreaterThan(0);
        expect(asset.heightPx).toBeGreaterThan(0);
        expect(asset.dpi).toBeGreaterThanOrEqual(72);
      }
    }
  });

  it('finds preset by slug', () => {
    const upsc = getPresetBySlug('upsc-photo-signature-resizer');
    expect(upsc).toBeDefined();
    expect(upsc?.shortName).toBe('UPSC CSE / IAS');

    const ssc = getPresetBySlug('ssc-cgl-chsl-mts-resizer');
    expect(ssc).toBeDefined();
    expect(ssc?.category).toBe('ssc');
  });
});
