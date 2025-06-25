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
        <link rel="shortcut icon" href="/images/LOGO.JPG" />
        <title>Hai Duyen Bio</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UserHeader />
          <main className="mt-20">{children}</main>
          <div id="fb-root"></div>
          <div id="fb-customer-chat" class="fb-customerchat"></div>
          <UserFooter />
        </QueryClientProvider>

        <Script src="/scripts/ChatWithCustomer.js" />
      </body>
    </html>
  );
}
