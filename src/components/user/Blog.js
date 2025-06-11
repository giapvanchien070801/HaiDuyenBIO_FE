"use client";

import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import SidebarUser from "./common-component/SidebarUser";
import { Spin } from "antd";
import CardLatestBlog from "./CardLatestBlog";
import { handleSrcImg } from "@/common/functions/commonFunction";

export default async function Blog({ postId, categoryId }) {
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
  const { data: listPost } = useQuery(["getListPostNewlistSame"], async () => {
    const res = await Base.getListPostPagination({
      Page: 1,
      Size: 6,
      KeySearch: "",
      CategoryId: categoryId,
    });

    return res?.Data;
  });

  return (
    <>
      <BannerBreadcrumb title={dataPostDetail?.Title} breadcrumb={breadCrum} />

      <div className="container-original mx-auto pb-24 grid xl:grid-cols-10 gap-6 mt-12">
        <div className="col-span-7 bg-white md:p-0 p-4">
          <Spin spinning={isFetching}>
            <div
              dangerouslySetInnerHTML={{ __html: dataPostDetail?.Content }}
              className="blog-content"
            />
          </Spin>

          <div className="write-comment mt-16">
            <p className="text-4xl font-medium mb-8">Các bài viết liên quan</p>
            <div className=" sm:flex block gap-4 flex-wrap sm:px-0 px-4 justify-center">
              {listPost?.map((post, index) => (
                <CardLatestBlog
                  isListPage
                  key={index}
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
          </div>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </>
  );
}
