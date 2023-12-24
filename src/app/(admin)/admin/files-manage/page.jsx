"use client";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function FileManage() {
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
      href: "",
      title: (
        <>
          <span className="text-cyan-700">Upload - Download Files</span>
        </>
      ),
    },
  ];
  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />
      FileManage
    </div>
  );
}
