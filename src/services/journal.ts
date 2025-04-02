import { sanityClient } from "sanity:client";

import type {
  Journal,
  JournalAuthor,
  JournalCategory,
} from "~/sanity/sanity.types";

export async function getJournalCategories(): Promise<JournalCategory[]> {
  const query = `*[_type == "journalCategory"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      description
    }`;

  const categories: JournalCategory[] = await sanityClient.fetch(query);
  return categories;
}

export async function getJournals(): Promise<Journal[]> {
  const query = `*[_type == "journal"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      description,
      slug,
      author,
      mainImage,
      categories,
      publishedAt,
      body,
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        schemaMarkup
      }
    }`;

  const journals: Journal[] = await sanityClient.fetch(query);
  return journals;
}

export async function getJournalAuthors(): Promise<JournalAuthor[]> {
  const query = `*[_type == "journalAuthor"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      slug,
      image,
      bio
    }`;

  const authors: JournalAuthor[] = await sanityClient.fetch(query);
  return authors;
}

export async function getJournalBySlug(slug: string): Promise<Journal | null> {
  const query = `*[_type == "journal" && slug.current == $slug][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    description,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    mainImage,
    categories[]->{
      _id,
      title,
      description
    },
    publishedAt,
    body,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      schemaMarkup
    }
  }`;

  const journal = await sanityClient.fetch(query, { slug });
  return journal;
}
