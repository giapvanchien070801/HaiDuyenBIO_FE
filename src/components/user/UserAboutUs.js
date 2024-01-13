import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function UserAboutUs() {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-8 mt-24 transition-all duration-500">
      <div>
        <img src="/images/aboutus.jpeg" />
      </div>

      <div className="short-info pl-4 flex flex-col justify-around">
        <span className="session_ocean1 px-2 text_ocean uppercase font-medium w-max py-1">
          Về Chúng Tôi
        </span>
        <p className="text-4xl">Phòng Khám Hà Nội Lào Cai</p>
        <p>
          Với đội ngũ nhân lực chất lượng cao, các bác sĩ giàu kinh nghiệm, các
          chuyên gia đầu ngành đến từ các bệnh viện lớn như Bệnh viện Đại học Y
          Hà Nội, Bệnh viện Bạch Mai, Bệnh viện K Hà Nội… Phòng khám thực hiện
          đầy đủ các chuyên khoa như
        </p>

        <ul className="services">
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            nội tổng hợp
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            thần kinh
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            tiêu hóa
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            cơ xương khớp
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            ngoại tổng hợp
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            sản phụ khoa
          </li>
          <li className="font-semibold mb-4">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
            nhi khoa
          </li>
          <li className="font-semibold">
            <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" /> da
            liễu
          </li>
        </ul>

        <Link
          href={`#`}
          className="px-6 py-4 session_ocean2 text-white w-max uppercase transition hover:bg-black"
        >
          Xem Thêm +
        </Link>
      </div>
    </div>
  );
}
