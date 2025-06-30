"use client"
import { Breadcrumb, Button, Input, Popconfirm, Space, Spin, Table, message, notification } from "antd"
import { HomeOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { useRef, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "react-query"

import { removeEmptyFields, useDebounce } from "@/common/functions/commonFunction"
import ModalCreateCategoryService from "../components/ModalCreateCategoryService"
import CategoryProduct from "@/models/CategoryProduct"

export default function Categorys() {
  const [valueSearchCate, setValueSearchCate] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 10
  })

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page_num = pagination.current
    __pagination.current.page_size = pagination.pageSize
    refetch()
  }

  const searchDebounce = useDebounce(valueSearchCate, 1000)
  const {
    data: listCate,
    refetch,
    isFetching
  } = useQuery(
    ["getListCategory", searchDebounce, __pagination.current.page_num, __pagination.current.page_size],
    async () => {
      const res = await CategoryProduct.getCategoryProductList(
        removeEmptyFields({
          page: __pagination.current.page_num - 1,
          size: __pagination.current.page_size,
          search: searchDebounce,
          type: "ARTICLE"
        })
      )

      __pagination.current.count = res.totalElements

      return res?.content
    },
    {
      enabled: true
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
          <span className="text-cyan-700">Danh mục Sản phẩm</span>
        </>
      )
    }
  ]

  const [api, contextHolder] = notification.useNotification()

  const deleteCateMutate = useMutation(CategoryProduct.deleteCategoryProduct, {
    onSuccess: () => {
      message.success("Xóa danh mục thành công!")

      refetch()
    },
    onError: e => {
      if (e?.response?.data?.Message === "Can not delete this category") {
        // trường hợp danh mục Sản phẩm đã có Sản phẩm

        api["error"]({
          message: "Không thể xóa danh mục này",
          description: "Đã có Sản phẩm thuộc danh mục này. Không thể xóa!"
        })
      } else {
        message.error("Xóa danh mục thất bại!")
      }
    }
  })

  const _itemSelected = useRef(null)

  const onActions = (record, action) => {
    switch (action) {
      case "delete":
        deleteCateMutate.mutate(record.id)
        break
      case "create":
        setIsModalOpen(true)
        break
      case "edit":
        _itemSelected.current = record
        setIsModalOpen(true)
        break
      case "reset":
        _itemSelected.current = null
        break
    }
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
      title: "Tên danh mục Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description"
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
            onClick={() => onActions(record, "edit")}>
            Xem chi tiết/Sửa
          </Button>
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => onActions(record, "delete")}
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
          setValueSearchCate(e.target.value)
        }}
        className="w-1/3 mb-5"
        placeholder="Tìm kiếm"
      />

      <Button
        icon={<PlusCircleOutlined />}
        size="middle"
        type="primary"
        className="float-right  bg-blue-700 text-white"
        onClick={() => onActions(null, "create")}>
        Thêm mới
      </Button>

      <Spin spinning={isFetching}>
        <CustomTable>
          <Table
            size="small"
            columns={columns}
            dataSource={listCate}
            pagination={{
              current: __pagination.current.page_num,
              pageSize: __pagination.current.page_size,
              total: __pagination.current.count,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100]
            }}
            loading={deleteCateMutate.isLoading}
            onChange={handleTableChange}
          />
        </CustomTable>

        {isModalOpen && (
          <ModalCreateCategoryService
            idCategory={_itemSelected?.current?.id}
            refetchData={refetch}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onActions={onActions}
          />
        )}
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
