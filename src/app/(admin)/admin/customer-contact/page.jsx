"use client";
import {
  Breadcrumb,
  Button,
  Input,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import {
  DeleteOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import {
  removeEmptyFields,
  useDebounce,
} from "../../../../common/functions/commonFunction";
import Contact from "@/models/Contact";
import {
  CUSTOMER_CONTACT_STATUS_COLOR,
  LIST_STATUS_CUSTOMER_CONTACT,
} from "@/common/constants/commonConstant";

export default function CustomerContact() {
  const [valueSearchContact, setValueSearchContact] = useState("");
  const [idContactSelected, setIdContactSelected] = useState();

  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page_num = pagination.current;
    __pagination.current.page_size = pagination.pageSize;
    refetch();
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
      __pagination.current.page_num,
      __pagination.current.page_size,
    ],
    async () => {
      const res = await Contact.getContactList(
        removeEmptyFields({
          page: __pagination.current.page_num - 1,
          size: __pagination.current.page_size,
          search: searchDebounce,
        })
      );

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
          <span className="text-cyan-700">Danh sách liên hệ</span>
        </>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const deleteContactMutate = useMutation(Contact.deleteContact, {
    onSuccess: () => {
      message.success("Xóa liên hệ thành công!");

      refetch();
    },
    onError: (e) => {
      message.error("Xóa liên hệ thất bại!");
    },
  });

  const handleDeleteContact = (id) => {
    deleteContactMutate.mutate(id);
  };

  const updateStatusMutate = useMutation(
    (data) => Contact.updateStatusContact(data.idContact, data.newStatus),
    {
      onSuccess: () => {
        message.success("Cập nhật trạng thái liên hệ thành công!");

        refetch();
      },
      onError: (e) => {
        message.error("Cập nhật trạng thái liên hệ thất bại!");
      },
    }
  );

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
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Lời nhắn",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          defaultValue={"PENDING"}
          onChange={(value) => {
            const data = {
              idContact: record.id,
              newStatus: value,
            };
            updateStatusMutate.mutate(data);
          }}>
          {LIST_STATUS_CUSTOMER_CONTACT.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              <Tag color={CUSTOMER_CONTACT_STATUS_COLOR[item.value]}>
                {item.label}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Xóa liên hệ"
          description="Bạn có chắc chắn muốn xóa liên hệ này?"
          onConfirm={() => handleDeleteContact(record.id)}
          okText="Có"
          cancelText="Không">
          <Button size="small" type="default" icon={<DeleteOutlined />} danger>
            Xóa liên hệ
          </Button>
        </Popconfirm>
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
            size="small"
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
