import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { WrenchIcon, DesktopIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./cms-sanity/schemaTypes";
import type { SchemaTypeDefinition } from "sanity";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const singletonTypes = new Set(["settings"]);

export default defineConfig({
  name: "default",
  title: "deemak",

  projectId: "cs0qjbur",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage Announcement")
              .id("indexAnnouncement")
              .icon(DesktopIcon)
              .child(
                S.document()
                  .schemaType("indexAnnouncement")
                  .documentId("indexAnnouncement"),
              ),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .icon(WrenchIcon)
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.documentTypeListItem("service").title("Service"),
            S.documentTypeListItem("journalCategory").title("Journal Category"),
            S.documentTypeListItem("journalAuthor").title("Journal Author"),
            S.documentTypeListItem("journal").title("Journal"),
            S.documentTypeListItem("team").title("Team"),
            S.documentTypeListItem("teamRole").title("Team Role"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
