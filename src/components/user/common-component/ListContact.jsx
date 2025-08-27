"use client"

import React, { useState, useEffect } from "react"
import { Button, Tooltip, Space } from "antd"
import {
  FacebookOutlined,
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  CloseOutlined
} from "@ant-design/icons"

const contactButtons = [
  {
    title: "Facebook",
    icon: <FacebookOutlined className="text-2xl" />,
    href: "https://www.facebook.com/trinh.hai.duyen.bio",
    color: "#1877F2",
    delay: 0
  },
  {
    title: "Zalo",
    icon: <WechatOutlined className="text-2xl" />,
    href: "https://zalo.me/0854891993",
    color: "#0088cc",
    delay: 0.1
  },
  // {
  //   title: "Gửi tin nhắn",
  //   icon: <MessageOutlined />,
  //   href: "sms:0854891993",
  //   color: "#1890ff",
  //   delay: 0.2
  // },
  {
    title: "Gọi điện",
    icon: <PhoneOutlined className="text-2xl" />,
    href: "tel:0854891993",
    color: "#52c41a",
    delay: 0.3
  }
  // {
  //   title: "Gửi email",
  //   icon: <MailOutlined />,
  //   href: "mailto:haiduyenbio.com",
  //   color: "#faad14",
  //   delay: 0.4
  // }
]

const ContactFloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hiển thị component sau 2 giây
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="relative">
        {/* Main toggle button */}

        {/* Contact buttons with staggered animation */}
        <div
          className={`transition-all duration-500 ease-in-out ${isExpanded ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}`}>
          <Space direction="vertical" size="small">
            {contactButtons.map((btn, idx) => (
              <div
                key={idx}
                className={`transform transition-all duration-300 ease-out ${
                  isExpanded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
                style={{
                  transitionDelay: isExpanded ? `${btn.delay}s` : "0s"
                }}>
                <Tooltip title={btn.title} placement="left">
                  <a href={btn.href} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      type="primary"
                      size="large"
                      className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-12 transform !w-14 !h-14 rounded-full"
                      style={{
                        backgroundColor: btn.color,
                        borderColor: btn.color
                      }}>
                      <div
                        className="icon-shake"
                        style={{
                          animation: isExpanded ? `iconShake 1.5s infinite ${2 + btn.delay}s` : "none"
                        }}>
                        {btn.icon}
                      </div>
                    </Button>
                  </a>
                </Tooltip>
              </div>
            ))}
          </Space>
        </div>

        {/* Floating notification */}
        {/* {isExpanded && ( */}
        {/* <div className="absolute -top-12 right-0 bg-white rounded-lg shadow-lg p-2 animate-pulse">
          <div className="text-base text-gray-600 whitespace-nowrap">💬 Liên hệ ngay!</div>
        </div> */}
        {/* )} */}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes iconShake {
          0%,
          66.67%,
          100% {
            transform: translateX(0);
          }
          4%,
          12%,
          20%,
          28% {
            transform: translateX(-2px);
          }
          8%,
          16%,
          24%,
          32% {
            transform: translateX(2px);
          }
        }

        .icon-shake:hover {
          animation: iconShake 0.5s ease-in-out !important;
        }
      `}</style>
    </div>
  )
}

export default ContactFloatingButtons
