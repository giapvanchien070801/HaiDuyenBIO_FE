import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  faCalendarDays,
  faEnvelope,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function UserFooter() {
  return (
    <footer className={`${layoutUserStyle.background_footer} text-white`}>
      <div className="relative container mx-auto py-28">
        <div className={`${layoutUserStyle.send_email} z-10 p-6`}>
          <div className="flex justify-between text-2xl items-center">
            <div className="mail_logo text-8xl">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <p className="ml-4">
              Đăng Ký Email Để Nhận Thông Báo Mới Nhất Từ Chúng Tôi
            </p>
          </div>

          <form className="w-1/2 flex justify-end">
            <input
              type="text"
              placeholder="Email"
              className={`${layoutUserStyle.send_email_input} text-xl py-2 mr-6 px-4 w-2/3`}
            />
            <button className="text-xl text-black bg-white py-2 px-4 transition-all duration-300 hover:text-white hover:bg-black">
              Xác Nhận
            </button>
          </form>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            <div className="footer_logo">
              <div className="flex items-center mb-6">
                <img src={`/images/logo.png`} className="w-14 h-14" />
                <span className={`font-bold xl:text-2xl lg:text-2xl ml-2`}>
                  Phòng Khám HNLC
                </span>
              </div>

              <p className="text-lg">
                Phòng khám Hà Nội Lào Cai luôn nỗ lực không ngừng nhằm mang đến
                những điều kiện tốt nhất và là nơi khách hàng tin cậy, là điểm
                lựa chọn để nhân dân trên địa bàn tỉnh Lào Cai đến chăm sóc sức
                khỏe cho cả gia đình.
              </p>
            </div>

            <div className="footer_logo">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Thời Gian Làm Việc</p>
              </div>
              <div className="text-lg">
                <p className="mb-6">Giờ làm việc: 24/7</p>
                <p>
                  Khám bệnh: Sáng 07:30 - 12:00; Chiều 13:00 - 16:30; Tối: 16:30
                  - 21:00
                </p>
              </div>
            </div>

            <div className="newest_blogs">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Bài Viết Mới</p>
              </div>
              <div className="text-lg">
                <div className="blog mb-6">
                  <Link href={`#`}>
                    <div className="flex items-center">
                      <div>
                        <div className="w-20 h-20">
                          <img
                            src="/images/blog1.jpg"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="info_blog mx-4 ">
                        <p>
                          <FontAwesomeIcon icon={faCalendarDays} /> 11/12/2023
                        </p>
                        <p>Get The Exercise Limited Mobility</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="blog">
                  <Link href={`#`}>
                    <div className="flex items-center">
                      <div>
                        <div className="w-20 h-20">
                          <img
                            src="/images/blog1.jpg"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="info_blog mx-4 ">
                        <p>
                          <FontAwesomeIcon icon={faCalendarDays} /> 11/12/2023
                        </p>
                        <p>Get The Exercise Limited Mobility</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="Contact_US">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Liên Hệ Với Chúng Tôi</p>
              </div>
              <div className="text-lg">
                <p className="mb-6">
                  <FontAwesomeIcon icon={faPhone} className="mr-4" /> 0214 2202
                  888
                </p>
                <p className="mb-6">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-4" />{" "}
                  pkhnlc@gmail.com
                </p>

                <p>
                  <FontAwesomeIcon icon={faLocationPin} className="mr-4" />
                  Địa chỉ: Số 022 đường Chiềng On, phường Bình Minh, thành phố
                  Lào Cai, tỉnh Lào Cai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
