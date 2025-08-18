import layoutUserStyle from "@/styles/layout_user_style.module.css"
import {
  MailFilled,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
  LinkedinFilled,
  SlackOutlined,
  PhoneFilled,
  EnvironmentFilled,
  ClockCircleFilled,
  GlobalOutlined,
  RightOutlined
} from "@ant-design/icons"
import Link from "next/link"
import { useState } from "react"
import ContactModel from "@/models/Contact"
import { message } from "antd"
import { useMutation } from "react-query"

export default function UserFooter() {
  const [email, setEmail] = useState("")

  const listLink = [
    {
      title: "Trang chủ",
      href: "/"
    },
    {
      title: "Giới thiệu",
      href: "/about"
    },
    {
      title: "Sản phẩm",
      href: "product-list/-1"
    },
    {
      title: "Tin tức",
      href: "/news"
    },
    {
      title: "Liên hệ",
      href: "/contact"
    }
  ]

  const subscribeEmailMutation = useMutation(ContactModel.createContact, {
    onSuccess: () => {
      message.success("Tạo liên hệ thành công, chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể!")
      setEmail("")
    },
    onError: e => {
      message.error("Tạo liên hệ thất bại!")
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (!email) {
      message.warning("Vui lòng nhập email của bạn!")
      return
    }

    subscribeEmailMutation.mutate({ email })
  }

  return (
    <footer className={`${layoutUserStyle.background_footer} text-white transition-all duration-500 lg:p-0 p-4`}>
      {/* Email Subscription Banner */}
      <div className="relative container-original mx-auto sm:pt-20 py-5">
        <div
          className={`${layoutUserStyle.send_email} flex flex-col lg:flex-row lg:justify-between lg:items-center absolute z-10 p-6 w-full rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-500 shadow-lg`}>
          <div className="flex items-center mb-4 lg:mb-0 lg:w-1/2">
            <div className="mail_logo text-4xl lg:text-5xl text-white bg-cyan-800 rounded-full p-2 shadow-md flex items-center justify-center">
              <MailFilled />
            </div>
            <p className="ml-4 text-medium lg:text-lg xl:text-xl">
              Đăng ký Email để nhận thông báo mới nhất từ chúng tôi
            </p>
          </div>
          <form onSubmit={handleSubmit} className="lg:w-1/2 w-full flex flex-col md:flex-row md:justify-end">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={`${layoutUserStyle.send_email_input} text-xl py-2 md:mr-6 px-4 md:w-2/3 w-full rounded mb-4 md:mb-0`}
              disabled={subscribeEmailMutation.isPending}
            />
            <button
              type="submit"
              disabled={subscribeEmailMutation.isPending}
              className="rounded text-xl text-black bg-white py-2 px-4 transition-all duration-300 hover:text-white hover:bg-black w-full md:w-1/3 disabled:opacity-50 disabled:cursor-not-allowed">
              {subscribeEmailMutation.isPending ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto mt-36 md:mt-40  lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div className="footer_logo h-full  flex flex-col items-center">
              <div className="flex items-center mb-4">
                <img src={`/images/LOGO.JPG`} className="h-14 w-auto" alt="Hai Duyen Bio Logo" />
              </div>
              <p className="text-lg text-left p-2">
                HẢI DUYÊN BIO là thương hiệu thuộc Công ty TNHH Ứng dụng công nghệ Vi sinh JAPAN. Chúng tôi chuyên cung
                cấp giải pháp sinh học xử lý môi trường và ao nuôi tôm, hiện đang sản xuất và phân phối trực tiếp các
                sản phẩm men vi sinh cho nuôi trồng thủy sản.
              </p>
              <div className="flex gap-3 mt-4">
                <Link
                  href="https://haiduyenbio.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <GlobalOutlined className="text-2xl" style={{ color: "#0A66C2" }} />
                </Link>
                <Link
                  href="tel:0854891993"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <PhoneFilled className="text-2xl" style={{ color: "#27ae60" }} />
                </Link>
                <Link
                  href="mailto:haiduyenbio.com"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <MailFilled className="text-2xl" style={{ color: "#e67e22" }} />
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold mb-2 flex items-center gap-2 border-b-2  border-white pb-2">
                <PhoneFilled className="text-[#27ae60]" /> Liên hệ
              </p>
              <div className="flex items-start gap-3">
                <PhoneFilled className="text-xl mt-1 text-white" />
                <div>
                  <span className="font-semibold">Hotline:</span>{" "}
                  <a href="tel:0987654321" className="hover:underline">
                    085 489 1993
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MailFilled className="text-xl mt-1 text-white" />
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  <a href="mailto:haiduyenbio.com" className="hover:underline">
                    haiduyenbio.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <EnvironmentFilled className="text-xl mt-1 text-white" />
                <div>
                  <span className="font-semibold">Địa chỉ:</span>
                  <br />
                  Nam Điện - Nam Dương - Lục Ngạn - Bắc Ninh
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockCircleFilled className="text-xl mt-1 text-white" />
                <div>
                  <span className="font-semibold">Giờ làm việc:</span>
                  <br />
                  8:00 - 17:30 (Thứ 2 - Thứ 7)
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold mb-2 flex items-center gap-2 border-b-2  border-white pb-2">
                <GlobalOutlined style={{ color: "#0A66C2" }} />
                Liên kết nhanh
              </p>
              <ul className="space-y-2 ">
                {listLink.map((item, index) => (
                  <li key={index} className="border-b border-white pb-2">
                    <Link href={item.href} className="hover:underline flex items-center gap-2">
                      <RightOutlined />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Map */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold mb-2 flex items-center gap-2 border-b-2   border-white pb-2">
                <FacebookFilled style={{ color: "#1877f3" }} /> Mạng xã hội
              </p>
              <div className="flex gap-4 mb-4">
                <Link
                  href="https://www.facebook.com/trinh.hai.duyen.bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <FacebookFilled className="text-2xl" style={{ color: "#1877f3" }} />
                </Link>
                <Link
                  href="https://www.facebook.com/trinh.hai.duyen.bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <InstagramFilled className="text-2xl" style={{ color: "#E4405F" }} />
                </Link>
                <Link
                  href="https://www.youtube.com/@haiduyenbio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <YoutubeFilled className="text-2xl" style={{ color: "#FF0000" }} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/haiduyenbio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <LinkedinFilled className="text-2xl" style={{ color: "#0A66C2" }} />
                </Link>
                <Link
                  href="https://www.slack.com/haiduyenbio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-white shadow hover:scale-110 transition"
                  style={{ width: 40, height: 40 }}>
                  <SlackOutlined className="text-2xl" style={{ color: "#611f69" }} />
                </Link>
              </div>
              <div className="rounded overflow-hidden shadow-md w-full h-32">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59472.50910802227!2d106.578903!3d21.309759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a9e7eff3b02c7%3A0x4151a2dcebea0d91!2zTmFtIMSQaeG7h24sIEzhu6VjIE5n4bqhbiwgQuG6r2MgR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1749575243560!5m2!1svi!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-10 border-t border-cyan-900 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-cyan-100 gap-2">
        <span>&copy; {new Date().getFullYear()} HẢI DUYÊN BIO. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">
            Chính sách bảo mật
          </Link>
          <Link href="/terms" className="hover:underline">
            Điều khoản sử dụng
          </Link>
        </div>
      </div>
    </footer>
  )
}
