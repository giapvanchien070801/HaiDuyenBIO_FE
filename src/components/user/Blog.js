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

export default async function Blog({ postId }) {
  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateMenu"],
    async () => {
      const res = await Base.getAllCategory();
      return res;
    },
    {}
  );
  const { data: dataPostDetail } = useQuery(
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
        <div className="content-blog col-span-7 bg-white">
          <div dangerouslySetInnerHTML={{ __html: dataPostDetail?.Content }} />
          {/* <Suspense fallback={<div>Đang tải bình luận ...</div>}>
            <Comment />
          </Suspense> */}

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

        <div className="another col-span-3 ">
          <div className="categories-blog py-8 pl-4">
            <p className="text-3xl mb-4">Thể Loại</p>
            {listCategory?.length &&
              listCategory?.map((category, index) => (
                <p className="my-4" key={index}>
                  <Link
                    href={`/blog/${category?.Id}`}
                    as={`/blog/${category?.Id}`}
                    className="capitalize categorie-link transition-all duration-500"
                  >
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="text_ocean"
                    />{" "}
                    {category?.Name}
                  </Link>
                </p>
              ))}
          </div>

          <div className="categories-blog py-8 pl-4 mt-16">
            <p className="text-3xl mb-4">Dịch Vụ</p>
          </div>
        </div>
      </div>
    </>
  );
}
