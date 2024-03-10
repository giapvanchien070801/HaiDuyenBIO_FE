"use client";
import Base from "@/models/Base";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";

export default function UserAboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <div className="container mx-auto grid grid-cols-2 gap-0 lg:gap-8 gap-y-8 mt-24 transition-all duration-500">
      <div className="col-span-2 lg:col-span-1">
        <img src="/images/anhHnlc.jpg" className="w-full" />
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
              <CheckOutlined className="text_ocean mr-2" /> {department?.Name}
            </li>
          ))}
        </ul>

        <Button
          type="primary"
          onClick={showModal}
          className="px-6 py-4 session_ocean2 text-white w-max uppercase transition hover:bg-black h-14"
        >
          Xem Thêm +
        </Button>
        <Modal
          className="w-3/4 h-full"
          title="Giới thiệu"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={() => (
            <>
              <Button
                onClick={() => {
                  handleCancel();
                }}
              >
                Đóng
              </Button>
            </>
          )}
        >
          <div className="pb-10">
            <div className="text-center w-full my-5">
              <b>PHÒNG KHÁM ĐA KHOA HÀ NỘI - LÀO CAI</b>
            </div>
            <p className="indent-30 text-justify">
              Phòng khám đa khoa Hà Nội – Lào Cai chính thức đi vào hoạt động từ
              ngày 24/11/2019, Phòng khám tọa lạc tại số nhà 022 đường Chiềng
              On, Phường Bình Minh, thành phố Lào Cai, tỉnh Lào Cai. Kể từ khi
              thành lập phòng khám đa khoa Hà Nội Lào Cai luôn lấy chất lượng
              làm mục tiêu hàng đầu, lấy người bệnh làm trung tâm của hoạt động
              chăm sóc và điều trị, phòng khám đã và đang không ngừng nỗ lực cải
              tiến để đem lại giá trị phục vụ, đáp ứng mọi nhu cầu về sức khỏe
              của khách hàng. Với đội ngũ nhân lực chất lượng cao, các bác sĩ
              giàu kinh nghiệm, các chuyên gia đầu ngành đến từ các bệnh viện
              lớn như Bệnh viện Đại học Y Hà Nội, Bệnh viện Bạch Mai, Bệnh viện
              K Hà Nội…
            </p>
            <p className="indent-30">
              Phòng khám thực hiện đầy đủ các chuyên khoa như nội tổng hợp, thần
              kinh, tiêu hóa, cơ xương khớp, ngoại tổng hợp, sản phụ khoa, nhi
              khoa, da liễu… cùng với đó là sự hỗ trợ của hệ thống máy móc,
              trang thiết bị tân tiến như máy chụp cộng hưởng từ, siêu âm 4D,
              nội soi, x quang… được nhập khẩu từ các quốc gia phát triển Mỹ ,
              Đức, Nhật… Phòng khám Hà Nội Lào Cai là địa chỉ tin cậy để khách
              hàng lựa chọn các dịch vụ chăm sóc sức khỏe, đáp ứng được nhu cầu
              của tất cả nhân dân trên địa bàn tỉnh Lào Cai. Là đơn vị tiên
              phong trong lĩnh vực áp dụng công nghệ tiên tiến y học vào chăm
              sóc và điều trị cho bệnh nhân, phòng khám được trang bị máy cộng
              hưởng từ mới nhất 1.5 Tesla, máy áp dụng công nghệ chụp cộng hưởng
              từ an toàn, không dùng tia X, không xâm lấn với khả năng thực hiện
              hầu như không giới hạn các kỹ thuật của công nghệ hình ảnh tiên
              tiến, đem lại kết quả thăm khám một cách toàn diện gồm: hệ thần
              kinh, bệnh lý vùng bụng, chấn thương, tim mạch, cơ xương khớp, ung
              biếu… Đến phòng khám đa khoa Hà Nội Lào Cai khách hàng sẽ được
              trải nghiệm những dịch vụ cùng nhiều lợi ích như:
              <br /> - Được tiếp đón bởi đội ngũ nhân viên chuyên nghiệp, thân
              thiện, sắp đặt lịch khám và tư vấn theo yêu cầu, giảm tải khả năng
              chờ đợi. <br />- Được lựa chọn bác sĩ thăm khám và hồ sơ sức khỏe
              được số hóa, quản lý bảo mật.
              <br />- Được các bác sĩ đầu ngành tại các viện lớn từ Hà Nội khám,
              tư vấn, tầm soát các yếu tố nguy cơ ảnh hưởng đến sức khỏe. <br />
              - Được bác sĩ tư vấn và cam kết đồng hành cùng khách hàng trong
              quá trình điều trị và sau điều trị. PHÒNG KHÁM ĐA KHOA HÀ NỘI -
              LÀO CAI Phòng khám đa khoa Hà Nội – Lào Cai chính thức đi vào hoạt
              động từ ngày 24/11/2019, Phòng khám tọa lạc tại số nhà 022 đường
              Chiềng On, Phường Bình Minh, thành phố Lào Cai, tỉnh Lào Cai.
            </p>
            <p className="indent-30">
              Kể từ khi thành lập phòng khám đa khoa Hà Nội Lào Cai luôn lấy
              chất lượng làm mục tiêu hàng đầu, lấy người bệnh làm trung tâm của
              hoạt động chăm sóc và điều trị, phòng khám đã và đang không ngừng
              nỗ lực cải tiến để đem lại giá trị phục vụ, đáp ứng mọi nhu cầu về
              sức khỏe của khách hàng. Với đội ngũ nhân lực chất lượng cao, các
              bác sĩ giàu kinh nghiệm, các chuyên gia đầu ngành đến từ các bệnh
              viện lớn như Bệnh viện Đại học Y Hà Nội, Bệnh viện Bạch Mai, Bệnh
              viện K Hà Nội…
            </p>
            <p className="indent-30">
              Phòng khám thực hiện đầy đủ các chuyên khoa như nội tổng hợp, thần
              kinh, tiêu hóa, cơ xương khớp, ngoại tổng hợp, sản phụ khoa, nhi
              khoa, da liễu… cùng với đó là sự hỗ trợ của hệ thống máy móc,
              trang thiết bị tân tiến như máy chụp cộng hưởng từ, siêu âm 4D,
              nội soi, x quang… được nhập khẩu từ các quốc gia phát triển Mỹ ,
              Đức, Nhật…
            </p>
            <p className="indent-30">
              Phòng khám Hà Nội Lào Cai là địa chỉ tin cậy để khách hàng lựa
              chọn các dịch vụ chăm sóc sức khỏe, đáp ứng được nhu cầu của tất
              cả nhân dân trên địa bàn tỉnh Lào Cai. Là đơn vị tiên phong trong
              lĩnh vực áp dụng công nghệ tiên tiến y học vào chăm sóc và điều
              trị cho bệnh nhân, phòng khám được trang bị máy cộng hưởng từ mới
              nhất 1.5 Tesla, máy áp dụng công nghệ chụp cộng hưởng từ an toàn,
              không dùng tia X, không xâm lấn với khả năng thực hiện hầu như
              không giới hạn các kỹ thuật của công nghệ hình ảnh tiên tiến, đem
              lại kết quả thăm khám một cách toàn diện gồm: hệ thần kinh, bệnh
              lý vùng bụng, chấn thương, tim mạch, cơ xương khớp, ung biếu…
            </p>
            <p className="indent-30">
              Đến phòng khám đa khoa Hà Nội Lào Cai khách hàng sẽ được trải
              nghiệm những dịch vụ cùng nhiều lợi ích như: <br />- Được tiếp đón
              bởi đội ngũ nhân viên chuyên nghiệp, thân thiện, sắp đặt lịch khám
              và tư vấn theo yêu cầu, giảm tải khả năng chờ đợi. <br /> - Được
              lựa chọn bác sĩ thăm khám và hồ sơ sức khỏe được số hóa, quản lý
              bảo mật. <br />- Được các bác sĩ đầu ngành tại các viện lớn từ Hà
              Nội khám, tư vấn, tầm soát các yếu tố nguy cơ ảnh hưởng đến sức
              khỏe.
              <br />- Được bác sĩ tư vấn và cam kết đồng hành cùng khách hàng
              trong quá trình điều trị và sau điều trị.
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
