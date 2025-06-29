"use client";

import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import SidebarUser from "@/components/user/common-component/SidebarUser";
import { Breadcrumb, Input, Pagination, Select, Spin } from "antd";

import CardPNews from "@/components/user/common-component/CardPNews";
import { useQuery } from "react-query";
import { useDebounce } from "@/common/functions/commonFunction";
import { useRef, useState } from "react";
import CategoryProduct from "@/models/CategoryProduct";
import ArticleModal from "@/models/ArticleModal";

export default function NewsPage() {
  const [valueSearch, setValueSearch] = useState("");
  const [valueSearchCate, setValueSearchCate] = useState("");

  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0,
  });

  const searchDebounce = useDebounce(valueSearch, 1000);
  const {
    data: listPost,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListPostPagination",
      searchDebounce,
      __pagination.current.page_num,
      __pagination.current.page_size,
      valueSearchCate,
    ],
    async () => {
      const res = await ArticleModal.getArticleList({
        page: __pagination.current.page_num - 1,
        size: __pagination.current.page_size,
        search: searchDebounce,
        categoryId: valueSearchCate,
      });

      __pagination.current.count = res.totalElements;

      return res?.content;
    },
    {
      enabled: true,
    }
  );

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearch"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 1000,
        search: "",
        type: "ARTICLE",
      });

      const dataConvert = res?.content?.map((category) => {
        return { label: category?.name, value: category?.id };
      });
      return dataConvert;
    },
    {}
  );

  const handleTableChange = (page, pageSize) => {
    __pagination.current.page_num = page;
    __pagination.current.page_size = pageSize;
    refetch();
  };

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Tin tức</span>
        </>
      ),
    },
  ];

  return (
    <div className="pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-16 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />
          {/* <Input
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
            className="w-1/3 mb-5"
            placeholder="Tìm kiếm theo tiêu đề"
          />
          <Select
            allowClear
            className="w-1/3 mb-5 ml-5"
            showSearch
            placeholder="Tìm kiếm theo danh mục"
            optionFilterProp="children"
            onChange={(value) => {
              setValueSearchCate(value);
              refetch();
            }}
            options={listCategory}
          /> */}
          <Spin spinning={isFetching}>
            <div className="grid grid-cols-1  gap-6 ">
              {listPost?.map((item) => (
                <CardPNews key={item.id} dataNews={item} />
              ))}
            </div>
            <div className="flex justify-center my-4">
              <Pagination
                current={__pagination.current.page}
                total={__pagination.current.count}
                pageSize={__pagination.current.size}
                onChange={handleTableChange}
              />
            </div>
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  );
}
