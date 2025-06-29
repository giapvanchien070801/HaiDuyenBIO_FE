"use client";
import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import CreateOrEdit from "../../../../../../components/admin/common/CreateOrEditArticle";
import CreateOrEditService from "../../components/CreateOrEditService";

export default function EditDepartment({ params }) {
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
      href: "/admin/service/create",
      title: (
        <>
          <span className="text-cyan-700">Chỉnh sửa Sản phẩm</span>
        </>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <CreateOrEditService actionType="edit" id={params?.id} />
    </div>
  );
}
