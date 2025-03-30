import React from "react";
import { urlFor } from "@/lib/sanity";
// React icon for a link with fill color

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).format("webp").url();
      return (
        <img src={imageUrl} alt={value.alt || ""} title={value.title || ""} />
      );
    },
    list: (node) => {
      return (
        <ul>
          {node.children.map((child, index) => (
            <li key={index}>{child}</li>
          ))}
        </ul>
      );
    },
    divider: ({ value }) => {
      return <div style={{ height: `${value.height}px` }} />;
    },
  },

  marks: {
    span: ({ children }) => <sup className="sup">{children}</sup>,
    link: (node) => {
      return (
        <a
          href={node.value.href}
          target={node.value.blank ? "_blank" : undefined}
          rel={node.value.blank ? "noopener noreferrer" : undefined}
        >
          {node.children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const href = `/${value.reference._type}/${value.reference.slug.current}`;
      return <a href={href}>{children}</a>;
    },
  },
};
