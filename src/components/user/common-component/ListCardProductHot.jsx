"use client"

import { Button, Input, Pagination, Select, Spin } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import TitleList from "./TitleList"
import CardProduct from "./CardProduct"
import { useQuery } from "react-query"
import { useRef, useState } from "react"
import { removeEmptyFields, useDebounce } from "@/common/functions/commonFunction"
import CategoryProduct from "@/models/CategoryProduct"
import Product from "@/models/Product"

export default function ListCardProductHot() {
  const __pagination = useRef({
    page: 1,
    size: 10,
    categoryId: -1
  })

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page = pagination.current
    __pagination.current.size = pagination.pageSize
    refetch()
  }

  const {
    data: listProduct,
    refetch,
    isFetching
  } = useQuery(
    ["getListServicePagination", __pagination.current.page, __pagination.current.size],
    async () => {
      const params = {
        ...__pagination.current,
        page: __pagination.current.page - 1,
        search: "",
        count: null
      }

      const res = await Product.getProductList(removeEmptyFields(params))

      __pagination.current.count = res?.totalElements

      return res?.content
    },
    {
      enabled: true
    }
  )

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TitleList title="Sản phẩm bán chạy" />

      <Spin spinning={isFetching}>
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {listProduct?.map(product => (
              <CardProduct key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </Spin>
    </div>
  )
}
