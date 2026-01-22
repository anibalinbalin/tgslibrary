import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "2h9xb6n1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});



