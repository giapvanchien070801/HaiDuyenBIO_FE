"use client"
import "../globals.css"
import UserHeader from "@/components/user/UserHeader"
import dynamic from "next/dynamic"
import Script from "next/script"
import { QueryClient, QueryClientProvider } from "react-query"
import { usePageTitle } from "@/utils/hooks/usePageTitle"
import ContactFloatingButtons from "@/components/user/common-component/ListContact"
import { useEffect, useState } from "react"
import { VerticalAlignTopOutlined } from "@ant-design/icons"

const UserFooter = dynamic(() => import("@/components/user/UserFooter"), {
  ssr: false
})

export default function RootLayout({ children }) {
  const queryClient = new QueryClient()

  // Sử dụng hook để cập nhật tiêu đề trang
  usePageTitle()

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/LOGO.JPG" />
        <title>Hai Duyen Bio</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UserHeader />
          <main className="mt-20">{children}</main>
          <div id="fb-root"></div>
          <div id="fb-customer-chat" class="fb-customerchat"></div>
          <ContactFloatingButtons />
          <UserFooter />
          {/* Nút scroll to top */}
          {showScrollTop && (
            <div
              className="fixed bottom-6 right-6 z-50 cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
              onClick={scrollToTop}>
              <VerticalAlignTopOutlined className="text-2xl" />
            </div>
          )}
        </QueryClientProvider>

        <Script src="/scripts/ChatWithCustomer.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
