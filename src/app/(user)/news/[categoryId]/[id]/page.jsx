"use client"

import { useQuery } from "react-query"

import ArticleModal from "@/models/ArticleModal"
import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Spin } from "antd"
import TitleList from "@/components/user/common-component/TitleList"
import SidebarUser from "@/components/user/common-component/SidebarUser"

function ProductDetailPage({ params }) {
  // Sử dụng query param từ URL
  const idArticle = params?.id

  const { data: dataArticle, isFetching } = useQuery(
    ["getDetailArticle", idArticle],
    async () => {
      const res = await ArticleModal.getArticleDetail(idArticle)

      return res
    },
    { enabled: !!idArticle }
  )

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      )
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Bài viết</span>
        </>
      )
    }
  ]

  return (
    <div className="  pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-0 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />

          <TitleList title="Bài viết" />
          <Spin spinning={isFetching}>
            <div dangerouslySetInnerHTML={{ __html: dataArticle?.content }} className="blog-content my-5" />
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  )
}

export default ProductDetailPage
