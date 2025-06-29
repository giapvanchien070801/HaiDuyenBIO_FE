"use client";
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Space,
  Spin,
  Popconfirm,
  Select,
  message,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "../../../../common/functions/commonFunction";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import ArticleModal from "@/models/ArticleModal";

export default function ListPost() {
  const router = useRouter();

  const [valueSearch, setValueSearch] = useState("");
  const [valueSearchCate, setValueSearchCate] = useState(-1);
  const [idSelected, setIdSelected] = useState();

  const __pagination = useRef({
    page_num: 1,
    page_size: 5,
    count: 0,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page_num = pagination.current;
    __pagination.current.page_size = pagination.pageSize;
    refetch();
  };

  const searchDebounce = useDebounce(valueSearch, 1000);
  const {
    data: listPost,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListPostPagination",
      searchDebounce,
      __pagination.current.page_num,
      __pagination.current.page_size,
    ],
    async () => {
      const res = await ArticleModal.getArticleList({
        Page: __pagination.current.page_num - 1,
        Size: __pagination.current.page_size,
        search: searchDebounce,
        categoryId: valueSearchCate,
      });

      __pagination.current.count = res.totalElements;

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
          <span className="text-cyan-700">Danh sách bài viết</span>
        </>
      ),
    },
  ];

  const handleGoCreateOrEdit = () => {
    router.push("/admin/list-post/create");
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (value, item, index) => index,
      fixed: "left",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      width: 300,
    },
    {
      title: "Danh mục",
      dataIndex: "CategoryName",
      key: "CategoryName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
    },
    {
      title: "Người tạo",
      key: "AuthorName",
      dataIndex: "AuthorName",
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
            onClick={() => router.push(`/admin/list-post/edit/${record?.Id}`)}>
            Xem chi tiết/Sửa
          </Button>

          <Popconfirm
            title="Xóa vài viết"
            description="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={handleDelete}
            okText="Xóa"
            cancelText="Hủy">
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 200,
    },
  ];

  const deleteMutate = useMutation(Base.deletePost, {
    onSuccess: () => {
      message.success("Xóa bài viết thành công!");
      setIdSelected();
      refetch();
    },
    onError: (e) => {
      message.error("Xóa bài viết thất bại!");
    },
  });

  const handleDelete = (e) => {
    deleteMutate.mutate(idSelected);
  };

  const onChangeSelect = (value) => {
    setValueSearchCate(value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearch"],
    async () => {
      const res = await Base.getAllCategory();

      const dataConver = res?.map((category) => {
        return { label: category?.Name, value: category?.Id };
      });
      return dataConver;
    },
    {}
  );

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
        placeholder="Tìm kiếm theo tiêu đề"
      />
      <Select
        className="w-1/3 mb-5 ml-5"
        showSearch
        placeholder="Tìm kiếm theo danh mục"
        optionFilterProp="children"
        onChange={onChangeSelect}
        filterOption={filterOption}
        options={listCategory}
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
            dataSource={listPost}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIdSelected(record.Id);
                },
              };
            }}
            pagination={{
              current: __pagination.current.page_num,
              pageSize: __pagination.current.page_size,
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
