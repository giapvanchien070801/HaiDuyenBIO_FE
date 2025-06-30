"use client"

import { HomeOutlined, ShoppingCartOutlined, DollarOutlined, CheckCircleOutlined } from "@ant-design/icons"
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb"
import { useQuery } from "react-query"
import Base from "@/models/Base"
import SidebarUser from "@/components/user/common-component/SidebarUser"
import { Breadcrumb, Button, Result, Steps } from "antd"
import UserSwiper from "@/components/user/common-component/UserSwiper"
import ListCardProduct from "@/components/user/common-component/ListCardProduct"
import CardProduct from "@/components/user/common-component/CardProduct"
import TextEditor from "@/components/admin/common/TextEditor"
import { useState } from "react"
import TitleList from "@/components/user/common-component/TitleList"
import ShoppingStep1 from "@/components/user/shopping-card/ShoppingStep1"
import ShoppingStep2 from "@/components/user/shopping-card/ShoppingStep2"
import { useRouter } from "next/navigation"

export default function ShoppingPage({ params }) {
  // Sử dụng query param từ URL
  const { step } = params
  const [stepCurrent, setStepCurrent] = useState(step)
  const router = useRouter()

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
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Giỏ hàng</span>
        </>
      )
    }
  ]

  const items = [
    {
      title: "Mua sắm",
      status:
        stepCurrent === "step1" ? "process" : stepCurrent === "step2" || stepCurrent === "step3" ? "finish" : "wait",
      icon: <ShoppingCartOutlined />
    },
    {
      title: "Tính hóa đơn",
      status: stepCurrent === "step2" ? "process" : stepCurrent === "step3" ? "finish" : "wait",
      icon: <DollarOutlined />
    },
    {
      title: "Đặt hàng thành công",
      status: stepCurrent === "step3" ? "finish" : "wait",
      icon: <CheckCircleOutlined />
    }
  ]

  const handleStepClick = current => {
    const stepMap = {
      0: "step1",
      1: "step2",
      2: "step3"
    }
    setStepCurrent(stepMap[current])
  }

  return (
    <div className="pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-4 container-original mx-auto">
        <div className="blog-content col-span-10 bg-white md:px-0 px-4">
          <Breadcrumb className="my-3" items={breadcrumb} />

          {/* <TitleList title="Giỏ hàng" /> */}

          <div className="my-8">
            <Steps items={items} onChange={handleStepClick} current={Number(stepCurrent.replace("step", "") - 1)} />

            {stepCurrent === "step1" && <ShoppingStep1 setStep={setStepCurrent} />}
            {stepCurrent === "step2" && <ShoppingStep2 setStep={setStepCurrent} />}
            {stepCurrent === "step3" && (
              <Result
                status="success"
                title="Đặt hàng thành công"
                subTitle="Đơn hàng đã được đặt thành công"
                extra={[
                  <Button
                    type="default"
                    key="console"
                    onClick={() => {
                      setStepCurrent("step1")
                    }}>
                    Về giỏ hàng
                  </Button>,
                  <Button
                    className="!bg-[#2cb1ab] !text-white"
                    onClick={() => {
                      router.push("/")
                    }}>
                    Mua hàng tiếp
                  </Button>
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
