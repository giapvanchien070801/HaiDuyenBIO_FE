import { handleSrcImg } from "@/common/functions/commonFunction";
import Base from "@/models/Base";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  ClockCircleFilled,
  MailFilled,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
  SlackOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
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

  const listPostFake = [
    {
      Id: 1,
      Title: "Bài viết 1",
      ImagePath: "/images/post1.jpg",
      CreatedAt: "2021-01-01",
      CategoryId: 1,
    },
    {
      Id: 2,
      Title: "Bài viết 2",
      ImagePath: "/images/post2.jpg",
      CreatedAt: "2021-01-02",
      CategoryId: 1,
    },
    {
      Id: 3,
      Title: "Bài viết 3",
      ImagePath: "/images/post3.jpg",
      CreatedAt: "2021-01-03",
      CategoryId: 1,
    },
  ];

  return (
    <footer
      className={`${layoutUserStyle.background_footer} text-white transition-all duration-500 lg:p-0 p-4`}
    >
      <div className="relative container mx-auto sm:py-28 py-16">
        <div
          className={`${layoutUserStyle.send_email} lg:flex lg:justify-between lg:items-center absolute z-10 p-6 w-full rounded-lg`}
        >
          <div className="flex items-center lg:w-1/2">
            <div className="mail_logo text-4xl lg:text-5xl">
              <MailFilled />
            </div>
            <p className="ml-4 text-medium lg:text-lg xl:text-xl">
              Đăng Ký Email Để Nhận Thông Báo Mới Nhất Từ Chúng Tôi
            </p>
          </div>

          <form className="lg:w-1/2 w-full md:flex md:justify-end">
            <input
              type="text"
              placeholder="Email"
              className={`${layoutUserStyle.send_email_input} text-xl py-2 md:mr-6 px-4 md:w-2/3 w-full rounded`}
            />
            <button className="rounded text-xl text-black bg-white py-2 px-4 transition-all duration-300 hover:text-white hover:bg-black w-full mt-4 md:w-1/3 md:mt-0">
              Xác nhận
            </button>
          </form>
        </div>

        <div className="container mx-auto sm:mt-20 mt-32 lg:mt-0">
          <div className="grid grid-cols-4 gap-8">
            <div className="footer_logo md:col-span-2 col-span-4 xl:col-span-1 bg-white h-full rounded p-2 text-black">
              <div className="flex items-center mb-6">
                <img src={`/images/logo-haiduyenbio-1.png`} className=" h-14" />
                {/* <span className={`font-bold xl:text-2xl lg:text-2xl ml-2`}>
                  Hai Duyen Bio
                </span> */}
              </div>

              <p className="text-lg text-center p-2">
                HẢI DUYÊN BIO là thương hiệu thuộc Công ty TNHH Ứng dụng công
                nghệ Vi sinh JAPAN. Chúng tôi chuyên cung cấp giải pháp sinh học
                xử lý môi trường và ao nuôi tôm, hiện đang sản xuất và phân phối
                trực tiếp các sản phẩm men vi sinh cho nuôi trồng thủy sản.
              </p>
            </div>

            <div className="newest_blogs md:col-span-2 col-span-4 xl:col-span-1">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Bài Viết Mới</p>
              </div>
              <div className="text-lg">
                {listPostFake?.map((post, index) => (
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
                            <ClockCircleFilled /> {post?.CreatedAt}
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
            <div className="footer_logo md:col-span-2 col-span-4 xl:col-span-1 flex flex-col gap-4">
              <div className="h-14 flex items-center">
                <p className="text-2xl font-medium ">Mạng Xã Hội</p>
              </div>
              <div className="text-lg flex gap-8">
                <Link href="https://www.facebook.com/profile.php?id=100063795834247">
                  <FacebookFilled className="text-2xl" />
                </Link>
                <Link href="https://www.instagram.com/haiduyenbio/">
                  <InstagramFilled className="text-2xl" />
                </Link>
                <Link href="https://www.youtube.com/@haiduyenbio">
                  <YoutubeFilled className="text-2xl" />
                </Link>
                <Link href="https://www.linkedin.com/company/haiduyenbio">
                  <LinkedinFilled className="text-2xl" />
                </Link>
                <Link href="https://www.slack.com/haiduyenbio">
                  <SlackOutlined className="text-2xl" />
                </Link>
              </div>
              <p className="mb-6">Giờ làm việc: 24/7</p>
            </div>

            <div className="Contact_US md:col-span-2 col-span-4 xl:col-span-1">
              <div className="h-14 mb-6 flex items-center">
                <p className="text-2xl font-medium ">Địa Chỉ Google Map</p>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59472.50910802227!2d106.578903!3d21.309759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a9e7eff3b02c7%3A0x4151a2dcebea0d91!2zTmFtIMSQaeG7h24sIEzhu6VjIE5n4bqhbiwgQuG6r2MgR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1749575243560!5m2!1svi!2sus"
                width="100%"
                height="100%"
                // style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
