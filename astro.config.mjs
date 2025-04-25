// @ts-check
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  experimental: {
    session: true,
  },
  integrations: [
    sanity({
      projectId: "cs0qjbur",
      dataset: "production",
      apiVersion: "2024-09-29",
      useCdn: false,
    }),
    react(),
  ],
});
