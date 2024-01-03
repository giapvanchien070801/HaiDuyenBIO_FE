import {
  faCommentMedical,
  faDoorOpen,
  faHandHoldingDollar,
  faHandshake,
  faMicrochip,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserFacilities() {
  return (
    <div className="container mx-auto mt-24">
      <div className="text-center px-2 ">
        <span className="session_ocean1 px-2 text_ocean uppercase font-medium w-max">
          Lợi ích chúng tôi có
        </span>
        <p className="text-center text-4xl font-semibold capitalize">
          Những Lợi Ích Mà Bạn Nhận Được
        </p>
      </div>

      <div className="grid xl:grid-cols-3 xl:gap-x-16 gap-y-10 mt-6">
        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility1.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Được tiếp đón bởi đội ngũ nhân viên chuyên nghiệp, thân thiện, sắp
              đặt lịch khám và tư vấn theo yêu cầu, giảm tải khả năng chờ đợi.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faDoorOpen} />
            </p>
          </div>
        </div>

        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility2.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Được lựa chọn bác sĩ thăm khám và hồ sơ sức khỏe được số hóa, quản
              lý bảo mật.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faUserNurse} />
            </p>
          </div>
        </div>

        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility3.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Được các bác sĩ đầu ngành tại các viện lớn từ Hà Nội khám, tư vấn,
              tầm soát các yếu tố nguy cơ ảnh hưởng đến sức khỏe.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faCommentMedical} />
            </p>
          </div>
        </div>

        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility3.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Được bác sĩ tư vấn và cam kết đồng hành cùng khách hàng trong quá
              trình điều trị và sau điều trị.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faHandshake} />
            </p>
          </div>
        </div>

        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility1.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Tiết kiệm chi phí nhờ chỉ định đúng xét nghiệm và sử dụng thuốc
              hiệu quả.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faHandHoldingDollar} />
            </p>
          </div>
        </div>

        <div className="facilities_container">
          <div className="overflow-hidden">
            <img
              src="/images/facility2.jpg"
              className="w-full h-96  transition-all duration-500"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">
              Trải nghiệm hệ thống máy móc tân tiến bậc nhất như cộng hưởng từ,
              siêu âm 4D, nội soi, X quang… ngay tại Lào Cai với tiêu chí chất
              lượng, tiện lợi và giá thành không quá đắt.
            </p>
            <p className="text-6xl text_ocean transition-all duration-500 icon">
              <FontAwesomeIcon icon={faMicrochip} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
