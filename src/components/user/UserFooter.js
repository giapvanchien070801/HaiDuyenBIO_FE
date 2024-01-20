import { handleSrcImg } from "@/common/functions/commonFunction";
import Base from "@/models/Base";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  faCalendarDays,
  faEnvelope,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useQuery } from "react-query";

export default function UserFooter() {
  const { data: listPost } = useQuery(
    ["getListPostNewlistFooter"],
    async () => {
      const res = await Base.getListPostPagination({
        Page: 1,
        Size: 2,
        KeySearch: "",
        CategoryId: -1,
      });

      return res?.Data;
    }
  );

  return (
    <footer
      className={`${layoutUserStyle.background_footer} text-white transition-all duration-500 lg:p-0 p-4`}
    >
      <div className="relative container mx-auto sm:py-28 py-16">
        <div
          className={`${layoutUserStyle.send_email} lg:flex lg:justify-between lg:items-center absolute z-10 p-6 w-full`}
        >
          <div className="flex items-center lg:w-1/2">
            <div className="mail_logo text-5xl lg:text-3xl xl:text-8xl">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <p className="ml-4 text-medium lg:text-lg xl:text-2xl">
              Đăng Ký Email Để Nhận Thông Báo Mới Nhất Từ Chúng Tôi
            </p>
          </div>

          <form className="lg:w-1/2 w-full md:flex md:justify-end">
            <input
              type="text"
              placeholder="Email"
              className={`${layoutUserStyle.send_email_input} text-xl py-2 md:mr-6 px-4 md:w-2/3 w-full`}
            />
            <button className="text-xl text-black bg-white py-2 px-4 transition-all duration-300 hover:text-white hover:bg-black w-full mt-4 md:w-1/3 md:mt-0">
              Xác Nhận
            </button>
          </form>
        </div>

        <div className="container mx-auto sm:mt-20 mt-32 lg:mt-0">
          <div className="grid grid-cols-4 gap-4">
            <div className="footer_logo md:col-span-2 col-span-4 xl:col-span-1">
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

            <div className="footer_logo md:col-span-2 col-span-4 xl:col-span-1">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Thời Gian Làm Việc</p>
              </div>
              <div className="text-lg">
                <p className="mb-6">Giờ làm việc: 24/7</p>
                <p>Khám bệnh: Sáng 07:30 - 12:00; Chiều 13:45 - 17:00</p>
              </div>
            </div>

            <div className="newest_blogs md:col-span-2 col-span-4 xl:col-span-1">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Bài Viết Mới</p>
              </div>
              <div className="text-lg">
                {listPost?.map((post, index) => (
                  <div className="blog mb-6" key={index}>
                    <Link href={`/blog/${post?.CategoryId}/${post?.Id}`}>
                      <div className="flex items-center">
                        <div>
                          <div className="w-20 h-20">
                            <img
                              src={handleSrcImg(post?.ImagePath)}
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="info_blog mx-4 ">
                          <p>
                            <FontAwesomeIcon icon={faCalendarDays} />{" "}
                            {post?.CreatedAt}
                          </p>
                          <p className="max-h-16 overflow-y-hidden text-ellipsis line-clamp-2">
                            {post?.Title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="Contact_US md:col-span-2 col-span-4 xl:col-span-1">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Liên Hệ Với Chúng Tôi</p>
              </div>
              <div className="text-lg">
                <p className="mb-6">
                  <FontAwesomeIcon icon={faPhone} className="mr-4" />{" "}
                  0867.585.366
                </p>
                <p className="mb-6">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-4" />{" "}
                  phongkhamhanoilaocai @gmail.com
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
