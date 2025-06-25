import ListCartBanner from "@/components/user/home-page/ListCartBanner";
import UserSwiper from "@/components/user/common-component/UserSwiper";
import dynamic from "next/dynamic";
import ListCardProduct from "@/components/user/common-component/ListCardProduct";
import Image from "next/image";
import PricingBanner from "@/components/user/common-component/PricingBanner";
import AquacultureProbioticsList from "@/components/user/common-component/AquacultureProbioticsList";
import ListVideos from "@/components/user/common-component/ListVideos";

export default function HomePage() {
  return (
    <>
      <div className="pb-48 ">
        <UserSwiper />
        <ListCartBanner />
        <ListCardProduct />
        <PricingBanner />
        <AquacultureProbioticsList />
        <ListVideos />
      </div>
    </>
  );
}
