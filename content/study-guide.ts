export type GuideSource = { title: string; href: string };
export type StudyGuideContent<S extends string = string> = {
  title: string;
  reviewed: string;
  contents: string;
  sourceLabel: string;
  sourcesTitle: string;
  intro: string;
  comparisonTitle: string;
  comparisonHeaders: string[];
  comparisonRows: string[][];
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    points?: string[];
    /** Internal links to deeper pages on the same topic. */
    links?: { label: string; href: string }[];
    sources: S[];
  }[];
  faqTitle: string;
  faqs: { id: string; question: string; answer: string; source: S }[];
  relatedTitle: string;
  coursesLabel: string;
  alternativeLabel: string;
  cta: string;
  shareHeadline: string;
  shareSubtitle: string;
};
