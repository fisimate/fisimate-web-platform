import { Inter } from "next/font/google";
import "./globals.css";
import InitProvider from "@/utils/QueryProvider";
import "flatpickr/dist/flatpickr.min.css";
import InitChakraProvider from "@/utils/ChakraClientProvider";
import NextTopLoader from "nextjs-toploader";

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
              <NextTopLoader showSpinner={false} color="#072DF4" />
              {children}
            </div>
          </InitChakraProvider>
        </InitProvider>
      </body>
    </html>
  );
}
