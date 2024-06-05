import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function Button({
  text,
  variant = "solid",
  size = "md",
  color = "blue",
  isLoading = false,
  ...rest
}) {
  const btnSize = {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const btnVariant = {
    solid: "border-0 text-white",
    alternative:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-[#072DF4] focus:z-10 focus:ring-4 focus:ring-gray-100",
    ghost: "",
    link: "",
  };

  const btnColor = {
    blue: "bg-[#072DF4] hover:bg-blue-800 focus:ring-blue-300",
    red: "bg-red-600 hover:bg-red-700 ring-red-900",
  };

  return (
    <React.Fragment>
      <button
        className={`${btnSize[size]} ${btnVariant[variant]} ${btnColor[color]} font-medium text-center rounded-lg focus:ring-4 focus:outline-none flex flex-row items-center gap-2`}
        {...rest}
      >
        {isLoading && <Spinner size={"sm"} />}
        {isLoading ? "Loading..." : text}
      </button>
    </React.Fragment>
  );
}
