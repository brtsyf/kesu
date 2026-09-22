import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { dataset, projectId } from "./src/lib/sanity/env";

const pid = projectId || "placeholder";

export default defineConfig({
  name: "kesu",
  title: "Kesu CMS",
  projectId: pid,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
