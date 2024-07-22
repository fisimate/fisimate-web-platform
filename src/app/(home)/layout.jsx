import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Dashboard | Fisimate",
  description: "Fisimate dashboard",
};

export default function RootLayout({ children }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
