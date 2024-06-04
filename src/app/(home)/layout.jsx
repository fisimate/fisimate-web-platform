import Header from "@/components/Navbar/Header";
import TextBreadCrumb from "@/components/TextBreadCrumb";

export const metadata = {
  title: "Dashboard | Fisimate",
  description: "Fisimate dashboard",
};

export default function RootLayout({ children }) {
  return (
    <Header>
      <TextBreadCrumb capitalizeLinks />
      {children}
    </Header>
  );
}
