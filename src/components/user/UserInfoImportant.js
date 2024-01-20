"use client";
import LayoutUserInfoImportant from "@/styles/layout_user_info_important.module.css";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import Link from "next/link";

export default function UserInfoImportant() {
  const email = <span>phongkhamhanoilaocai@gmail.com</span>;
  return (
    <div className="user_info_important container mx-auto sm:flex sm:flex-wrap justify-center xl:grid xl:grid-cols-3 xl:gap-8 relative z-10 h-max mt-4">
      <div
        className={`${LayoutUserInfoImportant.session} relative basis-2/5 mx-2`}
      >
        <div
          className={`h-full px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_ocean} text-white`}
        >
          <img src="/images/doctor.png" className="w-24 h-24" />
          <p className="text-2xl mb-4 mt-4">Liên hệ với chúng tôi</p>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/doctor.png" className="w-24 h-24" />
          </div>
          <div className="flex text-2xl items-center my-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-white w-2/12" />
            <Tooltip placement="top" title={email}>
              <div className="ml-2 text-xl text-pretty w-10/12 overflow-hidden text-ellipsis">
                {email}
              </div>
            </Tooltip>
          </div>
          <div className="flex text-2xl items-center my-2">
            <h5 className="text-white w-2/12 text-center">Zalo</h5>

            <div className="ml-2 text-xl w-10/12 ">0867.585.366</div>
          </div>
          <div className="flex text-2xl items-center my-2">
            <FontAwesomeIcon icon={faPhone} className="text-white w-2/12" />

            <div className="ml-2 text-xl w-10/12 ">0867.585.366</div>
          </div>
        </div>
      </div>

      <div
        className={`${LayoutUserInfoImportant.session} relative basis-2/5 mx-2 mt-4 lg:mt-0`}
      >
        <div
          className={`px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_blue} text-white h-full`}
        >
          <img src="/images/doctor_2.png" className="w-24 h-24" />
          <p className="text-2xl mb-4 mt-4">Lịch Trình Của Bác Sỹ</p>
          <p className="leading-6 text-lg mb-24">
            Các bác sỹ có lịch làm việc khác nhau. Bạn có thể xem tiết các lịch
            làm việc ở dưới để có thể hẹn được bác sỹ.
          </p>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/doctor_2.png" className="w-24 h-24" />
          </div>

          <div className="flex text-2xl items-center mt-4 sm:mt-0 absolute bottom-0 mb-6">
            <Link
              href={`/list-doctor`}
              className={`p-4 ${LayoutUserInfoImportant.link}`}
            >
              Lịch Làm Việc
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${LayoutUserInfoImportant.session} relative basis-2/5 mt-4 xl:mt-0 mx-2`}
      >
        <div
          className={`h-full px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_ocean} text-white`}
        >
          <img src="/images/record.png" className="w-24 h-24" />
          <p className="text-2xl mb-4 mt-4">Thời Gian Làm Việc</p>
          <div
            className="flex justify-between border-b-2 border-solid pb-4 mt-2"
            style={{ borderColor: "#47A2EE" }}
          >
            <p className="leading-6 text-lg">Thứ 2 - Thứ 6</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div
            className="flex justify-between border-b-2 border-solid pb-4 mt-2"
            style={{ borderColor: "#47A2EE" }}
          >
            <p className="leading-6 text-lg">Thứ 7</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div
            className="flex justify-between border-b-2 border-solid pb-4 mt-2"
            style={{ borderColor: "#47A2EE" }}
          >
            <p className="leading-6 text-lg">Chủ Nhật</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div
            className="flex justify-between border-b-2 border-solid pb-4 mt-2"
            style={{ borderColor: "#47A2EE" }}
          >
            <p className="leading-6 text-lg">Khẩn Cấp</p>
            <p className="leading-6 text-lg">24 / 7</p>
          </div>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/record.png" className="w-24 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
