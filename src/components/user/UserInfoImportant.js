import LayoutUserInfoImportant from "@/styles/layout_user_info_important.module.css";
import { faPhone, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function UserInfoImportant() {
  return (
    <div
      className="container mx-auto grid grid-cols-3 gap-8 relative z-10 px-10 h-max"
      style={{ marginTop: "-60px" }}
    >
      <div className={`${LayoutUserInfoImportant.session} relative`}>
        <div
          className={`h-full px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_ocean} text-white`}
        >
          <img src="/images/doctor.png" className="w-20 h-24" />
          <p className="text-2xl mb-4 mt-4">Trường Hợp Khẩn Cấp</p>
          <p className="leading-6 text-lg mb-24">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </p>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/doctor.png" className="w-20 h-24" />
          </div>

          <div className="flex text-2xl items-center mt-4 absolute bottom-0 mb-6">
            <div
              className={`${LayoutUserInfoImportant.text_ocean} bg-white p-4 rounded-full`}
            >
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="ml-4">0214.2202.888</div>
          </div>
        </div>
      </div>

      <div className={`${LayoutUserInfoImportant.session} relative`}>
        <div
          className={`px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_blue} text-white h-full`}
        >
          <img src="/images/doctor_2.png" className="w-20 h-24" />
          <p className="text-2xl mb-4 mt-4">Lịch Trình Của Bác Sỹ</p>
          <p className="leading-6 text-lg mb-24">
            Các bác sỹ có lịch làm việc khác nhau. Bạn có thể xem tiết các lịch
            làm việc ở dưới để có thể hẹn được bác sỹ.
          </p>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/doctor_2.png" className="w-20 h-24" />
          </div>

          <div className="flex text-2xl items-center mt-4 absolute bottom-0 mb-6">
            <Link href={`#`} className={`p-4 ${LayoutUserInfoImportant.link}`}>
              Lịch Làm Việc
            </Link>
          </div>
        </div>
      </div>

      <div className={`${LayoutUserInfoImportant.session} relative`}>
        <div
          className={`h-full px-6 py-6 ${LayoutUserInfoImportant.logo} ${LayoutUserInfoImportant.session_ocean} text-white`}
        >
          <img src="/images/record.png" className="w-20 h-24" />
          <p className="text-2xl mb-4 mt-4">Thời Gian Làm Việc</p>
          <div className="flex justify-between border-b-2 border-solid pb-4 mt-2" style={{borderColor: "#47A2EE"}}>
            <p className="leading-6 text-lg">Thứ 2 - Thứ 6</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div className="flex justify-between border-b-2 border-solid pb-4 mt-2" style={{borderColor: "#47A2EE"}}>
            <p className="leading-6 text-lg">Thứ 7</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div className="flex justify-between border-b-2 border-solid pb-4 mt-2" style={{borderColor: "#47A2EE"}}>
            <p className="leading-6 text-lg">Chủ Nhật</p>
            <p className="leading-6 text-lg">7:30 - 17:30</p>
          </div>

          <div className="flex justify-between border-b-2 border-solid pb-4 mt-2" style={{borderColor: "#47A2EE"}}>
            <p className="leading-6 text-lg">Khẩn Cấp</p>
            <p className="leading-6 text-lg">24 / 7</p>
          </div>

          <div className={LayoutUserInfoImportant.logo_absolute}>
            <img src="/images/record.png" className="w-20 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
