import { sanityClient } from "sanity:client";
import type { SiteSettings } from "~/sanity/sanity.types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        highlightedService
    }`;

  const siteSettings: SiteSettings = await sanityClient.fetch(query);
  return siteSettings;
}
