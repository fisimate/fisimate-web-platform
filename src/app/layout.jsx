import { Inter } from "next/font/google";
import "./globals.css";
import InitProvider from "@/utils/QueryProvider";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fisimate",
  description: "Fisimate web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#EDF2F7]">
        <InitProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </InitProvider>
      </body>
    </html>
  );
}
