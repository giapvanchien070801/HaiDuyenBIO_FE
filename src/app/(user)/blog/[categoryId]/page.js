"use client";
import Blog from "@/components/user/Blog";
import { HomeOutlined } from "@ant-design/icons";
import { Suspense } from "react";
import Loading from "../../loading";
import {
  handleSrcImg,
  useDebounce,
} from "@/app/(admin)/common/functions/commonFunction";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import Link from "next/link";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import CardLatestBlog from "@/components/user/CardLatestBlog";
import SidebarUser from "@/components/user/SidebarUser";

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
    <div className=" pb-24">
      <BannerBreadcrumb title="Danh sách bài viết" breadcrumb={breadCrum} />

      <div className="grid xl:grid-cols-10 gap-6 container-original mx-auto mt-20">
        <div className=" col-span-7 flex gap-4 flex-wrap justify-around ">
          {listPost?.length &&
            listPost?.map((post, index) => (
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

        <SidebarUser />
      </div>
    </div>
  );
}
