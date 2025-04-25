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
      description1,
      description2,
      highlight,
      pricingOptions,
      expectationImage,
      expectation,
      benefits,
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        schemaMarkup
      }
    }`;

  const services: Service[] = await sanityClient.fetch(query);
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    mainImage,
    description1,
    description2,
    highlight,
    pricingOptions,
    expectationImage,
    expectation,
    benefits,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      schemaMarkup
    }
  }`;
  const service = await sanityClient.fetch(query, { slug });
  return service;
}
