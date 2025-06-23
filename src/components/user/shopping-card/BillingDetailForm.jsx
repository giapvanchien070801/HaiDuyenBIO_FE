"use client";

import { Form, Input } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export default function BillingDetailForm({ form }) {
  const onFinish = (values) => {
    console.log(values);

    localStorage.removeItem("selectedProducts");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-4 flex items-center gap-2">
        <UserOutlined />
        Thông Tin Khách Hàng
      </h2>

      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Nhập họ và tên"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
          <Input
            size="large"
            prefix={<HomeOutlined />}
            placeholder="Nhập địa chỉ"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
          ]}>
          <Input
            size="large"
            prefix={<PhoneOutlined />}
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea
            size="large"
            prefix={<FileTextOutlined />}
            placeholder="Nhập ghi chú (nếu có)"
            rows={4}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
