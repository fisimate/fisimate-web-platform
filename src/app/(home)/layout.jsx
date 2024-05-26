import Header from "@/components/Navbar/Header";
import NextBreadCrumb from "@/components/NextBreadCrumb";

export const metadata = {
  title: "Dashboard | Fisimate",
  description: "Fisimate dashboard",
};

export default function RootLayout({ children }) {
  return (
    <Header>
      <NextBreadCrumb capitalizeLinks />
      {children}
    </Header>
  );
}
