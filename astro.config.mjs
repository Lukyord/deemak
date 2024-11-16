// @ts-check
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "cs0qjbur",
      dataset: "production",
      apiVersion: "2024-09-29",
      useCdn: false,
    }),
    ,
    react(),
  ],
});
