"use client";
import Blog from "@/components/user/Blog";
import { HomeOutlined } from "@ant-design/icons";
import { Suspense } from "react";
import Loading from "../../loading";
import { useDebounce } from "@/app/(admin)/common/functions/commonFunction";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import Link from "next/link";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";

export default async function ListPage({ params }) {
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
  // const searchDebounce = useDebounce(valueSearch, 1000);
  const {
    data: listPost,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListPostPaginationUser",
      // searchDebounce,
      // tableParams.pagination.current,
      // tableParams.pagination.pageSize,
      // valueSearchCate,
    ],
    async () => {
      const res = await Base.getListPostPagination({
        Page: 1,
        Size: 10,
        KeySearch: "",
        CategoryId: params?.categoryId,
      });

      // if (res.TotalRecord) {
      //   setTableParams({
      //     pagination: {
      //       current: tableParams.pagination.current,
      //       pageSize: tableParams.pagination.pageSize,
      //       total: res.TotalRecord,
      //     },
      //   });
      // }

      return res?.Data;
    }
  );

  return (
    <div className="container mx-auto pb-24">
      <BannerBreadcrumb title="Danh sách bài viết" breadcrumb={breadCrum} />

      <h1>Danh sách bài viết</h1>
      {listPost?.length &&
        listPost?.map((post, index) => (
          <div key={index}>
            <Link
              href={`/blog/${params?.categoryId}/${post?.Id}`}
              as={`/blog/${params?.categoryId}/${post?.Id}`}
              className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
            >
              {post?.Title}
            </Link>
          </div>
        ))}
    </div>
  );
}
