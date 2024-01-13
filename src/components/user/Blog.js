"use client";

import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import {
  faAngleRight,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Comment from "./Comment";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import SidebarUser from "./SidebarUser";
import { Spin } from "antd";

export default async function Blog({ postId }) {
  const { data: dataPostDetail, isFetching } = useQuery(
    ["getDetailPost", postId],
    async () => {
      const res = await Base.getDetailPost(postId);

      return res;
    },
    { enabled: !!postId }
  );

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
    {
      href: ``,
      title: (
        <>
          <span className="text-[#2490eb]">{dataPostDetail?.Title}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <BannerBreadcrumb title={dataPostDetail?.Title} breadcrumb={breadCrum} />

      <div className="grid xl:grid-cols-10 gap-6 mt-12">
        <div className="col-span-7 bg-white">
          <Spin spinning={isFetching}>
            <div
              dangerouslySetInnerHTML={{ __html: dataPostDetail?.Content }}
              className="blog-content"
            />
          </Spin>

          <div className="write-comment mt-16">
            <p className="text-4xl font-medium mb-8">
              Để Lại Bình Luận Của Bạn
            </p>
            <form className="grid xl:grid-cols-3 xl:gap-4">
              <div className="col-span-1">
                <input
                  placeholder="Họ Và Tên"
                  className="w-full p-4 background-input-comment input-comment"
                />
              </div>

              <div className="col-span-1">
                <input
                  placeholder="Email"
                  className="w-full p-4 background-input-comment transition-all duration-500 input-comment"
                />
              </div>
              <div className="col-span-1">
                <input
                  placeholder="Số Điện Thoại"
                  className="w-full p-4 background-input-comment transition-all duration-500 input-comment"
                />
              </div>

              <div className="col-span-3">
                <textarea
                  className="input-comment w-full p-4 background-input-comment transition-all duration-500"
                  placeholder="Nội dung bình luận"
                  rows={10}
                />
              </div>

              <div className="col-span-1">
                <button className="session_ocean2 text-white py-4 px-8 text-medium font-bold transition-all duration-500 hover:bg-black">
                  Bình Luận
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </>
  );
}
