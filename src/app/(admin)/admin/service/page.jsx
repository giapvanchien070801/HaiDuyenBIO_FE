"use client";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Space,
  Popconfirm,
  Spin,
  message,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import { useDebounce } from "../../../../common/functions/commonFunction";
import Product from "@/models/Product";

export default function Services() {
  const router = useRouter();

  const handleGoCreateOrEdit = () => {
    router.push("/admin/service/create");
  };

  const [valueSearch, setValueSearch] = useState("");
  const [idSelected, setIdSelected] = useState();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 20,
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

  const searchDebounce = useDebounce(valueSearch, 1000);
  const {
    data: listService,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListServicePagination",
      searchDebounce,
      tableParams.pagination.current,
      tableParams.pagination.pageSize,
    ],
    async () => {
      const res = await Product.getProductList({
        page: tableParams.pagination.current,
        size: tableParams.pagination.pageSize,
        search: searchDebounce,
        categoryId: -1,
      });

      if (res.TotalRecord) {
        setTableParams({
          pagination: {
            current: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
            total: res.TotalRecord,
          },
        });
      }

      return res?.Data;
    },
    {
      enabled: true,
    }
  );

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
          <span className="text-cyan-700">Danh sách Sản phẩm</span>
        </>
      ),
    },
  ];

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (value, item, index) => index,
    },
    {
      title: "Tên Sản phẩm",
      dataIndex: "Name",
      key: "Name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
    },
    {
      title: "Người tạo",
      key: "CreatedBy",
      dataIndex: "CreatedBy",
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
            onClick={() => router.push(`/admin/service/edit/${record?.Id}`)}>
            Xem chi tiết/Sửa
          </Button>

          <Popconfirm
            title="Xóa Sản phẩm"
            description="Bạn có chắc chắn muốn xóa Sản phẩm này?"
            onConfirm={handleDelete}
            okText="Xóa"
            cancelText="Hủy">
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteMutate = useMutation(Base.deleteService, {
    onSuccess: () => {
      message.success("Xóa Sản phẩm thành công!");
      setIdSelected();
      refetch();
    },
    onError: (e) => {
      message.error("Xóa Sản phẩm thất bại!");
    },
  });

  const handleDelete = (e) => {
    deleteMutate.mutate(idSelected);
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
        onChange={(e) => {
          setValueSearch(e.target.value);
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />
      <Button
        icon={<PlusCircleOutlined />}
        size="middle"
        type="primary"
        className="float-right  bg-blue-700 text-white"
        onClick={() => handleGoCreateOrEdit()}>
        Thêm mới
      </Button>
      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listService}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIdSelected(record.Id);
                },
              };
            }}
            pagination={{
              ...tableParams.pagination,
              showSizeChanger: true, // Cho phép hiển thị Select chọn số lượng phần tử trên trang
              pageSizeOptions: tableParams.pageSizeOptions, // Sử dụng pageSizeOptions từ tableParams
            }}
            onChange={handleTableChange}
          />
        </CustomTable>
      </Spin>
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
