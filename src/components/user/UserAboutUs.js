"use client";
import Base from "@/app/models/Base";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useQuery } from "react-query";

export default function UserAboutUs() {
  // api lấy danh sách tất cả khoa
  const { data: listDepartment } = useQuery(
    ["getAllDepartmentHome"],
    async () => {
      const res = await Base.getAllDepartment();
      return res;
    },
    {}
  );

  return (
    <div className="container mx-auto grid grid-cols-2 gap-8 mt-24 transition-all duration-500">
      <div className="col-span-2 lg:col-span-1">
        <img src="/images/aboutus.jpeg" />
      </div>

      <div className="short-info pl-4 flex flex-col justify-around col-span-2 lg:col-span-1">
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

        <ul className="services max-h-[19rem] overflow-y-scroll">
          {listDepartment?.map((department, index) => (
            <li key={index} className="font-semibold mb-4">
              <FontAwesomeIcon icon={faCheck} className="text_ocean mr-2" />
              {department?.Name}
            </li>
          ))}
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
