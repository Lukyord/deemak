import { sanityClient } from "sanity:client";
import type { IndexAnnouncement } from "~/sanity/sanity.types";

export async function getActiveAnnouncement(): Promise<IndexAnnouncement | null> {
  const query = `*[_type == "indexAnnouncement" && isActive == true] | order(publishDate desc)[0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    text,
    link,
    publishDate,
    isActive
  }`;

  const announcement: IndexAnnouncement | null =
    await sanityClient.fetch(query);
  return announcement;
}
