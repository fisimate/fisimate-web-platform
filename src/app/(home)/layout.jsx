import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard | Fisimate",
  description: "Fisimate dashboard",
};

export default function RootLayout({ children }) {
  return <Sidebar>{children}</Sidebar>;
}
