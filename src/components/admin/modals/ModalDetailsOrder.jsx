"use client"
import React from "react"
import { Button, Modal, Form, Table, Tag, Card, Row, Col, Typography } from "antd"
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UnorderedListOutlined
} from "@ant-design/icons"

import styled from "@emotion/styled"
import { ORDERS_STATUS, ORDERS_STATUS_COLOR, ORDERS_STATUS_TEXT } from "@/common/constants/commonConstant"

const { Text } = Typography

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-bottom: none;
    padding: 20px 24px;
  }

  .ant-modal-title {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-body {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
  }
`

const InfoCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;

  .ant-card-head {
    background: #f8f9fa;
    border-bottom: 1px solid #e8e8e8;
  }

  .ant-card-head-title {
    font-weight: 600;
    color: #1890ff;
  }
`

const ProductTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #f0f8ff;
    font-weight: 600;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f6f8ff;
  }
`

const StatusTag = styled(Tag)`
  border-radius: 12px;
  font-weight: 500;
  padding: 4px 12px;
`

const TotalSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  margin-top: 16px;

  .total-amount {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
`

const ModalDetailsOrder = props => {
  const { dataOrder, isModalOpen, setIsModalOpen } = props

  const [form] = Form.useForm()

  const formatCurrency = amount => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount)
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleString("vi-VN")
  }

  const productColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: text => <div className="font-medium text-gray-800">{text}</div>
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: quantity => (
        <Tag color="blue" className="font-medium">
          {quantity}
        </Tag>
      )
    },
    {
      title: "Đơn giá",
      dataIndex: "priceFrom",
      key: "priceFrom",
      align: "right",
      render: price => <div className="font-medium text-green-600">{formatCurrency(price)}</div>
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: status => <StatusTag color={ORDERS_STATUS_COLOR[status]}>{ORDERS_STATUS_TEXT[status]}</StatusTag>
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: total => <div className="font-bold text-blue-600">{formatCurrency(total)}</div>
    }
  ]

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <StyledModal
        title={
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCartOutlined className="mr-2" />
              Chi tiết đơn hàng
            </div>
            <div className="flex items-center gap-2">
              Trạng thái:
              <Tag color={ORDERS_STATUS_COLOR[dataOrder?.status]}>{ORDERS_STATUS_TEXT[dataOrder?.status]}</Tag>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Đóng
          </Button>
        ]}
        width={800}>
        {dataOrder && (
          <div className="space-y-6">
            {/* Customer Information */}
            <InfoCard
              title={
                <div className="flex items-center">
                  <UserOutlined className="mr-2 text-blue-500" />
                  Thông tin khách hàng
                </div>
              }
              size="small">
              <Row gutter={16}>
                <Col span={16} lg={12} s>
                  <div className="mb-3">
                    <Text strong className="text-gray-600">
                      Họ tên:
                    </Text>
                    <div className="text-lg font-medium">{dataOrder?.fullName}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="mb-3">
                    <Text strong className="text-gray-600">
                      Số điện thoại:
                    </Text>
                    <div className="text-lg font-medium flex items-center">
                      <PhoneOutlined className="mr-1 text-green-500" />
                      {dataOrder?.phone}
                    </div>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="mb-3">
                    <Text strong className="text-gray-600">
                      Địa chỉ:
                    </Text>
                    <div className="text-lg font-medium flex items-center">
                      <EnvironmentOutlined className="mr-1 text-blue-500" />
                      {dataOrder?.address}
                    </div>
                  </div>
                </Col>
              </Row>
            </InfoCard>

            {/* Order Information */}
            <InfoCard
              title={
                <div className="flex items-center">
                  <ShoppingCartOutlined className="mr-2 text-blue-500" />
                  Thông tin đơn hàng
                </div>
              }
              size="small">
              <Row gutter={16}>
                <Col span={16}>
                  <div className="mb-3">
                    <Text strong className="text-gray-600">
                      Thời gian đặt hàng:
                    </Text>
                    <div className="text-lg font-medium flex items-center gap-2">
                      <CalendarOutlined className="mr-1 text-purple-500" />
                      {formatDate(dataOrder?.createdAt)}
                    </div>
                  </div>
                </Col>
                <Col span={16}>
                  <div className="mb-3">
                    <Text strong className="text-gray-600">
                      Ghi chú:
                    </Text>
                    <div className="text-lg font-medium flex items-center gap-2">
                      <FileTextOutlined className="mr-1 text-orange-500" />
                      {dataOrder?.additionalInformation || "Không có ghi chú"}
                    </div>
                  </div>
                </Col>
              </Row>
            </InfoCard>

            {/* Product List */}
            <InfoCard
              title={
                <div className="flex items-center">
                  <UnorderedListOutlined className="mr-2 text-blue-500" />
                  Danh sách sản phẩm
                </div>
              }
              size="small">
              <ProductTable
                columns={productColumns}
                dataSource={dataOrder?.productItems}
                pagination={false}
                bordered
                className="mb-4"
                scroll={{ x: "max-content" }}
              />
            </InfoCard>

            {/* Total Amount */}
            <TotalSection>
              <div className="total-amount">Tổng tiền: {formatCurrency(dataOrder?.total)}</div>
            </TotalSection>
          </div>
        )}
      </StyledModal>
    </>
  )
}
export default ModalDetailsOrder
