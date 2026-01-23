import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}



