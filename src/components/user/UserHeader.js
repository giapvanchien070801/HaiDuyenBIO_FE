"use client";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  DownOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  PushpinFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import { useState } from "react";
export default function UserHeader() {
  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCate"],
    async () => {
      const res = await Base.getAllCategory();
      return res;
    },
    {}
  );

  // api lấy danh sách tất cả khoa
  const { data: listDepartment } = useQuery(
    ["getAllDepartment"],
    async () => {
      const res = await Base.getAllDepartment();
      return res;
    },
    {}
  );

  // api lấy danh sách tất cả dịch vụ
  const { data: listService } = useQuery(
    ["getAllServiceUser"],
    async () => {
      const res = await Base.getAllService();
      return res;
    },
    {}
  );

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const toggleMenuMobile = ()=>{
    setActiveMobileMenu(!activeMobileMenu);
  }

  return (
    <header className="z-20 relative">
      <div className={`${layoutUserStyle.background_info_top} z-20 hidden md:block`}>
        <div className="container mx-auto text-white flex justify-between">
          <div className="flex items-center">
            <p className="px-2 flex">
              <PhoneFilled /> <span className="mx-2">0214.2202.888</span>
            </p>
            <p className="px-2 flex">
              <MailFilled />{" "}
              <span className="mx-2">phongkhamhanoilaocai@gmail.com</span>
            </p>
          </div>

          <div className="flex items-center">
            <Link
              href={`#`}
              className="text-lg py-4 px-4 flex hover:bg-cyan-400"
            >
              <FacebookFilled />
            </Link>
            <Link
              href={`#`}
              className="text-lg py-4 px-4 flex hover:bg-cyan-400"
            >
              <PushpinFilled />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center z-20 bg-white py-4">
        <Link href={`/`} className="lg:hidden xl:block">
          <div className="flex items-center">
            <img src="/images/logo.png" className="w-14 h-14" />
            <p
              className={`${layoutUserStyle.text_logo} font-bold xl:text-xl lg:text-base ml-2 hidden sm:block lg:hidden xl:block`}
            >
              Phòng Khám HNLC
            </p>
          </div>
        </Link>

        <div className="flex justify-between lg:w-full xl:w-fit">
          <div className="navbar self-stretch lg:static absolute bg-white z-10 top-full w-full lg:w-fit left-0">
            <ul className={`lg:flex items-center h-full md:container md:mx-auto ${activeMobileMenu? "lg:block" : "hidden lg:block"}`}>
              <li className="h-full relative">
                <Link
                  href={`/`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2"
                >
                  <p>Trang chủ</p>
                </Link>
              </li>

              <li className={`h-full relative ${layoutUserStyle.menu_item}`}>
                <Link
                  href={`#`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Chuyên khoa
                  <DownOutlined
                    style={{ fontSize: "14px", marginLeft: "5px" }}
                  />
                </Link>

                <div
                  className={`${layoutUserStyle.submenu} lg:absolute lg:w-max w-full z-20`}
                >
                  <ul className="w-max bg-white">
                    {listDepartment?.map((department, index) => (
                      <li key={index} className="w-full">
                        {/* link đến tranh danh sách bài viết */}
                        <Link
                          href={`/department-detail/${department?.Id}`}
                          as={`/department-detail/${department?.Id}`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          {department?.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className={`h-full relative ${layoutUserStyle.menu_item}`}>
                <Link
                  href={`#`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Dịch vụ
                  <DownOutlined
                    style={{ fontSize: "14px", marginLeft: "5px" }}
                  />
                </Link>

                <div
                  className={`${layoutUserStyle.submenu} lg:absolute lg:w-max w-full z-20`}
                >
                  <ul className="w-max bg-white">
                    {listService?.map((service, index) => (
                      <li key={index} className="w-full">
                        <Link
                          href={`/service-detail/${service?.Id}`}
                          as={`/service-detail/${service?.Id}`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          {service?.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/list-doctor`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Đội ngũ bác sỹ
                </Link>
              </li>

              {/* <li className="h-full relative">
                <Link
                  href={`#`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 py-2"
                >
                  Tuyển dụng
                </Link>
              </li> */}

              <li className={`h-full relative ${layoutUserStyle.menu_item}`}>
                <Link
                  href={`#`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Tin tức
                  <DownOutlined
                    style={{ fontSize: "14px", marginLeft: "5px" }}
                  />
                </Link>

                <div
                  className={`${layoutUserStyle.submenu} lg:absolute lg:w-max w-full z-20`}
                >
                  <ul className="w-max bg-white">
                    {listCategory?.map((category, index) => (
                      <li key={index} className="w-full">
                        {/* link đến tranh danh sách bài viết */}
                        <Link
                          href={`/blog/${category?.Id}`}
                          as={`/blog/${category?.Id}`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          {category?.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/contact`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          

          <Link
            href={`/add-appointment`}
            className={`transition-all duration-300 flex items-center lg:p-4 p-2 py-4 text-white rounded-md hover:bg-slate-950 ${layoutUserStyle.apoiment}`}
          >
            Thêm lịch hẹn +
          </Link>

          <div className="search flex">
            <button className="block lg:hidden p-4 session_ocean2 rounded-md text-white ml-2"
            onClick={()=>toggleMenuMobile()}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
