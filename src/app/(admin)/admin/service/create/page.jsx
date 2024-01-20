"use client";
import { Breadcrumb } from "antd";
import {
  HomeOutlined,
} from "@ant-design/icons";

import dynamic from "next/dynamic";
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
          <span className="text-cyan-700">Danh sách Dịch vụ</span>
        </>
      ),
    },
    {
      href: "",
      title: (
        <>
          <span className="text-cyan-700">Tạo mới Dịch vụ</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <CreateOrEdit typePage="service" actionType="create" />
    </div>
  );
}
