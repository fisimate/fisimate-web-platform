import { Inter } from "next/font/google";
import "./globals.css";
import InitProvider from "@/utils/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fisimate",
  description: "Fisimate web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InitProvider>{children}</InitProvider>
      </body>
    </html>
  );
}
