"use client";
import { Breadcrumb, Button, Form, Input, Spin, Table, message } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "react-query";
import Base from "@/models/Base";
import { Cookies } from "react-cookie";

export default function AccountAdmin() {
  const router = useRouter();
  const cookies = new Cookies();
  const breadcrumb = [
    {
      href: "/admin/home",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "",
      title: (
        <>
          <span className="text-cyan-700">Tài khoản quản trị</span>
        </>
      ),
    },
  ];

  const changePassMutate = useMutation(Base.changePass, {
    onSuccess: () => {
      message.success("Đổi mật khẩu thành công!");
      cookies.remove("accessToken");
      router.push("/login-admin");
    },
    onError: (e) => {
      message.error("Đổi mật khẩu thất bại!");
    },
  });

  const handleFinish = (values) => {
    changePassMutate.mutate(values);
  };

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />

      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Đổi mật khẩu
        </h2>

        <Spin spinning={changePassMutate.isLoading}>
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
              ]}>
              <Input.Password
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ]}>
              <Input.Password
                placeholder="Nhập lại mật khẩu mới"
                className="w-full"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-500">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
}
