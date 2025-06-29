"use client";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import dynamic from "next/dynamic";
const CreateOrEdit = dynamic(
  () => import("@/components/admin/common/CreateOrEditArticle"),
  {
    ssr: false,
  }
);
export default function CreateOrEditListPost() {
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
          <span className="text-cyan-700">Danh sách nguyên liệu</span>
        </>
      ),
    },
    {
      href: "/admin/list-post/create",
      title: (
        <>
          <span className="text-cyan-700">Tạo mới nguyên liệu</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <CreateOrEdit typePage="post" actionType="create" />
    </div>
  );
}
