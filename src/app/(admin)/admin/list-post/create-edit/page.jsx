"use client";
import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import CreateOrEdit from "../../../components/CreateOrEdit";

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
          <span className="text-cyan-700">Các bài viết</span>
        </>
      ),
    },
    {
      href: "/admin/list-post/create-edit",
      title: (
        <>
          <span className="text-cyan-700">Tạo mới bài viết</span>
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
