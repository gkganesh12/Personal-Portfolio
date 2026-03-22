import { getAllPosts } from "@/lib/blog"
import { BlogListClient } from "./blog-list-client"

export const metadata = {
  title: "LOGS | GANESH.EXE",
  description: "Declassified insights, technical deep-dives, and observations from the field.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogListClient posts={posts} />
}
