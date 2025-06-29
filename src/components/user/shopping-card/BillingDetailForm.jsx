"use client";

import { Form, Input } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Order from "@/models/Order";
import { useMutation } from "react-query";

export default function BillingDetailForm({ form, setStep }) {
  const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
  console.log(selectedProducts, "selectedProducts");

  const orderMutation = useMutation({
    mutationFn: (values) => {
      return Order.createOrder(values);
    },
    onSuccess: () => {
      message.success("Đặt hàng thành công");
      localStorage.removeItem("selectedProducts");
      setStep("step3");
    },
    onError: () => {
      message.error("Đặt hàng thất bại");
    },
  });
  const onFinish = (values) => {
    orderMutation.mutate({
      ...values,
      listProducts: selectedProducts?.map((product) => ({
        productId: product?.id,
        quantity: product?.quantity,
      })),
    });
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

        <Form.Item name="additionalInformation" label="Ghi chú">
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
