"use client";

import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

import {
  Breadcrumb,
  Button,
  Input,
  Table,
  Card,
  Space,
  Typography,
  Tag,
} from "antd";
import { useState } from "react";

const { Search } = Input;
const { Title } = Typography;

export default function CheckShoppingPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/check-shopping",
      title: (
        <>
          <span className="text-[#2490eb]">Kiểm tra đơn hàng</span>
        </>
      ),
    },
  ];

  // Mock data cho bảng đơn hàng
  const mockOrderData = [
    {
      key: "1",
      productName: "Sản phẩm A",
      quantity: 2,
      unitPrice: 150000,
      total: 300000,
      status: "pending", // chờ vận chuyển
    },
    {
      key: "2",
      productName: "Sản phẩm B",
      quantity: 1,
      unitPrice: 200000,
      total: 200000,
      status: "shipped", // đã vận chuyển
    },
    {
      key: "3",
      productName: "Sản phẩm c",
      quantity: 2,
      unitPrice: 150000,
      total: 300000,
      status: "pending", // chờ vận chuyển
    },
    {
      key: "2",
      productName: "Sản phẩm B",
      quantity: 1,
      unitPrice: 200000,
      total: 200000,
      status: "shipped", // đã vận chuyển
    },
  ];

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "right",
      render: (price) => `${price.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (total) => `${total.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        if (status === "pending") {
          return <Tag color="orange">Chờ vận chuyển</Tag>;
        } else if (status === "shipped") {
          return <Tag color="green">Đã vận chuyển</Tag>;
        }
        return <Tag color="default">Không xác định</Tag>;
      },
    },
  ];

  const handleSearch = (value) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrderData(mockOrderData);
      setLoading(false);
    }, 1000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const totalAmount = orderData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="pb-24">
      <div className="grid xl:grid-cols-10 gap-6 mt-4 container-original mx-auto">
        <div className="blog-content col-span-10 bg-white md:px-0 px-4">
          <Breadcrumb className="my-3" items={breadcrumb} />

          <div className="my-8">
            <Card>
              <Title level={3} className="mb-6">
                Kiểm tra đơn hàng
              </Title>

              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}>
                <div>
                  <p className="mb-2 text-gray-600">
                    Nhập số điện thoại để kiểm tra đơn hàng:
                  </p>
                  <Input
                    placeholder="Nhập số điện thoại..."
                    enterButton={<SearchOutlined />}
                    size="large"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onSearch={handleSearch}
                    style={{ maxWidth: 400 }}
                  />
                </div>

                <div>
                  <Table
                    columns={columns}
                    dataSource={mockOrderData}
                    loading={loading}
                    pagination={false}
                    className="mb-4"
                  />

                  <div className="text-right">
                    <Title level={4}>
                      Tổng cộng: {formatPrice(totalAmount)}
                    </Title>
                  </div>
                </div>
              </Space>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
