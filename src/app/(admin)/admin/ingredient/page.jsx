"use client"
import { Breadcrumb, Button, Input, Table, Space, Spin, Popconfirm, Select, message } from "antd"
import { HomeOutlined, SearchOutlined, PlusCircleOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDebounce } from "../../../../common/functions/commonFunction"
import { useMutation, useQuery } from "react-query"
import Base from "@/models/Base"

export default function ListPost() {
  const router = useRouter()

  const [valueSearch, setValueSearch] = useState("")
  const [valueSearchCate, setValueSearchCate] = useState(-1)
  const [idSelected, setIdSelected] = useState()

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

  const searchDebounce = useDebounce(valueSearch, 1000)
  const {
    data: listPost,
    refetch,
    isFetching
  } = useQuery(
    [
      "getListPostPagination",
      searchDebounce,
      tableParams.pagination.current,
      tableParams.pagination.pageSize,
      valueSearchCate
    ],
    async () => {
      const res = await Base.getListPostPagination({
        Page: tableParams.pagination.current,
        Size: tableParams.pagination.pageSize,
        KeySearch: searchDebounce,
        CategoryId: valueSearchCate
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
          <span className="text-cyan-700">Danh sách nguyên liệu</span>
        </>
      )
    }
  ]

  const handleGoCreateOrEdit = () => {
    router.push("/admin/ingredient/create")
  }

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (value, item, index) => index,
      fixed: "left"
    },
    {
      title: "Tên nguyên liệu",
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
          <Button
            size="middle"
            className="border-teal-500 text-teal-500"
            type="default"
            onClick={() => router.push(`/admin/ingredient/edit/${record?.Id}`)}>
            Xem chi tiết/Sửa
          </Button>

          <Popconfirm
            title="Xóa nguyên liệu"
            description="Bạn có chắc chắn muốn xóa nguyên liệu này?"
            onConfirm={handleDelete}
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

  const deleteMutate = useMutation(Base.deletePost, {
    onSuccess: () => {
      message.success("Xóa nguyên liệu thành công!")
      setIdSelected()
      refetch()
    },
    onError: e => {
      message.error("Xóa nguyên liệu thất bại!")
    }
  })

  const handleDelete = e => {
    deleteMutate.mutate(idSelected)
  }

  const onChangeSelect = value => {
    setValueSearchCate(value)
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearch"],
    async () => {
      const res = await Base.getAllCategory()

      const dataConver = res?.map(category => {
        return { label: category?.Name, value: category?.Id }
      })
      return dataConver
    },
    {}
  )

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
          setValueSearch(e.target.value)
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
            onRow={record => {
              return {
                onClick: () => {
                  setIdSelected(record.Id)
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
