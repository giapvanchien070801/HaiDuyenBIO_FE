"use client"
import { Breadcrumb, Button, Input, Popconfirm, Space, Spin, Table, message, notification } from "antd"
import { HomeOutlined, SearchOutlined, PlusCircleOutlined, EditOutlined } from "@ant-design/icons"
import { useRef, useState } from "react"
import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "react-query"
import Base from "@/models/Base"
import { useDebounce } from "../../../../common/functions/commonFunction"
import ModalCreateVideo from "./components/ModalCreateVideo"
import FilesRepository from "@/models/FilesRepository"

export default function Categorys() {
  const router = useRouter()

  const [valueSearchCate, setValueSearchCate] = useState("")
  const [idCateSelected, setIdCateSelected] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const _dataDetails = useRef(null)
  const __pagination = useRef({
    page_num: 1,
    page_size: 5,
    count: 0
  })

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page_num = pagination.current
    __pagination.current.page_size = pagination.pageSize
    refetch()
  }

  const searchDebounce = useDebounce(valueSearchCate, 1000)
  const {
    data: listVideo,
    refetch,
    isFetching
  } = useQuery(
    ["getListVideoAdmin", searchDebounce, __pagination.current.page_num, __pagination.current.page_size],
    async () => {
      const res = await FilesRepository.getFiles({
        page: __pagination.current.page_num - 1,
        size: __pagination.current.page_size,
        search: searchDebounce,
        type: 2
      })

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
          <span className="text-cyan-700">Danh mục bài viết</span>
        </>
      )
    }
  ]

  const [api, contextHolder] = notification.useNotification()

  const deleteVideoMutate = useMutation(FilesRepository.deleteFile, {
    onSuccess: () => {
      message.success("Xóa video thành công!")
      setIdCateSelected()
      refetch()
    },
    onError: e => {
      message.error("Xóa danh mục thất bại!")
    }
  })

  const onActions = (record = null, actionName) => {
    switch (actionName) {
      case "create":
        setIsModalOpen(true)
        break
      case "edit":
        _dataDetails.current = record
        setIsModalOpen(true)
        break
      case "delete":
        deleteVideoMutate.mutate(record?.id)
        break
      case "reset":
        _dataDetails.current = null

        break
      default:
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
      title: "Link video",
      dataIndex: "externalLink",
      key: "externalLink",
      render: text => <a>{text}</a>
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "Mô tả ngắn",
      key: "description",
      dataIndex: "description",
      render: text => <span>{text?.slice(0, 100)}...</span>
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa video"
            description="Bạn có chắc chắn muốn xóa video này?"
            onConfirm={() => deleteVideoMutate.mutate(record.id)}
            okText="Xóa"
            cancelText="Hủy">
            <Button size="middle" type="default" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button size="middle" type="default" icon={<EditOutlined />} onClick={() => onActions(record, "edit")}>
            Chỉnh sửa/Xem
          </Button>
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
            columns={columns}
            dataSource={listVideo}
            onRow={record => {
              return {
                onClick: () => {
                  setIdCateSelected(record.Id)
                }
              }
            }}
            pagination={{
              current: __pagination.current.page_num,
              pageSize: __pagination.current.page_size,
              total: __pagination.current.count,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100]
            }}
            onChange={handleTableChange}
          />
        </CustomTable>
      </Spin>

      {isModalOpen && (
        <ModalCreateVideo
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onActions={onActions}
          dataDetail={_dataDetails.current}
        />
      )}
    </div>
  )
}

const CustomTable = styled.div`
  & .ant-table-wrapper .ant-table-thead > tr > th,
  :where(.css-dev-only-do-not-override-6j9yrn).ant-table-wrapper .ant-table-thead > tr > td {
    background: #cce3de;
  }
`
