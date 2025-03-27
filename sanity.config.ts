import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./cms-sanity/schemaTypes";
import type { SchemaTypeDefinition } from "sanity";

export default defineConfig({
  name: "default",
  title: "deemak",

  projectId: "cs0qjbur",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
});
