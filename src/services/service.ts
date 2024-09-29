import { sanityClient } from "sanity:client";

import type { Service } from "~/sanity/sanity.types";

export async function getServices(): Promise<Service[]> {
  const query = `*[_type == "service"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      mainImage,
      shortDescription,
      description1,
      description2,
      highlight,
      pricingOptions,
      expectationImage,
      expectation,
      benefits
    }`;

  const services: Service[] = await sanityClient.fetch(query);
  return services;
}
