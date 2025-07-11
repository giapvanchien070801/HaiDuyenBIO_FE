"use client"
import { Breadcrumb, Button, Input, Popconfirm, Space, Spin, Table, message, notification } from "antd"
import { HomeOutlined, SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "react-query"
import Base from "@/models/Base"
import { useDebounce } from "../../../../common/functions/commonFunction"
import ModalCreateDoctor from "../../../../components/admin/modals/ModalCreateDoctor"

export default function ListEmployee() {
  const router = useRouter()

  const [valueSearchDoctor, setValueSearchDoctor] = useState("")
  const [idDoctorSelected, setIdDoctorSelected] = useState()

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 20
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

  const searchDebounce = useDebounce(valueSearchDoctor, 1000)
  const {
    data: listDoctor,
    refetch,
    isFetching
  } = useQuery(
    ["getListDoctorAdmin", searchDebounce, tableParams.pagination.current, tableParams.pagination.pageSize],
    async () => {
      const res = await Base.getListDoctorPagination({
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
          <span className="text-cyan-700">Danh sách nhân sự</span>
        </>
      )
    }
  ]

  const [api, contextHolder] = notification.useNotification()

  const deleteDoctorMutate = useMutation(Base.deleteDoctor, {
    onSuccess: () => {
      message.success("Xóa nhân sự thành công!")
      setIdDoctorSelected()
      refetch()
    },
    onError: e => {
      if (e?.response?.data?.Message === "Can not delete this category") {
        // trường hợp nhân sự bài viết đã có bài viết

        api["error"]({
          message: "Không thể xóa nhân sự này",
          description: "Đã có bài viết thuộc nhân sự này. Không thể xóa!"
        })
      } else {
        message.error("Xóa nhân sự thất bại!")
      }
    }
  })

  const handleDeleteDoctor = e => {
    deleteDoctorMutate.mutate(idDoctorSelected)
  }

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "Id",
      render: (value, item, index) => index,
      fixed: "left"
    },
    {
      title: "Tên nhân sự",
      dataIndex: "Name",
      key: "Name",
      render: text => <a>{text}</a>
    },
    {
      title: "Chức danh",
      dataIndex: "Position",
      key: "Position"
    },

    {
      title: "Ngày bắt đầu làm việc",
      dataIndex: "StartWorkDate",
      key: "StartWorkDate"
    },
    {
      title: "Ngày nghỉ",
      dataIndex: "EndWorkDate",
      key: "EndWorkDate"
    },
    {
      title: "Người tạo",
      key: "CreatedBy",
      dataIndex: "CreatedBy"
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ModalCreateDoctor modalType="edit" idDoctor={idDoctorSelected} refetchData={refetch} />
          <Popconfirm
            title="Xóa nhân sự"
            description="Bạn có chắc chắn muốn xóa nhân sự này?"
            onConfirm={handleDeleteDoctor}
            okText="Xóa"
            cancelText="Hủy">
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div>
      {contextHolder}
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
          setValueSearchDoctor(e.target.value)
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />
      <ModalCreateDoctor modalType="create" refetchData={refetch} />
      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            columns={columns}
            dataSource={listDoctor}
            onRow={record => {
              return {
                onClick: () => {
                  setIdDoctorSelected(record.Id)
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
