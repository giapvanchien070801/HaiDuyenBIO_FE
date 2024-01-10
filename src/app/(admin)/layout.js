"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "/src/app/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { message } from "antd";

export default function AdminLayout({ children }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const pathname = usePathname();

  //kiểm tra trạng thái đăng nhập
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Nếu đường dẫn là /admin và chưa đăng nhập, điều hướng đến trang login
    if (pathname?.split("/").includes("admin") && !accessToken) {
      router.push("/login-admin");
      message.warning("Bạn chưa đăng nhập!");
    }

    // trường hợp đã đăng nhập nhưng nhập url login
    if (pathname?.split("/").includes("login-admin") && accessToken) {
      router.push("/admin/home");
    }
  }, [pathname]);

  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
