import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, hasSanityConfig } from "./env";

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;
