"use client";
import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import CreateOrEdit from "@/app/(admin)/components/CreateOrEdit";

export default function CreateOrEditMainPage() {
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
      href: "/admin/list-main-page",
      title: (
        <>
          <span className="text-cyan-700">Các trang chính</span>
        </>
      ),
    },
    {
      href: "/admin/list-main-page",
      title: (
        <>
          <span className="text-cyan-700">Tạo mới</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <CreateOrEdit />
    </div>
  );
}
