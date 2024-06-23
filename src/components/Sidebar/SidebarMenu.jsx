import React from "react";

export default function SidebarMenu({ children }) {
  return <ul className="mb-6 flex flex-col gap-1.5">{children}</ul>;
}
