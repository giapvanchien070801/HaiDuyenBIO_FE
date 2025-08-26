"use client"

import dynamic from "next/dynamic"

import {
  HomeOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
  PhoneOutlined,
  ArrowRightOutlined
} from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { Breadcrumb, Spin } from "antd"
import DynamicPageTitle from "@/components/common/DynamicPageTitle"

// Dynamically import components
const SidebarUser = dynamic(() => import("@/components/user/common-component/SidebarUser"), {
  ssr: false
})

const TitleList = dynamic(() => import("@/components/user/common-component/TitleList"), {
  ssr: false
})

export default function AboutPage({ params }) {
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
      href: "/about",
      title: (
        <>
          <span className="text-[#2490eb]">Giới thiệu</span>
        </>
      )
    }
  ]

  return (
    <>
      <DynamicPageTitle title="Giới thiệu" />
      <div className="pb-24">
        <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-6 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />

          <TitleList title="Giới thiệu về công ty" />
          <Spin spinning={false}>
            <div className="space-y-8 py-6">
              {/* Hero Section */}
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl">
                {/* <img
                  src="https://haiduyenbio.com/wp-content/uploads/2024/07/hai-duyen-bio-2.jpg"
                  alt="Company Banner"
                  className="w-full h-full "
                /> */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 flex flex-col items-center justify-center">
                  <h1 className="text-3xl md:text-5xl font-bold text-center px-4 text-white drop-shadow-lg">
                    Hải Duyên Bio
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-100 font-medium mt-2 drop-shadow">
                    Chìa khóa thành công của bạn!
                  </p>
                  <div className="w-24 h-1 bg-white mt-4 rounded-full"></div>
                </div>
              </div>

              {/* About Us Section */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <GlobalOutlined className="text-3xl text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-800">Về chúng tôi</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <SafetyCertificateOutlined className="text-xl text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Thương hiệu uy tín</h4>
                        <p className="text-gray-600">
                          HẢI DUYÊN BIO là thương hiệu thuộc Công ty TNHH Ứng dụng công nghệ Vi sinh JAPAN, chuyên cung
                          cấp giải pháp sinh học xử lý môi trường và ao nuôi tôm.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <TeamOutlined className="text-xl text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Sản xuất & Phân phối</h4>
                        <p className="text-gray-600">
                          Chúng tôi hiện đang sản xuất và phân phối trực tiếp các sản phẩm men vi sinh chất lượng cao
                          cho nuôi trồng thủy sản, được sản xuất trực tiếp tại nhà máy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <RocketOutlined className="text-xl text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Công nghệ tiên phong</h4>
                        <p className="text-gray-600">
                          Hải Duyên Bio tự hào là công ty tiên phong trong việc ứng dụng công nghệ sinh học hiện đại vào
                          sản xuất các sản phẩm men vi sinh chất lượng cao.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-800 italic">
                        "Với sứ mệnh mang lại giải pháp bền vững cho ngành nuôi trồng thủy sản, chúng tôi cam kết cung
                        cấp các sản phẩm an toàn, hiệu quả, và thân thiện với môi trường."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="py-12">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Tại Sao Chọn Chúng Tôi?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <SafetyCertificateOutlined className="text-3xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">Chất Lượng Đảm Bảo</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Sản phẩm được sản xuất từ nguyên liệu tự nhiên cao cấp, trải qua quy trình kiểm định nghiêm ngặt
                      theo tiêu chuẩn quốc tế.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <RiseOutlined className="text-3xl text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-green-700 text-center">Hiệu Quả Vượt Trội</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Được tin dùng bởi hơn 1000+ trang trại nuôi trồng thủy sản trên toàn quốc với tỷ lệ thành công
                      cao.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <CustomerServiceOutlined className="text-3xl text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-orange-700 text-center">Hỗ Trợ 24/7</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Đội ngũ chuyên gia với 10+ năm kinh nghiệm luôn sẵn sàng tư vấn và hỗ trợ kỹ thuật mọi lúc bạn
                      cần.
                    </p>
                  </div>
                </div>
              </div>
              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-8 py-12">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <RocketOutlined className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">Tầm nhìn</h3>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      Chúng tôi nỗ lực hết mình để trở thành{" "}
                      <span className="font-semibold text-blue-700">đối tác tin cậy</span> trong lĩnh vực giải pháp công
                      nghệ sinh học.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Phấn đấu trở thành <span className="font-semibold text-blue-700">lựa chọn số 1</span> về cung cấp
                      giải pháp và sản phẩm hiệu quả vượt trội trong xử lý môi trường ao nuôi tôm, đồng hành cùng người
                      nuôi tôm trên con đường thành công.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                      <GlobalOutlined className="text-2xl text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800">Sứ mệnh</h3>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg font-semibold italic text-green-700 border-l-4 border-green-500 pl-4">
                      "Cung cấp giải pháp và sản phẩm sinh học làm sạch môi trường ao nuôi"
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2 bg-white bg-opacity-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Cân bằng hệ sinh thái</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white bg-opacity-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Thân thiện môi trường</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white bg-opacity-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Bảo vệ môi trường</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white bg-opacity-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Đồng hành cùng phát triển</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Giá trị cốt lõi</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-blue-600">✓</span>
                    </div>
                    <h4 className="font-semibold mb-2">Chất lượng</h4>
                    <p className="text-sm text-gray-600">Sản phẩm đạt tiêu chuẩn chất lượng cao</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-green-600">♥</span>
                    </div>
                    <h4 className="font-semibold mb-2">Bền vững</h4>
                    <p className="text-sm text-gray-600">Phát triển song hành cùng môi trường</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-yellow-600">★</span>
                    </div>
                    <h4 className="font-semibold mb-2">Công nghệ</h4>
                    <p className="text-sm text-gray-600">Ứng dụng công nghệ sinh học tiên tiến</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-red-600">⚡</span>
                    </div>
                    <h4 className="font-semibold mb-2">Hiệu quả</h4>
                    <p className="text-sm text-gray-600">Giải pháp tối ưu cho người nuôi</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border border-blue-100">
                <h3 className="text-2xl font-bold mb-8 text-center text-blue-800 flex items-center justify-center gap-3">
                  <CustomerServiceOutlined className="text-3xl text-blue-600" />
                  Liên Hệ Với Chúng Tôi
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex justify-center items-center w-1/5">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <HomeOutlined className="text-2xl text-blue-600" />
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 py-5">Địa chỉ văn phòng</p>
                        <p className="text-gray-600">Nam Điện – Nam Dương – Lục Ngạn – Bắc Giang</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <PhoneOutlined className="text-2xl text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Hotline hỗ trợ 24/7</h4>
                        <p className="text-green-600 font-semibold text-lg">085.489.1993</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-10 rounded-2xl text-white text-center shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-blue-400/20">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-3xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Đồng hành cùng sự phát triển của bạn
                  </h3>
                  <p className="mb-8 text-lg text-blue-100 leading-relaxed">
                    Liên hệ ngay để được tư vấn chi tiết về sản phẩm men vi sinh và giải pháp nuôi trồng tối ưu cho
                    doanh nghiệp của bạn
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        router.push("/contact")
                      }}
                      className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                      <span>Liên hệ tư vấn</span>
                      <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
    </>
  )
}
