"use client";
import { useState } from "react";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  DownOutlined,
  SearchOutlined,
  CloseOutlined,
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
export default function UserHeader() {
  const [activeSearchbar, setActiveSearchbar] = useState(false);

  const showSearchBar = () => {
    setActiveSearchbar(!activeSearchbar);
  };

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

  return (
    <header className="z-20">
      <div className={`${layoutUserStyle.background_info_top} z-20`}>
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

      <div className="container mx-auto flex justify-between items-center relative z-20 bg-white py-4">
        <Link href={`/`}>
          <div className="flex items-center">
            <img src="/images/logo.png" className="w-14 h-14" />
            <p
              className={`${layoutUserStyle.text_logo} font-bold xl:text-xl lg:text-base ml-2`}
            >
              Phòng Khám HNLC
            </p>
          </div>
        </Link>

        <div className="flex">
          <div className="navbar self-stretch lg:static absolute bg-white z-10 top-full w-full lg:w-fit left-0">
            <ul className="lg:flex items-center h-full">
              <li className="h-full relative">
                <Link
                  href={`/`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  <p>Trang chủ</p>
                </Link>
              </li>

              <li className="h-full relative">
                <Link
                  href={`#`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  Giới thiệu
                </Link>
              </li>

              <li className={`h-full relative ${layoutUserStyle.menu_item}`}>
                <Link
                  href={`#`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
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
                    {listDepartment?.length &&
                      listDepartment?.map((department, index) => (
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
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
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
                    {listService?.length &&
                      listService?.map((service, index) => (
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
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  Đội ngũ bác sỹ
                </Link>
              </li>

              {/* <li className="h-full relative">
                <Link
                  href={`#`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  Tuyển dụng
                </Link>
              </li> */}

              <li className={`h-full relative ${layoutUserStyle.menu_item}`}>
                <Link
                  href={`#`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
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
                    {listCategory?.length &&
                      listCategory?.map((category, index) => (
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
                  href={`/login-admin`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  Nội bộ
                </Link>
              </li>
              <li className="h-full relative">
                <Link
                  href={`/contact`}
                  className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className="search flex">
            <div className="search-container relative">
              <button
                className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 text-2xl relative"
                onClick={() => showSearchBar()}
              >
                {!activeSearchbar ? <SearchOutlined /> : <CloseOutlined />}
              </button>

              {activeSearchbar ? (
                <div
                  className={`${layoutUserStyle.searchbar} absolute w-max right-1 py-4 px-2`}
                >
                  <form>
                    <input
                      type="text"
                      placeholder="Tìm kiếm ..."
                      className="px-4 py-2 text-lg outline-1 outline-cyan-600"
                    />
                    <button
                      className={`px-4 py-2 text-lg ${layoutUserStyle.button_search} text-white hover:bg-slate-950`}
                    >
                      <SearchOutlined />
                    </button>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </div>

            <button className="block lg:hidden">
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Link
              href={`/add-appointment`}
              className={`transition-all duration-300 flex items-center p-4 text-white rounded-md hover:bg-slate-950 ${layoutUserStyle.apoiment}`}
            >
              Thêm lịch hẹn +
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
