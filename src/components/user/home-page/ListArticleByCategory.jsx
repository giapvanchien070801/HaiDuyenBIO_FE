"use client"

import ArticleModal from "@/models/ArticleModal"
import { Breadcrumb } from "antd"
import Link from "next/link"
import { useQuery } from "react-query"

export default function ListArticleByCategory({ categoryId }) {
  const {
    data: listArticle,
    refetch,
    isFetching
  } = useQuery(
    ["getListPostPagination", categoryId],
    async () => {
      const res = await ArticleModal.getArticleList({
        page: 0,
        size: 1000,

        categoryId: categoryId
      })

      return res?.content
    },
    {
      enabled: !!categoryId
    }
  )

  return (
    <ul className="w-max bg-white">
      {listArticle?.map((article, index) => (
        <li key={index} className="w-full">
          {/* link đến tranh danh sách bài viết */}
          <Link
            href={`/news/${article?.id}`}
            as={`/news/${article?.id}`}
            className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
            {article?.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
