"use client";
import "../globals.css";
import UserHeader from "@/components/user/UserHeader";
import dynamic from "next/dynamic";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";

const UserFooter = dynamic(() => import("@/components/user/UserFooter"), {
  ssr: false,
});
export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <title>Phòng Khám Đa Khoa Hà Nội Lào Cai</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UserHeader />
          <main>{children}</main>
          <div id="fb-root"></div>
          <div id="fb-customer-chat" class="fb-customerchat"></div>
          <UserFooter />
        </QueryClientProvider>

        <Script src="/scripts/ChatWithCustomer.js"/>
      </body>
    </html>
  );
}
