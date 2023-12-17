import "../globals.css";

export const metadata = {
  description: "Website Phòng Khám Hà Nội Lào Cai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
