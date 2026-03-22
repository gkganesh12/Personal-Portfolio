import { getPostBySlug, getAllSlugs } from "@/lib/blog"
import { notFound } from "next/navigation"
import { BlogPostClient } from "./blog-post-client"
import { MDXContent } from "./mdx-content"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Not Found" }

  return {
    title: `${post.title} | GANESH.EXE`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const mdxContent = <MDXContent source={post.content} />

  return <BlogPostClient post={post} mdxContent={mdxContent} />
}
