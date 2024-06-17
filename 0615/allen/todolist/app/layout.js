import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To Do List",
  description: "To do list",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="overflow-hidden flex items-center justify-center min-h-screen bg-gray-100"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
