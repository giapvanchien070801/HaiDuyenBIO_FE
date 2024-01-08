"use client";

import "../globals.css";
import UserHeader from "@/components/user/UserHeader";
import UserFooter from "@/components/user/UserFooter";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <UserHeader />
          <main>{children}</main>
          <UserFooter />
        </QueryClientProvider>
      </body>
    </html>
  );
}
