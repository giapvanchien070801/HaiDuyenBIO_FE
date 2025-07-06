"use client"

import { LIST_STATUS_ORDER, ORDERS_STATUS_COLOR } from "@/common/constants/commonConstant"
import { useDebounce } from "@/common/functions/commonFunction"
import ModalDetailsOrder from "@/components/admin/modals/ModalDetailsOrder"
import Order from "@/models/Order"
import { EyeOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"
import { Breadcrumb, Button, Input, Table, Card, Space, Typography, Tag, Select, Empty } from "antd"
import { useRef, useState } from "react"
import { useQuery } from "react-query"

const { Search } = Input
const { Title } = Typography

export default function CheckShoppingPage() {
  const [valueSearch, setValueSearch] = useState("")
  const [valueSearchPhone, setValueSearchPhone] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState(null)

  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0
  })

  const handleTableChange = (pagination, filters, sorter) => {
    __pagination.current.page_num = pagination.current
    __pagination.current.page_size = pagination.pageSize
    refetch()
  }

  const searchDebounce = useDebounce(valueSearch, 1000)
  const searchDebouncePhone = useDebounce(valueSearchPhone, 1000)
  const {
    data: listOrder,
    refetch,
    isFetching
  } = useQuery(
    [
      "getListCategory",
      searchDebounce,
      __pagination.current.page_num,
      __pagination.current.page_size,
      searchDebouncePhone
    ],
    async () => {
      const res = await Order.getOrderList({
        page: __pagination.current.page_num - 1,
        size: __pagination.current.page_size,
        search: searchDebounce,
        phone: searchDebouncePhone
      })

      __pagination.current.count = res.totalElements

      return valueSearchPhone ? res?.content : []
    },
    {
      enabled: true
    }
  )

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      )
    },
    {
      href: "/check-shopping",
      title: (
        <>
          <span className="text-[#2490eb]">Kiểm tra đơn hàng</span>
        </>
      )
    }
  ]

  const columns = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "Id",
      render: (value, item, index) => index,
      fixed: "left"
    },
    {
      title: "Tên Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      render: text => <a>{text}</a>
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: text => <a>{text}</a>
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: text => <a>{text}</a>
    },
    {
      title: "Ghi chú",
      dataIndex: "additionalInformation",
      key: "additionalInformation",
      render: text => <a>{text}</a>
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: text => (
        <Select value={text} defaultValue={"PENDING"} disabled>
          {LIST_STATUS_ORDER.map(item => (
            <Select.Option key={item.value} value={item.value}>
              <Tag color={ORDERS_STATUS_COLOR[item.value]}>{item.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "Hoạt động",
      key: "action",
      render: (_, record) => (
        <Button size="middle" type="default" icon={<EyeOutlined />} onClick={() => setIsModalOpen(true)}>
          Xem chi tiết
        </Button>
      )
    }
  ]

  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price)
  }

  return (
    <div className="pb-24">
      <div className="grid xl:grid-cols-10 gap-6 mt-4 container-original mx-auto">
        <div className="col-span-10 bg-white md:px-0 px-4">
          <Breadcrumb className="my-3" items={breadcrumb} />

          <div className="my-8">
            <Card>
              <Title level={3} className="mb-6">
                Kiểm tra đơn hàng
              </Title>

              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div>
                  <p className="mb-2 text-gray-600">Nhập số điện thoại để kiểm tra đơn hàng:</p>
                  {/* <Input
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
                    placeholder="Tìm kiếm"
                  /> */}

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
                      setValueSearchPhone(e.target.value)
                    }}
                    className="w-1/3"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <CustomTable>
                  <Table
                    size="small"
                    columns={columns}
                    dataSource={listOrder}
                    onRow={record => {
                      return {
                        onClick: () => {
                          setItemSelected(record)
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
                    loading={isFetching}
                    locale={{
                      emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }}
                  />

                  {/* <div className="text-right">
                    <Title level={4}>Tổng cộng: 123</Title>
                  </div> */}
                </CustomTable>
              </Space>
            </Card>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalDetailsOrder dataOrder={itemSelected} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
