import UserAboutUs from "@/components/user/UserAboutUs";
import UserFacilities from "@/components/user/UserFacilities";
import UserInfoImportant from "@/components/user/UserInfoImportant";
import UserSwiper from "@/components/user/UserSwiper";

export const metadata = {
  title: "Phòng Khám Hà Nội Lào Cai",
  description: 'Phòng khám Hà Nội Lào Cai',
}
 

export default function HomePage() {
  return (
    <>
      <div className="pb-48">
        <UserSwiper />
        <UserInfoImportant />
        <UserAboutUs />
        <UserFacilities />
      </div>
    </>
  );
}
