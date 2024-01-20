"use client";
import Blog from "@/components/user/Blog";

import { useQuery } from "react-query";
import Base from "@/models/Base";
import Link from "next/link";

export default async function BlogDetail({ params }) {
  return (
    <div className="container mx-auto pb-24">
      <Blog postId={params.postId} />
    </div>
  );
}
