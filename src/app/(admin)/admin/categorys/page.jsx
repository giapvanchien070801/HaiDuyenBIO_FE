"use client";
import {
  Breadcrumb,
  Button,
  Input,
  Popconfirm,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import Base from "@/app/models/Base";
import ModalCreateCategory from "../../components/ModalCreateCategory";
import { useDebounce } from "../../common/functions/commonFunction";

export default function Categorys() {
  const router = useRouter();

  const handleGoCreateOrEdit = () => {
    router.push("/admin/list-main-categorys/create-edit");
  };

  const [valueSearchCate, setValueSearchCate] = useState("");
  const [idCateSelected, setIdCateSelected] = useState();

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

  const searchDebounce = useDebounce(valueSearchCate, 1000);
  const {
    data: listCate,
    refetch,
    isFetching,
  } = useQuery(
    ["getListCategory", searchDebounce, tableParams.pagination.current],
    async () => {
      const res = await Base.getListCatePagination({
        Page: tableParams.pagination.current,
        Size: 5,
        KeySearch: searchDebounce,
      });

      if (res.TotalRecord) {
        setTableParams({
          pagination: {
            current: tableParams.pagination.current,
            pageSize: 5,
            total: res.TotalRecord,
          },
        });
      }

      return res?.Data;
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
          <span className="text-cyan-700">Danh mục bài viết</span>
        </>
      ),
    },
  ];

  const deleteCateMutate = useMutation(Base.deleteCategory, {
    onSuccess: () => {
      message.success("Xóa thể loại thành công!");
      setIdCateSelected();
      refetch();
    },
    onError: (e) => {
      message.error("Xóa thể loại thất bại!");
    },
  });

  const handleDeleteCate = (e) => {
    deleteCateMutate.mutate(idCateSelected);
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "Id",
      render: (value, item, index) => index,
      fixed: "left",
    },
    {
      title: "Tiêu đề",
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
          <ModalCreateCategory
            modalType="edit"
            idCategory={idCateSelected}
            refetchData={refetch}
          />
          <Popconfirm
            title="Xóa thể loại"
            description="Bạn có chắc chắn muốn xóa thể loại này?"
            onConfirm={handleDeleteCate}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
          setValueSearchCate(e.target.value);
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />
      <ModalCreateCategory modalType="create" refetchData={refetch} />
      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listCate}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIdCateSelected(record.Id);
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
