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
  Select,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

import {
  removeEmptyFields,
  useDebounce,
} from "../../../../common/functions/commonFunction";
import Product from "@/models/Product";
import CategoryProduct from "@/models/CategoryProduct";

export default function Services() {
  const router = useRouter();

  const handleGoCreateOrEdit = () => {
    router.push("/admin/service/create");
  };

  const [valueSearch, setValueSearch] = useState("");

  const __pagination = useRef({
    page: 1,
    size: 10,
    categoryId: -1,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page = pagination.current;
    __pagination.current.size = pagination.pageSize;
    refetch();
  };

  const searchDebounce = useDebounce(valueSearch, 1000);
  const {
    data: listProduct,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListServicePagination",
      searchDebounce,
      __pagination.current.page,
      __pagination.current.size,
    ],
    async () => {
      const params = {
        ...__pagination.current,
        page: __pagination.current.page - 1,
        search: searchDebounce,
        count: null,
      };

      const res = await Product.getProductList(removeEmptyFields(params));

      __pagination.current.count = res?.totalElements;

      return res?.content;
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
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "Price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <a>{text}</a>,
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
            onClick={() => router.push(`/admin/service/edit/${record?.id}`)}>
            Xem chi tiết/Sửa
          </Button>

          <Popconfirm
            title="Xóa Sản phẩm"
            description="Bạn có chắc chắn muốn xóa Sản phẩm này?"
            onConfirm={() => handleDelete(record?.id)}
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

  const deleteMutate = useMutation(Product.deleteProduct, {
    onSuccess: () => {
      message.success("Xóa Sản phẩm thành công!");

      refetch();
    },
    onError: (e) => {
      message.error("Xóa Sản phẩm thất bại!");
    },
  });

  const handleDelete = (productId) => {
    deleteMutate.mutate(productId);
  };

  const { data: listCategory } = useQuery(
    ["getListCategory-Service"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList(
        removeEmptyFields({
          Page: 1,
          Size: 1000,
          search: "",
        })
      );

      return res?.content?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    {
      enabled: true,
    }
  );

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />
      <div className="flex  items-center justify-between mb-5">
        <div className="flex gap-5 w-1/2">
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
            className="w-1/2"
            placeholder="Tìm kiếm"
          />

          <Select
            allowClear
            options={listCategory}
            onChange={(value) => {
              __pagination.current.categoryId = value;
              refetch();
            }}
            className="w-1/2"
            placeholder="Chọn danh mục"
          />
        </div>
        <Button
          icon={<PlusCircleOutlined />}
          size="middle"
          type="primary"
          className="float-right  bg-blue-700 text-white"
          onClick={() => handleGoCreateOrEdit()}>
          Thêm mới
        </Button>
      </div>

      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            size="small"
            dataSource={listProduct}
            pagination={{
              current: __pagination.current.page,
              pageSize: __pagination.current.size,
              total: __pagination.current.count,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100],
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
