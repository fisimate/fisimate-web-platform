import { Inter } from "next/font/google";
import "./globals.css";
import InitProvider from "@/utils/QueryProvider";
import "flatpickr/dist/flatpickr.min.css";
import InitChakraProvider from "@/utils/ChakraClientProvider";

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
      <body>
        <InitProvider>
          <InitChakraProvider>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
            </div>
          </InitChakraProvider>
        </InitProvider>
      </body>
    </html>
  );
}
