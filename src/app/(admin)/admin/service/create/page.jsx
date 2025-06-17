"use client";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

// Dynamic import cho CreateOrEditService
const CreateOrEditService = dynamic(
  () => import("../components/CreateOrEditService"),
  {
    ssr: false,
    loading: () => <div>Đang tải...</div>,
  }
);

const CreateOrEdit = dynamic(
  () => import("@/components/admin/common/CreateOrEdit"),
  {
    ssr: false,
  }
);

export default function CreateDepartment() {
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
      href: "/admin/service",
      title: (
        <>
          <span className="text-cyan-700">Danh sách Sản phẩm</span>
        </>
      ),
    },
    {
      href: "",
      title: (
        <>
          <span className="text-cyan-700">Tạo mới Sản phẩm</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />
      <CreateOrEditService actionType="create" />
    </div>
  );
}
