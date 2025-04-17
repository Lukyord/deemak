import type {
  Journal as SanityJournal,
  JournalAuthor,
} from "~/sanity/sanity.types";

// Create a type for the minimal related journal data we need
export type RelatedJournal = Pick<
  SanityJournal,
  "_id" | "title" | "description" | "slug" | "mainImage" | "publishedAt"
> & {
  author?: Pick<JournalAuthor, "name" | "image">;
};

export type ExpandedJournal = Omit<
  SanityJournal,
  "author" | "relatedJournals"
> & {
  author?: JournalAuthor;
  relatedJournals?: RelatedJournal[];
};
