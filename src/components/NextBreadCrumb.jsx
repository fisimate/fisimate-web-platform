"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NextBreadCrumb({ capitalizeLinks }) {
  const paths = usePathname();

  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <Breadcrumb separator={"/"}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={"/"}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink as={Link} href={href}>
                {itemLink}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
