"use client"

import { Pagination, Spin } from "antd"

import TitleList from "./TitleList"
import CardProduct from "./CardProduct"
import CardVideo from "./CardVideo"
import { useQuery } from "react-query"
import { useRef } from "react"
import FilesRepository from "@/models/FilesRepository"
import ArticleModal from "@/models/ArticleModal"
import CardPNews from "./CardPNews"

export default function ListNewsHome() {
  const {
    data: listPost,

    isFetching
  } = useQuery(
    ["getArticleListHome"],
    async () => {
      const res = await ArticleModal.getArticleList({
        page: 0,
        size: 6,
        categoryId: -1,
        type: "ARTICLE"
      })

      return res?.content
    },
    {
      enabled: true
    }
  )

  return (
    <div className="container-original mx-auto pb-14 px-4 sm:px-6 lg:px-10 bg-gray-100">
      <TitleList title="Tin tức nổi bật" />
      <Spin spinning={isFetching}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {listPost?.map(item => (
            <CardPNews key={item.id} dataNews={item} categoryId={item?.categoryId} />
          ))}
        </div>
      </Spin>
    </div>
  )
}
