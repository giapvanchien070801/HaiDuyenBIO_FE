import Blog from "@/components/user/Blog";

import { Suspense } from "react";
import Loading from "../../loading";

export async function generateMetadata({ params }) {
  // read router params
  const id = params.id;

  // fetch data
  const blog = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts/1`
  ).then((res) => res.json());

  return {
    title: blog.blog.title,
  };
}

export default async function BlogPage({ params }) {
  return (
    <div className="container mx-auto pb-24">
      <Blog id={params.id} />
    </div>
  );
}
