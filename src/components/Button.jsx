import React from "react";

export default function Button({
  text,
  variant = "solid",
  size = "md",
  color = "blue",
}) {
  const btnSize = {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const btnVariant = {
    solid: "border-0 text-white",
    outline: "border-[1px]",
    ghost: "",
    link: "",
  };

  const btnColor = {
    blue: "bg-[#072DF4]",
  };

  return (
    <React.Fragment>
      <button
        className={`${btnSize[size]} ${btnVariant[variant]} ${btnColor[color]} font-medium text-center rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
