import Link from "next/link";
import headerStyle from "@/styles/header_style.module.css";
import {
  DownOutlined,
  SearchOutlined,
  CloseOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  PushpinFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const LayoutUser = ({ children }) => {
  const [activeSearchbar, setActiveSearchbar] = useState(false);

  const showSearchBar = () => {
    setActiveSearchbar(!activeSearchbar);
  };
  return (
    <>
      <header>
        <div className={`${headerStyle.background_info_top}`}>
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

        <div className="container mx-auto flex justify-between items-center relative">
          <Link href={`#`}>
            <div className="flex items-center">
              <img src="/images/logo.png" className="w-14 h-14" />
              <p
                className={`${headerStyle.text_logo} font-bold xl:text-xl lg:text-base`}
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
                    href={`#`}
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

                <li className={`h-full relative ${headerStyle.menu_item}`}>
                  <Link
                    href={`#`}
                    className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                  >
                    Chuyên khoa{" "}
                    <DownOutlined
                      style={{ fontSize: "14px", marginLeft: "5px" }}
                    />
                  </Link>

                  <div
                    className={`${headerStyle.submenu} lg:absolute lg:w-max w-full`}
                  >
                    <ul className="w-max bg-white">
                      <li className="w-full">
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa nội
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa nhi
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa phụ sản
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa dược
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa chuẩn đoán hình ảnh
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa y học cổ truyền - Phục hồi chức năng
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa nội tiêu hóa
                        </Link>
                      </li>

                      <li>
                        <Link
                          href={`#`}
                          className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2"
                        >
                          Khoa xét nghiệm
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="h-full relative">
                  <Link
                    href={`#`}
                    className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                  >
                    Đội ngũ bác sỹ
                  </Link>
                </li>

                <li className="h-full relative">
                  <Link
                    href={`#`}
                    className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                  >
                    Tuyển dụng
                  </Link>
                </li>

                <li className="h-full relative">
                  <Link
                    href={`#`}
                    className="h-full flex items-center px-2 hover:text-cyan-600 transition-all duration-300 lg:py-0 py-2"
                  >
                    Nội bộ
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
                    className={`${headerStyle.searchbar} absolute w-max right-1 py-4 px-2`}
                  >
                    <form>
                      <input
                        type="text"
                        placeholder="Tìm kiếm ..."
                        className="px-4 py-2 text-lg outline-1 outline-cyan-600"
                      />
                      <button
                        className={`px-4 py-2 text-lg ${headerStyle.button_search} text-white hover:bg-slate-950`}
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
                href={`#`}
                className={`transition-all duration-300 flex items-center p-4 text-white rounded-md hover:bg-slate-950 ${headerStyle.apoiment}`}
              >
                Thêm lịch hẹn +
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <p>Footer</p>
    </>
  );
};

export default LayoutUser;
