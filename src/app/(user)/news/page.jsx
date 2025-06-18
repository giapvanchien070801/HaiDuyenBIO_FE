"use client";

import { HomeOutlined } from "@ant-design/icons";
import SidebarUser from "@/components/user/common-component/SidebarUser";
import { Breadcrumb, Pagination, Spin } from "antd";

import CardPNews from "@/components/user/common-component/CardPNews";

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Vì sao nước thải chứa Amonia gây khó khăn cho nhà thầu môi trường?",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Trong mọi dự án xử lý nước thải, giai đoạn bàn giao luôn là thời điểm then chốt để khẳng định chất lượng hệ thống và năng lực của đơn vị thi công. Tuy nhiên, không ít nhà thầu môi trường đã phải chật vật kéo dài thời gian vận hành khởi động chỉ vì ...",
      publishDate: "2024-01-15",
      category: "KIẾN THỨC MÔI TRƯỜNG",
      author: "Nguyễn Văn A",
      views: 1200,
      tags: ["men vi sinh", "sức khỏe", "đường ruột"],
    },
    {
      id: 2,
      title: "5 loại thực phẩm giàu probiotic tự nhiên",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Khám phá những thực phẩm lên men tự nhiên như kim chi, sữa chua, dưa cải, miso và kefir giúp bổ sung men vi sinh một cách tự nhiên cho cơ thể. Kim chi là món ăn truyền thống của Hàn Quốc chứa nhiều vi khuẩn có lợi Lactobacillus, giúp tăng cường hệ miễn dịch và cải thiện sức khỏe đường ruột. Sữa chua Hy Lạp không chỉ giàu protein mà còn chứa các chủng vi khuẩn probiotic như Bifidobacterium và Lactobacillus acidophilus. Dưa cải muối chua tự nhiên cung cấp một lượng lớn vi khuẩn có lợi và vitamin C, giúp tăng cường sức đề kháng cho cơ thể.",
      publishDate: "2024-01-12",
      category: "Dinh dưỡng",
      author: "Trần Thị B",
      views: 980,
      tags: ["probiotic", "thực phẩm", "dinh dưỡng"],
    },
    {
      id: 3,
      title: "Công nghệ sản xuất men vi sinh hiện đại",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Tìm hiểu quy trình sản xuất men vi sinh với công nghệ tiên tiến, đảm bảo chất lượng và hiệu quả cao nhất cho người sử dụng. Quy trình bắt đầu từ việc chọn lọc các chủng vi khuẩn có lợi, sau đó nuôi cấy trong môi trường đặc biệt với nhiệt độ và độ ẩm được kiểm soát chặt chẽ. Công nghệ đông khô (lyophilization) được áp dụng để bảo quản vi khuẩn trong thời gian dài mà không làm mất hoạt tính. Các thiết bị hiện đại như máy lên men tự động, hệ thống kiểm soát chất lượng và phòng thí nghiệm đạt chuẩn GMP đảm bảo sản phẩm cuối cùng có chất lượng cao và an toàn cho người tiêu dùng.",
      publishDate: "2024-01-10",
      category: "Công nghệ",
      author: "Lê Văn C",
      views: 750,
      tags: ["công nghệ", "men vi sinh", "sản xuất"],
    },
    {
      id: 4,
      title: "Men vi sinh cho trẻ em - Những điều cần biết",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Hướng dẫn chi tiết về cách chọn và sử dụng men vi sinh an toàn, hiệu quả cho trẻ em ở các độ tuổi khác nhau. Đối với trẻ sơ sinh từ 0-6 tháng tuổi, việc bổ sung men vi sinh cần được tham khảo ý kiến bác sĩ nhi khoa. Trẻ từ 6 tháng đến 3 tuổi có thể sử dụng các sản phẩm men vi sinh dạng bột hoặc giọt với liều lượng phù hợp. Trẻ từ 3 tuổi trở lên có thể sử dụng men vi sinh dạng viên nang hoặc kẹo dẻo. Các chủng vi khuẩn được khuyến nghị cho trẻ em bao gồm Bifidobacterium infantis, Lactobacillus rhamnosus GG và Streptococcus thermophilus, giúp hỗ trợ hệ tiêu hóa và tăng cường miễn dịch.",
      publishDate: "2024-01-08",
      category: "Gia đình",
      author: "Phạm Thị D",
      views: 1100,
      tags: ["trẻ em", "men vi sinh", "hướng dẫn"],
    },
    {
      id: 5,
      title: "Xu hướng phát triển ngành công nghiệp vi sinh",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Phân tích các xu hướng mới nhất trong nghiên cứu và phát triển các sản phẩm vi sinh, probiotic trong năm 2024. Thị trường men vi sinh toàn cầu đang tăng trưởng mạnh mẽ với tốc độ CAGR 7.5% hàng năm, đạt giá trị ước tính 77.09 tỷ USD vào năm 2025. Các xu hướng chính bao gồm phát triển các chủng vi khuẩn mới có khả năng kháng kháng sinh, ứng dụng công nghệ AI trong việc tối ưu hóa quy trình sản xuất, và sản xuất các sản phẩm men vi sinh cá nhân hóa dựa trên hệ vi sinh đường ruột của từng cá nhân. Ngoài ra, việc kết hợp men vi sinh với các thành phần khác như prebiotic, postbiotic và synbiotic đang trở thành xu hướng mới trong ngành.",
      publishDate: "2024-01-05",
      category: "Kinh tế",
      author: "Ngô Văn E",
      views: 670,
      tags: ["xu hướng", "công nghiệp", "vi sinh"],
    },
    {
      id: 6,
      title: "Ứng dụng men vi sinh trong nông nghiệp",
      image: "https://biogency.com.vn/wp-content/uploads/2025/05/xu-ly-nuoc-thai-san-xuat-hoa-chat.jpg",
      description:
        "Khám phá vai trò của các chế phẩm vi sinh trong canh tác nông nghiệp hữu cơ và phát triển bền vững. Men vi sinh được ứng dụng rộng rãi trong nông nghiệp để cải thiện chất lượng đất, tăng năng suất cây trồng và giảm thiểu việc sử dụng phân bón hóa học. Các chủng vi khuẩn như Rhizobium, Azotobacter và Azospirillum có khả năng cố định đạm từ không khí, cung cấp nguồn dinh dưỡng tự nhiên cho cây trồng. Bacillus subtilis và Pseudomonas fluorescens giúp bảo vệ cây trồng khỏi các mầm bệnh gây hại. Việc sử dụng men vi sinh trong chăn nuôi cũng giúp cải thiện sức khỏe vật nuôi, tăng khả năng hấp thu dinh dưỡng và giảm thiểu việc sử dụng kháng sinh.",
      publishDate: "2024-01-03",
      category: "Nông nghiệp",
      author: "Đặng Thị F",
      views: 890,
      tags: ["nông nghiệp", "men vi sinh", "hữu cơ"],
    },
  ];

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Tin tức</span>
        </>
      ),
    },
  ];

  return (
    <div className="pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-16 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />
          <Spin spinning={false}>
            <div className="grid grid-cols-1  gap-6 ">
              {news.map((item) => (
                <CardPNews key={item.id} dataNews={item} />
              ))}
            </div>
            <div className="flex justify-center my-4">
              <Pagination
                className="p-0"
                total={news.length}
                pageSize={6}
                showSizeChanger={false}
              />
            </div>
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  );
}
