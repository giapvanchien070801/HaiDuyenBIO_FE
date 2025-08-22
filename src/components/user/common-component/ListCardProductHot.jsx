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
import { BEST_SELLING_PRODUCTS } from "@/utils/common-const"

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
    ["getListServicePaginationHot", __pagination.current.page, __pagination.current.size],
    async () => {
      const params = {
        ...__pagination.current,
        page: __pagination.current.page - 1,
        search: "",
        count: null,
        categoryId: BEST_SELLING_PRODUCTS
      }

      const res = await Product.getProductList(removeEmptyFields(params))

      __pagination.current.count = res?.totalElements

      return res?.content
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
      gcTime: 0,
      enabled: true
    }
  )

  return (
    <div className="container-original mx-auto p-4 md:p-0 my-8">
      <TitleList title="Sản phẩm bán chạy" />

      <Spin spinning={isFetching}>
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-15 w-full">
            {listProduct?.map(product => (
              <CardProduct key={product?.id} product={product} />
            ))}
          </div>
        </div>
      </Spin>
    </div>
  )
}
