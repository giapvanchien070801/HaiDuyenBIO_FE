"use client"
import Blog from "@/components/user/Blog"

export default async function BlogDetail({ params }) {
  return (
    <>
      <Blog postId={params.postId} categoryId={params?.categoryId} />
    </>
  )
}
