export interface EditorialGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  publishedDate: string;
  lastUpdatedDate: string;
  readTime: string;
  category: string;
  searchKeywords: string[];
  summary: string;
  sections: {
    heading: string;
    subheading?: string;
    body: string[];
    table?: { headers: string[]; rows: string[][] };
    callout?: { type: 'note' | 'tip' | 'warning' | 'important'; text: string };
  }[];
  relatedExamSlugs: string[];
  faqs: { question: string; answer: string }[];
}
