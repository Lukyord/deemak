import React from "react";
import { urlFor } from "@/lib/sanity";

/**
 * Translates a string to a Thai slug format.
 */
function toThaiSlug(inputString) {
  let slug = inputString.replace(/\s+/g, "-");
  slug = slug.replace("%", "เปอร์เซนต์");
  slug = slug.replace(/[^\p{L}\p{N}\s-]/gu, "");
  slug = slug.replace(/--+/, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug.toLowerCase();
}

export const createSlug = (text) => {
  if (typeof text === "string") {
    return toThaiSlug(text);
  }

  if (Array.isArray(text)) {
    // Convert node array to string (only works if array items are strings or have toString)
    return toThaiSlug(text.map(String).join("-"));
  }

  return toThaiSlug(String(text));
};

export const myPortableTextComponents = {
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => {
      const slug = createSlug(children);
      return (
        <h2 id={`${slug}`} className="content-heading">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value).format("webp").url();
      const alt = value.alt;
      const title = value.title;

      return <img src={imageUrl} alt={alt} title={title} />;
    },
    divider: ({ value }) => {
      return <div style={{ height: `${value.height}px` }} />;
    },
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    span: ({ children }) => <sup className="sup">{children}</sup>,
    internalLink: ({ value, children }) => {
      const { reference } = value;
      const href =
        reference?.type === "service"
          ? `/services/${reference.slug?.current}`
          : `/journals/${reference.slug?.current}`;
      return <a href={href}>{children}</a>;
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};
