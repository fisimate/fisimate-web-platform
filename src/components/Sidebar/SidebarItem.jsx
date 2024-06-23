import Link from "next/link";
import React from "react";

export default function SidebarItem({ href, text, children }) {
  return (
    <li>
      <Link
        href={href}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
      >
        {children}
        {text}
      </Link>
    </li>
  );
}
