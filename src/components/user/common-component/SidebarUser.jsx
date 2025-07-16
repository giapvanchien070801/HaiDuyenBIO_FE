"use client"

import { removeEmptyFields } from "@/common/functions/commonFunction"
import ArticleModal from "@/models/ArticleModal"
import Product from "@/models/Product"
import { RightOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useQuery } from "react-query"

export default function SidebarUser(props) {
  const { breadcrumb, title } = props

  const { data: listPost } = useQuery(
    ["getListPostPagination"],
    async () => {
      const res = await ArticleModal.getArticleList({
        page: 0,
        size: 10
      })

      return res?.content
    },
    {
      enabled: true
    }
  )

  const {
    data: listProduct,
    refetch,
    isFetching
  } = useQuery(
    ["getListProductPagination"],
    async () => {
      const res = await Product.getProductList(
        removeEmptyFields({
          page: 0,
          size: 10
        })
      )

      return res?.content
    },
    {
      enabled: true
    }
  )

  return (
    <div className="another col-span-3 lg:block hidden">
      <div className="categories-blog py-8 pl-4">
        <p className="text-3xl mb-4">Bài viết mới nhất</p>
        {listPost?.map((post, index) => (
          <p className="my-4" key={index}>
            <Link
              href={`/news/${post?.id}`}
              as={`/news/${post?.id}`}
              className="capitalize categorie-link transition-all duration-500 line-clamp-1">
              <RightOutlined className="text_ocean" /> {post?.title}
            </Link>
          </p>
        ))}
      </div>

      <div className="categories-blog py-8 pl-4 mt-16">
        <p className="text-3xl mb-4">Sản phẩm bán chạy</p>
        {listProduct?.map((product, index) => (
          <p className="my-4 hover:ml-2 transition-all duration-500" key={index}>
            <Link
              href={`/product-detail/${product?.id}`}
              as={`/product-detail/${product?.id}`}
              className="capitalize categorie-link transition-all duration-500 line-clamp-1 pr-2">
              <RightOutlined className="text_ocean" /> {product?.name}
            </Link>
          </p>
        ))}
      </div>
      <div className="w-full mt-12">
        <Link href={`/contact`}>
          <img src="/images/call-img-1.jpg" alt="alt" className="w-full" />
        </Link>
      </div>
    </div>
  )
}
