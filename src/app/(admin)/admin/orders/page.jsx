"use client";
import {
  Breadcrumb,
  Button,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import { EyeOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import { useDebounce } from "../../../../common/functions/commonFunction";
import Order from "@/models/Order";
import ModalDetailsOrder from "@/components/admin/modals/ModalDetailsOrder";
import {
  LIST_STATUS_ORDER,
  ORDERS_STATUS_COLOR,
} from "@/common/constants/commonConstant";

export default function Categorys() {
  const router = useRouter();

  const [valueSearchCate, setValueSearchCate] = useState("");
  const [valueSearchPhone, setValueSearchPhone] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const searchDebounce = useDebounce(valueSearchCate, 1000);
  const searchDebouncePhone = useDebounce(valueSearchPhone, 1000);
  const {
    data: listCate,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListCategory",
      searchDebounce,
      __pagination.current.page_num,
      __pagination.current.page_size,
      searchDebouncePhone,
    ],
    async () => {
      const res = await Order.getOrderList({
        page: __pagination.current.page_num - 1,
        size: __pagination.current.page_size,
        search: searchDebounce,
        phone: searchDebouncePhone,
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
          <span className="text-cyan-700">Danh sách đơn hàng</span>
        </>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "Id",
      render: (value, item, index) => index,
      fixed: "left",
    },
    {
      title: "Tên Khách hàng",
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ghi chú",
      dataIndex: "additionalInformation",
      key: "additionalInformation",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Select value={text} defaultValue={"PENDING"}>
          {LIST_STATUS_ORDER.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              <Tag color={ORDERS_STATUS_COLOR[item.value]}>{item.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Button
          size="middle"
          type="default"
          icon={<EyeOutlined />}
          onClick={() => setIsModalOpen(true)}>
          Xem chi tiết
        </Button>
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
          setValueSearchCate(e.target.value);
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />

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
          setValueSearchPhone(e.target.value);
        }}
        className="w-1/3 mb-5 ml-5"
        placeholder="Nhập số điện thoại"
      />
      {/* <ModalCreateVideo modalType="create" refetchData={refetch} /> */}
      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            size="small"
            columns={columns}
            dataSource={listCate}
            onRow={(record) => {
              return {
                onClick: () => {
                  setItemSelected(record);
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

        {isModalOpen && (
          <ModalDetailsOrder
            dataOrder={itemSelected}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
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
