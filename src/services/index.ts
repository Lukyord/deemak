import { sanityClient } from "sanity:client";
import type { IndexAnnouncement } from "~/sanity/sanity.types";

export async function getLatestAnnouncement(): Promise<IndexAnnouncement | null> {
  const query = `*[_type == "indexAnnouncement"] | order(_createdAt desc)[0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    text,
    link
  }`;

  const announcement: IndexAnnouncement | null =
    await sanityClient.fetch(query);
  return announcement;
}
