import UserSwiper from "@/components/user/UserSwiper";
import dynamic from "next/dynamic";

const UserAboutUs = dynamic(() => import("@/components/user/UserAboutUs"), {
  ssr: false,
});

const UserFacilities = dynamic(
  () => import("@/components/user/UserFacilities"),
  {
    ssr: false,
  }
);

export default function HomePage() {
  return (
    <>
      <div className="pb-48">
        <UserSwiper />

        <UserAboutUs />
        <UserFacilities />
      </div>
    </>
  );
}
