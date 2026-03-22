import { MDXRemote } from "next-mdx-remote/rsc"

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} />
    </div>
  )
}
