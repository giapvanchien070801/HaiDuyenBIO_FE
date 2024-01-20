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
  notification,
} from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import { useDebounce } from "../../../../common/functions/commonFunction";

export default function CustomerContact() {
  const [valueSearchContact, setValueSearchContact] = useState("");
  const [idContactSelected, setIdContactSelected] = useState();

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

  const searchDebounce = useDebounce(valueSearchContact, 1000);
  const {
    data: listContact,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListContactgory",
      searchDebounce,
      tableParams.pagination.current,
      tableParams.pagination.pageSize,
    ],
    async () => {
      const res = await Base.getListContactPagination({
        Page: tableParams.pagination.current,
        Size: tableParams.pagination.pageSize,
        KeySearch: searchDebounce,
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
          <span className="text-cyan-700">Danh sách liên hệ</span>
        </>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const deleteContactMutate = useMutation(Base.deleteContact, {
    onSuccess: () => {
      message.success("Xóa liên hệ thành công!");
      setIdContactSelected();
      refetch();
    },
    onError: (e) => {
      if (e?.response?.data?.Message === "Can not delete this category") {
        // trường hợp liên hệ bài viết đã có bài viết

        api["error"]({
          message: "Không thể xóa liên hệ này",
          description: "Đã có bài viết thuộc liên hệ này. Không thể xóa!",
        });
      } else {
        message.error("Xóa liên hệ thất bại!");
      }
    },
  });

  const handleDeleteContact = (e) => {
    deleteContactMutate.mutate(idContactSelected);
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
      title: "Tên khách hàng",
      dataIndex: "Name",
      key: "Name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Triệu chứng",
      dataIndex: "Subject",
      key: "Subject",
    },
    {
      title: "Lời nhắn",
      dataIndex: "Message",
      key: "Message",
    },

    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa liên hệ"
            description="Bạn có chắc chắn muốn xóa liên hệ này?"
            onConfirm={handleDeleteContact}
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
      {contextHolder}
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
          setValueSearchContact(e.target.value);
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />

      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listContact}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIdContactSelected(record.Id);
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
