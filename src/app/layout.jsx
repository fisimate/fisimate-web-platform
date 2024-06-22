import { Inter } from "next/font/google";
import "./globals.css";
import InitProvider from "@/utils/QueryProvider";
import InitChakraProvider from "@/utils/ChakraClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fisimate",
  description: "Fisimate web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="dark:bg-boxdark-2 dark:text-bodydark">
        <InitProvider>
          <InitChakraProvider>{children}</InitChakraProvider>
        </InitProvider>
      </body>
    </html>
  );
}
