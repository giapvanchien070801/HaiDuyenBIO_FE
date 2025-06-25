"use client";

import { Button, Input, Pagination, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import CardProduct from "../common-component/CardProduct";
import { useQuery } from "react-query";
import { useRef, useState } from "react";
import {
  removeEmptyFields,
  useDebounce,
} from "@/common/functions/commonFunction";
import CategoryProduct from "@/models/CategoryProduct";
import Product from "@/models/Product";
import TitleList from "../common-component/TitleList";

export default function ListProduct() {
  const __pagination = useRef({
    page: 1,
    size: 10,
    categoryId: -1,
  });

  const [valueSearch, setValueSearch] = useState("");

  const searchDebounce = useDebounce(valueSearch, 1000);

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page = pagination.current;
    __pagination.current.size = pagination.pageSize;
    refetch();
  };

  const {
    data: listProduct,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListProductPagination",
      searchDebounce,
      __pagination.current.page,
      __pagination.current.size,
    ],
    async () => {
      const params = {
        ...__pagination.current,
        page: __pagination.current.page - 1,
        search: searchDebounce,
        count: null,
      };

      const res = await Product.getProductList(removeEmptyFields(params));

      __pagination.current.count = res?.totalElements;

      return res?.content;
    },
    {
      enabled: true,
    }
  );

  const { data: listCategory } = useQuery(
    ["getListCategory-Product"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList(
        removeEmptyFields({
          Page: 1,
          Size: 1000,
          search: "",
        })
      );

      return res?.content?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    {
      enabled: true,
    }
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TitleList title="Danh sách sản phẩm" />
      <div className="flex gap-5 w-1/2 mb-5">
        <Input
          allowClear
          prefix={
            <SearchOutlined
              style={{
                color: "gray",
              }}
            />
          }
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          className="w-1/2"
          placeholder="Tìm kiếm"
        />

        <Select
          allowClear
          options={listCategory}
          onChange={(value) => {
            __pagination.current.categoryId = value;
            refetch();
          }}
          className="w-1/2"
          placeholder="Chọn danh mục"
        />
      </div>
      <Spin spinning={isFetching}>
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {listProduct?.map((product) => (
              <CardProduct key={product?.id} product={product} />
            ))}
          </div>
          <Pagination
            current={__pagination.current.page}
            total={__pagination.current.count}
            pageSize={__pagination.current.size}
            onChange={handleTableChange}
          />
        </div>
      </Spin>
    </div>
  );
}
