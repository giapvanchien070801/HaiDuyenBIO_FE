import UserInfoImportant from "@/components/user/UserInfoImportant";
import dynamic from "next/dynamic";
import Head from "next/head";

const UserSwiper = dynamic(() => import("@/components/user/UserSwiper"), {
  ssr: false,
});
export default function HomePage() {
  return (
    <>
      <Head>

      </Head>
      <div className="pb-48 container mx-auto">
        <UserSwiper />
        <UserInfoImportant />
      </div>
    </>
  );
}
