import { EuroCircleFilled, InfoCircleOutlined, MessageOutlined, OpenAIFilled, PlusCircleFilled, UserOutlined } from "@ant-design/icons";

export default function UserFacilities() {
  return (
    <div className="container mx-auto mt-24">
      <div className="text-center px-2 ">
        <span className="session_ocean1 px-2 py-1 text_ocean uppercase font-medium w-max">
          Lợi ích chúng tôi có
        </span>
        <p className="text-center text-4xl font-semibold capitalize mt-5">
          Những Lợi Ích Mà Bạn Nhận Được
        </p>
      </div>

      <div className="flex mt-6 justify-center flex-wrap">
        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">
            <UserOutlined className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Được tiếp đón bởi đội ngũ nhân viên chuyên nghiệp, thân thiện, sắp
              đặt lịch khám và tư vấn theo yêu cầu, giảm tải khả năng chờ đợi.
            </p>
          </div>
        </div>

        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">
            <PlusCircleFilled className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Được lựa chọn bác sĩ thăm khám và hồ sơ sức khỏe được số hóa, quản
              lý bảo mật.
            </p>
          </div>
        </div>

        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">
            <MessageOutlined className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Được các bác sĩ đầu ngành tại các viện lớn từ Hà Nội khám, tư vấn,
              tầm soát các yếu tố nguy cơ ảnh hưởng đến sức khỏe.
            </p>
          </div>
        </div>

        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">
            <InfoCircleOutlined className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Được bác sĩ tư vấn và cam kết đồng hành cùng khách hàng trong quá
              trình điều trị và sau điều trị.
            </p>
          </div>
        </div>

        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">
            <EuroCircleFilled className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Tiết kiệm chi phí nhờ chỉ định đúng xét nghiệm và sử dụng thuốc
              hiệu quả.
            </p>
          </div>
        </div>

        <div className="facilities_container xl:basis-1/5 lg:basis-1/4 md:basis-1/3 basis-full mx-6 my-4">
          <p className="text-6xl text_ocean text-center">

            <OpenAIFilled className="icon transition-all duration-500" />
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-center">
              Trải nghiệm hệ thống máy móc tân tiến bậc nhất như cộng hưởng từ,
              siêu âm 4D, nội soi, X quang… ngay tại Lào Cai với tiêu chí chất
              lượng, tiện lợi và giá thành không quá đắt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
