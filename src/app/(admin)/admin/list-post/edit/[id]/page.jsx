"use client";
import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import CreateOrEdit from "../../../../../../components/admin/common/CreateOrEdit";

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

      <CreateOrEdit typePage="post" id={params?.id} />
    </div>
  );
}
