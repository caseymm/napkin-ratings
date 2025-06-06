import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "c1ywbxqh", // from sanity.json or manage.sanity.io
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});
