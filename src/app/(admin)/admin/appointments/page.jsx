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
import Base from "@/app/models/Base";
import { useDebounce } from "../../common/functions/commonFunction";

export default function Appointments() {
  const [valueSearchCate, setValueSearchCate] = useState("");
  const [idCateSelected, setIdCateSelected] = useState();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 200,
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
    data: listSchedule,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListSchedulePagination",
      searchDebounce,
      tableParams.pagination.current,
      tableParams.pagination.pageSize,
    ],
    async () => {
      const res = await Base.getListSchedulePagination({
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
          <span className="text-cyan-700">Danh sách lịch hẹn khám</span>
        </>
      ),
    },
  ];

  const deleteScheduleMutate = useMutation(Base.deleteSchedule, {
    onSuccess: () => {
      message.success("Xóa lịch hẹn thành công!");
      setIdCateSelected();
      refetch();
    },
    onError: (e) => {
      message.error("Xóa lịch hẹn thất bại!");
    },
  });

  const handleDeleteSchedule = (e) => {
    deleteScheduleMutate.mutate(idCateSelected);
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "Id",
      render: (value, item, index) => index,
      fixed: "left",
      width: 50,
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      key: "FullName",
      render: (text) => <a>{text}</a>,
      width: 100,
    },

    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: 150,
    },
    {
      title: "Số điện thoại",
      key: "PhoneNumber",
      dataIndex: "PhoneNumber",
      width: 100,
    },
    {
      title: "Hẹn gặp với Bác sĩ",
      key: "DoctorName",
      dataIndex: "DoctorName",
      width: 150,
    },
    {
      title: "Ngày hẹn gặp",
      key: "MeetDate",
      dataIndex: "MeetDate",
      width: 100,
    },
    {
      title: "Thời gian hẹn gặp",
      key: "MeetTime",
      dataIndex: "MeetTime",
      width: 100,
    },
    {
      title: "Ghi chú",
      key: "Note",
      dataIndex: "Note",
      width: 150,
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa lịch hẹn"
            description="Bạn có chắc chắn muốn xóa lịch hẹn này?"
            onConfirm={handleDeleteSchedule}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 50,
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

      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listSchedule}
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
