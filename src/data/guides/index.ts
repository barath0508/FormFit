import { EditorialGuide } from './types';
import { guidesPart1 } from './guide-data-part1';
import { guidesPart2 } from './guide-data-part2';
import { guidesPart3 } from './guide-data-part3';

export * from './types';

export const GUIDES: EditorialGuide[] = [
  ...guidesPart1,
  ...guidesPart2,
  ...guidesPart3,
];

export const GUIDE_BY_SLUG: Record<string, EditorialGuide> = GUIDES.reduce(
  (acc, guide) => {
    acc[guide.slug] = guide;
    return acc;
  },
  {} as Record<string, EditorialGuide>
);

export function getGuideBySlug(slug: string): EditorialGuide | undefined {
  return GUIDE_BY_SLUG[slug];
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
