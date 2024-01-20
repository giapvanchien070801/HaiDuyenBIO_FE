"use client";
import Blog from "@/components/user/Blog";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { handleSrcImg } from "@/common/functions/commonFunction";
import { useQuery } from "react-query";
import Base from "@/models/Base";

import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import CardLatestBlog from "@/components/user/CardLatestBlog";
import SidebarUser from "@/components/user/SidebarUser";
import { Pagination, Spin } from "antd";

import SearchCommon from "@/components/user/SearchCommon";

export default async function ListPage({ params }) {
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 5,
  });
  const [valueSearch, setValueSearch] = useState("");

  const breadCrum = [
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
      href: `/blog`,
      title: (
        <>
          <span className="text-[#2490eb]">Danh sách bài viết</span>
        </>
      ),
    },
  ];

  const {
    data: listPost,
    refetch,
    isFetching,
  } = useQuery(["getListPostPaginationUser", pagination?.current], async () => {
    const res = await Base.getListPostPagination({
      Page: pagination.current,
      Size: 5,
      KeySearch: valueSearch,
      CategoryId: params?.categoryId,
    });

    if (res.TotalRecord) {
      setPagination({
        ...pagination,
        total: res.TotalRecord,
      });
    }

    return res?.Data;
  });

  useEffect(() => {
    refetch();
  }, [valueSearch]);

  return (
    <div className=" pb-24">
      <BannerBreadcrumb title="Danh sách bài viết" breadcrumb={breadCrum} />
      <Spin spinning={isFetching}>
        <div className="grid xl:grid-cols-10 gap-6 container-original mx-auto mt-20">
          <div className=" col-span-7 flex flex-col items-center">
            <div className=" flex gap-4 flex-wrap justify-center md:p-0 p-4 w-full">
              {listPost?.map((post, index) => (
                <CardLatestBlog
                  key={index}
                  isListPage
                  title={post?.Title}
                  description={post?.Description}
                  time={post?.CreatedAt}
                  avatar={handleSrcImg(post?.ImagePath)}
                  createBy={post?.AuthorName}
                  comment="1"
                  id={post?.Id}
                  categoryId={post?.CategoryId}
                />
              ))}
            </div>
            <Pagination
              onChange={(value) => {
                setPagination({
                  current: value,
                  total: pagination.total,
                  pageSize: pagination.pageSize,
                });
              }}
              {...pagination}
            />
          </div>
          <div className="col-span-3 lg:block hidden">
            {/* search */}
            <SearchCommon
              onChange={(value) => {
                setValueSearch(value);
              }}
            />
            <SidebarUser />
          </div>
        </div>
      </Spin>
    </div>
  );
}
