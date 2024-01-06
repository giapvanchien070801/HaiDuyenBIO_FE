"use client";
import { Breadcrumb, Button, Input, Space, Table, Tag } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import ModalCreateAccount from "../../components/ModalCreateAccount";

export default function AccountsAdmin() {
  const router = useRouter();
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
          <span className="text-cyan-700">Tài khoản quản trị</span>
        </>
      ),
    },
  ];

  const columns = [
    {
      title: "STT",
      key: "stt",
    },
    {
      title: "Id",
      dataIndex: "Tài khoản",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ và tên",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Tài khoản",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="middle"
            className="border-teal-500 text-teal-500"
            type="default"
            onClick={() => handleGoCreateOrEdit()}
          >
            Xem chi tiết/Sửa
          </Button>
          <Button size="middle" type="default" danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "4",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "5",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "7",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "8",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  const handleGoCreateOrEdit = () => {
    router.push("/admin/accounts-admin/create-edit");
  };

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />
      <Input
        allowClear
        prefix={
          <SearchOutlined
            style={{
              color: "gray",
            }}
          />
        }
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />
      <ModalCreateAccount />
      <CustomTable>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            ...tableParams.pagination,
            showSizeChanger: true, // Cho phép hiển thị Select chọn số lượng phần tử trên trang
            pageSizeOptions: tableParams.pageSizeOptions, // Sử dụng pageSizeOptions từ tableParams
          }}
          onChange={handleTableChange}
        />
      </CustomTable>
    </div>
  );
}

const CustomTable = styled.div`
  & .ant-table-wrapper .ant-table-thead > tr > th,
  :where(.css-dev-only-do-not-override-6j9yrn).ant-table-wrapper
    .ant-table-thead
    > tr
    > td {
    background: #cce3de;
  }
`;
