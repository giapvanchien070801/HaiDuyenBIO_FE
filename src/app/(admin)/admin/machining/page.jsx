"use client"
import { Breadcrumb, Button, Input, Popconfirm, Space, Spin, Table, message, notification } from "antd"
import { HomeOutlined, SearchOutlined } from "@ant-design/icons"
import { useState } from "react"
import styled from "@emotion/styled"
import { useMutation, useQuery } from "react-query"
import Base from "@/models/Base"
import { useDebounce } from "../../../../common/functions/commonFunction"

export default function Appointments() {
  const [valueSearchCate, setValueSearchCate] = useState("")
  const [idCateSelected, setIdCateSelected] = useState()

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 200
    }
  })

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  }

  const searchDebounce = useDebounce(valueSearchCate, 1000)
  const {
    data: listSchedule,
    refetch,
    isFetching
  } = useQuery(
    ["getListSchedulePagination", searchDebounce, tableParams.pagination.current, tableParams.pagination.pageSize],
    async () => {
      const res = await Base.getListSchedulePagination({
        Page: tableParams.pagination.current,
        Size: tableParams.pagination.pageSize,
        KeySearch: searchDebounce
      })

      if (res.TotalRecord) {
        setTableParams({
          pagination: {
            current: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
            total: res.TotalRecord
          }
        })
      }

      return res?.Data
    },
    {
      enabled: false
    }
  )

  const breadcrumb = [
    {
      href: "/admin/home",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      )
    },
    {
      href: "",
      title: (
        <>
          <span className="text-cyan-700">Danh sách gia công vi sinh</span>
        </>
      )
    }
  ]

  const deleteScheduleMutate = useMutation(Base.deleteSchedule, {
    onSuccess: () => {
      message.success("Xóa gia công vi sinh thành công!")
      setIdCateSelected()
      refetch()
    },
    onError: e => {
      message.error("Xóa gia công vi sinh thất bại!")
    }
  })

  const handleDeleteSchedule = e => {
    deleteScheduleMutate.mutate(idCateSelected)
  }

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (value, item, index) => index,
      fixed: "left"
    },
    {
      title: "Tiêu đề",
      dataIndex: "Title",
      key: "Title",
      render: text => <a>{text}</a>,
      width: 200
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      width: 300
    },
    {
      title: "Danh mục",
      dataIndex: "CategoryName",
      key: "CategoryName"
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
      key: "CreatedAt"
    },
    {
      title: "Người tạo",
      key: "AuthorName",
      dataIndex: "AuthorName"
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button size="middle" className="border-teal-500 text-teal-500" type="default">
            Xem chi tiết/Sửa
          </Button>

          <Popconfirm
            title="Xóa vài viết"
            description="Bạn có chắc chắn muốn xóa bài viết này?"
            okText="Xóa"
            cancelText="Hủy">
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 200
    }
  ]

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <Input
        allowClear
        prefix={
          <SearchOutlined
            style={{
              color: "gray"
            }}
          />
        }
        onChange={e => {
          setValueSearchCate(e.target.value)
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />

      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listSchedule}
            onRow={record => {
              return {
                onClick: () => {
                  setIdCateSelected(record.Id)
                }
              }
            }}
            pagination={{
              ...tableParams.pagination,
              showSizeChanger: true, // Cho phép hiển thị Select chọn số lượng phần tử trên trang
              pageSizeOptions: tableParams.pageSizeOptions // Sử dụng pageSizeOptions từ tableParams
            }}
            onChange={handleTableChange}
          />
        </CustomTable>
      </Spin>
    </div>
  )
}

const CustomTable = styled.div`
  & .ant-table-wrapper .ant-table-thead > tr > th,
  :where(.css-dev-only-do-not-override-6j9yrn).ant-table-wrapper .ant-table-thead > tr > td {
    background: #cce3de;
  }
`
