import { Inter } from "next/font/google";
import "@/public/favicon.ico";
import "@/app/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
