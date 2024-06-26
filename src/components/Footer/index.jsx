import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center w-full py-8 text-center items-center gap-6">
      <Image
        width={120}
        height={80}
        src={"/images/app-logo/logo2.svg"}
        alt="Logo"
        priority
      />
      <p className="text-black font-normal text-sm">
        Empowering Communication for the Hearing Impaired
      </p>
      <ul className="flex flex-row md:gap-14 gap-4 font-medium text-body text-sm">
        <li>
          <Link href={"/#about"}>About</Link>
        </li>
        <li>
          <Link href={"/#features"}>Features</Link>
        </li>
        <li>
          <Link href={"/#teams"}>Teams</Link>
        </li>
        <li>
          <Link href={"/#download"}>Download</Link>
        </li>
      </ul>
      <p className="text-body text-xs">© 2024 Hear4U™. All Rights Reserved.</p>
    </div>
  );
}
