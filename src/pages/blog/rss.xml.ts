import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET({ site }) {
  const blog = await getCollection("blog");
  return rss({
    title: "Hummingbird Blog",
    description: "The Hummingbird blog",
    site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      categories: [post.data.category],
      link: `/blog/${post.id}/`,
    })),
  });
}
