import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function UserMenuBody() {
  return (
    <div className="container mt-12 mx-auto bg-menu">
      <div className="text-center">
        <span className="session_ocean1 px-2 text_ocean uppercase font-medium w-max">
          Các Chức Năng Chính
        </span>
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-4 mt-4">
        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Đăng ký khám bệnh trực tuyến</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Tư Vấn Khám Bệnh</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Bảng Giá Dịch Vụ</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Hỗ Trợ Trực Tuyến</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Tra Cứu Thẻ Bảo Hiểm Y Tế</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Tra Cứu Hồ Sơ Bệnh Án</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Tra Cứu Kết Quả CĐHA</p>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href={`#`}>
            <div className="border-blue-500 text-center border-2 p-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-500">
              <p className="text-lg">Tra Cứu Kết Quả Xét Nghiệm</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}