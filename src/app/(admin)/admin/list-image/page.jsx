"use client";
import { Breadcrumb, Modal, Upload } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState } from "react";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import { handleSrcImg } from "../../common/functions/commonFunction";
import UploadListImage from "../../components/UploadListImage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function InternalFunction() {
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
          <span className="text-cyan-700">Danh sách ảnh</span>
        </>
      ),
    },
  ];

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <UploadListImage />
    </div>
  );
}
