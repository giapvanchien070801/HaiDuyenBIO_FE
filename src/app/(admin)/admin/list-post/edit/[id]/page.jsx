"use client";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import CreateOrEditArticle from "@/components/admin/common/CreateOrEditArticle";

export default function EditPost({ params }) {
  const breadcrumb = [
    {
      href: "/admin/home",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/admin/list-post",
      title: (
        <>
          <span className="text-cyan-700">Các bài viết</span>
        </>
      ),
    },
    {
      href: "/admin/list-post/edit",
      title: (
        <>
          <span className="text-cyan-700">Chỉnh sửa bài viết</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <CreateOrEditArticle typePage="post" id={params?.id} />
    </div>
  );
}
